"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

/** Sticky in-page navigation with scroll-spy. */
export function SectionNav({ sections }: { sections: readonly Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Case study sections" className="sticky top-12">
      <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
        Contents
      </p>
      <ol className="space-y-1">
        {sections.map((s, i) => {
          const isActive = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`group flex items-baseline gap-3 rounded py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 ${
                  isActive
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                <span
                  className={`font-mono text-[11px] transition-colors ${
                    isActive ? "text-indigo-700 dark:text-indigo-400" : "text-zinc-400"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative">
                  {s.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-0.5 left-0 h-px bg-indigo-700 transition-all dark:bg-indigo-400 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
