import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function formatSection(title: string, fields: Record<string, string | string[] | undefined>) {
  const lines = Object.entries(fields)
    .filter(([, v]) => v && (Array.isArray(v) ? v.length > 0 : v.toString().trim()))
    .map(([k, v]) => `  • ${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
    .join('\n');
  return lines ? `\n━━━ ${title} ━━━\n${lines}` : '';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { steps, submittedAt } = body;

    if (!resend) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }

    const s = steps || {};
    const clientName = s.basics?.businessName || 'New Client';
    const clientEmail = s.basics?.primaryEmail || '';

    const emailBody = [
      `New client onboarding submission from ${clientName}`,
      `Submitted: ${submittedAt || new Date().toISOString()}`,
      `Client email: ${clientEmail}`,

      formatSection('Business Basics', {
        'Business Name': s.basics?.businessName,
        'Tagline': s.basics?.tagline,
        'Industry': s.basics?.industry,
        'Description': s.basics?.description,
        'Address': s.basics?.address,
        'Additional Locations': s.basics?.additionalLocations,
        'Service Area': s.basics?.serviceArea,
        'Primary Phone': s.basics?.primaryPhone,
        'Toll-Free': s.basics?.tollFree,
        'Primary Email': s.basics?.primaryEmail,
        'Inquiry Email': s.basics?.inquiryEmail,
        'Domain': s.basics?.domain,
        'Year Founded': s.basics?.yearFounded,
        'Hours': s.basics?.hours,
      }),

      formatSection('Brand Assets', {
        'Logo (Color) URL': s.brand?.logoColor,
        'Logo (White) URL': s.brand?.logoWhite,
        'Logo (Black) URL': s.brand?.logoBlack,
        'Primary Color': s.brand?.primaryColor,
        'Secondary Color': s.brand?.secondaryColor,
        'Accent Color': s.brand?.accentColor,
        'Fonts': s.brand?.fonts,
        'Style / Vibe': s.brand?.vibe,
        'Brand Notes': s.brand?.notes,
      }),

      formatSection('Social Media', {
        'Facebook': s.social?.facebook,
        'Instagram': s.social?.instagram,
        'LinkedIn': s.social?.linkedin,
        'YouTube': s.social?.youtube,
        'TikTok': s.social?.tiktok,
        'X / Twitter': s.social?.twitter,
        'Google Business': s.social?.google,
        'Yelp': s.social?.yelp,
        'Other': s.social?.other,
      }),

      formatSection('Team & People', {
        'Owner Name': s.team?.ownerName,
        'Owner Bio': s.team?.ownerBio,
        'Owner Photo URL / Drive Link': s.team?.ownerPhoto,
        'Team Members': s.team?.teamMembers,
      }),

      formatSection('Services', {
        'Services': s.services?.serviceList,
        'Pricing Preference': s.services?.pricingPreference,
        'Unique Selling Points': s.services?.usps,
        'Service Area': s.services?.serviceArea,
      }),

      formatSection('Photos & Media', {
        'Google Drive / Dropbox Link': s.media?.driveLink,
        'Hero Image Description': s.media?.heroDescription,
        'Gallery Categories': s.media?.galleryCategories,
        'Video URL': s.media?.videoUrl,
        'Photo Notes': s.media?.photoNotes,
      }),

      formatSection('Licenses & Certifications', {
        'Industry Requires License Numbers on Site': s.licensing?.requiresLicenses,
        'License Numbers': s.licensing?.licenseNumbers,
        'Certifications': s.licensing?.certifications,
        'Insurance / Bonding': s.licensing?.insurance,
        'Disclaimer Text': s.licensing?.disclaimer,
        'Privacy Policy URL': s.licensing?.privacyUrl,
        'Terms URL': s.licensing?.termsUrl,
      }),

      formatSection('Testimonials', {
        'Google Review Page URL': s.testimonials?.googleUrl,
        'Testimonials': s.testimonials?.quotes,
        'Permission Confirmed': s.testimonials?.permissionConfirmed ? 'Yes' : 'No',
      }),

      formatSection('Integrations & Booking', {
        'Booking Tool': s.integrations?.bookingTool,
        'Booking / Calendly URL': s.integrations?.bookingUrl,
        'CRM': s.integrations?.crm,
        'Email Marketing': s.integrations?.emailMarketing,
        'Form Submission Email': s.integrations?.formEmail,
        'Google Analytics ID': s.integrations?.gaId,
        'Facebook Pixel ID': s.integrations?.pixelId,
        'Other Tools': s.integrations?.otherTools,
      }),

      formatSection('Design Preferences', {
        'Inspiration Sites': s.design?.inspirationSites,
        'Light or Dark': s.design?.lightDark,
        'Vibe': s.design?.vibe,
        'Things to Avoid': s.design?.avoid,
        'Copy Provider': s.design?.copyProvider,
        'Target Audience': s.design?.targetAudience,
        'Additional Notes': s.design?.notes,
      }),
    ].filter(Boolean).join('\n');

    await resend.emails.send({
      from: 'WDP365 Onboarding <onboarding@resend.dev>',
      to: ['kelsi@webdesignpros365.com'],
      replyTo: clientEmail || undefined,
      subject: `[Onboarding] ${clientName} — New Client Intake`,
      text: emailBody,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[onboarding] error', err);
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 });
  }
}
