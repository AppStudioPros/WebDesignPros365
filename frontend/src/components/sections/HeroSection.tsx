"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const techBadges = [
  { name: 'Next.js 15', icon: '⚡' },
  { name: 'Vercel Edge', icon: '🚀' },
  { name: 'Sanity CMS', icon: '📝' },
  { name: 'GEO Ready', icon: '🎯' },
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
    <section className="relative flex flex-col justify-start pt-32 pb-32 overflow-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: -1 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://customer-assets.emergentagent.com/job_design-scanner-3/artifacts/uacga4lg_wdpbgvideo.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/70" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#8734E1]/5 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#2F73EE]/5 rounded-full blur-3xl animate-blob animation-delay-2000" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0e6fb] border border-[#8734E1] text-[#8734E1] mb-8"
          >
            <span className="text-lg">🚀</span>
            <span className="text-sm font-medium">Introducing GEO - Generative Engine Optimization</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-xl text-balance mb-6"
          >
            Crafting{' '}
            <span className="gradient-text">Next-Gen</span>
            <br />
            Web Experiences
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            We build high-performance websites and applications using cutting-edge technology.
            From AI integration to GEO optimization, we transform your digital presence.
          </motion.p>

          {/* Tech Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {techBadges.map((badge) => (
              <div
                key={badge.name}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm shadow-sm"
              >
                <span>{badge.icon}</span>
                {badge.name}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-[#8734E1] to-[#BF5DE0] hover:opacity-90 text-white">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg">
                View Our Work
              </Button>
            </Link>
          </motion.div>

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
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
