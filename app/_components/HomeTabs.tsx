"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type HomeTab = {
  id: string;
  label: string;
  content: ReactNode;
  /** Show the tab as a small, quiet link under the title instead of in the tab row. */
  bottom?: boolean;
  /** Center narrow content horizontally at the top of the panel. */
  centered?: boolean;
};

/** Text colors tinted toward the violet accent (#4329a6). */
export const INK = {
  strong: "text-[#1e1b2e] dark:text-white",
  body: "text-[#4a4560] dark:text-[#cfcae0]",
  muted: "text-[#6e6886] dark:text-[#a39dbb]",
  accent: "text-[#4329a6] dark:text-indigo-300",
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-700 dark:focus-visible:outline-indigo-400";

/**
 * Top-center layout. The title block takes the spare height of the viewport,
 * so the tab row and the panel (the thumbnails) settle at the bottom of the
 * first screen. Quiet tabs (contact) sit under the title.
 */
export function HomeTabs({
  title,
  tabs,
  footer,
}: {
  title: ReactNode;
  tabs: HomeTab[];
  footer: ReactNode;
}) {
  const [active, setActive] = useState(tabs[0].id);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between tabs (WAI-ARIA tabs pattern, automatic activation).
  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? i === last
          ? 0
          : i + 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? i === 0
            ? last
            : i - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(tabs[next].id);
    refs.current[next]?.focus();
  };

  const renderTab = (t: HomeTab, i: number) => {
    const selected = t.id === active;
    return (
      <button
        key={t.id}
        ref={(el) => {
          refs.current[i] = el;
        }}
        type="button"
        role="tab"
        id={`tab-${t.id}`}
        aria-controls={`panel-${t.id}`}
        aria-selected={selected}
        tabIndex={selected ? 0 : -1}
        onClick={() => setActive(t.id)}
        onKeyDown={(e) => onKeyDown(e, i)}
        className={`group relative cursor-pointer rounded-full ${focusRing} ${
          t.bottom
            ? // Soft color shift on hover, a small press bounce on click, and a
              // faint violet glow while the contact form is open.
              `pb-2 text-xs font-medium transition-[color,scale,text-shadow] duration-300 ease-in-out active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100 ${
                selected
                  ? "text-[#4c46b9] [text-shadow:0_0_12px_rgb(76_70_185/0.35)] dark:text-indigo-300 dark:[text-shadow:0_0_12px_rgb(165_180_252/0.4)]"
                  : "text-[#5a5699] hover:text-[#3b3870] dark:text-[#acaacf] dark:hover:text-white"
              }`
            : `px-4 py-2 text-lg font-semibold transition-colors ${
                selected
                  ? "text-[#4c46b9] dark:text-indigo-300"
                  : "text-[#64748B] hover:text-[#334155] dark:text-slate-400 dark:hover:text-white"
              }`
        }`}
      >
        {t.bottom && t.label.endsWith(":)") ? (
          <>
            {t.label.slice(0, -1)}
            <Grin on={selected} />
          </>
        ) : (
          t.label
        )}
        {/* Indicator under the label: full on the active tab, grows out
            from the center on hover or focus for the others. */}
        <span
          aria-hidden
          className={`absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full transition-[scale,background-color] duration-300 ease-out motion-reduce:transition-none ${
            selected
              ? "scale-x-100 bg-[#4c46b9] dark:bg-indigo-300"
              : "scale-x-0 bg-[#94a3b8] group-hover:scale-x-100 group-focus-visible:scale-x-100 dark:bg-slate-500"
          }`}
        />
      </button>
    );
  };

  return (
    <div className="flex min-h-svh flex-col items-center">
      <header className="flex flex-1 flex-col items-center justify-center pt-20 pb-6 text-center [@media(min-height:800px)]:pt-36">
        {title}
        <div role="tablist" aria-label="Contact" className="mt-0.5">
          {tabs.map((t, i) => (t.bottom ? renderTab(t, i) : null))}
        </div>
      </header>

      {/* Nudged left: the longer "Case Studies" makes a true center read right-heavy. */}
      <div
        role="tablist"
        aria-label="Sections"
        className="flex -translate-x-2.5 items-center gap-2"
      >
        {tabs.map((t, i) => (t.bottom ? null : renderTab(t, i)))}
      </div>

      {/* Panels share one grid cell, so the area keeps the height of the
          tallest panel (Case Studies) whichever tab is open. */}
      <main className="mt-14 grid w-full">
        {tabs.map((t) => {
          const selected = t.id === active;
          return (
            <section
              key={t.id}
              role="tabpanel"
              id={`panel-${t.id}`}
              aria-labelledby={`tab-${t.id}`}
              aria-hidden={!selected}
              tabIndex={selected ? 0 : -1}
              className={`rounded-lg [grid-area:1/1] focus-visible:outline-none ${
                t.centered ? "flex items-start justify-center" : ""
              } ${selected ? "" : "invisible"}`}
            >
              {t.content}
            </section>
          );
        })}
      </main>

      <footer className="pt-6 pb-12 text-center">{footer}</footer>
    </div>
  );
}

/**
 * The ")" of a ":)" that opens into a ":D" while its tab is selected, hovered
 * or focused: the "D" starts squeezed thin against its flat edge, much like
 * the ")", then springs open to full width.
 */
function Grin({ on }: { on: boolean }) {
  const layer = "[grid-area:1/1] motion-reduce:transition-none";
  return (
    <span className="inline-grid justify-items-start">
      <span
        className={`${layer} transition-opacity duration-100 ${
          on
            ? "opacity-0"
            : "group-hover:opacity-0 group-focus-visible:opacity-0"
        }`}
      >
        )
      </span>
      <span
        aria-hidden
        className={`${layer} origin-left transition-[opacity,scale] duration-[450ms] ease-[cubic-bezier(0.45,1.7,0.5,1)] ${
          on
            ? "scale-100 opacity-100"
            : "scale-x-[0.2] scale-y-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        }`}
      >
        D
      </span>
    </span>
  );
}
