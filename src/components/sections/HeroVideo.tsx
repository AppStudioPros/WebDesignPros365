"use client";

export default function HeroVideo() {
  return (
    // min-height prevents CLS when lazy component hydrates
    <div className="mt-20" style={{ minHeight: '520px' }}>
      <p className="text-xs uppercase tracking-widest text-[#8734E1] font-semibold mb-3">
        Watch
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        No Guesswork. Daily AI Search Domination.
      </h2>
      <div className="relative mx-auto max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-black">
        <video
          controls
          playsInline
          preload="none"
          poster="/videos/ai-search-revolution-poster.jpg"
          className="w-full block"
          style={{ aspectRatio: '16/9' }}
        >
          <source src="/videos/no-guesswork-ai-domination.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
