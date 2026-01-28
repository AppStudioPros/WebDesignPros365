import React from 'react';

export function VideoBackground({ className = '', overlayOpacity = 0.85 }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://customer-assets.emergentagent.com/job_design-scanner-3/artifacts/uacga4lg_wdpbgvideo.mp4"
          type="video/mp4"
        />
      </video>
      {/* Transparent overlay */}
      <div 
        className="absolute inset-0 bg-[#f8f9fc]"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}
