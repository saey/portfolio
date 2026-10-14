"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type HomeTab = {
  id: string;
  label: string;
  content: ReactNode;
  /** Pin the tab to the bottom of the left column as a small, quiet link. */
  bottom?: boolean;
  /** Center narrow content horizontally in the panel. */
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
 * Title and vertical tabs on the left, the active panel on the right.
 * On large screens the left column fills the viewport, with bottom tabs and
 * the footer pinned to its end. On small screens everything stacks.
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

  const firstBottom = tabs.findIndex((t) => t.bottom);

  return (
    // Large screens: the row is centered in the viewport and the left rail
    // stretches to the panel's height, so its top and bottom line up with it.
    <div className="lg:flex lg:min-h-screen lg:items-center lg:py-16">
      <div className="w-full lg:grid lg:grid-cols-[240px_1fr] lg:gap-16">
        <header className="pt-16 pb-12 sm:pt-24 lg:flex lg:flex-col lg:p-0">
          {title}
          <div
            role="tablist"
            aria-label="Sections"
            aria-orientation="vertical"
            className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 lg:flex-1 lg:flex-col lg:items-start lg:gap-3"
          >
            {tabs.map((t, i) => {
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
                  className={`rounded text-left transition-colors ${focusRing} ${
                    t.bottom ? "text-xs" : "text-[15px]"
                  } ${i === firstBottom ? "lg:mt-auto" : ""} ${
                    selected
                      ? `font-semibold ${INK.accent}`
                      : t.bottom
                        ? "font-medium text-neutral-600 hover:text-[#4329a6] dark:text-zinc-400 dark:hover:text-indigo-300"
                        : "font-medium text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          <div className="mt-3 hidden lg:block">{footer}</div>
        </header>

        {/* Panels share one grid cell, so the area keeps the height of the
            tallest panel (Case Studies) whichever tab is open. */}
        <main className="grid pb-16 lg:pb-0">
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
                  t.centered ? "flex items-center justify-center" : ""
                } ${selected ? "" : "max-lg:hidden lg:invisible"}`}
              >
                {t.content}
              </section>
            );
          })}
        </main>

        <div className="pb-10 lg:hidden">{footer}</div>
      </div>
    </div>
  );
}
