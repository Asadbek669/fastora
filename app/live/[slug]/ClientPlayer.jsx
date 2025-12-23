"use client";

import dynamic from "next/dynamic";

const LiveExternalPlayer = dynamic(
  () => import("@/components/LiveExternalPlayer"),
  { ssr: false }
);

export default function ClientPlayer({ src }) {
  return <LiveExternalPlayer src={src} />;
}
