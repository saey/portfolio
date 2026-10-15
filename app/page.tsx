import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "./_components/ContactForm";
import { rounded } from "./fonts";
import { HomeTabs, INK } from "./_components/HomeTabs";
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
    title: "Quork Board: Billing & Invoice",
    summary:
      "Streamlining multi-entity invoicing, automated reconciliation, and approval workflows for enterprise financial operations.",
    tags: ["Enterprise SaaS", "Financial Workflows", "Invoice Automation"],
    image: {
      name: "Quork+Board+-+Timesheet+Invoice+Billing_G",
      alt: "Quork Board billing, invoice and timesheet screens",
    },
    href: "/projects/quorkboard-billing",
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
    index: "04",
    title: "Grid UI Unification",
    summary:
      "Unifying grid components and layout rules into one governed system.",
    tags: ["Design System", "Layout Governance"],
    image: {
      name: "GridUnification",
      alt: "Unified grid filter, date picker and column components",
    },
  },
];

const FOCUS = [
  "Product Design",
  "Product Strategy",
  "Design Systems",
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

/** Extra links above the copyright; entries without an href are hidden. */
const CONTACT = [{ label: "LinkedIn", href: "" }];

const LABEL = `text-xs uppercase tracking-widest ${INK.muted}`;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-700 dark:focus-visible:outline-indigo-400";

export default function Home() {
  const contact = CONTACT.filter((c) => c.href);

  return (
    <div className="flex-1 bg-[#F9FAFB] font-sans text-[#1e1b2e] selection:bg-indigo-200 dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-indigo-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <HomeTabs
          title={
            <h1>
              <span
                className={`block text-[32px] leading-none font-bold tracking-[-0.01em] ${rounded.className} text-[#0F172A] dark:text-white`}
              >
                saeworks
              </span>
              <span
                className={`mt-1.5 block text-[15px] leading-snug font-medium tracking-[0.01em] text-[#475569] dark:text-slate-400`}
              >
                Product Design
                <br />
                &amp; Strategy
              </span>
            </h1>
          }
          tabs={[
            {
              id: "case-studies",
              label: "Case Studies",
              content: (
                <ul className="grid gap-4 sm:gap-6 md:grid-cols-2">
                  {PROJECTS.map((p) => (
                    <li key={p.index}>
                      <ProjectTile project={p} />
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              id: "about",
              label: "About",
              centered: true,
              content: (
                <div className="grid w-full max-w-xl gap-12 sm:grid-cols-2">
                  <AboutList label="Core Focus" items={FOCUS} />
                  <AboutList label="Brands" items={CLIENTS} />
                </div>
              ),
            },
            {
              id: "contact",
              label: "Our paths have crossed! :)",
              bottom: true,
              centered: true,
              content: <ContactForm to={EMAIL} />,
            },
          ]}
          footer={
            <div className={`space-y-2 text-[11px] ${INK.muted}`}>
              {contact.length > 0 && (
                <div className="flex gap-4">
                  {contact.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      {...(c.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={`rounded underline-offset-4 hover:text-[#1e1b2e] hover:underline dark:hover:text-white ${focusRing}`}
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              )}
              <p>© 2026 saeworks</p>
            </div>
          }
        />
      </div>
    </div>
  );
}

function AboutList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h2 className={LABEL}>{label}</h2>
      <ul className={`mt-5 space-y-2 text-base ${INK.body}`}>
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
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
      <span className="mt-2 line-clamp-2 max-w-md text-sm leading-snug opacity-80">
        {p.summary}
      </span>
      <span className="mt-4 block text-xs uppercase tracking-wider opacity-60">
        {p.tags.join(" / ")}
      </span>
    </>
  );

  // Linked tiles lift with a soft shadow on hover; upcoming ones stay put.
  const tile = (
    <>
      <span
        className={`relative isolate block overflow-hidden rounded-xl border border-gray-200 transition-[translate,border-color] duration-300 ease-out motion-reduce:transition-none dark:border-zinc-800 ${
          upcoming
            ? ""
            : "group-hover:-translate-y-1 group-hover:border-gray-300 group-focus-visible:-translate-y-1 group-focus-visible:border-gray-300 motion-reduce:group-hover:translate-y-0 dark:group-hover:border-zinc-700"
        }`}
      >
        <ImageSlot
          dir={THUMB_DIR}
          name={p.image.name}
          alt={p.image.alt}
          aspect="aspect-[3/2]"
          sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw"
          className="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <span
          className={`absolute inset-0 hidden flex-col justify-end bg-neutral-900/70 p-6 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-8 [@media(hover:hover)]:flex`}
        >
          {details}
        </span>
      </span>
      <span className="mt-4 block text-[#4a4560] [@media(hover:hover)]:hidden dark:text-[#cfcae0]">
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
    <Link href={p.href} className={`group block rounded-xl ${focusRing}`}>
      {tile}
    </Link>
  );
}
