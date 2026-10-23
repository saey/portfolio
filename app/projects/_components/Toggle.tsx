"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type ToggleProps<T extends string> = {
  label: string;
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md";
  /** "dark" for use on dark surfaces such as the terminal. */
  tone?: "auto" | "dark";
  /**
   * 1 — top-level tabs of a demo: a segmented control with the active tab filled in the header violet.
   * 2 — secondary view or variant switch (subtle underlined text).
   */
  level?: 1 | 2;
};

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 dark:focus-visible:outline-indigo-400";

export function Toggle<T extends string>({
  label,
  options,
  value,
  onChange,
  size = "sm",
  tone = "auto",
  level = 2,
}: ToggleProps<T>) {
  const dark = tone === "dark";

  if (level === 2) {
    return (
      <div role="group" aria-label={label} className="inline-flex flex-wrap gap-x-4 gap-y-1">
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.id)}
              className={`rounded-none border-b-2 pb-1 pt-0.5 text-xs transition-colors ${focus} ${
                active
                  ? dark
                    ? "border-indigo-400 font-medium text-white"
                    : "border-indigo-700 font-medium text-zinc-900 dark:border-indigo-400 dark:text-white"
                  : dark
                    ? "border-transparent text-zinc-500 hover:text-zinc-200"
                    : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <Carousel dark={dark} active={value}>
      <div
        role="group"
        aria-label={label}
        className={`inline-flex gap-1 rounded-full p-1 ${
          dark ? "bg-white/10" : "bg-neutral-200/60 dark:bg-white/10"
        }`}
      >
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              data-active={active || undefined}
              onClick={() => onChange(o.id)}
              className={`shrink-0 whitespace-nowrap rounded-full font-medium transition-all ${focus} ${
                size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm"
              } ${
                active
                  ? "bg-indigo-800 text-white shadow-sm dark:bg-indigo-600"
                  : dark
                    ? "text-zinc-400 hover:bg-white/10 hover:text-white"
                    : "text-neutral-600 hover:bg-white/50 hover:text-neutral-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </Carousel>
  );
}

/**
 * Keeps level-1 tabs on one line. When they don't fit, the row scrolls
 * sideways and arrow buttons appear on the right to page through it.
 */
function Carousel({
  dark,
  active,
  children,
}: {
  dark: boolean;
  active: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ overflow: false, start: true, end: true });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdges({
        overflow: el.scrollWidth > el.clientWidth + 1,
        start: el.scrollLeft <= 1,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
      });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  // Bring the selected tab into view, e.g. after keyboard focus moves past the edge.
  useEffect(() => {
    const el = ref.current;
    const tab = el?.querySelector<HTMLElement>("[data-active]");
    if (!el || !tab) return;
    const left = tab.offsetLeft; // the scroller is the offset parent (relative)
    if (left < el.scrollLeft || left + tab.offsetWidth > el.scrollLeft + el.clientWidth) {
      el.scrollTo({ left: left - 24, behavior: "smooth" });
    }
  }, [active]);

  const page = (dir: 1 | -1) => {
    const el = ref.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <div className="flex min-w-0 max-w-full items-center gap-2">
      <div
        ref={ref}
        className="relative min-w-0 overflow-x-auto rounded-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      {edges.overflow && (
        <span className="flex shrink-0 gap-1.5">
          <ArrowButton dark={dark} label="Scroll tabs left" disabled={edges.start} onClick={() => page(-1)}>
            ←
          </ArrowButton>
          <ArrowButton dark={dark} label="Scroll tabs right" disabled={edges.end} onClick={() => page(1)}>
            →
          </ArrowButton>
        </span>
      )}
    </div>
  );
}

function ArrowButton({
  dark,
  label,
  disabled,
  onClick,
  children,
}: {
  dark: boolean;
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm transition-colors ${focus} disabled:pointer-events-none disabled:opacity-30 ${
        dark
          ? "border-white/20 text-zinc-300 hover:border-white hover:text-white"
          : "border-zinc-300 text-zinc-700 hover:border-[#4329a6] hover:text-[#4329a6] dark:border-zinc-700 dark:text-zinc-300"
      }`}
    >
      {children}
    </button>
  );
}
