'use client';

import { motion } from 'framer-motion';
import { Home, Landmark, Shield, MessageSquare } from 'lucide-react';

const verticals = [
  {
    name: 'Real Estate',
    icon: Home,
    stats: [
      { number: '82%', desc: 'of Americans use AI for housing market info' },
      { number: '52%', desc: 'of buyers use AI to search for homes' },
      { number: '1 in 3', desc: 'Gen Z buyers used AI for homebuying research' },
    ],
    prompt: 'Who are the top 3 real estate agents in [my zip code] based on recent sales and reviews?',
    sources: [
      { label: 'Realtor.com Survey, Oct 2025', url: 'https://www.prnewswire.com/news-releases/82-of-americans-use-ai-for-housing-market-information-realtorcom-survey-finds-302578828.html' },
      { label: 'Bank of America Institute, Jun 2026', url: 'https://fortune.com/2026/06/28/gen-z-ai-homebuying-research-realtors-closing-process-bank-of-america/' },
    ],
  },
  {
    name: 'Mortgage',
    icon: Landmark,
    stats: [
      { number: '76%', desc: 'of homebuyers trust AI to shop for lenders' },
      { number: '89%', desc: 'will share financial records with an AI lender tool' },
      { number: '30%', desc: 'actively use AI to shop interest rates' },
    ],
    prompt: 'Compare mortgage rates from lenders in my area with the lowest closing costs and best reviews',
    sources: [
      { label: 'Veterans United Home Loans Survey, Jun 2026', url: 'https://www.prnewswire.com/news-releases/homebuyers-now-trust-ai-at-every-step-of-their-biggest-financial-decision-veterans-united-survey-finds-302797393.html' },
      { label: 'National Mortgage News, Jun 2026', url: 'https://www.nationalmortgagenews.com/news/9-in-10-buyers-ok-sharing-financial-data-with-ai-survey-finds' },
    ],
  },
  {
    name: 'Insurance',
    icon: Shield,
    stats: [
      { number: '68%', desc: 'trust financial advice provided by AI systems' },
      { number: '89%', desc: 'willing to share personal data for tailored advice' },
      { number: '76%', desc: 'comfortable with AI vetting providers on their behalf' },
    ],
    prompt: 'Which homeowners insurance companies have the best claims ratio and rates in [zip code]?',
    sources: [
      { label: 'Veterans United Home Loans Survey, Jun 2026', url: 'https://www.prnewswire.com/news-releases/homebuyers-now-trust-ai-at-every-step-of-their-biggest-financial-decision-veterans-united-survey-finds-302797393.html' },
      { label: 'Insurity Consumer AI Survey, Apr 2026', url: 'https://www.businesswire.com/news/home/20260421860636/en/Consumer-Support-for-AI-in-PC-Insurance-Nearly-Doubles-in-2026-Insurity-Survey-Finds' },
    ],
  },
];

export default function IndustryDataCards() {
  return (
    <section className="bg-[#0d0d14] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[#8734E1] uppercase tracking-widest text-xs font-semibold">THE DATA</p>
          <p className="text-white/60 text-lg mt-3">How your clients are already using AI</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {verticals.map((vertical, index) => {
            const Icon = vertical.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  <Icon className="w-6 h-6 text-[#8734E1]" />
                  <h3 className="text-xl font-bold text-white">{vertical.name}</h3>
                </div>

                <div className="space-y-6">
                  {vertical.stats.map((stat, i) => (
                    <div key={i}>
                      <p className="text-3xl font-bold text-white">{stat.number}</p>
                      <p className="text-sm text-white/60 mt-1">{stat.desc}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-emerald-400/70 uppercase tracking-widest font-semibold mt-8 mb-2">
                  Top Nationwide Questions
                </p>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-300/40 mt-0.5 shrink-0" />
                    <p className="text-sm text-amber-200/70 italic leading-relaxed">
                      &ldquo;{vertical.prompt}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  {vertical.sources.map((source, i) => (
                    <a
                      key={i}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-rose-300/60 hover:text-rose-300/90 underline underline-offset-2 transition-colors"
                    >
                      {source.label} ↗
                    </a>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
