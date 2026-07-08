'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MediaCTA() {
  return (
    <section className="bg-[#12121c] py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-6 text-center"
      >
        <h2 className="text-3xl font-bold text-white">See where you stand.</h2>

        <div className="mt-8">
          <Link
            href="/contact"
            className="bg-[#8734E1] hover:bg-[#7020c8] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors inline-block"
          >
            Get Your Free AI Visibility Audit
          </Link>
        </div>

        <p className="text-sm text-white/40 mt-5 max-w-md mx-auto">
          No commitment. We&apos;ll show you exactly what AI engines currently say about your business.
        </p>

        <p className="mt-8 text-sm text-white/30">
          (720) 276-0797 · info@webdesignpros365.com
        </p>
      </motion.div>
    </section>
  );
}
