import type { Metadata } from "next";
import Link from "next/link";
import { ImageSlot } from "./projects/_components/ImageSlot";

export const metadata: Metadata = {
  title: "saeworks — Product Design & Strategy",
  description:
    "Product design and strategy: design systems, accessibility and enterprise product work.",
};

/** Thumbnails live in /public/projects/top-page/<name>.<ext>. */
const THUMB_DIR = "projects/top-page";

type Project = {
  index: string;
  title: string;
  summary: string;
  tags: string[];
  image: { name: string; alt: string };
  /** Omit for upcoming projects. */
  href?: string;
};

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Design System Refactoring & Remediation",
    summary:
      "Rebuilding an agency-made library into role-based semantic tokens — accessible by default and built around AEM.",
    tags: ["Enterprise Architecture", "Accessibility", "AEM"],
    image: {
      name: "Apple+Cinema+display+in+home+office",
      alt: "Asset allocation screen on a desktop display",
    },
    href: "/projects/design-system",
  },
  {
    index: "02",
    title: "Mori Puzzle — Gamifying Kanji Learning",
    summary:
      "Gamifying Kanji learning into an intuitive, interactive mobile experience.",
    tags: ["Mobile App", "Gamification", "UX Research"],
    image: { name: "mori-puzzle", alt: "Mori Puzzle app screens on iPhone" },
    href: "/projects/mori-puzzle",
  },
  {
    index: "03",
    title: "Grid UI Unification",
    summary:
      "Unifying grid components and layout rules into one governed system.",
    tags: ["Design System", "Layout Governance"],
    image: {
      name: "GridUnification",
      alt: "Unified grid filter, date picker and column components",
    },
  },
  {
    index: "04",
    title: "Quork Board: Resourcing",
    summary:
      "Planning and assigning people across projects in an enterprise SaaS board.",
    tags: ["Enterprise SaaS", "Resource Management"],
    image: {
      name: "Quork+Board+-+Resourcing",
      alt: "Quork Board resourcing screens",
    },
  },
];

const FOCUS = [
  "Design Systems",
  "Product Strategy",
  "Accessibility",
  "Mentorship",
];

const CLIENTS = [
  "Morgan Stanley",
  "Goldman Sachs",
  "Unqork",
  "UBS",
  "Silicon Valley Bank",
];

const EMAIL = "y.okeas.3mstk@gmail.com";

/** Extra links for the footer; entries without an href are hidden. */
const CONTACT = [{ label: "LinkedIn", href: "" }];

const LABEL =
  "text-xs uppercase tracking-widest text-neutral-400 dark:text-zinc-500";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-700 dark:focus-visible:outline-indigo-400";

export default function Home() {
  const contact = CONTACT.filter((c) => c.href);

  return (
    <div className="flex-1 bg-white font-sans text-neutral-900 selection:bg-indigo-200 dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-indigo-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Title column on the left, work on the right; stacked on small screens. */}
        <div className="pt-16 sm:pt-24 lg:grid lg:grid-cols-[240px_1fr] lg:gap-16">
          <header className="pb-12 lg:pb-0">
            <div className="lg:sticky lg:top-24">
              <h1>
                <span className="block text-xl font-medium tracking-[-0.01em] text-neutral-900 sm:text-2xl dark:text-white">
                  saeworks
                </span>
                <span className="mt-1 block text-sm font-normal text-neutral-500 sm:text-base dark:text-zinc-400">
                  Product Design &amp; Strategy
                </span>
              </h1>
              <a
                href={`mailto:${EMAIL}`}
                className={`mt-4 inline-block rounded text-xs text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline dark:text-zinc-400 dark:hover:text-white ${focusRing}`}
              >
                Our paths has been crossed! :)
              </a>
            </div>
          </header>

          <main>
            <section aria-labelledby="work-title">
              <h2 id="work-title" className="sr-only">
                Case Studies
              </h2>
              <ul className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {PROJECTS.map((p) => (
                  <li key={p.index}>
                    <ProjectTile project={p} />
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="background-title"
              className="mt-28 grid gap-8 sm:grid-cols-[160px_1fr_1fr]"
            >
              <h2 id="background-title" className={LABEL}>
                Background
              </h2>
              <ul
                aria-label="Focus"
                className="space-y-1.5 text-sm font-normal text-neutral-500 dark:text-zinc-400"
              >
                {FOCUS.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <ul
                aria-label="Clients"
                className="space-y-1.5 text-sm font-normal text-neutral-500 dark:text-zinc-400"
              >
                {CLIENTS.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          </main>
        </div>

        <footer className="mt-28 flex flex-wrap items-baseline justify-between gap-6 border-t border-neutral-200 py-10 text-sm dark:border-zinc-800">
          <div className="flex items-baseline gap-8">
            {contact.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`rounded text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline dark:text-zinc-400 dark:hover:text-white ${focusRing}`}
              >
                {c.label}
              </a>
            ))}
          </div>
          <span className="text-neutral-400 dark:text-zinc-500">
            © 2026 saeworks
          </span>
        </footer>
      </div>
    </div>
  );
}

/**
 * Image-only tile. Details fade in over the image on hover or keyboard focus;
 * on touch screens (no hover) they sit quietly under the image instead.
 */
function ProjectTile({ project: p }: { project: Project }) {
  const upcoming = !p.href;

  const details = (
    <>
      <span className="flex items-center gap-3">
        <span className="text-xs uppercase tracking-widest opacity-70">
          Case Study {p.index}
        </span>
        {upcoming && (
          <span className="rounded-full border border-current px-2.5 py-0.5 text-[11px] uppercase tracking-wider opacity-90">
            Coming Soon
          </span>
        )}
      </span>
      <span className="mt-3 block text-lg font-medium leading-snug">
        {p.title}
      </span>
      <span className="mt-2 block max-w-md text-sm leading-6 opacity-80">
        {p.summary}
      </span>
      <span className="mt-4 block text-xs uppercase tracking-wider opacity-60">
        {p.tags.join(" / ")}
      </span>
    </>
  );

  const tile = (
    <>
      <span className="relative block overflow-hidden rounded-lg">
        <ImageSlot
          dir={THUMB_DIR}
          name={p.image.name}
          alt={p.image.alt}
          aspect="aspect-[3/2]"
          sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw"
          className="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <span className="absolute inset-0 hidden flex-col justify-end bg-neutral-900/70 p-6 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-8 [@media(hover:hover)]:flex">
          {details}
        </span>
      </span>
      <span className="mt-4 block text-neutral-700 [@media(hover:hover)]:hidden dark:text-zinc-300">
        {details}
      </span>
    </>
  );

  if (!p.href) {
    return (
      <div aria-disabled="true" className="group cursor-default select-none">
        {tile}
      </div>
    );
  }

  return (
    <Link href={p.href} className={`group block rounded-lg ${focusRing}`}>
      {tile}
    </Link>
  );
}
