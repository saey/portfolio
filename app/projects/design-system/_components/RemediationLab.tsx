"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { contrast } from "./contrast";
import { Toggle } from "../../_components/Toggle";
import { STAGE, SURFACE } from "../../_components/stage";

type Element = "button" | "color" | "tag";
type Mode = "before" | "after" | "interactive";

const ELEMENTS = [
  { id: "button", label: "Button" },
  { id: "color", label: "Color" },
  { id: "tag", label: "Tag" },
] as const;

const MODES = [
  { id: "before", label: "Before" },
  { id: "after", label: "After" },
  { id: "interactive", label: "Interactive Preview" },
] as const;

/* Illustrative values that reproduce the audited contrast problems. */
const C = {
  white: "#FFFFFF",
  gray: "#F1F3F6",
  navy: "#0F2A5C",
  black: "#000000",
  lightBlue: "#DCEBFB",
  lightNavy: "#1E4FC2",
  disabled: "#AEB4BD",
  disabledBg: "#E9ECF0",
  before: { primary: "#4A8BE0", text: "#3D7BD1", ring: "#9DBEF0", input: "#CDD2DA" },
  after: { primary: "#1F5FBF", hover: "#1A4FA0", active: "#163F80", tint: "#E8F0FC", ring: "#1A4FA0", input: "#6B7280" },
};

const NOTES: Record<Element, Record<"before" | "after", string[]>> = {
  button: {
    before: [
      "Focus ring failed AA contrast and was misaligned",
      "Tertiary hover used a border — identical to the Secondary default",
      "Dark hover matched the dark Primary default",
      "Text CTA failed AA on gray backgrounds",
      "Fixed height clipped longer labels",
      "Label set in a body text token",
    ],
    after: [
      "AA-safe focus ring, aligned to the component bounds",
      "Tertiary hover moved from border to background",
      "Distinct hover color in dark mode",
      "Text CTA color meets AA on gray backgrounds",
      "Hug content with a minimum height; xl size added for nav and large CTAs",
      "New label token; invisible tertiary paddings removed, text left-aligned",
    ],
  },
  color: {
    before: [
      "Colors defined per component under long paths",
      "4 themes: Light Prim., Light Sec., Dark Prim., Dark Sec.",
      "Theme also carried font, spacing, size and border values",
      "AA contrast and alpha color issues",
    ],
    after: [
      "Shorter paths and names",
      "Semantic tokens instead of tokens per element or component",
      "Theme is only for color switching",
      "4 themes reduced to 2 (Light / Dark)",
      "AA contrast and alpha color issues fixed",
    ],
  },
  tag: {
    before: [
      "Named “Badge” — easily confused with notification badges",
      "Highlight variant used the Primary CTA color, competing with CTAs",
      "Body text token, centered text, fixed height",
      "Background variations per theme",
    ],
    after: [
      "Renamed to Tag",
      "Primary CTA color removed from tags",
      "Label text token, left-aligned, hug height with a minimum",
      "Convertible background: light and dark only",
      "Pill shape added as a universal tag pattern; icon optional",
    ],
  },
};

