# Backend server - API routes are now in Next.js
# This file is kept for supervisor compatibility

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="Web Design Pros 365 API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Backend running - API routes are in Next.js"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
