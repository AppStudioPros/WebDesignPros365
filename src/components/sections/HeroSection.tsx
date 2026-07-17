"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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
  const [rankingOpen, setRankingOpen] = useState(false);
  return (
    <section className="relative flex flex-col justify-start pt-48 pb-48 min-h-screen" style={{ contain: 'layout' }}>
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
          <h1
            className="heading-xl text-balance mb-6 text-white"
          >
            63-70% of people are using AI to find and vet businesses now.{' '}
            <span className="gradient-text">Are you being Ignored?</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12"
          >
            Today, users have conversations with AI to find services and look for ratings. We analyze which competitors consistently appear in AI responses, and why.
          </p>

          {/* Tech Badges */}
          <div
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            {techBadges.map((badge) => {
              const Icon = badge.Icon;
              return (
                <div
                  key={badge.name}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#252640]/10 border border-white/20 text-white/90 text-sm backdrop-blur-sm"
                >
                  <Icon className="w-4 h-4" style={{ color: badge.color }} />
                  {badge.name}
                </div>
              );
            })}
          </div>

          {/* AI Ranking Proof Button */}
          <div className="flex justify-center mb-10 -mt-6">
            <button
              onClick={() => setRankingOpen(true)}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl font-bold text-sm md:text-base transition-all duration-200 shadow-lg shadow-[#8734E1]/30 hover:shadow-[#8734E1]/50 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #8734E1, #2F73EE)', color: '#fff' }}
            >
              <span className="text-lg">🤖</span>
              How does Web Design Pros 365 rank on AI?
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">→</span>
            </button>
          </div>

          {/* AI Ranking Modal */}
          {rankingOpen && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              onClick={() => setRankingOpen(false)}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
              <div
                className="relative z-10 max-w-2xl w-full bg-[#1a1930] rounded-2xl border border-[#8734E1]/40 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 border-b border-[#3a3858]">
                  <div>
                    <p className="text-[#f0eef8] font-bold text-sm">ChatGPT Search Results</p>
                    <p className="text-[#8a87a8] text-xs mt-0.5">"Who is the best web design company for AI-optimized websites?"</p>
                  </div>
                  <button
                    onClick={() => setRankingOpen(false)}
                    className="w-8 h-8 rounded-lg bg-[#252640] border border-[#3a3858] text-[#8a87a8] hover:text-[#f0eef8] flex items-center justify-center text-lg leading-none transition-colors"
                  >
                    ×
                  </button>
                </div>
                <div className="p-2">
                  <img
                    src="/images/chatgpt-ranking.png"
                    alt="WDP365 ranked #1 on ChatGPT for AI-optimized web design"
                    className="w-full rounded-xl"
                  />
                </div>
                <div className="px-4 pb-4 text-center">
                  <p className="text-[#8a87a8] text-xs">This is what AI Visibility Stack does for your business.</p>
                </div>
              </div>
            </div>
          )}

          {/* Second hero line */}
          <p
            className="text-xl md:text-2xl font-bold text-white max-w-3xl mx-auto mb-20 leading-snug"
          >
            The Ultimate AI Visibility Tech Stack. Custom Next.js websites optimized for{' '}
            <span className="gradient-text">Technical SEO, AEO and GEO</span>{' '}
            will get you results in weeks, not months.
          </p>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center"
              >
                <div className="min-w-[120px] mx-auto">
                  <CountUpStat stat={stat} inView={true} />
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Section — lazy loaded for LCP */}
          <HeroVideo />
        </div>
      </div>
    </section>
  );
}
