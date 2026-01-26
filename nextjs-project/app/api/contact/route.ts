import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend (will be undefined if no API key)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// --- Rate Limiting Implementation ---
// Simple in-memory rate limiter. For production, consider Redis or similar.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_PER_IP = 5 // Max submissions allowed
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetTime) {
    // New IP or window has passed, reset limit
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (limit.count >= RATE_LIMIT_PER_IP) {
    // Exceeded limit
    console.warn(`Rate limit exceeded for IP: ${ip}`)
    return false
  }

  // Increment count within the window
  limit.count++
  return true
}

// --- reCAPTCHA v3 Verification ---
async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  
  // If no secret key, skip verification (development/placeholder mode)
  if (!secretKey) {
    console.log('reCAPTCHA: Running in placeholder mode (no RECAPTCHA_SECRET_KEY)')
    return { success: true, score: 1.0 }
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    })

    const data = await response.json()

    // reCAPTCHA v3 returns a score from 0.0 (bot) to 1.0 (human)
    // Adjust this threshold based on observed spam patterns. 0.5 is a common starting point.
    const RECAPTCHA_THRESHOLD = 0.5

    if (!data.success) {
      console.warn('reCAPTCHA verification failed:', data['error-codes'])
      return { success: false, score: 0 }
    }

    if (data.score < RECAPTCHA_THRESHOLD) {
      console.warn(`reCAPTCHA score too low: ${data.score} (threshold: ${RECAPTCHA_THRESHOLD})`)
      return { success: false, score: data.score }
    }

    console.log(`reCAPTCHA verification successful. Score: ${data.score}`)
    return { success: true, score: data.score }
  } catch (error) {
    console.error('reCAPTCHA verification API call failed:', error)
    return { success: false, score: 0 }
  }
}

// --- Send Email Functions ---
async function sendAdminNotification(
  name: string,
  email: string,
  company: string | undefined,
  phone: string | undefined,
  service: string | undefined,
  budget: string | undefined,
  timeline: string | undefined,
  message: string
): Promise<boolean> {
  const adminEmail = process.env.CONTACT_ADMIN_EMAIL || 'admin@webdesignpros365.com'

  // If no Resend API key, log and return success (placeholder mode)
  if (!resend) {
    console.log('Resend: Running in placeholder mode (no RESEND_API_KEY)')
    console.log('Would send admin email to:', adminEmail)
    console.log('Form data:', { name, email, company, phone, service, budget, timeline, message })
    return true
  }

  const emailContentHtml = `
    <h2>New Contact Form Submission</h2>
    <table style="border-collapse: collapse; width: 100%;">
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${company || 'N/A'}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${phone || 'N/A'}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Service Interest:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${service || 'Not specified'}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Budget Range:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${budget || 'Not specified'}</td></tr>
      <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Timeline:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${timeline || 'Not specified'}</td></tr>
    </table>
    <h3>Message:</h3>
    <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
    <hr>
    <p><em>This message was submitted via the Web Design Pros 365 contact form.</em></p>
  `

  try {
    await resend.emails.send({
      from: 'Web Design Pros 365 <onboarding@resend.dev>',
      to: adminEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: emailContentHtml,
    })
    return true
  } catch (error) {
    console.error('Failed to send admin notification:', error)
    return false
  }
}

async function sendUserConfirmation(name: string, email: string): Promise<boolean> {
  // If no Resend API key, skip (placeholder mode)
  if (!resend) {
    console.log('Resend: Would send confirmation email to:', email)
    return true
  }

  const userConfirmationHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0066cc;">Thank you, ${name}!</h2>
      <p>We have received your inquiry and appreciate you reaching out to Web Design Pros 365.</p>
      <p>Our team will review your message and get back to you within <strong>24-48 business hours</strong>.</p>
      <p>In the meantime, feel free to explore our:</p>
      <ul>
        <li><a href="https://webdesignpros365.com/services">Services</a></li>
        <li><a href="https://webdesignpros365.com/portfolio">Portfolio</a></li>
        <li><a href="https://webdesignpros365.com/blog">Blog</a></li>
      </ul>
      <p>Best regards,<br><strong>The Web Design Pros 365 Team</strong></p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="font-size: 12px; color: #666;">This is an automated confirmation. Please do not reply to this email.</p>
    </div>
  `

  try {
    await resend.emails.send({
      from: 'Web Design Pros 365 <onboarding@resend.dev>',
      to: email,
      subject: 'We Received Your Message - Web Design Pros 365',
      html: userConfirmationHtml,
    })
    return true
  } catch (error) {
    console.warn(`Warning: Failed to send confirmation email to ${email}:`, error)
    return false // Not critical, submission still succeeds
  }
}

// --- API Handler ---
export async function POST(request: NextRequest) {
  try {
    // 1. Get Client IP Address (for rate limiting)
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // 2. Rate Limit Check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again in 15 minutes.' },
        { status: 429 }
      )
    }

    // 3. Parse Request Body
    const body = await request.json()
    const {
      name,
      email,
      company,
      phone,
      service,
      budget,
      timeline,
      message,
      recaptchaToken,
      honeypot, // Our original honeypot field
      website_url, // Additional honeypot from guide
    } = body

    // 4. Honeypot Field Check (invisible to users, signals bot if filled)
    if (honeypot || website_url) {
      console.warn(`Honeypot field filled by IP: ${ip}. Spam submission blocked.`)
      // Return success to avoid revealing the honeypot mechanism
      return NextResponse.json(
        { success: true, message: 'Message processed.' },
        { status: 200 }
      )
    }

    // 5. Basic Input Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // 6. Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address format.' },
        { status: 400 }
      )
    }

    // 7. reCAPTCHA v3 Verification
    if (recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(recaptchaToken)
      if (!recaptchaResult.success) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Spam detection triggered. Please ensure you are human and try again.',
            score: recaptchaResult.score 
          },
          { status: 400 }
        )
      }
    } else if (process.env.RECAPTCHA_SECRET_KEY) {
      // If reCAPTCHA is configured but no token provided
      return NextResponse.json(
        { success: false, error: 'reCAPTCHA verification required.' },
        { status: 400 }
      )
    }

    // 8. Send Admin Notification Email
    const adminEmailSent = await sendAdminNotification(
      name,
      email,
      company,
      phone,
      service,
      budget,
      timeline,
      message
    )

    if (!adminEmailSent && resend) {
      console.error('Failed to send admin notification email')
      // Continue anyway - the submission was valid
    }

    // 9. Send User Confirmation Email
    await sendUserConfirmation(name, email)

    // 10. Return Success Response
    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent. We\'ll get back to you within 24-48 hours.',
    })
  } catch (error) {
    console.error('Contact form API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'An internal error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}
