import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, projectType, message, _hp, ref } = body;

    // Honeypot check — bots fill this, humans don't
    if (_hp) {
      // Silently succeed so bots think it worked
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      );
    }

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: 'Web Design Pros 365 <onboarding@resend.dev>',
      to: ['info@webdesignpros365.com'],
      replyTo: email,
      subject: `[WDP365 Lead${ref ? ' · via ' + ref : ''}] ${name}${company ? ' · ' + company : ''}${projectType && !projectType.startsWith('—') ? ' · ' + projectType : ''}`,
      html: `
        <h2>New Contact Form Submission</h2>
        ${ref ? `<p style="background:#fef3c7;padding:8px 12px;border-radius:4px;border-left:4px solid #f59e0b"><strong>🔗 Referred by:</strong> ${ref}</p>` : ''}
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${projectType && !projectType.startsWith('—') ? `<p><strong>Project type:</strong> ${projectType}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
