"use client";

export default function HeroVideo() {
  return (
    // min-height prevents CLS when lazy component hydrates
    <div className="mt-10" style={{ minHeight: '520px' }}>
      <p className="text-xs uppercase tracking-widest text-[#8734E1] font-semibold mb-3">
        Watch
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
        No Guesswork. Daily AI Search Domination.
      </h2>
      <div className="relative mx-auto max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-[#3a3858] bg-black" style={{ aspectRatio: '16/9' }}>
        <iframe
          src="https://www.youtube-nocookie.com/embed/y94x9stnE1w?rel=0&modestbranding=1"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          title="WebDesignPros365 — AI Search Domination"
        />
      </div>
    </div>
  );
}
