"use client";

import React from 'react';
import { m } from 'framer-motion';

export default function VideoGeoSection() {
  return (
    <section className="section bg-[#181928]">
      <div className="container-custom">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-xs uppercase tracking-widest text-[#8734E1] font-semibold mb-3">
            Watch
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#f0eef8] mb-8">
            SEO Is Old News. Meet GEO.
          </h2>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3a3858] bg-black">
            <video
              controls
              playsInline
              preload="none"
              poster="/videos/seo-is-old-news-poster.webp"
              className="w-full block"
              style={{ aspectRatio: '16/9' }}
            >
              <source src="/videos/seo-is-old-news.mp4" type="video/mp4" />
            </video>
          </div>
        </m.div>
      </div>
    </section>
  );
}
