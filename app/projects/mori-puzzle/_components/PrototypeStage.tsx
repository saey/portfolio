"use client";

import { useState, type ReactNode } from "react";
import { Toggle } from "../../_components/Toggle";
import { STAGE, SURFACE } from "../../_components/stage";

const TABS = [
  { id: "recording", label: "Animated GIF" },
  { id: "figma", label: "Figma Prototype" },
  { id: "demo", label: "Interactive UI" },
] as const;

type Tab = (typeof TABS)[number]["id"];

/** One prototype, three formats: screen recordings, Figma embed and a coded demo (upcoming). */
export function PrototypeStage({ figmaUrl, recording }: { figmaUrl?: string; recording: ReactNode }) {
  const [tab, setTab] = useState<Tab>("recording");

  return (
    <div className={STAGE}>
      <Toggle label="Prototype format" options={TABS} value={tab} onChange={setTab} size="md" level={1} />
      <div className="mt-8">
        {tab === "recording" && recording}
        {tab === "figma" && <FigmaEmbed url={figmaUrl} />}
        {tab === "demo" && <Upcoming />}
      </div>
    </div>
  );
}

function Upcoming() {
  return (
    <div className="flex aspect-video w-full items-center justify-center">
      <p className="text-sm text-zinc-400 dark:text-zinc-500">Upcoming…</p>
    </div>
  );
}

/* ---------- Figma ---------- */

/** Accepts an embed.figma.com URL as-is, or wraps a regular share link. */
function figmaEmbedSrc(url: string) {
  return url.startsWith("https://embed.figma.com/")
    ? url
    : `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
}

function FigmaEmbed({ url }: { url?: string }) {
  if (url) {
    return (
      <div className={`mx-auto aspect-video max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 shadow-sm dark:border-zinc-800 ${SURFACE}`}>
        <iframe
          title="Mori Puzzle Figma prototype"
          src={figmaEmbedSrc(url)}
          className="h-full w-full border-0"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label="Figma prototype embed placeholder"
      className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-700"
    >
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Figma prototype</span>
      <span className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        Embed placeholder. Set <code className="font-mono text-[0.85em] text-indigo-800 dark:text-indigo-300">FIGMA_PROTOTYPE_URL</code> in page.tsx to load the live prototype.
      </span>
    </div>
  );
}
