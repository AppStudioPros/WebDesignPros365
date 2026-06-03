"use client";

/**
 * AiNodeOrb — 3 light nodes physically bouncing inside a circular container.
 *
 * Each node has its own velocity vector and bounces off the inner wall of the
 * 32x32 viewBox using simple radial-reflection physics. Two lines connect the
 * nodes (1->2 and 2->3) and update every frame so the network shape morphs
 * as the nodes move. The nodes also pulse in size on their own beat.
 *
 * Render is pure React state via requestAnimationFrame; cleans up on unmount.
 * Respects prefers-reduced-motion: nodes freeze in their initial positions.
 */

import { useEffect, useRef, useState } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseR: number;
  pulsePhase: number;
};

const CENTER = 16;
// Nodes can travel all the way to the inside edge of the 32x32 circle (radius 16).
// We let them ride right against the wall — the node radius itself provides visual padding.
const INNER_RADIUS = 16;

function initialNodes(): Node[] {
  // Seed with deterministic positions near the inner walls so the orb reads as
  // "already in motion across the full diameter" rather than clustered in the middle.
  // SSR + client first paint agree because these are constants.
  return [
    { x: 4,  y: 14, vx: 6.2, vy: -5.1, baseR: 2.6, pulsePhase: 0 },
    { x: 26, y: 6,  vx: -5.5, vy: 5.8, baseR: 2.8, pulsePhase: 0.5 },
    { x: 22, y: 26, vx: -6.0, vy: -4.9, baseR: 2.2, pulsePhase: 1.0 },
  ];
}

export function AiNodeOrb({ className }: { className?: string }) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Reduced motion: freeze
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const step = (ts: number) => {
      const last = lastTsRef.current ?? ts;
      const dt = Math.min(0.05, (ts - last) / 1000); // clamp for tab-switch jumps
      lastTsRef.current = ts;

      setNodes((prev) =>
        prev.map((n) => {
          let { x, y, vx, vy } = n;
          x += vx * dt;
          y += vy * dt;

          // Reflect off the inner wall of the circular container.
          // Distance from center, project back if the node has crossed the wall.
          // Max travel = (orb radius - node radius) so the node visually kisses the wall on impact.
          const dx = x - CENTER;
          const dy = y - CENTER;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = INNER_RADIUS - n.baseR;
          if (dist > maxDist) {
            // Compute the wall normal (radial direction)
            const nx = dx / dist;
            const ny = dy / dist;
            // Reflect velocity across the normal
            const dot = vx * nx + vy * ny;
            vx = vx - 2 * dot * nx;
            vy = vy - 2 * dot * ny;
            // Re-seat the node just inside the wall so it doesn't get stuck
            x = CENTER + nx * maxDist;
            y = CENTER + ny * maxDist;
          }

          return {
            ...n,
            x,
            y,
            vx,
            vy,
            pulsePhase: (n.pulsePhase + dt / 1.6) % 1, // 1.6s pulse cycle
          };
        }),
      );

      rafRef.current = window.requestAnimationFrame(step);
    };

    rafRef.current = window.requestAnimationFrame(step);
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, []);

  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* No inner-ring guide — nodes ride the actual orb perimeter so the ring would be redundant */}

      {/* Connection lines tracking nodes */}
      <line
        x1={nodes[0].x}
        y1={nodes[0].y}
        x2={nodes[1].x}
        y2={nodes[1].y}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1={nodes[1].x}
        y1={nodes[1].y}
        x2={nodes[2].x}
        y2={nodes[2].y}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Nodes with size pulse driven by pulsePhase (sine wave) */}
      {nodes.map((n, i) => {
        const sine = Math.sin(n.pulsePhase * Math.PI * 2);
        const r = n.baseR + sine * 0.7;
        const opacity = 0.78 + sine * 0.22;
        return (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={Math.max(1.2, r)}
            fill="#ffffff"
            opacity={opacity}
          />
        );
      })}
    </svg>
  );
}
