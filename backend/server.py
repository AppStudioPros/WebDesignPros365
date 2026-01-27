from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict
import uuid
from datetime import datetime, timezone
from collections import defaultdict
import time
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Rate limiting - simple in-memory implementation
rate_limit_store: Dict[str, list] = defaultdict(list)
RATE_LIMIT_REQUESTS = 5
RATE_LIMIT_WINDOW = 15 * 60  # 15 minutes

def check_rate_limit(ip: str) -> bool:
    """Check if IP is rate limited. Returns True if allowed, False if limited."""
    now = time.time()
    # Clean old entries
    rate_limit_store[ip] = [t for t in rate_limit_store[ip] if now - t < RATE_LIMIT_WINDOW]
    
    if len(rate_limit_store[ip]) >= RATE_LIMIT_REQUESTS:
        return False
    
    rate_limit_store[ip].append(now)
    return True


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactFormInput(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    phone: Optional[str] = None
    service: Optional[str] = None
    budget: Optional[str] = None
    message: str
    honeypot: Optional[str] = None  # Spam protection

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    phone: Optional[str] = None
    service: Optional[str] = None
    budget: Optional[str] = None
    message: str
    submitted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    ip_address: Optional[str] = None


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Web Design Pros 365 API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Contact form endpoint
@api_router.post("/contact")
async def submit_contact_form(input: ContactFormInput, request: Request):
    """Handle contact form submissions with spam protection."""
    
    # Get client IP
    forwarded_for = request.headers.get("x-forwarded-for")
    client_ip = forwarded_for.split(",")[0] if forwarded_for else request.client.host if request.client else "unknown"
    
    # Rate limit check
    if not check_rate_limit(client_ip):
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please try again in 15 minutes."
        )
    
    # Honeypot check (should be empty)
    if input.honeypot:
        logger.warning(f"Honeypot triggered from IP: {client_ip}")
        # Return success to avoid revealing honeypot mechanism
        return {"success": True, "message": "Message received."}
    
    # Validate required fields
    if not input.name or not input.email or not input.message:
        raise HTTPException(
            status_code=400,
            detail="Name, email, and message are required."
        )
    
    # Email format validation
    email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    if not re.match(email_regex, input.email):
        raise HTTPException(
            status_code=400,
            detail="Invalid email address format."
        )
    
    # Create submission record
    submission = ContactSubmission(
        name=input.name,
        email=input.email,
        company=input.company,
        phone=input.phone,
        service=input.service,
        budget=input.budget,
        message=input.message,
        ip_address=client_ip
    )
    
    # Store in database
    doc = submission.model_dump()
    doc['submitted_at'] = doc['submitted_at'].isoformat()
    await db.contact_submissions.insert_one(doc)
    
    logger.info(f"New contact form submission from {input.name} ({input.email})")
    
    return {
        "success": True,
        "message": "Thank you! Your message has been sent. We'll get back to you within 24-48 hours."
    }


@api_router.get("/contact/submissions", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Get all contact form submissions (admin endpoint)."""
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    
    for submission in submissions:
        if isinstance(submission.get('submitted_at'), str):
            submission['submitted_at'] = datetime.fromisoformat(submission['submitted_at'])
    
    return submissions

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()