// Per-service icon mapping. Each service _id gets ONE distinct icon.
// Used by the home Services preview, the /services grid, and the inline service modal.
// Add a new entry when adding a service in src/data/services.ts.

import {
  Telescope,        // AI Visibility Stack — looking out across all surfaces
  MessageCircleQuestion, // AEO — answer engine
  Bot,              // Custom AI Applications — agents
  Database,         // AI SaaS Platforms — data platform
  Brain,            // ACI Platform — the patented architecture
  Replace,          // Platform Engineering (HighLevel Alternative) — replace the platform
  Rocket,           // Full Program Creation — launch
  Handshake,        // Partnerships
  Gauge,            // SEO & Performance — speedometer
  Code2,            // Next.js Full-Stack Development
  FileStack,        // Headless CMS
  BarChart3,        // Digital Marketing & Analytics
  Sparkles,         // fallback
  type LucideIcon,
} from 'lucide-react';

/** Map service _id (from src/data/services.ts) -> distinct Lucide icon */
const ICON_MAP: Record<string, LucideIcon> = {
  '1':  Telescope,               // AI Visibility Stack (SEO + AEO + GEO)
  '1b': MessageCircleQuestion,   // AEO: Answer Engine Optimization
  '2':  Bot,                     // Custom AI Applications
  '2b': Database,                // AI SaaS Platforms
  '2c': Brain,                   // ACI Platform
  '2d': Replace,                 // Platform Engineering (HighLevel Alternative)
  '2e': Rocket,                  // Full Program Creation
  '2f': Handshake,               // Partnerships
  '3':  Gauge,                   // SEO & Performance Optimization
  '4':  Code2,                   // Next.js Full-Stack Development
  '5':  FileStack,               // Headless CMS & Content Strategy
  '6':  BarChart3,               // Digital Marketing & Analytics
};

export function getServiceIcon(serviceId: string): LucideIcon {
  return ICON_MAP[serviceId] ?? Sparkles;
}
