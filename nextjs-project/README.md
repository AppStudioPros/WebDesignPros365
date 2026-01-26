# Web Design Pros 365 - Next.js Website

A modern, high-performance website built with Next.js 15, Sanity.io CMS, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CMS:** Sanity.io
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Email:** Resend
- **Form Protection:** reCAPTCHA v3 + Honeypot + Rate Limiting
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Sanity.io account
- Vercel account (for deployment)
- Google account (for reCAPTCHA)

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd wdp365-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values (see Environment Variables section below).

4. Run development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## reCAPTCHA v3 Setup

### Step 1: Get reCAPTCHA Keys

1. Go to **https://www.google.com/recaptcha/admin**
2. Log in with your Google account
3. Click **"+" (Create)** to register a new site
4. Fill in the form:
   - **Label:** `Web Design Pros 365`
   - **reCAPTCHA Type:** Select `reCAPTCHA v3`
   - **Domains:**
     - `webdesignpros365.com`
     - `www.webdesignpros365.com`
     - `localhost` (for development)
5. Accept Terms of Service and click **Create**
6. Copy your **Site Key** (public) and **Secret Key** (private)

### Step 2: Configure Environment Variables

Add to `.env.local`:
```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LcX...your_site_key
RECAPTCHA_SECRET_KEY=6LcX...your_secret_key
```

**Important:**
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is safe for client-side (visible in browser)
- `RECAPTCHA_SECRET_KEY` must stay server-side only (never expose to browser)

### Step 3: Deploy to Vercel

Add both keys to Vercel Dashboard → Project Settings → Environment Variables:
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`

Apply to all environments (Production, Preview, Development).

### reCAPTCHA Score Threshold

The default threshold is `0.5` (scores range from 0.0 = bot to 1.0 = human).

To adjust, edit `app/api/contact/route.ts`:
```typescript
const RECAPTCHA_THRESHOLD = 0.5; // Increase to be stricter, decrease to be more lenient
```

### Monitoring

Monitor your reCAPTCHA performance at https://www.google.com/recaptcha/admin to see:
- Score distribution
- Challenge pass/fail rates
- Suspicious activity patterns

### Sanity Studio Setup

1. Create a new Sanity project:
```bash
npx sanity init
```

2. Copy the project ID to your `.env.local`

3. Deploy Sanity schemas:
```bash
cd sanity
npx sanity deploy
```

4. Access your Sanity Studio at your deployed URL or run locally:
```bash
npx sanity dev
```

## Project Structure

```
/app                 # Next.js App Router pages
  /api              # API routes
  /services         # Services page
  /portfolio        # Portfolio/Case studies
  /blog             # Blog listing and posts
  /about            # About page
  /contact          # Contact page
  /pricing          # Pricing page
  /faq              # FAQ page
/components         # React components
  /ui               # Base UI components
  /sections         # Page sections
  /layout           # Layout components
/lib                # Utility functions
  /sanity           # Sanity client and queries
  /utils            # Helper functions
/public             # Static assets
/sanity             # Sanity CMS configuration
  /schemas          # Content schemas
/styles             # Global styles
```

## Features

- ✅ 11 Services with filtering
- ✅ 4 Pricing tiers with comparison
- ✅ Blog with CMS
- ✅ Case studies/Portfolio
- ✅ Contact form with spam protection
- ✅ FAQ accordion
- ✅ Framer Motion animations
- ✅ Glassmorphism effects
- ✅ SEO/GEO optimized
- ✅ Responsive design
- ✅ Dark theme

## Deployment to Vercel

1. Push to GitHub/GitLab

2. Import to Vercel:
   - Connect repository
   - Add environment variables
   - Deploy

3. Set up webhooks for Sanity:
   - Go to Sanity Dashboard > API > Webhooks
   - Add webhook URL: `https://your-domain.vercel.app/api/revalidate`
   - Select document types to trigger revalidation

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Dataset name (production) |
| `SANITY_API_TOKEN` | Yes | API token for server operations |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Recommended | reCAPTCHA v3 site key (public) |
| `RECAPTCHA_SECRET_KEY` | Recommended | reCAPTCHA v3 secret key (server-only) |
| `RESEND_API_KEY` | No | Resend API key for emails |
| `CONTACT_ADMIN_EMAIL` | No | Email to receive form submissions |

### Obtaining Keys

- **Sanity:** https://www.sanity.io/manage → Create project → Get project ID
- **reCAPTCHA v3:** https://www.google.com/recaptcha/admin → Register new site
- **Resend:** https://resend.com/api-keys

## Performance Targets

- Lighthouse Score: 90+
- LCP: < 2.5s
- CLS: < 0.1
- FID: < 100ms
- Global TTFB: < 100ms (on Vercel Edge)

## License

Private - Web Design Pros 365
