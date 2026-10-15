import Link from "next/link";
import type { ReactNode } from "react";
import { rounded } from "../../fonts";
import { SectionNav } from "./SectionNav";

/* Shared editorial building blocks for case-study pages (mirrors /projects/design-system). */

export type Metric = { before?: string; after: string; label: string; detail: string };
export type Meta = { label: string; value: string };
export type SectionLink = { id: string; label: string };

export function CaseStudyLayout({
  eyebrow,
  title,
  subtitle,
  meta,
  metrics,
  sections,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: ReactNode;
  meta: Meta[];
  /** Optional results row; omit for a title-only header. */
  metrics?: Metric[];
  sections: readonly SectionLink[];
  children: ReactNode;
}) {
  return (
    <div className="flex-1 bg-[#F9FAFB] font-sans text-zinc-900 selection:bg-indigo-200 dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-indigo-900">
      <div className="bg-indigo-800 text-white dark:bg-indigo-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <header className={metrics?.length ? "pt-10" : "pb-20 pt-10"}>
            <Link
              href="/"
              className="rounded text-sm text-indigo-200 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              ← Case Studies
            </Link>
            <p className="mt-20 text-xs font-medium uppercase tracking-[0.25em] text-indigo-200">{eyebrow}</p>
            <h1 className={`mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-6xl ${rounded.className}`}>
              {title}
            </h1>
            <p className="mt-8 max-w-2xl text-xl font-normal leading-relaxed text-indigo-100">{subtitle}</p>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-wider opacity-75">
              {meta.map((m) => (
                <div key={m.label} className="flex gap-2">
                  <dt className="text-indigo-200">{m.label}</dt>
                  <dd className="text-white">{m.value}</dd>
                </div>
              ))}
            </dl>
          </header>
          {metrics?.length ? (
            <dl className={`grid grid-cols-2 gap-x-6 gap-y-10 pb-16 pt-8 sm:grid-cols-3 ${metrics.length === 4 ? "lg:grid-cols-4" : ""}`}>
              {metrics.map((m) => (
                <Stat key={m.label} metric={m} />
              ))}
            </dl>
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
          <aside className="hidden pt-24 lg:block">
            <SectionNav sections={sections} />
          </aside>
          <main className="min-w-0">{children}</main>
        </div>

        <footer className="flex items-center justify-between border-t border-zinc-200 py-12 text-sm dark:border-zinc-800">
          <Link href="/" className="text-zinc-600 transition-colors hover:text-indigo-700 dark:text-zinc-400 dark:hover:text-indigo-400">
            ← All case studies
          </Link>
          <a
            href={`#${sections[0]?.id ?? ""}`}
            className="text-zinc-500 transition-colors hover:text-indigo-700 dark:hover:text-indigo-400"
          >
            Back to top ↑
          </a>
        </footer>
      </div>
    </div>
  );
}

function Stat({ metric }: { metric: Metric }) {
  return (
    <div className="flex flex-col">
      <dt className="order-2 mt-3 text-sm font-medium">{metric.label}</dt>
      <dd className="order-1 flex items-baseline gap-2 whitespace-nowrap">
        {metric.before && (
          <>
            <span className="text-2xl font-light tracking-[-0.03em] opacity-60">{metric.before}</span>
            <span aria-label="to" className="text-base opacity-60">
              →
            </span>
          </>
        )}
        <span className="text-5xl font-semibold tracking-[-0.04em] text-white">{metric.after}</span>
      </dd>
      <dd className="order-3 mt-0.5 text-xs text-indigo-200">{metric.detail}</dd>
    </div>
  );
}

export function Section({
  index,
  id,
  title,
  first,
  children,
}: {
  index: string;
  id: string;
  title: string;
  first?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-8 py-16 sm:py-20 ${first ? "" : "border-t border-zinc-200 dark:border-zinc-800"}`}
    >
      <p className="font-mono text-xs text-indigo-700 dark:text-indigo-400">{index}</p>
      <h2 id={`${id}-title`} className={`mt-3 text-4xl font-semibold tracking-[-0.02em] text-neutral-950 sm:text-5xl dark:text-white ${rounded.className}`}>
        {title}
      </h2>
      <div className="mt-12">{children}</div>
    </section>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-3xl text-xl leading-relaxed text-zinc-700 sm:text-2xl sm:leading-relaxed dark:text-zinc-300">
      {children}
    </p>
  );
}

export function Subhead({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-6 mt-20 text-xl font-semibold tracking-[-0.01em] text-neutral-900 sm:text-2xl dark:text-white">
      {children}
    </h3>
  );
}

export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-base leading-8 text-zinc-600 dark:text-zinc-400 ${className}`}>{children}</p>;
}

export function Em({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-neutral-900 dark:text-white">{children}</strong>;
}

export function Dot({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-indigo-600" />
      <span>{children}</span>
    </li>
  );
}

export function Figure({ value, note }: { value: string; note: string }) {
  return (
    <div>
      <p className="text-5xl font-light tracking-[-0.05em] text-indigo-700 sm:text-6xl dark:text-indigo-400">{value}</p>
      <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{note}</p>
    </div>
  );
}

export function TwoCol({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

export function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400">{label}</p>
      <div className="mt-4 text-base leading-8 text-zinc-700 dark:text-zinc-300">{children}</div>
    </div>
  );
}

export function List({ items, className = "mt-12" }: { items: [string, string][]; className?: string }) {
  return (
    <dl className={`grid gap-x-12 gap-y-8 sm:grid-cols-2 ${className}`}>
      {items.map(([term, desc]) => (
        <div key={term}>
          <dt className="font-semibold text-neutral-900 dark:text-white">{term}</dt>
          <dd className="mt-1.5 leading-7 text-zinc-600 dark:text-zinc-400">{desc}</dd>
        </div>
      ))}
    </dl>
  );
}
