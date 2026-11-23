"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RotateCcw } from "lucide-react";
import styles from "./generated-program.module.css";

export default function ResetDemoButton({ onReset }: { onReset: () => void }) {
  const [open, setOpen] = useState(false);
  return <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger asChild><button type="button" className={styles.resetButton}><RotateCcw size={18} /> Reset demo</button></Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay} />
      <Dialog.Content className={styles.dialog}>
        <Dialog.Title className={styles.dialogTitle}>Start fresh?</Dialog.Title>
        <Dialog.Description className={styles.dialogDescription}>This clears the AI workspace, conversation, guided sample changes, and saved demo data in this browser. Any generation in progress is cancelled. Company systems are not connected.</Dialog.Description>
        <div className={styles.formActions}>
          <Dialog.Close className={styles.cancelButton}>Keep exploring</Dialog.Close>
          <button type="button" className={styles.resetConfirm} onClick={() => { onReset(); setOpen(false); }}>Reset all demo data</button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
