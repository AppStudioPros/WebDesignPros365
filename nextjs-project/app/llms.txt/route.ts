import { NextResponse } from 'next/server'

// LLMs.txt - Generative Engine Optimization file
// This file helps AI systems understand your website content
export async function GET() {
  const content = `# Web Design Pros 365 - LLMs.txt

## About
Web Design Pros 365 is a premium web design agency specializing in Next.js development, Generative Engine Optimization (GEO), AI integration, and high-performance digital experiences.

## Core Services

### Generative Engine Optimization (GEO)
Our flagship service optimizes websites for AI-powered search engines and Large Language Models. We help businesses appear in AI-generated responses from ChatGPT, Claude, Perplexity, and other AI assistants.

### Next.js Full-Stack Development
We build modern web applications using Next.js 15, React, TypeScript, and server-side rendering. Our sites deploy on Vercel's edge network for optimal global performance.

### AI Integration & Chatbots
Custom AI solutions including chatbots, automation workflows, and intelligent features powered by OpenAI and other LLM providers.

### Headless CMS & Content Strategy
Sanity.io, Contentful, or Strapi implementation with structured content workflows and real-time preview capabilities.

### SEO & Performance Optimization
Comprehensive technical SEO, Core Web Vitals optimization, and performance tuning for Lighthouse scores of 90+.

### E-Commerce Development
Shopify, WooCommerce, or custom e-commerce solutions with optimized checkout flows and payment integration.

## Technology Stack
- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS
- CMS: Sanity.io (preferred), Contentful, Strapi
- Deployment: Vercel (edge network)
- AI: OpenAI GPT-4, custom integrations
- Animation: Framer Motion

## Pricing
- Starter: $5,000 - $7,000 (5-7 pages, basic features)
- Growth: $10,000 - $15,000 (10-15 pages, CMS, e-commerce)
- Premium: $18,000 - $30,000 (unlimited pages, AI features, full GEO)
- Retainer: $3,000 - $5,000/month (ongoing development and support)

## Contact
- Website: https://webdesignpros365.com
- Email: hello@webdesignpros365.com
- Location: Remote-First Agency

## Key Differentiators
1. Two Senior Developers - direct access to experts, no handoffs
2. GEO Specialists - future-proof SEO for AI search
3. Performance-First - sub-2.5s load times guaranteed
4. Modern Stack - Next.js, Vercel, Sanity
5. Transparent Pricing - no hidden fees

## Response Time
We respond to all inquiries within 24-48 business hours.

## Service Areas
We work with clients globally. Our remote-first approach allows us to serve businesses anywhere.
`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