export function RemediationLab() {
  const [element, setElement] = useState<Element>("button");
  const [mode, setMode] = useState<Mode>("after");
  const notes = NOTES[element][mode === "before" ? "before" : "after"];

  return (
    <div className={STAGE}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Toggle label="Component" options={ELEMENTS} value={element} onChange={setElement} size="md" level={1} />
        <Toggle label="View" options={MODES} value={mode} onChange={setMode} />
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_260px] lg:gap-12">
        <div className={`min-w-0 rounded-xl p-5 sm:p-8 ${SURFACE}`}>
          {element === "button" && <ButtonStage mode={mode} />}
          {element === "color" && <ColorStage mode={mode} />}
          {element === "tag" && <TagStage mode={mode} />}
        </div>

        <div>
          <p
            className={`text-[11px] font-medium uppercase tracking-[0.2em] ${
              mode === "before" ? "text-zinc-500" : "text-indigo-700 dark:text-indigo-400"
            }`}
          >
            {mode === "before" ? "Audit findings" : "Remediation"}
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {notes.map((n) => (
              <li key={n} className="flex gap-3">
                <span
                  aria-hidden
                  className={`mt-2.5 h-1 w-1 shrink-0 rounded-full ${
                    mode === "before" ? "bg-zinc-400" : "bg-indigo-600"
                  }`}
                />
                {n}
              </li>
            ))}
          </ul>
          {mode === "interactive" && (
            <p className="mt-6 text-xs leading-5 text-zinc-500">
              Hover, press and Tab through the preview to see the remediated states.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Shared bits ---------- */

function Ratio({ fg, bg, label, min = 4.5 }: { fg: string; bg: string; label: string; min?: number }) {
  const r = contrast(fg, bg);
  const pass = r >= min;
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-xs">
      <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
        <span aria-hidden className="flex h-4 w-6 items-center justify-center rounded-sm text-[9px] font-bold" style={{ background: bg, color: fg }}>
          Aa
        </span>
        {label}
      </span>
      <span className="flex items-center gap-2 font-mono">
        <span className="text-zinc-900 dark:text-zinc-100">{r.toFixed(2)}:1</span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            pass
              ? "bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-300"
              : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
          }`}
        >
          {pass ? "AA" : "Fail"}
        </span>
      </span>
    </div>
  );
}

function StageLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-400">{children}</p>
  );
}

const PlusIcon = () => (
  <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.75}>
    <path d="M8 3v10M3 8h10" />
  </svg>
);

const VideoIcon = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth={1.4}>
    <rect x="1.5" y="4" width="9" height="8" rx="1.5" />
    <path d="m10.5 7 4-2v6l-4-2" />
  </svg>
);

/* ---------- Button ---------- */

type BtnState = "default" | "hover" | "focus" | "active" | "disabled";
type BtnKind = "primary" | "secondary" | "tertiary";
const STATES: BtnState[] = ["default", "hover", "focus", "active", "disabled"];
const KINDS: BtnKind[] = ["primary", "secondary", "tertiary"];

function buttonStyle(kind: BtnKind, state: BtnState, version: "before" | "after"): CSSProperties {
  const v = version === "before";
  const main = v ? C.before.primary : C.after.primary;
  const disabled = state === "disabled";
  const base: CSSProperties = { borderWidth: 1, borderStyle: "solid", borderColor: "transparent" };

  if (kind === "primary") {
    Object.assign(base, {
      background: disabled ? C.disabledBg : state === "hover" ? (v ? "#3A73C2" : C.after.hover) : state === "active" ? (v ? "#2C5DA3" : C.after.active) : main,
      color: disabled ? C.disabled : C.white,
    });
  } else if (kind === "secondary") {
    Object.assign(base, {
      background: disabled ? C.white : state === "hover" || state === "active" ? (v ? "#EAF2FD" : C.after.tint) : C.white,
      borderColor: disabled ? C.disabledBg : main,
      color: disabled ? C.disabled : main,
    });
  } else {
    const hovering = state === "hover" || state === "active";
    Object.assign(base, {
      background: !v && hovering ? C.after.tint : "transparent",
      // Before: tertiary hover drew a border — the same look as Secondary default.
      borderColor: v && hovering ? main : "transparent",
      color: disabled ? C.disabled : v ? C.before.text : C.after.primary,
    });
  }

  if (state === "focus") {
    Object.assign(
      base,
      v
        ? { outline: `1px dashed ${C.before.ring}`, outlineOffset: 3, transform: "translateX(1px)" }
        : { outline: `2px solid ${C.after.ring}`, outlineOffset: 2 },
    );
  }
  return base;
}

function DemoButton({
  kind,
  state = "default",
  version,
  label = "Button",
  live,
  size = "md",
}: {
  kind: BtnKind;
  state?: BtnState;
  version: "before" | "after";
  label?: string;
  live?: boolean;
  size?: "md" | "xl";
}) {
  const after = version === "after";
  const sizing = after
    ? size === "xl"
      ? "min-h-12 px-6 py-3 text-base"
      : kind === "tertiary"
        ? "min-h-8 px-0 py-1 text-sm justify-start"
        : "min-h-9 px-4 py-2 text-sm"
    : "h-8 px-4 text-[13px] justify-center overflow-hidden";

  if (live) {
    return (
      <button
        type="button"
        className={`ab-btn ab-${kind} inline-flex items-center gap-1.5 rounded-md font-medium transition-colors ${sizing}`}
      >
        <PlusIcon />
        {label}
        <PlusIcon />
      </button>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md font-medium ${sizing}`}
      style={buttonStyle(kind, state, version)}
    >
      <PlusIcon />
      {label}
      <PlusIcon />
    </span>
  );
}

