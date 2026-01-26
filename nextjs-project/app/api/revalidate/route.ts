import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function verifySignature(body: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')
  return signature === expectedSignature
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.SANITY_WEBHOOK_SECRET

  // If no secret configured, skip verification (development mode)
  if (webhookSecret) {
    const signature = req.headers.get('sanity-webhook-signature')
    const body = await req.text()

    if (!signature || !verifySignature(body, signature, webhookSecret)) {
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 401 }
      )
    }

    try {
      const parsedBody = JSON.parse(body)
      const { _type } = parsedBody

      // Revalidate based on document type
      switch (_type) {
        case 'post':
          revalidateTag('posts')
          revalidatePath('/blog')
          break
        case 'service':
          revalidateTag('services')
          revalidatePath('/services')
          revalidatePath('/')
          break
        case 'testimonial':
          revalidateTag('testimonials')
          revalidatePath('/')
          break
        case 'caseStudy':
          revalidateTag('case-studies')
          revalidatePath('/portfolio')
          break
        case 'faq':
          revalidateTag('faq')
          revalidatePath('/faq')
          revalidatePath('/')
          break
        case 'pricingTier':
          revalidateTag('pricing')
          revalidatePath('/pricing')
          break
        case 'teamMember':
          revalidateTag('team')
          revalidatePath('/about')
          break
        default:
          revalidatePath('/')
      }

      return NextResponse.json(
        { success: true, message: 'Revalidation triggered' },
        { status: 200 }
      )
    } catch (error) {
      console.error('Webhook error:', error)
      return NextResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      )
    }
  }

  // No webhook secret - skip verification
  return NextResponse.json(
    { success: true, message: 'Webhook received (no verification)' },
    { status: 200 }
  )
}
