"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import { Toggle } from "../../_components/Toggle";
import { STAGE, SURFACE } from "../../_components/stage";

type View = "before" | "block" | "list" | "compare";
type BlockVariant = "feature" | "visual" | "compact";
type ListVariant = "horizontal" | "vertical" | "wide" | "center";

const VIEWS = [
  { id: "before", label: "Before" },
  { id: "compare", label: "Compare" },
  { id: "block", label: "Card Block" },
  { id: "list", label: "List Item" },
] as const;

const BLOCK_VARIANTS = [
  { id: "compact", label: "Compact" },
  { id: "feature", label: "Feature" },
  { id: "visual", label: "Visual" },
] as const;

const LIST_VARIANTS = [
  { id: "horizontal", label: "Horizontal" },
  { id: "vertical", label: "Vertical" },
  { id: "wide", label: "Wide" },
  { id: "center", label: "Center" },
] as const;

/** Demo links never navigate. */
const stay = (e: MouseEvent) => e.preventDefault();

export function CardSystemDemo() {
  const [view, setView] = useState<View>("compare");
  const [block, setBlock] = useState<BlockVariant>("compact");
  const [list, setList] = useState<ListVariant>("horizontal");
  const [show, setShow] = useState(true);

  return (
    <div className={STAGE}>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <Toggle label="Card view" options={VIEWS} value={view} onChange={setView} size="md" level={1} />
        <Switch label="Show link targets" checked={show} onChange={setShow} />
      </div>

      <div className="mt-10">
        {view === "before" && <BeforeCards show={show} />}

        {view !== "before" && (
          <div className={view === "compare" ? "grid gap-8 lg:grid-cols-2" : ""}>
            {(view === "block" || view === "compare") && (
              <Panel
                title="Card Block"
                subtitle="Entire card clickable · background color"
                controls={<Toggle label="Card Block variant" options={BLOCK_VARIANTS} value={block} onChange={setBlock} />}
              >
                <CardBlock variant={block} show={show} />
              </Panel>
            )}
            {(view === "list" || view === "compare") && (
              <Panel
                title="List Item"
                subtitle="Multiple CTAs · no background"
                controls={<Toggle label="List Item variant" options={LIST_VARIANTS} value={list} onChange={setList} />}
              >
                <ListItem variant={list} show={show} />
              </Panel>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  controls,
  children,
}: {
  title: string;
  subtitle: string;
  controls: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-4 flex flex-wrap items-baseline gap-x-2">
        <span className="font-medium">{title}</span>
        <span aria-hidden className="text-zinc-300 dark:text-zinc-600">
          |
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</span>
      </p>
      <div className="mb-4">{controls}</div>
      <div className={`flex min-h-[340px] items-center justify-center rounded-xl p-5 sm:p-8 ${SURFACE}`}>
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Pieces ---------- */

/** Checkerboard image placeholder, as in the Figma masters. */
function Img({ ratio, className = "w-full" }: { ratio: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={`shrink-0 self-start rounded-sm bg-[conic-gradient(#e4e4e7_25%,#fafafa_0_50%,#e4e4e7_0_75%,#fafafa_0)] bg-[length:14px_14px] ${ratio} ${className}`}
    />
  );
}

const Plus = () => (
  <svg aria-hidden viewBox="0 0 10 10" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth={1.4}>
    <path d="M5 1v8M1 5h8" />
  </svg>
);

const Arrow = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M2 8h11M9 4l4 4-4 4" />
  </svg>
);

const Video = () => (
  <svg aria-hidden viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.4}>
    <rect x="1.5" y="4" width="9" height="8" rx="1.5" />
    <path d="m10.5 7 4-2v6l-4-2" />
  </svg>
);

function Eyebrow({ dark }: { dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
        dark ? "text-white/80" : "text-zinc-600"
      }`}
    >
      <Plus />
      Eyebrow
      <Plus />
    </p>
  );
}

const TAG_TEXT = ["Jan 20, 2026", "5:45 Mins", "5:45 Mins", "5:45 Mins"];

/** `onGray` gives tags a white fill so they stay visible on a gray card. */
function Tags({ dark, onGray, count = 2, className = "" }: { dark?: boolean; onGray?: boolean; count?: number; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {TAG_TEXT.slice(0, count).map((t, i) => (
        <span
          key={i}
          className={`inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-[10px] ${
            dark ? "bg-[#1C3F8A] text-white" : onGray ? "bg-white text-zinc-700" : "bg-zinc-100 text-zinc-700"
          }`}
        >
          <Video />
          {t}
        </span>
      ))}
    </div>
  );
}

/** Purple outline that marks a link's hit area. */
const target = (show: boolean) =>
  show ? "outline-2 outline-dashed outline-offset-2 outline-indigo-600" : "";

/* ---------- Card Block ---------- */

/**
 * The whole card is one link. Hover changes the card's color —
 * no text underline, and the CTA is an arrow, not a text link.
 */
function CardBlock({ variant, show }: { variant: BlockVariant; show: boolean }) {
  const base = `group block rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 ${target(show)}`;

  if (variant === "feature") {
    return (
      <a href="#" onClick={stay} className={`${base} bg-[#0F2A5C] p-5 text-white hover:bg-[#1A3B78]`}>
        <div className="relative w-3/5">
          <Img ratio="aspect-square" />
          <div className="absolute inset-0 rounded-sm bg-gradient-to-t from-[#0F2A5C]/90 via-[#0F2A5C]/40 to-transparent" />
          <p className="absolute inset-x-4 bottom-3 text-base leading-snug">Title Lorem Ipsum Dolor Sit Amet</p>
        </div>
        <div className="mt-4 space-y-2">
          <Eyebrow dark />
          <Tags dark count={4} />
          <p className="font-semibold leading-snug">Title Lorem Ipsum Dolor Sit Amet Title Lorem Ipsum</p>
          <p className="text-[11px] text-white/70">Lorem Ipsum Dolor Sit Amet</p>
          <Arrow />
        </div>
      </a>
    );
  }

  if (variant === "visual") {
    return (
      <a href="#" onClick={stay} className={`${base} relative overflow-hidden p-5`}>
        <Img ratio="" className="absolute inset-0 h-full w-full rounded-md" />
        <div className="relative space-y-2 rounded-sm bg-[#2C4A75]/90 p-5 text-white transition-colors group-hover:bg-[#0F2A5C]">
          <Eyebrow dark />
          <Tags dark count={4} />
          <p className="text-lg font-semibold leading-snug">Title Lorem Ipsum Dolor Sit Amet</p>
          <p className="text-[11px] text-white/70">Lorem Ipsum Dolor Sit Amet</p>
          <Arrow />
        </div>
      </a>
    );
  }

  return (
    <a href="#" onClick={stay} className={`${base} flex gap-4 bg-zinc-100 p-4 text-zinc-900 hover:bg-zinc-200`}>
      <Img ratio="aspect-square" className="w-24" />
      <div className="min-w-0 space-y-1.5">
        <Eyebrow />
        <Tags onGray count={3} />
        <p className="text-lg font-semibold leading-snug">Title Lorem Ipsum Dolor Sit Amet</p>
        <p className="text-[11px] text-zinc-500">Lorem Ipsum Dolor Sit Amet</p>
        <Arrow />
      </div>
    </a>
  );
}

/* ---------- List Item ---------- */

function Links({ show }: { show: boolean }) {
  return (
    <div className="flex flex-wrap gap-4 pt-0.5">
      {["Learn More", "Learn More"].map((l, i) => (
        <a
          key={i}
          href="#"
          onClick={stay}
          className={`inline-flex items-center gap-1 rounded-sm text-xs font-medium text-[#1F5FBF] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 ${target(show)}`}
        >
          {l}
          <Arrow className="h-3 w-3" />
        </a>
      ))}
    </div>
  );
}

const LINK =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700";

/** Clickable eyebrow, in the link color. */
function LinkEyebrow({ show, className = "" }: { show: boolean; className?: string }) {
  return (
    <a
      href="#"
      onClick={stay}
      className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1F5FBF] hover:underline ${LINK} ${target(show)} ${className}`}
    >
      <Plus />
      Eyebrow
      <Plus />
    </a>
  );
}

/** Clickable image. */
function LinkImg({ show, ratio, className = "w-full" }: { show: boolean; ratio: string; className?: string }) {
  return (
    <a
      href="#"
      onClick={stay}
      aria-label="Title Lorem Ipsum Dolor Sit Amet"
      className={`block shrink-0 self-start ${LINK} ${target(show)} ${className}`}
    >
      <Img ratio={ratio} />
    </a>
  );
}

function Title({ size = "lg", children }: { size?: "sm" | "lg"; children: ReactNode }) {
  return (
    <p className={`font-medium leading-snug text-zinc-900 dark:text-zinc-100 ${size === "lg" ? "text-lg" : "text-sm"}`}>
      {children}
    </p>
  );
}

const Desc = () => <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Lorem Ipsum Dolor Sit Amet</p>;

/** No background; holds multiple links, so the item itself is not a link. */
function ListItem({ variant, show }: { variant: ListVariant; show: boolean }) {
  if (variant === "horizontal")
    return (
      <div className="flex gap-4">
        <LinkImg show={show} ratio="aspect-square" className="w-24" />
        <div className="min-w-0 space-y-1.5">
          <div><LinkEyebrow show={show} /></div>
          <Tags count={4} />
          <Title>Title Lorem Ipsum Dolor Sit Amet</Title>
          <Desc />
          <Links show={show} />
        </div>
      </div>
    );

  if (variant === "vertical")
    return (
      <div className="max-w-[260px] space-y-3">
        <div className="flex gap-3">
          <LinkImg show={show} ratio="aspect-square" className="w-20" />
          <div className="space-y-1.5">
            <div><LinkEyebrow show={show} /></div>
            <Tags count={3} />
          </div>
        </div>
        <Title>Title Lorem Ipsum Dolor Sit Amet Title Lorem Ipsum Dolor Sit Amet</Title>
        <Desc />
        <Links show={show} />
      </div>
    );

  if (variant === "wide")
    return (
      <div className="flex items-start gap-3">
        <LinkImg show={show} ratio="aspect-square" className="w-14" />
        <div className="min-w-0 flex-1 space-y-1">
          <Title size="sm">Title Lorem Ipsum Dolor Sit Amet</Title>
          <Desc />
          <Links show={show} />
        </div>
        <div className="flex max-w-[40%] flex-col items-end gap-1.5">
          <div><LinkEyebrow show={show} /></div>
          <Tags count={3} className="justify-end" />
        </div>
      </div>
    );

  return (
    <div className="space-y-2">
      <LinkImg show={show} ratio="aspect-[16/9]" />
      <div className="space-y-1.5 pt-1">
        <div><LinkEyebrow show={show} /></div>
        <Tags count={4} />
        <Title>Title Lorem Ipsum Dolor Sit Amet</Title>
        <Desc />
        <Links show={show} />
      </div>
    </div>
  );
}

/* ---------- Before ---------- */

const LEGACY = [
  { name: "Basic Card", count: 24 },
  { name: "Immersive Card", count: 48 },
  { name: "Grid Card", count: 160 },
  { name: "Compact Card", count: 3 },
];

function BeforeCards({ show }: { show: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
      <div className={`flex min-h-[340px] items-center justify-center rounded-xl p-5 sm:p-8 ${SURFACE}`}>
        {/* Illustration only — nested anchors aren't valid HTML, which is the point. */}
        <div aria-label="Legacy card illustration" role="img" className="relative w-full max-w-md">
          <div className={`rounded-lg bg-white p-4 ${show ? "outline-2 outline-dashed outline-offset-2 outline-rose-500" : ""}`}>
            <Img ratio="aspect-[3/2]" />
            <div className="mt-4 flex items-start justify-between gap-3">
              <Eyebrow />
              <Tags />
            </div>
            <p className="mt-2 font-semibold text-zinc-900">Title Lorem Ipsum Dolor Sit Amet</p>
            <p className="mt-6 text-sm text-zinc-500">Lorem ipsum dolor sit amet.</p>
            <div className="mt-2 flex gap-4">
              {["Learn More", "Learn More"].map((l, i) => (
                <span
                  key={i}
                  className={`rounded text-sm font-medium text-[#3D7BD1] ${show ? "outline-2 outline-dashed outline-offset-2 outline-rose-500" : ""}`}
                >
                  {l} →
                </span>
              ))}
            </div>
          </div>
          {show && (
            <span className="absolute -top-3 right-3 rounded-full bg-rose-600 px-2.5 py-1 text-[10px] font-semibold text-white">
              Link inside link
            </span>
          )}
        </div>
      </div>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">Legacy card variants</p>
        <ul className="mt-4 text-sm">
          {LEGACY.map((c) => (
            <li key={c.name} className="flex justify-between py-2">
              <span>{c.name}</span>
              <span className="font-mono text-zinc-500">{c.count}</span>
            </li>
          ))}
          <li className="flex justify-between py-2 font-medium">
            <span>Total</span>
            <span className="font-mono">235</span>
          </li>
        </ul>
        <ul className="mt-6 space-y-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          <li>Clickable card wrapping its own CTAs</li>
          <li>Use-case variant names (Event, Person, Episode…)</li>
          <li>Eyebrow and tags side by side; 3:2 images</li>
        </ul>
      </div>
    </div>
  );
}

/** On/off switch with its label; the whole row is clickable. */
function Switch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group flex items-center gap-3 rounded-full text-sm text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-700 dark:text-zinc-300"
    >
      {label}
      <span
        aria-hidden
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 motion-reduce:transition-none ${
          checked
            ? "bg-indigo-700 dark:bg-indigo-500"
            : "bg-zinc-300 group-hover:bg-zinc-400 dark:bg-zinc-700 dark:group-hover:bg-zinc-600"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow-sm transition-[translate] duration-200 ease-out motion-reduce:transition-none ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}
