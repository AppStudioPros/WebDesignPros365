"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="section relative overflow-hidden bg-gradient-to-r from-[#8734E1] via-[#9a4de8] to-[#2F73EE]">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="heading-lg text-white mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Let&apos;s build something amazing together. Get in touch with our team
            and start your project today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-[#8734E1] hover:bg-white/90">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Our Work
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
