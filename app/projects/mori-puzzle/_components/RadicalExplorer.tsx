"use client";

import { useState } from "react";
import { Toggle } from "../../_components/Toggle";
import { STAGE, SURFACE } from "../../_components/stage";
import { KANJI_FONT } from "./kanji";

type Part = { char: string; meaning: string; type: "Pictograph · SHOKEI" | "Indicative · SHIJI" };

const PARTS: Record<string, Part> = {
  sun: { char: "日", meaning: "sun", type: "Pictograph · SHOKEI" },
  moon: { char: "月", meaning: "moon", type: "Pictograph · SHOKEI" },
  tree: { char: "木", meaning: "tree", type: "Pictograph · SHOKEI" },
  person: { char: "亻", meaning: "person", type: "Pictograph · SHOKEI" },
};

const EXAMPLES = [
  { id: "bright", label: "明", kanji: "明", meaning: "bright", parts: ["sun", "moon"] },
  { id: "grove", label: "林", kanji: "林", meaning: "grove", parts: ["tree", "tree"] },
  { id: "forest", label: "森", kanji: "森", meaning: "forest", parts: ["tree", "tree", "tree"] },
  { id: "rest", label: "休", kanji: "休", meaning: "rest", parts: ["person", "tree"] },
] as const;

type ExampleId = (typeof EXAMPLES)[number]["id"];

/** Shows how a handful of core elements combine into many kanji. */
export function RadicalExplorer() {
  const [active, setActive] = useState<ExampleId>("bright");
  const ex = EXAMPLES.find((e) => e.id === active) ?? EXAMPLES[0];

  return (
    <div className={STAGE}>
      <Toggle label="Kanji example" options={EXAMPLES} value={active} onChange={setActive} size="md" level={1} />

      <div className={`mt-8 rounded-xl p-6 sm:p-10 ${SURFACE}`}>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 sm:gap-x-6">
          {ex.parts.map((key, i) => {
            const part = PARTS[key];
            return (
              <div key={`${key}-${i}`} className="flex items-center gap-4 sm:gap-6">
                {i > 0 && (
                  <span aria-hidden className="text-2xl font-light text-zinc-400">
                    +
                  </span>
                )}
                <div className="text-center">
                  <span
                    className={`flex h-20 w-20 items-center justify-center rounded-md border border-zinc-200 text-5xl text-zinc-900 sm:h-24 sm:w-24 sm:text-6xl dark:border-zinc-800 dark:text-zinc-100 ${KANJI_FONT}`}
                  >
                    {part.char}
                  </span>
                  <span className="mt-2 block text-sm text-zinc-600 dark:text-zinc-400">{part.meaning}</span>
                </div>
              </div>
            );
          })}
          <span aria-hidden className="text-2xl font-light text-indigo-600">
            =
          </span>
          <div className="text-center">
            <span
              className={`flex h-24 w-24 items-center justify-center rounded-full bg-indigo-800 text-6xl text-white sm:h-28 sm:w-28 sm:text-7xl ${KANJI_FONT}`}
            >
              {ex.kanji}
            </span>
            <span className="mt-2 block text-sm font-medium text-zinc-900 dark:text-zinc-100">{ex.meaning}</span>
          </div>
        </div>

        <p className="mt-8 text-center text-sm leading-6 text-zinc-500 dark:text-zinc-400" aria-live="polite">
          {ex.parts.map((k) => `${PARTS[k].char} ${PARTS[k].meaning}`).join(" + ")} → {ex.kanji} {ex.meaning}
          <span className="mx-2 text-zinc-300 dark:text-zinc-700">·</span>
          {Array.from(new Set(ex.parts.map((k) => PARTS[k].type))).join(", ")}
        </p>
      </div>

      <p className="mt-6 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
        Squares are parts, circles are kanji — the same shape language used in the app’s Library.
      </p>
    </div>
  );
}
