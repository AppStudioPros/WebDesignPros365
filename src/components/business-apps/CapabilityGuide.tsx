"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { acquisitionApp, coreApps, morePreviewIdeas, productionFeatures, type StarterId } from "./demo-catalog";
import styles from "./generated-program.module.css";

export default function CapabilityGuide({ open, onOpenChange, onChoose, busy, onClose }: {
  open: boolean; onOpenChange: (open: boolean) => void; onChoose: (id: StarterId) => void; busy: boolean; onClose: () => void;
}) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.dialogOverlay} />
      <Dialog.Content className={`${styles.dialog} ${styles.catalogDialog}`} onCloseAutoFocus={event => { event.preventDefault(); onClose(); }}>
        <Dialog.Title className={styles.dialogTitle}>What can we build?</Dialog.Title>
        <Dialog.Description className={styles.dialogDescription}>Explore a sample now, then ask ACI to shape it around your workflow. Opening this guide keeps your current workspace intact.</Dialog.Description>
        <Dialog.Close className={styles.dialogClose} aria-label="Close capability guide"><X size={20} /></Dialog.Close>
        <h3 className={styles.catalogHeading}>Available now · five core apps</h3>
        <p className={styles.catalogIntro}>These prepared samples open instantly without an AI request. Use fictional information; each preview stays in this browser.</p>
        <div className={styles.catalogGrid}>{[...coreApps, acquisitionApp].map((app, index) => <article key={app.id} className={styles.catalogCard}>
          <span className={styles.catalogTag}>{index < 5 ? `CORE APP ${index + 1}` : "SPECIALTY SAMPLE"} · {app.view}</span>
          <h4>{app.title}</h4><p>{app.description}</p><p>{app.example}</p>
          <button type="button" disabled={busy} onClick={() => onChoose(app.id)}>Open {app.title.toLowerCase()} sample <ArrowUpRight size={15} /></button>
        </article>)}</div>
        <h3 className={styles.catalogHeading}>More ideas you can ask ACI to preview</h3>
        <p className={styles.catalogIntro}>Editable record trackers using tables, boards, forms, or a dated agenda. These are ideas to generate, not additional prebuilt apps. The demo supports 10 fields and 20 records; it does not run formulas or automations.</p>
        <dl className={styles.ideaList}>{morePreviewIdeas.map(group => <div key={group.title}><dt>{group.title}</dt><dd>{group.ideas}</dd></div>)}</dl>
        <h3 className={styles.catalogHeading}>Production build · scoped separately</h3>
        <p className={styles.catalogIntro}>These features are not active in the demo. Availability depends on the project scope, system access, and integration review.</p>
        <ul className={styles.productionList}>{productionFeatures.map(feature => <li key={feature}>{feature}</li>)}</ul>
        <p className={styles.catalogIntro}>A status named “approved” is a sample field, not an authorization. This preview does not access the private ACI engine.</p>
        <a className={styles.catalogContact} href="/contact?ref=aci-business-applications">Plan a production workspace <ArrowUpRight size={16} /></a>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
