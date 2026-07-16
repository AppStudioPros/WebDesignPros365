"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Zap, Atom, Rocket, Target } from 'lucide-react';
import dynamic from 'next/dynamic';

const HeroVideo = dynamic(() => import('@/components/sections/HeroVideo'), { ssr: false });

const techBadges = [
  { name: 'Next.js 16', Icon: Zap, color: '#8734E1' },
  { name: 'React 19', Icon: Atom, color: '#2F73EE' },
  { name: 'Vercel Edge', Icon: Rocket, color: '#EC4899' },
  { name: 'AI Visibility Stack', Icon: Target, color: '#F59E0B' },
];

const stats = [
  { value: 2000, suffix: '+', label: 'Projects Delivered', duration: 3125 },
  { value: 98, suffix: '%', label: 'Client Satisfaction', duration: 2500 },
  { value: 2.5, prefix: '<', suffix: 's', label: 'Avg. LCP Score', duration: 1875, decimals: 1 },
  { value: 24, suffix: '/7', label: 'Support', duration: 1250 },
];

function CountUpStat({ stat, inView }: { stat: typeof stats[0]; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const duration = stat.duration || 2000;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = easeOut * stat.value;

        if (stat.decimals) {
          setCount(parseFloat(currentValue.toFixed(stat.decimals)));
        } else {
          setCount(Math.floor(currentValue));
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(stat.value);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, stat]);

  const displayValue = stat.decimals ? count.toFixed(stat.decimals) : count.toLocaleString();

  return (
    <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
      {stat.prefix || ''}{displayValue}{stat.suffix || ''}
    </div>
  );
}

export default function HeroSection() {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });
  return (
    <section className="relative flex flex-col justify-start pt-48 pb-48">
      {/* Animated Gradient Background — full opacity dark */}
      <div
        className="absolute inset-0 w-full h-full gradient-shift-bg"
        style={{ zIndex: 0 }}
      />

      {/* Subtle dark overlay for depth */}
      <div className="absolute inset-0 bg-black/30" style={{ zIndex: 1 }} />

      {/* Decorative glow blobs — GPU composited, no layout triggers */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8734E1]/20 rounded-full blur-3xl animate-blob" style={{ zIndex: 2, willChange: 'transform', contain: 'layout paint' }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#2F73EE]/20 rounded-full blur-3xl animate-blob animation-delay-2000" style={{ zIndex: 2, willChange: 'transform', contain: 'layout paint' }} />

      <div className="container-custom relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-xl text-balance mb-6 text-white"
          >
            63-70% of people are using AI to find and vet businesses now.{' '}
            <span className="gradient-text">Are you being Ignored?</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12"
          >
            Today, users have conversations with AI to find services and look for ratings. We analyze which competitors consistently appear in AI responses, and why.
          </motion.p>

          {/* Tech Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {techBadges.map((badge) => {
              const Icon = badge.Icon;
              return (
                <div
                  key={badge.name}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white/90 text-sm backdrop-blur-sm"
                >
                  <Icon className="w-4 h-4" style={{ color: badge.color }} />
                  {badge.name}
                </div>
              );
            })}
          </motion.div>

          {/* Second hero line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl font-bold text-white max-w-3xl mx-auto mb-20 leading-snug"
          >
            The Ultimate AI Visibility Tech Stack. Custom Next.js websites optimized for{' '}
            <span className="gradient-text">Technical SEO, AEO and GEO</span>{' '}
            will get you results in weeks, not months.
          </motion.p>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="min-w-[120px] mx-auto">
                  <CountUpStat stat={stat} inView={isInView} />
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Video Section — lazy loaded for LCP */}
          <HeroVideo />
        </div>
      </div>
    </section>
  );
}
