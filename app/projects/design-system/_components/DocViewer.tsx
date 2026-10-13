"use client";

import { useState, type ReactNode } from "react";
import { Toggle } from "./Toggle";
import { STAGE } from "./stage";

export type DocPage = {
  id: string;
  label: string;
  title: string;
  points: string[];
  /** Server-rendered image (ImageSlot) for this page. */
  image: ReactNode;
};

/** Tabbed viewer for documentation screenshots, paired with key points. */
export function DocViewer({
  label,
  pages,
  stacked,
}: {
  label: string;
  pages: DocPage[];
  /** Full-width image with notes below, for dense documents. */
  stacked?: boolean;
}) {
  const [active, setActive] = useState(pages[0].id);
  const page = pages.find((p) => p.id === active) ?? pages[0];

  return (
    <div className={STAGE}>
      <Toggle label={label} options={pages} value={active} onChange={setActive} size="md" level={1} />
      <div className={`mt-8 grid gap-8 ${stacked ? "" : "lg:grid-cols-[1.4fr_1fr] lg:gap-12"}`}>
        <div className="min-w-0">{page.image}</div>
        <div>
          {!stacked && (
            <>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400">
                {page.label}
              </p>
              <h4 className="mt-3 text-xl font-semibold tracking-tight">{page.title}</h4>
            </>
          )}
          <ul className={`${stacked ? "" : "mt-6"} space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400`}>
            {page.points.map((pt) => (
              <li key={pt} className="flex gap-3">
                <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-indigo-600" />
                <KeyPoint text={pt} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Bolds the key phrase before the first ":" or " — " so points scan quickly. */
function KeyPoint({ text }: { text: string }) {
  const m = text.match(/^(.+?)(:| — )(.*)$/);
  if (!m) return <span>{text}</span>;
  return (
    <span>
      <strong className="font-semibold text-neutral-900 dark:text-zinc-100">{m[1]}</strong>
      {m[2] === ":" ? ":" : " —"} {m[3]}
    </span>
  );
}
