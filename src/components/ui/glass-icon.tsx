"use client";

import React from 'react';
import type { LucideIcon } from 'lucide-react';

type GlassIconProps = {
  Icon: LucideIcon;
  /** Brand accent hex (with leading #) */
  color: string;
  /** Tailwind size class, default 'w-14 h-14' */
  size?: string;
  /** Inner icon size class, default 'w-7 h-7' */
  iconSize?: string;
  className?: string;
};

/**
 * Solid colored icon medallion with white icon on top.
 * Industry standard pattern: Stripe, Linear, Vercel, HubSpot all use this.
 *
 * Visual recipe:
 *   - Solid saturated gradient background in the brand accent (no transparency)
 *   - WHITE icon punched on top with stroke-width 2.25
 *   - Subtle accent-tinted drop shadow underneath for lift
 *   - Inner glass highlight ring on the top edge for premium feel
 *   - Slight inner bottom shadow for depth
 *
 * This explicitly does NOT look like a flat colored emoji square.
 * It looks like an iOS app icon or a Stripe Dashboard module card icon.
 */
export function GlassIcon({
  Icon,
  color,
  size = 'w-14 h-14',
  iconSize = 'w-7 h-7',
  className = '',
}: GlassIconProps) {
  return (
    <div
      className={`relative ${size} rounded-2xl flex items-center justify-center ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 50%, ${color}cc 100%)`,
        boxShadow: `
          0 10px 25px -5px ${color}55,
          0 4px 10px -3px ${color}40,
          inset 0 1px 0 rgba(255, 255, 255, 0.35),
          inset 0 -2px 4px rgba(0, 0, 0, 0.08)
        `,
      }}
    >
      {/* Top specular highlight (the glass shine) */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)',
        }}
      />
      <Icon
        className={`${iconSize} relative z-10`}
        strokeWidth={2.25}
        style={{ color: '#ffffff' }}
      />
    </div>
  );
}
