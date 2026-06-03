/**
 * AiNodeOrb — a small SVG of 3 pulsing nodes connected by 2 lines.
 * Used as the chat-launcher icon (replaces a static MessageCircle).
 *
 * The visual is inspired by the chat bot on encoresvcsllc.com, but rendered
 * in darker WDP365 brand purple instead of cyan. Each node pulses on its own
 * beat (staggered 0 / 0.5s / 1s delays over a 1.6s cycle) so the orb reads as
 * "bouncing lights firing in sequence" rather than a static icon.
 *
 * All animation is pure CSS via SVG <animate>; no JS frame loop.
 */
export function AiNodeOrb({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Connection lines */}
      <line
        x1="8"
        y1="22"
        x2="18"
        y2="10"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="10"
        x2="24"
        y2="18"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Node 1 — bottom-left */}
      <circle cx="8" cy="22" r="2.6" fill="#ffffff">
        <animate
          attributeName="r"
          values="2.2;3.4;2.2"
          dur="1.6s"
          begin="0s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="1.6s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Node 2 — top, largest at peak */}
      <circle cx="18" cy="10" r="3" fill="#ffffff">
        <animate
          attributeName="r"
          values="2.6;3.8;2.6"
          dur="1.6s"
          begin="0.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="1.6s"
          begin="0.5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Node 3 — right */}
      <circle cx="24" cy="18" r="2.2" fill="#ffffff">
        <animate
          attributeName="r"
          values="1.8;3;1.8"
          dur="1.6s"
          begin="1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="1.6s"
          begin="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
