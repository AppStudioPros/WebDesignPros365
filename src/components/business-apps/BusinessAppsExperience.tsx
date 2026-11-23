"use client";

import { useState } from "react";
import { LayoutTemplate, Sparkles } from "lucide-react";
import BusinessAppsDemo from "./BusinessAppsDemo";
import GeneratedProgramDemo from "./GeneratedProgramDemo";
import ResetDemoButton from "./ResetDemoButton";
import { PROGRAM_STORAGE_KEY } from "./program-model";
import { STORAGE_KEY } from "./demo-model";
import styles from "./generated-program.module.css";

export default function BusinessAppsExperience() {
  const [mode, setMode] = useState<"ai" | "guided">("ai");
  const [generation, setGeneration] = useState(0);
  const [notice, setNotice] = useState("");
  const [guideOpen, setGuideOpen] = useState(false);

  function resetAll() {
    let cleared = true;
    for (const key of [PROGRAM_STORAGE_KEY, STORAGE_KEY]) {
      try { localStorage.removeItem(key); } catch { cleared = false; }
    }
    setGeneration(previous => previous + 1);
    setMode("ai");
    setGuideOpen(false);
    setNotice(cleared ? "Demo reset. Choose an app or describe a new workflow." : "This session was reset. Browser storage could not be cleared; an older save may return after reloading.");
  }

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
        <ResetDemoButton onReset={resetAll} />
      </div>
      {notice && <p className={styles.resetNotice} role="status">{notice}</p>}
      <div key={generation}>
        <div hidden={mode !== "ai"}>
          <GeneratedProgramDemo restoreSaved={generation === 0} onShowGuided={() => setMode("guided")} guideOpen={guideOpen} onGuideOpenChange={setGuideOpen} />
        </div>
        <div hidden={mode !== "guided"}>
          <BusinessAppsDemo restoreSaved={generation === 0} onShowCapabilities={() => { setMode("ai"); setGuideOpen(true); }} />
        </div>
      </div>
    </>
  );
}
