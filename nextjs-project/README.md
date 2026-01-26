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

Edit `.env.local` with your actual values:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Usually 'production'
- `SANITY_API_TOKEN` - API token from Sanity
- `RESEND_API_KEY` - (Optional) Resend API key for emails
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - (Optional) reCAPTCHA site key
- `RECAPTCHA_SECRET_KEY` - (Optional) reCAPTCHA secret key

4. Run development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

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
| `RESEND_API_KEY` | No | Resend API key for emails |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | No | reCAPTCHA v3 site key |
| `RECAPTCHA_SECRET_KEY` | No | reCAPTCHA v3 secret key |

## Performance Targets

- Lighthouse Score: 90+
- LCP: < 2.5s
- CLS: < 0.1
- FID: < 100ms
- Global TTFB: < 100ms (on Vercel Edge)

## License

Private - Web Design Pros 365
