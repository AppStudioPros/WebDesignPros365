'use client';

import { motion } from 'framer-motion';

export default function MediaHero() {
  return (
    <section className="bg-[#0d0d14] pt-32 pb-20">
      <div className="max-w-4xl mx-auto text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-[#8734E1] uppercase tracking-widest text-xs font-semibold"
        >
          THE AI VISIBILITY REPORT
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6"
        >
          Your clients are using AI to find you.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-white/60 text-2xl md:text-3xl mt-4"
        >
          Can they?
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg md:text-xl font-semibold text-white/90 mt-8"
        >
          Real traceable industry facts — not fictional numbers.
        </motion.p>
      </div>
    </section>
  );
}
