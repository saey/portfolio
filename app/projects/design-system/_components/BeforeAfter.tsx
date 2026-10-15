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
  /** Optional notes: right of the image in Before/After, aligned below both images in Compare. */
  beforeNotes?: ReactNode;
  afterNotes?: ReactNode;
  /** Hides the visible title and the Before/After tags when the surrounding heading already names the example. */
  minimal?: boolean;
  /** Lists Compare as the first tab and opens on it. */
  compareFirst?: boolean;
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
  compareFirst,
}: BeforeAfterProps) {
  const [mode, setMode] = useState<Mode>(compareFirst ? "compare" : "after");
  const modes = compareFirst ? [MODES[2], MODES[0], MODES[1]] : MODES;
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
          options={modes}
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
        // Image on the left, its notes beside it on the right; stacked on mobile.
        <div className="grid gap-8 md:grid-cols-[3fr_2fr] md:gap-10">
          <div className="order-2">
            {mode === "before" ? beforeNotes : afterNotes}
          </div>
          <div className="order-1">
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

      {!hasNotes && mode === "compare" && (
        // Images share row 1 and captions row 2, so BEFORE and AFTER start on
        // the same line even when the images differ in height.
        <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
          <div className="md:col-start-1 md:row-start-1">{before}</div>
          <div className="mb-4 md:col-start-1 md:row-start-2 md:mb-0">
            <Caption
              tag={minimal ? undefined : "Before"}
              caption={beforeCaption}
            />
          </div>
          <div className="md:col-start-2 md:row-start-1">{after}</div>
          <div className="md:col-start-2 md:row-start-2">
            <Caption
              tag={minimal ? undefined : "After"}
              caption={afterCaption}
              accent
            />
          </div>
        </div>
      )}

      {!hasNotes && mode !== "compare" && (
        <Pane
          tag={minimal ? undefined : mode === "before" ? "Before" : "After"}
          caption={mode === "before" ? beforeCaption : afterCaption}
          accent={mode === "after"}
        >
          {mode === "before" ? before : after}
        </Pane>
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
        <div className="mt-4">
          <Caption tag={tag} caption={caption} accent={accent} />
        </div>
      )}
    </div>
  );
}

function Caption({
  tag,
  caption,
  accent,
}: {
  tag?: string;
  caption?: string;
  accent?: boolean;
}) {
  if (!tag && !caption) return null;
  return (
    <p className="text-sm leading-6 text-zinc-500 dark:text-zinc-400">
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
  );
}
