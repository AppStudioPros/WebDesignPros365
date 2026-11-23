"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const AciChat = dynamic(
  () => import("@/components/chat/AciChat").then((m) => ({ default: m.AciChat })),
  { ssr: false }
);

export function AciChatLazy() {
  const pathname = usePathname();
  // The product demo has its own conversation; keep the sales chat on other pages.
  if (pathname === "/business-applications") return null;
  return <AciChat />;
}
