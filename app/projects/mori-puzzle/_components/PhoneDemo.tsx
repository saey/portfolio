"use client";

import { useState, type ReactNode } from "react";
import { KAMON, KANJI_FONT, MORI } from "./kanji";

type Screen = "home" | "splash" | "play" | "result" | "library";

const STEPS: { id: Screen; label: string; note: string }[] = [
  { id: "home", label: "Home", note: "Single Play, VS Play and the Library sit one tap away; the Library moved into the bottom menu." },
  { id: "splash", label: "Splash", note: "Added after testing: a short splash before each game sets up the goal." },
  { id: "play", label: "Puzzle", note: "An answer placeholder makes the goal clear: combine parts into one kanji." },
  { id: "result", label: "Result", note: "Meaning and makeup of the kanji. Buttons stack vertically so the next action is unambiguous." },
  { id: "library", label: "Library", note: "Squares for parts, circles for kanji, sortable, with a way back home from the bottom menu." },
];

const TILES = ["日", "木", "月", "亻", "口", "田"];
const ANSWER = ["日", "月"];

/** Coded mobile prototype: step through the core loop, or play the puzzle directly. */
export function PhoneDemo() {
  const [screen, setScreen] = useState<Screen>("home");
  const [picked, setPicked] = useState<string[]>([]);
  const index = STEPS.findIndex((s) => s.id === screen);

  const go = (s: Screen) => {
    if (s === "play") setPicked([]);
    setScreen(s);
  };

  return (
    <div className="grid items-start gap-10 md:grid-cols-[auto_1fr] md:gap-14">
      <div
        role="region"
        aria-label="Mori Puzzle prototype"
        className="mx-auto h-[600px] w-[296px] shrink-0 overflow-hidden rounded-[2.75rem] border-[10px] border-neutral-900 bg-white shadow-xl dark:border-zinc-700"
      >
        <div className="flex h-full flex-col text-neutral-900" aria-live="polite">
          {screen === "home" && <Home go={go} />}
          {screen === "splash" && <Splash go={go} />}
          {screen === "play" && <Play picked={picked} setPicked={setPicked} go={go} />}
          {screen === "result" && <Result go={go} />}
          {screen === "library" && <Library go={go} />}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400">Core loop</p>
        <ol className="mt-5 space-y-1">
          {STEPS.map((s, i) => {
            const active = s.id === screen;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  aria-current={active ? "step" : undefined}
                  onClick={() => go(s.id)}
                  className={`flex w-full gap-4 rounded-lg px-3 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 ${
                    active ? "bg-white dark:bg-zinc-950" : "hover:bg-white/60 dark:hover:bg-zinc-950/60"
                  }`}
                >
                  <span className={`font-mono text-[11px] leading-6 ${active ? "text-indigo-700 dark:text-indigo-400" : "text-zinc-400"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className={`block text-sm font-medium ${active ? "text-neutral-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}>
                      {s.label}
                    </span>
                    {active && <span className="mt-1 block text-sm leading-6 text-zinc-600 dark:text-zinc-400">{s.note}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mt-6 flex gap-3 px-3">
          <StepButton disabled={index === 0} onClick={() => go(STEPS[index - 1].id)}>
            ← Back
          </StepButton>
          <StepButton disabled={index === STEPS.length - 1} onClick={() => go(STEPS[index + 1].id)}>
            Next →
          </StepButton>
        </div>
      </div>
    </div>
  );
}

function StepButton({ children, disabled, onClick }: { children: ReactNode; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:border-indigo-700 hover:text-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 disabled:pointer-events-none disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-white"
    >
      {children}
    </button>
  );
}

/* ---------- Screen pieces ---------- */

type Go = (s: Screen) => void;

const tap =
  "transition-transform active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900";

function AppButton({ children, onClick, tone }: { children: ReactNode; onClick: () => void; tone: "sand" | "sprout" | "ghost" }) {
  const bg = tone === "sand" ? MORI.sand : tone === "sprout" ? MORI.sprout : "transparent";
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ backgroundColor: bg, color: tone === "sand" ? MORI.forest : tone === "sprout" ? "#fff" : undefined }}
      className={`w-full rounded-lg py-3 text-sm font-bold uppercase tracking-wider ${tone === "ghost" ? "normal-case tracking-normal font-semibold text-neutral-600 underline-offset-2 hover:underline" : ""} ${tap}`}
    >
      {children}
    </button>
  );
}

function StatusBar({ light }: { light?: boolean }) {
  return (
    <div className={`flex justify-between px-6 pt-3 text-[10px] font-semibold ${light ? "text-white" : "text-neutral-900"}`}>
      <span>9:41</span>
      <span aria-hidden>●●●</span>
    </div>
  );
}

function BottomMenu({ go, current }: { go: Go; current: "home" | "library" }) {
  const items = [
    { id: "home" as const, label: "Home", glyph: "家" },
    { id: "splash" as const, label: "Play", glyph: "遊" },
    { id: "library" as const, label: "Library", glyph: "本" },
  ];
  return (
    <nav aria-label="App menu" className="mt-auto flex justify-around border-t border-neutral-200 px-4 pb-5 pt-2">
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          onClick={() => go(it.id)}
          aria-current={it.id === current ? "page" : undefined}
          className={`flex flex-col items-center gap-0.5 rounded px-2 text-[10px] ${it.id === current ? "font-semibold text-neutral-900" : "text-neutral-500"} ${tap}`}
        >
          <span aria-hidden className={`text-lg leading-6 ${KANJI_FONT}`} style={it.id === current ? { color: MORI.forest } : undefined}>
            {it.glyph}
          </span>
          {it.label}
        </button>
      ))}
    </nav>
  );
}

