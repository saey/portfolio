"use client";

import { useState, type ReactNode } from "react";
import { Toggle } from "../../_components/Toggle";
import { STAGE } from "../../_components/stage";

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
  /** Optional notes: left of the image in Before/After, aligned below both images in Compare. */
  beforeNotes?: ReactNode;
  afterNotes?: ReactNode;
  /** Hides the visible title and the Before/After tags when the surrounding heading already names the example. */
  minimal?: boolean;
};

export function BeforeAfter({
  title,
  before,
  after,
  beforeCaption,
  afterCaption,
  beforeNotes,
  afterNotes,
  minimal,
}: BeforeAfterProps) {
  const [mode, setMode] = useState<Mode>("after");
  const hasNotes = Boolean(beforeNotes || afterNotes);

  return (
    <figure className={STAGE}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <figcaption
          className={
            minimal
              ? "sr-only"
              : "text-sm font-medium text-zinc-900 dark:text-zinc-100"
          }
        >
          {title}
        </figcaption>
        <Toggle
          label={`${title} view`}
          options={MODES}
          value={mode}
          onChange={setMode}
          level={1}
        />
      </div>

      {hasNotes && mode === "compare" && (
        // Explicit placement keeps both notes on one row so they start at the same height;
        // on mobile the source order stacks each image with its own notes.
        <div className="grid gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
          <div className="md:col-start-1 md:row-start-1">
            <Pane tag={minimal ? undefined : "Before"} caption={beforeCaption}>
              {before}
            </Pane>
          </div>
          <div className="md:col-start-1 md:row-start-2">{beforeNotes}</div>
          <div className="md:col-start-2 md:row-start-1">
            <Pane
              tag={minimal ? undefined : "After"}
              caption={afterCaption}
              accent
            >
              {after}
            </Pane>
          </div>
          <div className="md:col-start-2 md:row-start-2">{afterNotes}</div>
        </div>
      )}

      {hasNotes && mode !== "compare" && (
        <div className="grid gap-8 md:grid-cols-[2fr_3fr] md:gap-10">
          <div className="order-2 md:order-1">
            {mode === "before" ? beforeNotes : afterNotes}
          </div>
          <div className="order-1 md:order-2">
            {mode === "before" ? (
              <Pane
                tag={minimal ? undefined : "Before"}
                caption={beforeCaption}
              >
                {before}
              </Pane>
            ) : (
              <Pane
                tag={minimal ? undefined : "After"}
                caption={afterCaption}
                accent
              >
                {after}
              </Pane>
            )}
          </div>
        </div>
      )}

      {!hasNotes && (
        <div className={mode === "compare" ? "grid gap-8 md:grid-cols-2" : ""}>
          {(mode === "before" || mode === "compare") && (
            <Pane tag={minimal ? undefined : "Before"} caption={beforeCaption}>
              {before}
            </Pane>
          )}
          {(mode === "after" || mode === "compare") && (
            <Pane
              tag={minimal ? undefined : "After"}
              caption={afterCaption}
              accent
            >
              {after}
            </Pane>
          )}
        </div>
      )}
    </figure>
  );
}

function Pane({
  tag,
  caption,
  accent,
  children,
}: {
  tag?: string;
  caption?: string;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      {children}
      {(tag || caption) && (
        <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          <span
            className={`mr-2 font-mono text-[11px] uppercase tracking-[0.15em] ${
              accent
                ? "text-indigo-700 dark:text-indigo-400"
                : "text-zinc-900 dark:text-zinc-100"
            }`}
          >
            {tag}
          </span>
          {caption}
        </p>
      )}
    </div>
  );
}
