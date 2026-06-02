"use client";

import React from 'react';
import type { LucideIcon } from 'lucide-react';

type GlassIconProps = {
  Icon: LucideIcon;
  /** Brand accent hex (with leading #) */
  color: string;
  /** Tailwind size class, default 'w-16 h-16' */
  size?: string;
  /** Inner icon size class, default 'w-8 h-8' */
  iconSize?: string;
  className?: string;
};

/**
 * Glass-crystal icon medallion. Frosted-glass meets iOS-app-icon meets brand-accent.
 *
 * Layers from back to front:
 *   1. Solid glass-gradient background (40% -> 12% -> 4% accent over white)
 *   2. Inner radial highlight at top-left (white glass shine)
 *   3. Inner radial color glow at bottom-right (depth + saturation)
 *   4. Subtle inset stroke on top edge (glass rim highlight)
 *   5. Crisp icon with stroke-width 2 in the brand accent
 *
 * Sized at 64px default with a 32px icon so it reads as a real button/medallion,
 * not a tiny tinted square.
 */
export function GlassIcon({
  Icon,
  color,
  size = 'w-16 h-16',
  iconSize = 'w-8 h-8',
  className = '',
}: GlassIconProps) {
  return (
    <div
      className={`relative ${size} rounded-2xl flex items-center justify-center overflow-hidden ${className}`}
      style={{
        // Strong gradient that actually reads as colored glass, not a flat tint
        background: `
          radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.9) 0%, transparent 50%),
          radial-gradient(circle at 75% 80%, ${color}40 0%, transparent 60%),
          linear-gradient(135deg, ${color}30 0%, ${color}15 50%, ${color}25 100%)
        `,
        border: `1px solid ${color}40`,
        boxShadow: `
          0 10px 30px -8px ${color}40,
          0 4px 12px -4px ${color}25,
          inset 0 1px 0 rgba(255, 255, 255, 0.85),
          inset 0 -1px 2px ${color}20
        `,
      }}
    >
      {/* Top glass-rim highlight (extra crisp top edge) */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 30%)',
        }}
      />
      <Icon
        className={`${iconSize} relative z-10 drop-shadow-sm`}
        strokeWidth={2}
        style={{ color }}
      />
    </div>
  );
}
