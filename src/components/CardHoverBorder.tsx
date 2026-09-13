'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface CardHoverBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  duration?: number;
}

export default function CardHoverBorder({
  children,
  className = '',
  color = '#8734E1',
  duration = 0.5,
}: CardHoverBorderProps) {
  const [hovered, setHovered] = useState(false);
  const ease = [0.25, 0.46, 0.45, 0.94] as const;

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        {/* Clockwise: top-left → top-right → bottom-right */}
        <motion.path
          d="M0,0 L100,0 L100,100"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="square"
          pathLength="1"
          strokeDasharray="1"
          initial={{ strokeDashoffset: 1 }}
          animate={{ strokeDashoffset: hovered ? 0 : 1 }}
          transition={{ duration, ease }}
        />
        {/* Counter-clockwise: top-left → bottom-left → bottom-right */}
        <motion.path
          d="M0,0 L0,100 L100,100"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="square"
          pathLength="1"
          strokeDasharray="1"
          initial={{ strokeDashoffset: 1 }}
          animate={{ strokeDashoffset: hovered ? 0 : 1 }}
          transition={{ duration, ease }}
        />
      </svg>
      {children}
    </div>
  );
}
