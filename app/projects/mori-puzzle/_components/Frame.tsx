import type { ReactNode } from "react";
import { ImageSlot } from "../../_components/ImageSlot";

const DIR = "projects/mori-puzzle";

/**
 * Frame ratios used across the page so images line up:
 * pair — two columns side by side; portrait — persona pairs; wide — single-column tabbed images.
 */
export const FRAME = {
  pair: "aspect-[4/3]",
  portrait: "aspect-[5/6]",
  wide: "aspect-[16/10]",
} as const;

/** Screenshot shown whole inside a fixed-ratio white frame, so neighbors share one height. */
export function Frame({
  name,
  alt,
  aspect = FRAME.pair,
  dir = DIR,
  sizes = "(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw",
  className = "",
}: {
  name: string;
  alt: string;
  aspect?: string;
  dir?: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-neutral-200 bg-white p-4 sm:p-6 dark:border-zinc-800 ${className}`}>
      <ImageSlot dir={dir} name={name} alt={alt} aspect={aspect} fit="contain" sizes={sizes} className="!bg-transparent" />
    </div>
  );
}

/** Frame with a caption underneath. */
export function Captioned({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure>
      {children}
      <figcaption className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{caption}</figcaption>
    </figure>
  );
}

/** One- or two-column image row with the page's standard spacing. */
export function Gallery({ cols = 1, children }: { cols?: 1 | 2; children: ReactNode }) {
  return <div className={`grid gap-8 py-8 ${cols === 2 ? "md:grid-cols-2" : ""}`}>{children}</div>;
}
