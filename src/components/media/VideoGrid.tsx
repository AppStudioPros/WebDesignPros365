'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const allVideos = [
  {
    title: 'The Speed Problem Is Costing You Money',
    description: 'Most business owners are already paying for a website that costs them customers. Not because the design is bad. Because it takes four seconds to load.',
    src: '/videos/speed-problem.mp4',
    poster: '/videos/speed-problem-poster.jpg',
    label: 'THE PROBLEM',
  },
  {
    title: 'SEO Is Old News. Meet GEO.',
    description: 'Traditional SEO gets you ranked. In 2026, AI answers the question before users reach your site. Generative Engine Optimization is how you get cited.',
    src: '/videos/seo-is-old-news.mp4',
    poster: '/videos/seo-is-old-news-poster.jpg',
    label: 'THE SOLUTION',
  },
  {
    title: 'How We Do It And Why Daily Optimization Wins',
    description: 'One-time builds go stale. The sites that keep climbing are the ones being actively improved.',
    src: '/videos/daily-optimization.mp4',
    poster: '/videos/daily-optimization-poster.png',
    label: 'THE PROCESS',
  },
  {
    title: 'The AI Search Revolution in Real Estate',
    description: 'Your clients are already asking AI to find agents, compare lenders, and vet providers. This is what that shift looks like — and what it means for your business.',
    src: '/videos/ai-search-revolution.mp4',
    poster: '/videos/ai-search-revolution-poster.jpg',
    label: 'THE OPPORTUNITY',
  },
  {
    title: 'The Future of Real Estate Marketing',
    description: 'See how the top-performing agents and brokers are combining AI-powered websites, daily content optimization, and GEO to dominate their markets.',
    src: '/videos/real-estate-future.mp4',
    poster: '/videos/real-estate-future-poster.jpg',
    label: 'THE FUTURE',
  },
  {
    title: 'No Guesswork. Daily AI Search Domination.',
    description: 'Stop guessing what Google and AI want. Our daily optimization system removes the uncertainty and puts your business in front of the right people — every single day.',
    src: 'https://render.lucidtechlabsllc.com/uploads/1783550250517_wdp365-explainer6-v9.mp4',
    poster: '/videos/ai-search-revolution-poster.jpg',
    label: 'THE EDGE',
  },
];

function VideoCard({
  video,
  index,
  onPlay,
}: {
  video: typeof allVideos[0];
  index: number;
  onPlay: (index: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#8734E1]/50 transition-all"
    >
      <div className="relative bg-black cursor-pointer" style={{ aspectRatio: '16/9' }} onClick={() => onPlay(index)}>
        <img
          src={video.poster}
          alt={video.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center group">
          <div className="w-14 h-14 rounded-full bg-[#8734E1] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#7020c8] transition-all">
            <Play className="w-6 h-6 text-white ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-white/20 text-xs font-mono">0{index + 1}</span>
          <span className="text-[#8734E1] text-xs uppercase tracking-widest font-semibold">{video.label}</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{video.title}</h3>
        <p className="text-sm text-white/60 leading-relaxed">{video.description}</p>
      </div>
    </motion.div>
  );
}

function VideoModal({
  video,
  onClose,
}: {
  video: typeof allVideos[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <span className="text-sm">Close</span>
          <X className="w-6 h-6" />
        </button>

        {/* Video */}
        <div className="rounded-2xl overflow-hidden bg-black shadow-2xl">
          <video
            autoPlay
            controls
            playsInline
            className="w-full"
            style={{ aspectRatio: '16/9' }}
          >
            <source src={video.src} type="video/mp4" />
          </video>
        </div>

        {/* Title below */}
        <p className="text-center text-white/60 text-sm mt-4">{video.title}</p>
      </motion.div>
    </motion.div>
  );
}

export default function VideoGrid() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <>
      <section className="bg-[#0d0d14] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#8734E1] uppercase tracking-widest text-xs font-semibold">WATCH</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {allVideos.map((video, index) => (
              <VideoCard key={index} video={video} index={index} onPlay={setActiveVideo} />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeVideo !== null && (
          <VideoModal
            video={allVideos[activeVideo]}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
