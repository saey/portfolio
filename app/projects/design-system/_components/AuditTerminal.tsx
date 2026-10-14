"use client";

import { useState } from "react";
import { Toggle } from "../../_components/Toggle";

type Tab = "log" | "collections";

const TABS = [
  { id: "log", label: "audit.log" },
  { id: "collections", label: "collections" },
] as const;

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "head"; text: string }
  | { kind: "warn" | "fail" | "ok" | "info"; text: string; detail?: string };

const LOG: Line[] = [
  { kind: "cmd", text: "audit figma-library --scope variables,components" },
  { kind: "head", text: "Variables" },
  { kind: "warn", text: "Theme collection holds non-color values", detail: "font family · weight · size · spacing · size · border" },
  { kind: "warn", text: "Colors bound to components, not roles", detail: "336 theme colors" },
  { kind: "warn", text: "4 theme modes for 2 real appearances", detail: "Light Prim. · Light Sec. · Dark Prim. · Dark Sec." },
  { kind: "fail", text: "Path too long (depth 7)", detail: "colors/text/button/primary/default/base/disabled" },
  { kind: "warn", text: "Unused tokens and alpha color issues detected" },
  { kind: "head", text: "Accessibility" },
  { kind: "fail", text: "WCAG AA contrast", detail: "CTA text · inputs · focus ring" },
  { kind: "fail", text: "Target size below 24×24", detail: "16×16 icon buttons" },
  { kind: "head", text: "Components" },
  { kind: "warn", text: "Same UI, different functionality" },
  { kind: "warn", text: "Different UI, same functionality" },
  { kind: "warn", text: "Variations that were never presented" },
  { kind: "info", text: "Card system: 235 variants across Basic / Immersive / Grid / Compact" },
  { kind: "head", text: "Result" },
  { kind: "ok", text: "Theme 336 → 59 · 4 modes → 2 (Light / Dark)" },
  { kind: "ok", text: "Published tokens 578 → 377, incl. multi-language" },
  { kind: "ok", text: "Path renamed", detail: "foreground/disabled" },
  { kind: "ok", text: "Components 32 → 23 · Card variants 235 → 7" },
];

const MARK: Record<Exclude<Line["kind"], "cmd" | "head">, { sym: string; cls: string }> = {
  warn: { sym: "!", cls: "text-amber-300" },
  fail: { sym: "✕", cls: "text-rose-400" },
  ok: { sym: "✓", cls: "text-indigo-300" },
  info: { sym: "·", cls: "text-zinc-500" },
};

const COLLECTIONS = {
  before: [
    { name: "Theme", count: 336, note: "Colors by components, font, spacing, size, border" },
    { name: "Brand", count: 204 },
    { name: "Grid", count: 36, note: "Breakpoints, font size" },
  ],
  after: [
    { name: "Theme", count: 59, note: "Color switching only" },
    { name: "Responsive EN", count: 88, note: "Language × responsive values" },
    { name: "└ Responsive JA", count: null, note: "Sub-collection" },
    { name: "Scale", count: 35, note: "Absolute, non-responsive values" },
    { name: "Brand", count: 195 },
  ],
};

export function AuditTerminal() {
  const [tab, setTab] = useState<Tab>("log");

  return (
    <div className="overflow-hidden rounded-xl bg-zinc-950 text-zinc-300">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
        <div className="flex items-center gap-2" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
        </div>
        <Toggle label="Audit view" options={TABS} value={tab} onChange={setTab} tone="dark" level={1} />
      </div>

      <div className="overflow-x-auto px-5 pb-6 pt-2 font-mono text-[12.5px] leading-7">
        {tab === "log" ? (
          <ul>
            {LOG.map((l, i) => {
              if (l.kind === "cmd")
                return (
                  <li key={i} className="text-zinc-100">
                    <span className="text-indigo-400">❯</span> {l.text}
                  </li>
                );
              if (l.kind === "head")
                return (
                  <li key={i} className="mt-4 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    {l.text}
                  </li>
                );
              const m = MARK[l.kind];
              return (
                <li key={i} className="flex gap-3">
                  <span className={`w-3 shrink-0 ${m.cls}`}>{m.sym}</span>
                  <span>
                    <span className={l.kind === "ok" ? "text-zinc-100" : ""}>{l.text}</span>
                    {l.detail && (
                      <span className="block text-zinc-500 sm:ml-2 sm:inline">{l.detail}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            <CollectionTable title="Before" total={578} rows={COLLECTIONS.before} />
            <CollectionTable title="New" total={377} rows={COLLECTIONS.after} accent />
          </div>
        )}
      </div>
      <p className="px-5 pb-4 text-[11px] text-zinc-500">
        Summary of the AI-assisted audit (Claude via MCP). Totals are published tokens, excluding .Primitives.
      </p>
    </div>
  );
}

function CollectionTable({
  title,
  total,
  rows,
  accent,
}: {
  title: string;
  total: number;
  rows: { name: string; count: number | null; note?: string }[];
  accent?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className={`text-[11px] uppercase tracking-[0.2em] ${accent ? "text-indigo-300" : "text-zinc-500"}`}>
          {title}
        </span>
        <span className={accent ? "text-indigo-300" : "text-zinc-400"}>{total} published</span>
      </div>
      <ul className="mt-3">
        {rows.map((r) => (
          <li key={r.name} className="py-2">
            <div className="flex justify-between gap-4">
              <span className="text-zinc-100">{r.name}</span>
              <span className={accent && r.name === "Theme" ? "text-indigo-300" : "text-zinc-400"}>
                {r.count ?? ""}
              </span>
            </div>
            {r.note && <p className="text-[11px] leading-5 text-zinc-500">{r.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
