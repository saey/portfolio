"use client";

import { useState, type ReactNode } from "react";
import { Toggle } from "./Toggle";
import { STAGE } from "./stage";

type Mode = "before" | "after" | "compare";

const MODES = [
  { id: "before", label: "Before" },
  { id: "after", label: "After" },
  { id: "compare", label: "Compare" },
] as const;

type BeforeAfterProps = {
  title: string;
  before: ReactNode;
  after: ReactNode;
  beforeCaption?: string;
  afterCaption?: string;
};

export function BeforeAfter({
  title,
  before,
  after,
  beforeCaption,
  afterCaption,
}: BeforeAfterProps) {
  const [mode, setMode] = useState<Mode>("after");

  return (
    <figure className={STAGE}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <figcaption className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {title}
        </figcaption>
        <Toggle label={`${title} view`} options={MODES} value={mode} onChange={setMode} level={1} />
      </div>

      <div className={mode === "compare" ? "grid gap-8 md:grid-cols-2" : ""}>
        {(mode === "before" || mode === "compare") && (
          <Pane tag="Before" caption={beforeCaption}>
            {before}
          </Pane>
        )}
        {(mode === "after" || mode === "compare") && (
          <Pane tag="After" caption={afterCaption} accent>
            {after}
          </Pane>
        )}
      </div>
    </figure>
  );
}

function Pane({
  tag,
  caption,
  accent,
  children,
}: {
  tag: string;
  caption?: string;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      {children}
      <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        <span
          className={`mr-2 font-mono text-[11px] uppercase tracking-[0.15em] ${
            accent ? "text-indigo-700 dark:text-indigo-400" : "text-zinc-900 dark:text-zinc-100"
          }`}
        >
          {tag}
        </span>
        {caption}
      </p>
    </div>
  );
}
