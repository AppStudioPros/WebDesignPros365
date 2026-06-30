'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, Loader2, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// ─── Types ───────────────────────────────────────────────────────────────────

type StepData = Record<string, string | string[]>;
type AllSteps = { [step: string]: StepData };

// ─── Field helpers ────────────────────────────────────────────────────────────

function Field({
  label, hint, required, children,
}: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-800">
        {label}{required && <span className="text-[#8734E1] ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-500 leading-relaxed">{hint}</p>}
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <Input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="border-gray-200 focus:border-[#8734E1] focus:ring-[#8734E1]/20"
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 4 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <Textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="border-gray-200 focus:border-[#8734E1] focus:ring-[#8734E1]/20 resize-none"
    />
  );
}

function Select({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#8734E1] focus:ring-2 focus:ring-[#8734E1]/20"
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function VibeTag({ label, selected, onToggle }: {
  label: string; selected: boolean; onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
        selected
          ? 'bg-[#8734E1] text-white border-[#8734E1]'
          : 'bg-white text-gray-600 border-gray-200 hover:border-[#8734E1] hover:text-[#8734E1]'
      }`}
    >
      {label}
    </button>
  );
}

// ─── Step components ──────────────────────────────────────────────────────────

function StepBasics({ data, set }: { data: StepData; set: (k: string, v: string) => void }) {
  const industries = [
    'Select your industry…',
    'Mortgage / Lending', 'Insurance', 'Real Estate', 'Legal / Law Firm', 'Medical / Healthcare',
    'Construction / Contracting', 'Notary / Legal Services', 'Restaurant / Bar / Venue',
    'Technology / SaaS', 'E-commerce / Retail', 'Consulting / Coaching',
    'Beauty / Wellness', 'Fitness / Sports', 'Education', 'Non-Profit', 'Other',
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Business Name" required hint="Your full business name as it appears legally or on your signage.">
          <TextInput value={data.businessName as string || ''} onChange={v => set('businessName', v)} placeholder="e.g. Web Design Pros 365" />
        </Field>
        <Field label="Tagline / Slogan" hint="A short phrase that captures what you do. Optional — skip if you don't have one.">
          <TextInput value={data.tagline as string || ''} onChange={v => set('tagline', v)} placeholder="e.g. Websites that work as hard as you do" />
        </Field>
      </div>
      <Field label="Industry" required hint="Pick the closest match.">
        <Select value={data.industry as string || industries[0]} onChange={v => set('industry', v)} options={industries} />
      </Field>
      <Field label="What does your business do?" required hint="2–3 sentences describing your services and who you help.">
        <TextArea value={data.description as string || ''} onChange={v => set('description', v)} placeholder="We build modern websites for small businesses across the US…" rows={3} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Primary Address" hint="Your main business location. Leave blank if fully remote.">
          <TextInput value={data.address as string || ''} onChange={v => set('address', v)} placeholder="123 Main St, Denver, CO 80202" />
        </Field>
        <Field label="Service Area" hint="If you serve clients beyond your location — city, state, or 'nationwide'.">
          <TextInput value={data.serviceArea as string || ''} onChange={v => set('serviceArea', v)} placeholder="e.g. Denver metro, all of Colorado, Nationwide" />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Primary Phone" required hint="The number that goes on your website.">
          <TextInput value={data.primaryPhone as string || ''} onChange={v => set('primaryPhone', v)} placeholder="(720) 276-0797" type="tel" />
        </Field>
        <Field label="Toll-Free Number" hint="Only if you have one.">
          <TextInput value={data.tollFree as string || ''} onChange={v => set('tollFree', v)} placeholder="(800) 555-0100" type="tel" />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Primary Email" required hint="The main contact email for your business.">
          <TextInput value={data.primaryEmail as string || ''} onChange={v => set('primaryEmail', v)} placeholder="info@yourbusiness.com" type="email" />
        </Field>
        <Field label="Website Domain" required hint="Your current domain or the one you want. Don't have one yet? Just write your preferred name.">
          <TextInput value={data.domain as string || ''} onChange={v => set('domain', v)} placeholder="yourbusiness.com" />
        </Field>
      </div>
      <Field label="Business Hours" hint="List your hours by day. Skip if you're appointment-only or 24/7.">
        <TextArea value={data.hours as string || ''} onChange={v => set('hours', v)} placeholder="Mon–Fri: 9am–5pm&#10;Sat: 10am–3pm&#10;Sun: Closed" rows={4} />
      </Field>
    </div>
  );
}

function StepBrand({ data, set }: { data: StepData; set: (k: string, v: string) => void }) {
  const vibes = ['Clean & Modern', 'Bold & Strong', 'Warm & Friendly', 'Luxury / Premium', 'Corporate / Professional', 'Playful & Fun', 'Minimal', 'Rustic / Earthy'];
  const selectedVibes = (data.vibe as string || '').split(',').filter(Boolean);

  const toggleVibe = (v: string) => {
    const current = new Set(selectedVibes);
    current.has(v) ? current.delete(v) : current.add(v);
    set('vibe', Array.from(current).join(','));
  };

  return (
    <div className="space-y-5">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
        <strong>For logo and file uploads:</strong> paste a Google Drive or Dropbox share link. Don&apos;t have everything ready? Fill in what you can — we&apos;ll follow up on the rest.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Logo — Color Version" required hint="Your main logo, ideally PNG with transparent background. Paste a Google Drive or Dropbox share link.">
          <TextInput value={data.logoColor as string || ''} onChange={v => set('logoColor', v)} placeholder="drive.google.com/…" />
        </Field>
        <Field label="Logo — White Version" hint="Used on dark backgrounds. Skip if you don't have one.">
          <TextInput value={data.logoWhite as string || ''} onChange={v => set('logoWhite', v)} placeholder="drive.google.com/…" />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Primary Brand Color" required hint="Your main color as a hex code, or just describe it and we'll match it.">
          <TextInput value={data.primaryColor as string || ''} onChange={v => set('primaryColor', v)} placeholder="#8734E1 or 'deep purple'" />
        </Field>
        <Field label="Secondary Brand Color" hint="A supporting color from your logo or existing materials.">
          <TextInput value={data.secondaryColor as string || ''} onChange={v => set('secondaryColor', v)} placeholder="#2F73EE or 'sky blue'" />
        </Field>
      </div>
      <Field label="Fonts" hint="The fonts you currently use, if you know them. Skip if unsure — we'll match your logo.">
        <TextInput value={data.fonts as string || ''} onChange={v => set('fonts', v)} placeholder="e.g. Poppins for headings, Inter for body" />
      </Field>
      <Field label="Brand Style / Vibe" required hint="Select everything that fits. We'll use this to guide the design direction.">
        <div className="flex flex-wrap gap-2 pt-1">
          {vibes.map(v => (
            <VibeTag key={v} label={v} selected={selectedVibes.includes(v)} onToggle={() => toggleVibe(v)} />
          ))}
        </div>
      </Field>
      <Field label="Additional Brand Notes" hint="Anything else about your brand — colors to avoid, style references, brand words, etc.">
        <TextArea value={data.notes as string || ''} onChange={v => set('notes', v)} placeholder="We never use red. Our audience is professional and older — nothing too trendy…" rows={3} />
      </Field>
    </div>
  );
}

function StepSocial({ data, set }: { data: StepData; set: (k: string, v: string) => void }) {
  const fields = [
    { key: 'instagram', label: 'Instagram', placeholder: 'instagram.com/yourbusiness' },
    { key: 'facebook', label: 'Facebook', placeholder: 'facebook.com/yourbusiness' },
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/company/yourbusiness' },
    { key: 'youtube', label: 'YouTube', placeholder: 'youtube.com/@yourbusiness' },
    { key: 'tiktok', label: 'TikTok', placeholder: 'tiktok.com/@yourbusiness' },
    { key: 'twitter', label: 'X / Twitter', placeholder: 'x.com/yourbusiness' },
    { key: 'google', label: 'Google Business Profile', placeholder: 'Paste your Google Maps listing URL' },
    { key: 'yelp', label: 'Yelp', placeholder: 'yelp.com/biz/yourbusiness' },
  ];

  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-500">All fields optional — just fill in what you have. We&apos;ll add social icons to your footer and link them up.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map(f => (
          <Field key={f.key} label={f.label} hint="Full URL">
            <TextInput value={data[f.key] as string || ''} onChange={v => set(f.key, v)} placeholder={f.placeholder} />
          </Field>
        ))}
      </div>
      <Field label="Other Platforms" hint="Any other platform you're active on — include the name and URL.">
        <TextArea value={data.other as string || ''} onChange={v => set('other', v)} placeholder="Pinterest: pinterest.com/yourbusiness&#10;Houzz: houzz.com/professionals/yourbusiness" rows={3} />
      </Field>
    </div>
  );
}

function StepTeam({ data, set }: { data: StepData; set: (k: string, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Owner / Founder Name" required hint="The name that goes on your About page.">
          <TextInput value={data.ownerName as string || ''} onChange={v => set('ownerName', v)} placeholder="e.g. Kelsi Strange" />
        </Field>
        <Field label="Owner Photo" hint="Share link to a high-res headshot (Google Drive or Dropbox). Clear background preferred — no selfies if possible.">
          <TextInput value={data.ownerPhoto as string || ''} onChange={v => set('ownerPhoto', v)} placeholder="drive.google.com/…" />
        </Field>
      </div>
      <Field label="Owner Bio" required hint="Write in first or third person — this goes on your About page. Aim for 2–4 sentences covering your background, expertise, and why you started this business.">
        <TextArea value={data.ownerBio as string || ''} onChange={v => set('ownerBio', v)} placeholder="I've been building websites for 10 years. After years in corporate design, I started Web Design Pros 365 to give small businesses the quality digital presence they deserve…" rows={5} />
      </Field>
      <Field label="Team Members" hint="List any additional team members you want featured on the site. Include: Name, Role, short bio (1–2 sentences), and a photo link if you have one. One per line or in any format.">
        <TextArea value={data.teamMembers as string || ''} onChange={v => set('teamMembers', v)} placeholder="Sarah Johnson — Lead Designer&#10;Bio: 8 years in UX. Specializes in mobile-first design.&#10;Photo: drive.google.com/…&#10;&#10;Marcus Lee — SEO Strategist&#10;Bio: …" rows={6} />
      </Field>
    </div>
  );
}

function StepServices({ data, set }: { data: StepData; set: (k: string, v: string) => void }) {
  return (
    <div className="space-y-5">
      <Field label="Your Services" required hint="List each service with a short description. One service per line, or separate them with a blank line. Include pricing if you share it publicly — otherwise skip it.">
        <TextArea
          value={data.serviceList as string || ''}
          onChange={v => set('serviceList', v)}
          placeholder="Website Design — Custom Next.js websites built for speed and SEO. Starting at $2,500.&#10;&#10;SEO & Content — Monthly SEO packages including blog writing and keyword strategy. From $750/mo.&#10;&#10;Logo & Branding — Full brand identity packages including logo, colors, and style guide."
          rows={10}
        />
      </Field>
      <Field label="Pricing Display Preference" required hint="How do you want pricing shown on your site?">
        <Select
          value={data.pricingPreference as string || 'Contact for pricing — no prices shown publicly'}
          onChange={v => set('pricingPreference', v)}
          options={[
            'Contact for pricing — no prices shown publicly',
            'Show starting prices / ranges',
            'Show full pricing publicly',
            'Show packages with prices',
          ]}
        />
      </Field>
      <Field label="Service Area" hint="Where do you serve clients? City, region, state, or nationwide.">
        <TextInput value={data.serviceArea as string || ''} onChange={v => set('serviceArea', v)} placeholder="Denver metro, Nationwide (remote-friendly), All of Colorado" />
      </Field>
      <Field label="What sets you apart?" hint="3–5 bullet points that make you different from your competitors. Be specific — we'll use these in your homepage copy.">
        <TextArea value={data.usps as string || ''} onChange={v => set('usps', v)} placeholder="We respond same business day&#10;All projects include 30 days of post-launch support&#10;No long-term contracts&#10;US-based team, never outsourced" rows={4} />
      </Field>
    </div>
  );
}

function StepMedia({ data, set }: { data: StepData; set: (k: string, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="bg-[#f0e6fb] border border-[#8734E1]/20 rounded-lg p-4 text-sm text-[#8734E1]">
        <strong>How to share files:</strong> Upload photos and videos to Google Drive or Dropbox, set sharing to &ldquo;Anyone with the link can view,&rdquo; and paste the folder link below. One shared folder is fine for everything.
      </div>
      <Field label="Photo / Video Folder Link" hint="A Google Drive or Dropbox folder containing all your images and videos. Include everything and we'll sort through it." required>
        <TextInput value={data.driveLink as string || ''} onChange={v => set('driveLink', v)} placeholder="drive.google.com/drive/folders/…" />
      </Field>
      <Field label="Hero / Banner Image Description" hint="Tell us which photo in your folder should be the big banner image on your homepage. Or describe what you'd like to see there.">
        <TextInput value={data.heroDescription as string || ''} onChange={v => set('heroDescription', v)} placeholder="The wide team photo in the folder, or anything showing our office space" />
      </Field>
      <Field label="Gallery Categories" hint="If you're uploading a portfolio or project gallery, list the categories you want. We'll sort your photos into these sections.">
        <TextInput value={data.galleryCategories as string || ''} onChange={v => set('galleryCategories', v)} placeholder="Kitchen Remodels, Bathroom Remodels, Decks & Patios, Full Home Additions" />
      </Field>
      <Field label="Video URL" hint="If you have a brand video, testimonial video, or explainer — paste the YouTube or Vimeo link here.">
        <TextInput value={data.videoUrl as string || ''} onChange={v => set('videoUrl', v)} placeholder="youtube.com/watch?v=… or vimeo.com/…" />
      </Field>
      <Field label="Additional Notes" hint="Anything else we should know about your photos or media — which photos to avoid, required photo credits, etc.">
        <TextArea value={data.photoNotes as string || ''} onChange={v => set('photoNotes', v)} placeholder="Please don't use the photo of the red truck — it's no longer ours. All photos by Jane Smith Photography, credit required." rows={3} />
      </Field>
    </div>
  );
}

function StepLicensing({ data, set }: { data: StepData; set: (k: string, v: string) => void }) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-500">Required for regulated industries (mortgage, insurance, contracting, notary, legal, medical). Skip any fields that don&apos;t apply to you.</p>
      <Field label="Does your industry require license numbers on your website?" required>
        <Select
          value={data.requiresLicenses as string || 'Not sure'}
          onChange={v => set('requiresLicenses', v)}
          options={['Not sure', 'Yes — required by law or regulators', 'No']}
        />
      </Field>
      <Field label="License Numbers" hint="List each license by state and number. One per line. Include the license type if relevant.">
        <TextArea value={data.licenseNumbers as string || ''} onChange={v => set('licenseNumbers', v)} placeholder="NMLS #123456 (individual) / NMLS #789012 (company)&#10;Colorado — Contractor License #CO-111222&#10;Florida — MBR7014 (Mortgage Broker)" rows={5} />
      </Field>
      <Field label="Certifications & Affiliations" hint="Any professional certifications, memberships, or association logos you want displayed. Include the issuing organization and year if relevant.">
        <TextArea value={data.certifications as string || ''} onChange={v => set('certifications', v)} placeholder="BBB Accredited Business (since 2018)&#10;NAHB Member&#10;LEED Certified — USGBC — 2021&#10;Google Partner" rows={4} />
      </Field>
      <Field label="Insurance / Bonding Statement" hint="If you want a licensed/bonded/insured line on your site, write it out exactly as you want it displayed.">
        <TextInput value={data.insurance as string || ''} onChange={v => set('insurance', v)} placeholder="Fully licensed, bonded & insured in Colorado" />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Existing Privacy Policy URL" hint="If you already have one, paste the link. If not, we'll generate a basic one.">
          <TextInput value={data.privacyUrl as string || ''} onChange={v => set('privacyUrl', v)} placeholder="yourbusiness.com/privacy" />
        </Field>
        <Field label="Existing Terms of Service URL" hint="If you already have one, paste the link.">
          <TextInput value={data.termsUrl as string || ''} onChange={v => set('termsUrl', v)} placeholder="yourbusiness.com/terms" />
        </Field>
      </div>
      <Field label="Required Disclaimer Text" hint="Any pre-written legal disclaimers that must appear on your site verbatim (e.g., NMLS footer disclaimer, state mortgage disclosure).">
        <TextArea value={data.disclaimer as string || ''} onChange={v => set('disclaimer', v)} placeholder="NMLS Consumer Access: nmlsconsumeraccess.org — Licensed in CO, FL, NC…" rows={4} />
      </Field>
    </div>
  );
}

function StepTestimonials({ data, set }: { data: StepData; set: (k: string, v: string) => void }) {
  return (
    <div className="space-y-5">
      <Field label="Do you want testimonials on your site?" required>
        <Select
          value={data.wantsTestimonials as string || 'Yes — I have some ready'}
          onChange={v => set('wantsTestimonials', v)}
          options={['Yes — I have some ready', 'Yes — pull from my Google reviews', "Yes — but I'll send them later", 'No — skip testimonials']}
        />
      </Field>
      <Field label="Google Review Page URL" hint="Paste your Google Business review link and we'll pull your top reviews directly.">
        <TextInput value={data.googleUrl as string || ''} onChange={v => set('googleUrl', v)} placeholder="Paste your Google Maps listing or review link" />
      </Field>
      <Field label="Written Testimonials" hint="Paste your testimonials below. Include the client's name (first + last initial is fine), their role or company if B2B, and the quote. One per entry, separated by a blank line. Get permission before using anyone's name.">
        <TextArea value={data.quotes as string || ''} onChange={v => set('quotes', v)} placeholder='"Working with this team transformed our online presence. Leads went up 40% in the first month." — Sarah M., Denver CO&#10;&#10;"Fast, professional, and actually listened to what we wanted." — Tom K., Owner, K&K Plumbing' rows={8} />
      </Field>
      <Field label="Permission confirmed" hint="Check this box to confirm you have permission from all named individuals to use their testimonials on your website.">
        <div className="flex items-start gap-3 pt-1">
          <input
            type="checkbox"
            id="permission"
            checked={data.permissionConfirmed === 'true'}
            onChange={e => set('permissionConfirmed', e.target.checked ? 'true' : 'false')}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#8734E1] focus:ring-[#8734E1]"
          />
          <label htmlFor="permission" className="text-sm text-gray-600">
            I have permission from all named individuals to use their testimonials publicly on my website.
          </label>
        </div>
      </Field>
    </div>
  );
}

function StepIntegrations({ data, set }: { data: StepData; set: (k: string, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Booking / Scheduling Tool" hint="Do you use an online scheduling tool?">
          <Select
            value={data.bookingTool as string || "I don't use one"}
            onChange={v => set('bookingTool', v)}
            options={["I don't use one", 'Calendly', 'Cal.com', 'Acuity / Squarespace Scheduling', 'Square Appointments', 'Vagaro', 'Mindbody', 'Other']}
          />
        </Field>
        <Field label="Booking / Scheduling URL" hint="Paste your direct scheduling link — the URL you share with clients to book time with you.">
          <TextInput value={data.bookingUrl as string || ''} onChange={v => set('bookingUrl', v)} placeholder="calendly.com/yourname/30min" />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="CRM" hint="Do you use a CRM that your website should connect to?">
          <Select
            value={data.crm as string || 'None'}
            onChange={v => set('crm', v)}
            options={['None', 'HubSpot', 'GoHighLevel', 'Salesforce', 'Zoho', 'Pipedrive', 'ActiveCampaign', 'Other']}
          />
        </Field>
        <Field label="Email Marketing Platform" hint="If you send newsletters or automated emails to clients.">
          <Select
            value={data.emailMarketing as string || 'None'}
            onChange={v => set('emailMarketing', v)}
            options={['None', 'Mailchimp', 'Klaviyo', 'ActiveCampaign', 'ConvertKit', 'Constant Contact', 'Other']}
          />
        </Field>
      </div>
      <Field label="Where should contact form submissions be sent?" required hint="The email address that receives messages from your website's contact form.">
        <TextInput value={data.formEmail as string || ''} onChange={v => set('formEmail', v)} placeholder="info@yourbusiness.com" type="email" />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Google Analytics ID" hint="If you already have GA4 set up. Starts with G-.">
          <TextInput value={data.gaId as string || ''} onChange={v => set('gaId', v)} placeholder="G-XXXXXXXXXX" />
        </Field>
        <Field label="Facebook / Meta Pixel ID" hint="A 15–16 digit number from your Meta Business Manager.">
          <TextInput value={data.pixelId as string || ''} onChange={v => set('pixelId', v)} placeholder="1234567890123456" />
        </Field>
      </div>
      <Field label="Other Tools or Integrations" hint="Anything else that needs to connect to your website — live chat, review platforms, payment processors, industry-specific tools, etc.">
        <TextArea value={data.otherTools as string || ''} onChange={v => set('otherTools', v)} placeholder="Intercom live chat&#10;Square for payments&#10;Encompass (LOS) — embed provided by vendor" rows={3} />
      </Field>
    </div>
  );
}

function StepDesign({ data, set }: { data: StepData; set: (k: string, v: string) => void }) {
  return (
    <div className="space-y-5">
      <Field label="Websites you love the style of" required hint="Paste 2–3 URLs of websites whose design you like. They don't have to be in your industry — this is purely about the look and feel.">
        <TextArea value={data.inspirationSites as string || ''} onChange={v => set('inspirationSites', v)} placeholder="webdesignpros365.com (clean, modern, dark accents)&#10;apple.com (minimal, lots of white space)&#10;stripe.com (professional, trust-building)" rows={4} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Light or dark site?" required hint="The overall background tone of your site.">
          <Select
            value={data.lightDark as string || 'Light (white/light gray backgrounds)'}
            onChange={v => set('lightDark', v)}
            options={[
              'Light (white/light gray backgrounds)',
              'Dark (dark backgrounds, light text)',
              'Mixed (light content sections, dark hero/footer)',
            ]}
          />
        </Field>
        <Field label="Who's writing the copy?" required hint="Will you provide the page text, or do you want us to write it?">
          <Select
            value={data.copyProvider as string || "You write it — I'll provide direction"}
            onChange={v => set('copyProvider', v)}
            options={[
              "You write it — I'll provide direction",
              "I'll write it and send you the content",
              'Mix — I have some, you fill in the rest',
            ]}
          />
        </Field>
      </div>
      <Field label="Target audience" hint="Who are your ideal clients? The more specific the better — we use this to shape the tone and copy.">
        <TextInput value={data.targetAudience as string || ''} onChange={v => set('targetAudience', v)} placeholder="Homeowners in the Denver area, age 35–60, mid-to-high income, looking for premium remodeling" />
      </Field>
      <Field label="Things to avoid" hint="Anything you definitely DON'T want on your site — visual styles, colors, words, stock photo types, etc.">
        <TextArea value={data.avoid as string || ''} onChange={v => set('avoid', v)} placeholder="No stock photos of people shaking hands&#10;Avoid red — it's our competitor's color&#10;No corporate-speak, keep it conversational" rows={3} />
      </Field>
      <Field label="Anything else we should know?" hint="Deadline, specific page requests, must-have features, previous bad website experiences — anything that helps us serve you better.">
        <TextArea value={data.notes as string || ''} onChange={v => set('notes', v)} placeholder="We need to go live before our trade show on March 15th. We had a bad experience with our last agency who never returned calls…" rows={4} />
      </Field>
    </div>
  );
}

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: 'basics',        label: 'Business',      title: 'Tell us about your business',          sub: 'The foundation we build everything on.',            component: StepBasics },
  { id: 'brand',         label: 'Brand',         title: 'Brand & visual identity',              sub: 'Colors, logos, and the look you\'re going for.',     component: StepBrand },
  { id: 'social',        label: 'Social',        title: 'Social media',                         sub: 'Every platform you want linked on your site.',       component: StepSocial },
  { id: 'team',          label: 'Team',          title: 'Your team & story',                    sub: 'The people behind the business.',                    component: StepTeam },
  { id: 'services',      label: 'Services',      title: 'What you offer',                       sub: 'Your services, products, and what makes you stand out.', component: StepServices },
  { id: 'media',         label: 'Photos',        title: 'Photos & media',                       sub: 'The visuals that make your site feel real.',         component: StepMedia },
  { id: 'licensing',     label: 'Licensing',     title: 'Licenses & compliance',                sub: 'Required for regulated industries — skip if not applicable.', component: StepLicensing },
  { id: 'testimonials',  label: 'Reviews',       title: 'Testimonials & reviews',               sub: 'Social proof is one of the highest-converting things on any site.', component: StepTestimonials },
  { id: 'integrations',  label: 'Integrations',  title: 'Booking & integrations',               sub: 'Third-party tools that connect to your site.',       component: StepIntegrations },
  { id: 'design',        label: 'Design',        title: 'Design preferences',                   sub: 'Help us get the look right from day one.',           component: StepDesign },
];

const STORAGE_KEY = 'wdp365_onboarding';

// ─── Main page ────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<AllSteps>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { stepIndex, stepsData } = JSON.parse(saved);
        setSteps(stepsData || {});
        setCurrentStep(stepIndex || 0);
      }
    } catch {}
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ stepIndex: currentStep, stepsData: steps }));
    } catch {}
  }, [currentStep, steps]);

  const setField = useCallback((stepId: string, key: string, value: string) => {
    setSteps(prev => ({ ...prev, [stepId]: { ...(prev[stepId] || {}), [key]: value } }));
  }, []);

  const step = STEPS[currentStep];
  const StepComponent = step.component;
  const data = steps[step.id] || {};
  const progress = ((currentStep) / (STEPS.length - 1)) * 100;

  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection(1);
      setCurrentStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    const basics = steps.basics || {};
    if (!basics.businessName || !basics.primaryEmail) {
      toast.error('Please go back and fill in your business name and email in Step 1.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steps, submittedAt: new Date().toISOString() }),
      });

      if (res.ok) {
        localStorage.removeItem(STORAGE_KEY);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast.error('Something went wrong. Please try again or email us directly.');
      }
    } catch {
      toast.error('Submission failed. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[#f8f9fc] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="heading-lg mb-4">You&apos;re all set! 🎉</h1>
          <p className="text-gray-600 text-lg mb-2">
            We&apos;ve received your information and we&apos;re already excited to get started.
          </p>
          <p className="text-gray-500 text-sm">
            We&apos;ll review everything and reach out within 1 business day to schedule your kickoff call. Keep an eye on <strong>{steps.basics?.primaryEmail}</strong>.
          </p>
          <div className="mt-8 pt-8 border-t border-gray-100 text-sm text-gray-400">
            Questions in the meantime? Email us at{' '}
            <a href="mailto:info@webdesignpros365.com" className="text-[#8734E1] hover:underline">info@webdesignpros365.com</a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8f9fc]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-900 text-sm">Client Onboarding</span>
              <Badge className="bg-[#f0e6fb] text-[#8734E1] border-[#8734E1] text-xs">
                Step {currentStep + 1} of {STEPS.length}
              </Badge>
            </div>
            <span className="text-xs text-gray-400">Progress auto-saved</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #8734E1, #BF5DE0)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          {/* Step tabs */}
          <div className="flex gap-1 overflow-x-auto scrollbar-hide mt-3 pb-0.5">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setDirection(i > currentStep ? 1 : -1); setCurrentStep(i); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  i === currentStep
                    ? 'bg-[#8734E1] text-white'
                    : i < currentStep
                    ? 'bg-[#f0e6fb] text-[#8734E1]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {i < currentStep && '✓ '}{s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero for step */}
      <section className="pt-12 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="container-custom relative z-10 max-w-3xl">
          <motion.div
            key={step.id + '-hero'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-semibold text-[#8734E1] mb-2">{currentStep + 1} / {STEPS.length} — {step.label}</p>
            <h1 className="heading-md text-gray-900 mb-2">{step.title}</h1>
            <p className="text-gray-500">{step.sub}</p>
          </motion.div>
        </div>
      </section>

      {/* Form content */}
      <section className="pb-48 container-custom max-w-3xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Card className="p-6 sm:p-8 shadow-sm border-gray-100">
              <StepComponent
                data={data}
                set={(k, v) => setField(step.id, k, v)}
              />
            </Card>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Fixed nav footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-40">
        <div className="container-custom py-4 max-w-3xl flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>

          <span className="text-xs text-gray-400 text-center hidden sm:block">
            Your progress is saved automatically — you can close this page and return anytime.
          </span>

          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={goNext}
              className="gap-2 bg-[#8734E1] hover:bg-[#7228c4] text-white"
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="gap-2 bg-[#8734E1] hover:bg-[#7228c4] text-white"
            >
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Submit <CheckCircle2 className="w-4 h-4" /></>}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
