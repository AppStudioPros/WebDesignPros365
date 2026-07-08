"use client";

import dynamic from "next/dynamic";

const AciChat = dynamic(
  () => import("@/components/chat/AciChat").then((m) => ({ default: m.AciChat })),
  { ssr: false }
);

export function AciChatLazy() {
  return <AciChat />;
}
