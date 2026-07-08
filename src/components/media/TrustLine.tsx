'use client';

import { motion } from 'framer-motion';

export default function TrustLine() {
  return (
    <section className="bg-[#0d0d14] py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#8734E1] uppercase tracking-widest text-xs font-semibold">THE INSIGHT</p>

          {/* Bar visualization */}
          <div className="max-w-3xl mx-auto mt-12">
            <div className="flex justify-between mb-4">
              <div className="text-left">
                <p className="text-sm font-semibold text-white">AI for Research</p>
                <p className="text-sm text-white/60">82% adoption</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">AI for Decisions</p>
                <p className="text-sm text-white/60">only 20%</p>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-white/5">
              <motion.div
                initial={{ width: '0%' }}
                whileInView={{ width: '82%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-2 rounded-full bg-gradient-to-r from-[#8734E1] to-[#8734E1]/10"
              />
            </div>
          </div>

          {/* Insight text */}
          <div className="max-w-2xl mx-auto mt-14">
            <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
              Your clients use AI to build their shortlist. Then they call a human.
            </p>
            <p className="text-lg text-white/60 mt-3">
              The only question is whether you made that shortlist.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <a
              href="https://www.prnewswire.com/news-releases/82-of-americans-use-ai-for-housing-market-information-realtorcom-survey-finds-302578828.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-amber-300/70 hover:text-amber-300 underline underline-offset-2 transition-colors"
            >
              Realtor.com, 2025
            </a>
            <span className="text-base text-white/30">·</span>
            <a
              href="https://www.prnewswire.com/news-releases/homebuyers-now-trust-ai-at-every-step-of-their-biggest-financial-decision-veterans-united-survey-finds-302797393.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-amber-300/70 hover:text-amber-300 underline underline-offset-2 transition-colors"
            >
              Veterans United, 2026
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
