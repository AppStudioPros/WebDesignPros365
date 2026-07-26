"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "6px",
        height: "100vh",
        zIndex: 100,
        background: "rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${progress}%`,
          background: "linear-gradient(180deg, #8734E1 0%, #2F73EE 100%)",
          borderRadius: "0 0 0 0",
          transition: "height 0.1s linear",
          boxShadow: "2px 0 12px rgba(135,52,225,0.6)",
        }}
      />
    </div>
  );
}
