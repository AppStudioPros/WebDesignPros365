"use client";

import { useState } from "react";
import { LayoutTemplate, Sparkles } from "lucide-react";
import BusinessAppsDemo from "./BusinessAppsDemo";
import GeneratedProgramDemo from "./GeneratedProgramDemo";
import styles from "./generated-program.module.css";

export default function BusinessAppsExperience() {
  const [mode, setMode] = useState<"ai" | "guided">("ai");

  return (
    <>
      <div className={styles.modeBar} aria-label="Choose a demo mode">
        <div className={styles.modeButtons}>
          <button type="button" aria-pressed={mode === "ai"} onClick={() => setMode("ai")}>
            <Sparkles size={16} /> Build with AI
          </button>
          <button type="button" aria-pressed={mode === "guided"} onClick={() => setMode("guided")}>
            <LayoutTemplate size={16} /> Guided samples
          </button>
        </div>
        <span>A conversation. A working preview.</span>
      </div>
      {mode === "ai" ? (
        <GeneratedProgramDemo onShowGuided={() => setMode("guided")} />
      ) : (
        <BusinessAppsDemo />
      )}
    </>
  );
}