function Home({ go }: { go: Go }) {
  return (
    <>
      <div className={`pb-10 text-white ${KAMON}`} style={{ backgroundColor: MORI.forest }}>
        <StatusBar light />
        <div className="px-6 pt-10 text-center">
          <p className={`text-7xl leading-none ${KANJI_FONT}`}>森</p>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.3em] text-white/80">Mori Puzzle</p>
        </div>
      </div>
      <div className="space-y-3 px-6 pt-8">
        <AppButton tone="sand" onClick={() => go("splash")}>
          Single Play
        </AppButton>
        <AppButton tone="sprout" onClick={() => go("splash")}>
          VS Play
        </AppButton>
      </div>
      <BottomMenu go={go} current="home" />
    </>
  );
}

function Splash({ go }: { go: Go }) {
  return (
    <button
      type="button"
      onClick={() => go("play")}
      className={`flex flex-1 flex-col text-white ${KAMON} focus-visible:outline-none`}
      style={{ backgroundColor: MORI.forest }}
    >
      <StatusBar light />
      <span className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/70">Round 1</span>
        <span className="mt-4 text-xl font-semibold">Combine the parts</span>
        <span className="mt-2 text-sm text-white/80">Build the kanji that matches the meaning.</span>
        <span className="mt-10 rounded-lg px-6 py-2.5 text-sm font-bold uppercase tracking-wider" style={{ backgroundColor: MORI.sand, color: MORI.forest }}>
          Tap to start
        </span>
      </span>
    </button>
  );
}

