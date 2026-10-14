"use client";

import { useState, type ReactNode } from "react";
import { Toggle } from "../../_components/Toggle";
import { STAGE, SURFACE } from "../../_components/stage";

export type WalkthroughStep = {
  /** Who acts at this step, e.g. "OP / Admin". */
  actor: string;
  caption: string;
  note?: string;
  /** Server-rendered screen or recording. */
  image: ReactNode;
};

export type WalkthroughFlow = {
  id: string;
  label: string;
  steps: WalkthroughStep[];
};

/** Tabbed product flows: a numbered step list beside the matching screen. */
export function ProductWalkthrough({ flows }: { flows: WalkthroughFlow[] }) {
  const [flowId, setFlowId] = useState(flows[0].id);
  const [index, setIndex] = useState(0);
  const flow = flows.find((f) => f.id === flowId) ?? flows[0];
  const step = flow.steps[index] ?? flow.steps[0];
  const last = flow.steps.length - 1;

  const selectFlow = (id: string) => {
    setFlowId(id);
    setIndex(0);
  };

  return (
    <div className={STAGE}>
      <Toggle
        label="Product flow"
        options={flows}
        value={flowId}
        onChange={selectFlow}
        size="md"
        level={1}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        <ol className="space-y-1" aria-label={`${flow.label} steps`}>
          {flow.steps.map((s, i) => {
            const active = i === index;
            return (
              <li key={s.caption}>
                <button
                  type="button"
                  aria-current={active ? "step" : undefined}
                  onClick={() => setIndex(i)}
                  className={`flex w-full gap-4 rounded-lg px-3 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 ${
                    active
                      ? "bg-white shadow-sm dark:bg-zinc-950"
                      : "hover:bg-white/60 dark:hover:bg-zinc-950/60"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      active
                        ? "bg-[#4329a6] text-white"
                        : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                      {s.actor}
                    </span>
                    <span
                      className={`mt-0.5 block text-sm leading-6 ${
                        active
                          ? "font-medium text-neutral-900 dark:text-white"
                          : "text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {s.caption}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <figure className="min-w-0">
          <div
            className={`overflow-hidden rounded-xl border border-zinc-200 p-3 dark:border-zinc-800 ${SURFACE}`}
          >
            {step.image}
          </div>
          <figcaption className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <p className="max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              {step.note ?? step.caption}
            </p>
            <span className="flex gap-2">
              <StepButton
                label="Previous step"
                disabled={index === 0}
                onClick={() => setIndex(index - 1)}
              >
                ←
              </StepButton>
              <StepButton
                label="Next step"
                disabled={index === last}
                onClick={() => setIndex(index + 1)}
              >
                →
              </StepButton>
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
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
      className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-sm text-zinc-700 transition-colors hover:border-[#4329a6] hover:text-[#4329a6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 disabled:pointer-events-none disabled:opacity-30 dark:border-zinc-700 dark:text-zinc-300"
    >
      {children}
    </button>
  );
}
