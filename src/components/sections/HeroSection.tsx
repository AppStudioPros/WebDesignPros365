"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Zap, Atom, Rocket, Target, Sparkles, CalendarCheck, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [domain,  setDomain]  = useState('');
  const [loading, setLoading] = useState(false);

  function isValidDomain(input: string): boolean {
    const cleaned = input.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
    return /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/.test(cleaned);
  }

  function handleHeroScan(e: React.FormEvent) {
    e.preventDefault();
    if (!domain.trim() || !isValidDomain(domain)) return;
    // Scroll to scanner section and pre-fill domain
    const scanner = document.getElementById('site-scanner');
    if (scanner) {
      scanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Dispatch a custom event to pre-fill the scanner
      window.dispatchEvent(new CustomEvent('hero-scan', { detail: { domain: domain.trim() } }));
    }
  }

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0e6fb] border border-[#8734E1] text-[#8734E1] mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Introducing the AI Visibility Stack: SEO + AEO + GEO</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>

          {/* Free Consultation CTA — shimmering pill, BLACK TEXT for readability */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex justify-center mb-8"
          >
            <Link
              href="/contact?topic=free-consultation"
              className="shimmer-cta group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border-2 border-[#8734E1] text-gray-900 text-sm font-semibold shadow-lg shadow-[#8734E1]/15 hover:shadow-xl hover:shadow-[#8734E1]/25 hover:bg-[#f0e6fb] transition-all"
            >
              <CalendarCheck className="w-4 h-4 text-[#8734E1]" />
              <span>Free 30-minute consultation</span>
              <ArrowRight className="w-4 h-4 text-[#8734E1] group-hover:translate-x-0.5 transition-transform" />
            </Link>
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
            We build high-performance websites and applications on a modern AI-native stack.
            From patented ACI AI integration to the full AI Visibility Stack (SEO, AEO, and GEO),
            we make sure you rank, you're the answer, and you get cited by AI.
          </motion.p>

          {/* Tech Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {techBadges.map((badge) => {
              const Icon = badge.Icon;
              return (
                <div
                  key={badge.name}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm shadow-sm"
                >
                  <Icon className="w-4 h-4" style={{ color: badge.color }} />
                  {badge.name}
                </div>
              );
            })}
          </motion.div>

          {/* Embedded scan form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <form onSubmit={handleHeroScan} className="flex flex-col sm:flex-row items-stretch gap-2 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={domain}
                  onChange={e => setDomain(e.target.value)}
                  placeholder="Enter your website URL..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm shadow-md shadow-gray-200/50 outline-none focus:border-[#8734E1] focus:ring-2 focus:ring-[#8734E1]/10 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={!domain.trim() || loading}
                className="shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8734E1] to-[#2F73EE] text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-[#8734E1]/25 whitespace-nowrap"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Search className="w-4 h-4" /> Scan My Website Free</>}
              </button>
            </form>
            <p className="text-center text-[11px] text-gray-400 mt-2">No credit card required. Results in 30 seconds.</p>
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

          {/* BBB accreditation badge — bigger, medallion-style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex justify-center mt-12"
          >
            <a
              href="https://www.bbb.org/us/co/denver/profile/web-design/web-design-pros-365-1296-1000176091"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BBB Accredited Business — A+ Rating — View profile"
              className="group inline-flex items-center gap-4 px-7 py-5 rounded-2xl bg-white border border-gray-200 hover:border-[#0c5ba2] hover:shadow-xl shadow-md transition-all"
              title="BBB Accredited · A+ Rating since 12/11/2024"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/bbb-accredited.png"
                alt="BBB Accredited Business A+ Rating"
                className="h-16 md:h-20 w-auto"
                width={170}
                height={70}
              />
              <div className="text-left">
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-0.5">Trust Verified</div>
                <div className="text-base md:text-lg font-bold text-gray-900 group-hover:text-[#0c5ba2] transition-colors">View BBB Profile</div>
                <div className="text-xs text-gray-500 mt-1">Accredited since 12/11/2024</div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
