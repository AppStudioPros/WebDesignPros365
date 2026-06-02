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
 * Glass-morphism icon medallion. Renders a frosted-crystal style container
 * with a stroked icon centered inside. Used across Services, Platform Engineering,
 * Partnerships, and Vertical pages for visual consistency.
 *
 * Key effects:
 *  - Two-layer gradient background (35% -> 8% accent over white)
 *  - 12px backdrop-blur for the frosted look
 *  - Subtle white inset highlight at top-left for the glass shine
 *  - Outer drop shadow tinted with accent color (10% opacity)
 *  - Bottom inner shadow for depth
 *  - Stroke-width 1.5 on the icon for refined, non-emoji feel
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
      className={`relative ${size} rounded-2xl flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `
          linear-gradient(135deg, ${color}35 0%, ${color}10 60%, ${color}05 100%),
          rgba(255, 255, 255, 0.6)
        `,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${color}30`,
        boxShadow: `
          0 8px 24px -6px ${color}20,
          0 2px 6px -2px ${color}15,
          inset 0 1px 0 rgba(255, 255, 255, 0.6),
          inset 0 -1px 0 ${color}10
        `,
      }}
    >
      {/* Top-left specular highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 25% 15%, rgba(255, 255, 255, 0.7) 0%, transparent 50%)`,
        }}
      />
      {/* Bottom-right subtle accent glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(circle at 80% 90%, ${color}25 0%, transparent 50%)`,
        }}
      />
      <Icon
        className={`${iconSize} relative z-10`}
        strokeWidth={1.5}
        style={{ color }}
      />
    </div>
  );
}