function Play({ picked, setPicked, go }: { picked: string[]; setPicked: (p: string[]) => void; go: Go }) {
  const full = picked.length === ANSWER.length;
  const correct = full && [...picked].sort().join() === [...ANSWER].sort().join();

  return (
    <>
      <StatusBar />
      <div className="flex items-center justify-between px-6 pt-4 text-xs text-neutral-500">
        <button type="button" onClick={() => go("home")} className={`rounded ${tap}`}>
          ✕ Quit
        </button>
        <span>1 / 5</span>
      </div>
      <div className="px-6 pt-6 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">Make the kanji for</p>
        <p className="mt-1 text-2xl font-semibold">bright</p>
      </div>

      {/* Answer placeholder */}
      <div className="mt-6 flex items-center justify-center gap-3">
        {ANSWER.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={picked[i] ? `Remove ${picked[i]}` : `Empty slot ${i + 1}`}
            onClick={() => picked[i] && setPicked(picked.filter((_, j) => j !== i))}
            className={`flex h-16 w-16 items-center justify-center rounded-md text-4xl ${KANJI_FONT} ${
              picked[i] ? "bg-neutral-100" : "border-2 border-dashed border-neutral-300"
            } ${tap}`}
          >
            {picked[i]}
          </button>
        ))}
        <span aria-hidden className="text-xl text-neutral-400">
          =
        </span>
        <span
          className={`flex h-16 w-16 items-center justify-center rounded-full text-4xl ${KANJI_FONT} ${
            correct ? "text-white" : "border-2 border-dashed border-neutral-300 text-neutral-300"
          }`}
          style={correct ? { backgroundColor: MORI.forest } : undefined}
        >
          {correct ? "明" : "?"}
        </span>
      </div>

      <p className="mt-4 h-5 text-center text-xs" role="status">
        {correct ? (
          <span className="font-semibold" style={{ color: MORI.forest }}>
            Correct — sun + moon
          </span>
        ) : full ? (
          <span className="text-neutral-500">Not quite. Tap a part to swap it.</span>
        ) : null}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2.5 px-6">
        {TILES.map((t) => {
          const used = picked.includes(t);
          return (
            <button
              key={t}
              type="button"
              disabled={used || full}
              onClick={() => setPicked([...picked, t])}
              className={`flex aspect-square items-center justify-center rounded-md border border-neutral-200 text-3xl ${KANJI_FONT} disabled:opacity-30 ${tap}`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="mt-auto px-6 pb-6">
        {correct && (
          <AppButton tone="sand" onClick={() => go("result")}>
            Continue
          </AppButton>
        )}
      </div>
    </>
  );
}

function Result({ go }: { go: Go }) {
  return (
    <>
      <div className={`pb-8 text-center text-white ${KAMON}`} style={{ backgroundColor: MORI.forest }}>
        <StatusBar light />
        <p className={`mt-8 text-8xl leading-none ${KANJI_FONT}`}>明</p>
        <p className="mt-3 text-sm">bright · あかるい</p>
      </div>
      <div className="flex items-center justify-center gap-3 pt-6 text-sm">
        <Part char="日" meaning="sun" />
        <span className="text-neutral-400">+</span>
        <Part char="月" meaning="moon" />
      </div>
      <div className="mt-auto space-y-2.5 px-6 pb-6">
        <AppButton tone="sand" onClick={() => go("splash")}>
          Next puzzle
        </AppButton>
        <AppButton tone="sprout" onClick={() => go("library")}>
          Open in Library
        </AppButton>
        <AppButton tone="ghost" onClick={() => go("home")}>
          Back to home
        </AppButton>
      </div>
    </>
  );
}

function Part({ char, meaning }: { char: string; meaning: string }) {
  return (
    <span className="flex flex-col items-center gap-1">
      <span className={`flex h-12 w-12 items-center justify-center rounded-md border border-neutral-300 text-2xl ${KANJI_FONT}`}>{char}</span>
      <span className="text-[11px] text-neutral-500">{meaning}</span>
    </span>
  );
}

function Library({ go }: { go: Go }) {
  return (
    <>
      <StatusBar />
      <div className="flex items-baseline justify-between px-6 pt-5">
        <p className="text-xl font-semibold">Library</p>
        <span className="text-[11px] text-neutral-500">Sort: Radical ▾</span>
      </div>
      <LibraryRow title="Parts" items={["日", "月", "木", "亻"]} shape="square" />
      <LibraryRow title="Kanji" items={["明", "林", "森", "休"]} shape="circle" />
      <BottomMenu go={go} current="library" />
    </>
  );
}

function LibraryRow({ title, items, shape }: { title: string; items: string[]; shape: "square" | "circle" }) {
  return (
    <div className="px-6 pt-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">{title}</p>
      <div className="mt-3 grid grid-cols-4 gap-2.5">
        {items.map((c) => (
          <span
            key={c}
            className={`flex aspect-square items-center justify-center text-2xl ${KANJI_FONT} ${
              shape === "square" ? "rounded-md border border-neutral-300" : "rounded-full text-white"
            }`}
            style={shape === "circle" ? { backgroundColor: MORI.forest } : undefined}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