function ButtonStage({ mode }: { mode: Mode }) {
  if (mode === "interactive") {
    return (
      <div className="space-y-8">
        <style>{`
          .ab-btn{outline:none}
          .ab-btn:focus-visible{outline:2px solid ${C.after.ring};outline-offset:2px}
          .ab-primary{background:${C.after.primary};color:#fff}
          .ab-primary:hover{background:${C.after.hover}}
          .ab-primary:active{background:${C.after.active}}
          .ab-secondary{background:#fff;color:${C.after.primary};border:1px solid ${C.after.primary}}
          .ab-secondary:hover,.ab-secondary:active{background:${C.after.tint}}
          .ab-tertiary{color:${C.after.primary};background:transparent}
          .ab-tertiary:hover,.ab-tertiary:active{background:${C.after.tint}}
          .ab-icon{width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;border-radius:6px}
        `}</style>
        <div>
          <StageLabel>Try it — hover, press, Tab</StageLabel>
          <div className="flex flex-wrap items-center gap-4 rounded-lg bg-white p-6">
            <DemoButton kind="primary" version="after" live />
            <DemoButton kind="secondary" version="after" live />
            <DemoButton kind="tertiary" version="after" live />
            <button type="button" aria-label="Add" className="ab-btn ab-primary ab-icon">
              <PlusIcon />
            </button>
            <button type="button" aria-label="Add" className="ab-btn ab-secondary ab-icon">
              <PlusIcon />
            </button>
          </div>
        </div>
        <div>
          <StageLabel>Hug content, with xl for larger CTAs</StageLabel>
          <div className="flex flex-wrap items-center gap-4 rounded-lg bg-white p-6">
            <DemoButton kind="primary" version="after" live size="xl" label="Explore our insights" />
            <DemoButton kind="secondary" version="after" live label="A longer label that still fits" />
          </div>
        </div>
      </div>
    );
  }

  const version = mode;
  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-lg bg-white p-4">
        <table className="w-full min-w-[460px] border-separate border-spacing-y-2 text-left">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.15em] text-zinc-400">
              <th className="w-24 font-medium" />
              {KINDS.map((k) => (
                <th key={k} className="font-medium capitalize">{k}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STATES.map((s) => (
              <tr key={s}>
                <th className="text-xs font-normal capitalize text-zinc-500">{s}</th>
                {KINDS.map((k) => (
                  <td key={k} className="py-1">
                    <DemoButton kind={k} state={s} version={version} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Ratio label="Primary label on fill" fg={C.white} bg={version === "before" ? C.before.primary : C.after.primary} />
        <Ratio label="Text CTA on gray" fg={version === "before" ? C.before.text : C.after.primary} bg={C.gray} />
        <Ratio label="Focus ring (non-text, 3:1)" fg={version === "before" ? C.before.ring : C.after.ring} bg={C.white} min={3} />
      </div>
    </div>
  );
}

/* ---------- Color ---------- */

const THEMES_BEFORE = {
  cols: ["Light Prim.", "Light Sec.", "Dark Prim.", "Dark Sec."],
  rows: [
    ["Primary", [C.white, C.gray, C.navy, C.black]],
    ["Secondary", [C.gray, C.white, C.black, C.navy]],
    ["Tertiary", [C.lightBlue, C.lightBlue, C.lightNavy, C.lightNavy]],
  ] as [string, string[]][],
};
const THEMES_AFTER = {
  cols: ["Light", "Dark"],
  rows: [
    ["Primary", [C.white, C.navy]],
    ["Secondary", [C.gray, C.black]],
    ["Tertiary", [C.lightBlue, C.lightNavy]],
  ] as [string, string[]][],
};

function ThemeMatrix({ data }: { data: typeof THEMES_BEFORE }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="text-[11px] uppercase tracking-[0.12em] text-zinc-400">
            <th className="pb-2 font-medium">Background</th>
            {data.cols.map((c) => (
              <th key={c} className="pb-2 font-medium">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map(([name, colors]) => (
            <tr key={name}>
              <th className="py-1 pr-3 font-normal text-zinc-500">{name}</th>
              {colors.map((c, i) => (
                <td key={i} className="py-1 pr-1">
                  <span className="block h-8 rounded-md ring-1 ring-black/5 ring-inset" style={{ background: c }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TokenPath({ path, accent }: { path: string; accent?: boolean }) {
  const parts = path.split("/");
  return (
    <code className="flex flex-wrap items-center gap-y-1 font-mono text-[12.5px]">
      {parts.map((p, i) => (
        <span key={i} className="flex items-center">
          {i > 0 && <span className="px-0.5 text-zinc-400">/</span>}
          <span className={accent ? "text-indigo-800 dark:text-indigo-300" : "text-zinc-700 dark:text-zinc-300"}>{p}</span>
        </span>
      ))}
    </code>
  );
}

const SEMANTIC = [
  { token: "bg/primary", light: C.white, dark: C.navy },
  { token: "bg/secondary", light: C.gray, dark: C.black },
  { token: "foreground/default", light: "#111827", dark: C.white },
  { token: "foreground/disabled", light: C.disabled, dark: C.disabled },
  { token: "action/primary", light: C.after.primary, dark: "#7FB0F5" },
];

function ColorStage({ mode }: { mode: Mode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  if (mode === "interactive") {
    const t = Object.fromEntries(SEMANTIC.map((s) => [s.token, s[theme]]));
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <StageLabel>Same tokens, two modes</StageLabel>
          <Toggle
            label="Theme mode"
            options={[{ id: "light", label: "Light" }, { id: "dark", label: "Dark" }] as const}
            value={theme}
            onChange={setTheme}
          />
        </div>
        <div className="rounded-lg p-6 transition-colors" style={{ background: t["bg/primary"] }}>
          <p className="text-[11px] uppercase tracking-[0.15em]" style={{ color: t["foreground/default"], opacity: 0.6 }}>
            Eyebrow
          </p>
          <p className="mt-2 text-lg font-semibold" style={{ color: t["foreground/default"] }}>
            One token set, resolved per mode
          </p>
          <div className="mt-4 rounded-md p-4" style={{ background: t["bg/secondary"] }}>
            <p className="text-sm" style={{ color: t["foreground/default"] }}>Secondary surface</p>
            <p className="text-sm" style={{ color: t["foreground/disabled"] }}>Disabled text</p>
            <p className="mt-2 text-sm font-medium" style={{ color: t["action/primary"] }}>Learn more →</p>
          </div>
        </div>
        <ul className="font-mono text-xs">
          {SEMANTIC.map((s) => (
            <li key={s.token} className="flex items-center justify-between py-2">
              <span className="text-indigo-800 dark:text-indigo-300">{s.token}</span>
              <span className="flex items-center gap-2 text-zinc-500">
                <span className="h-3 w-3 rounded-sm ring-1 ring-black/10" style={{ background: s[theme] }} />
                {s[theme].toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const before = mode === "before";
  return (
    <div className="space-y-8">
      <div>
        <StageLabel>Token path · {C.disabled}</StageLabel>
        <TokenPath path={before ? "colors/text/button/primary/default/base/disabled" : "foreground/disabled"} accent={!before} />
        <p className="mt-2 text-xs text-zinc-500">{before ? "7 levels, bound to one component" : "2 levels, shared by every component"}</p>
      </div>
      <div>
        <StageLabel>{before ? "4 themes" : "2 themes"}</StageLabel>
        <ThemeMatrix data={before ? THEMES_BEFORE : THEMES_AFTER} />
      </div>
      <div>
        <Ratio label="Text CTA on gray" fg={before ? C.before.text : C.after.primary} bg={C.gray} />
        <Ratio label="Input border (non-text, 3:1)" fg={before ? C.before.input : C.after.input} bg={C.white} min={3} />
      </div>
    </div>
  );
}

/* ---------- Tag ---------- */

const BADGE_VARIANTS = [
  { name: "Default", bg: C.gray, fg: "#1F2937" },
  { name: "Secondary", bg: "transparent", fg: "#1F2937" },
  { name: "Highlight", bg: C.lightBlue, fg: "#1F2937" },
  { name: "Immersive", bg: "#2C4A75", fg: C.white },
];

function Badge({ v, size }: { v: (typeof BADGE_VARIANTS)[number]; size: "sm" | "md" | "lg" }) {
  const s = { sm: "h-5 w-[64px] text-[10px]", md: "h-6 w-[76px] text-xs", lg: "h-7 w-[92px] text-sm" }[size];
  return (
    <span className={`inline-flex items-center justify-center gap-1 overflow-hidden rounded-sm ${s}`} style={{ background: v.bg, color: v.fg }}>
      <VideoIcon className="h-3 w-3" />
      Badge
    </span>
  );
}

function Tag({
  shape,
  size,
  theme,
  icon = true,
  label = "Tag Text",
}: {
  shape: "square" | "pill";
  size: "sm" | "md";
  theme: "light" | "dark";
  icon?: boolean;
  label?: string;
}) {
  const colors = theme === "light" ? { background: C.gray, color: "#1F2937" } : { background: "#1C3F8A", color: C.white };
  return (
    <span
      className={`inline-flex max-w-full items-start gap-1.5 text-left font-medium ${shape === "pill" ? "rounded-full" : "rounded"} ${
        size === "sm" ? "min-h-6 px-2 py-1 text-xs" : "min-h-7 px-2.5 py-1 text-sm"
      }`}
      style={colors}
    >
      {icon && <VideoIcon className={size === "sm" ? "mt-px h-3.5 w-3.5 shrink-0" : "mt-0.5 h-4 w-4 shrink-0"} />}
      <span>{label}</span>
    </span>
  );
}

function TagStage({ mode }: { mode: Mode }) {
  const [shape, setShape] = useState<"square" | "pill">("pill");
  const [size, setSize] = useState<"sm" | "md">("md");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [icon, setIcon] = useState<"on" | "off">("on");
  const [long, setLong] = useState<"short" | "long">("short");

  if (mode === "before") {
    return (
      <div className="space-y-6">
        <StageLabel>Badge · 4 variants × 3 sizes × 4 theme backgrounds</StageLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[C.white, C.gray, C.navy, C.black].map((bg) => (
            <div key={bg} className="space-y-2 rounded-md p-3" style={{ background: bg }}>
              {BADGE_VARIANTS.map((v) => (
                <div key={v.name}>
                  <Badge v={v.name === "Highlight" ? { ...v, bg: bg === C.navy || bg === C.black ? C.before.primary : v.bg, fg: bg === C.navy || bg === C.black ? C.white : v.fg } : v} size="md" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Badge key={s} v={BADGE_VARIANTS[0]} size={s} />
          ))}
          <span className="text-xs text-zinc-500">Fixed width and height, centered text</span>
        </div>
      </div>
    );
  }

  if (mode === "after") {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        {(["light", "dark"] as const).map((t) => (
          <div key={t} className="space-y-3 rounded-md p-5" style={{ background: t === "light" ? C.white : C.navy }}>
            <p className={`text-[11px] uppercase tracking-[0.15em] ${t === "light" ? "text-zinc-400" : "text-white/50"}`}>{t}</p>
            {(["square", "pill"] as const).flatMap((sh) =>
              (["sm", "md"] as const).map((sz) => (
                <div key={sh + sz} className="flex items-center justify-between gap-3">
                  <Tag shape={sh} size={sz} theme={t} />
                  <span className={`font-mono text-[10px] ${t === "light" ? "text-zinc-400" : "text-white/50"}`}>{sh}/{sz}</span>
                </div>
              )),
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Toggle label="Shape" options={[{ id: "square", label: "Square" }, { id: "pill", label: "Pill" }] as const} value={shape} onChange={setShape} />
        <Toggle label="Size" options={[{ id: "sm", label: "sm" }, { id: "md", label: "md" }] as const} value={size} onChange={setSize} />
        <Toggle label="Background" options={[{ id: "light", label: "Light" }, { id: "dark", label: "Dark" }] as const} value={theme} onChange={setTheme} />
        <Toggle label="Icon" options={[{ id: "on", label: "Icon" }, { id: "off", label: "No icon" }] as const} value={icon} onChange={setIcon} />
        <Toggle label="Text length" options={[{ id: "short", label: "Short" }, { id: "long", label: "Long text" }] as const} value={long} onChange={setLong} />
      </div>
      <div className="flex min-h-40 items-center justify-center rounded-lg p-8 transition-colors" style={{ background: theme === "light" ? C.white : C.navy }}>
        <div className="max-w-[220px]">
          <Tag
            shape={shape}
            size={size}
            theme={theme}
            icon={icon === "on"}
            label={long === "long" ? "Long tag text that wraps onto a second line" : "Tag Text"}
          />
        </div>
      </div>
      <p className="text-xs leading-5 text-zinc-500">
        Text stays left-aligned and the height hugs the content — no clipping at any length.
      </p>
    </div>
  );
}
