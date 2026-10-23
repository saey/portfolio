import type { Metadata } from "next";
import {
  Block,
  Body,
  CaseStudyLayout,
  Dot,
  Em,
  Figure,
  Lead,
  Section,
  Subhead,
  TwoCol,
  type Meta,
  type Metric,
} from "../_components/editorial";
import { ImageSlot } from "../_components/ImageSlot";
import { guardHidden } from "../hidden";
import { ImageTabs } from "../_components/ImageTabs";
import { Shot, Tall, Wide } from "../_components/Shot";

export const metadata: Metadata = {
  title: "FGA Planning Dashboard — Case Study",
  description:
    "A planning dashboard that helps Financial Advisors review and act on client plans, built around a third-party planning tool.",
};

/** Media lives in /public/projects/fga/<name>.<ext>. */
const DIR = "projects/fga";

const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "research", label: "Research" },
  { id: "iteration", label: "Ideation & Iteration" },
  { id: "prototype", label: "Final Prototype" },
  { id: "deliverables", label: "Other Deliverables" },
  { id: "results", label: "Results & Next Steps" },
] as const;

const META: Meta[] = [
  { label: "Role", value: "Lead Designer" },
  { label: "Platform", value: "Wealth Management · Desktop" },
  { label: "Duration", value: "8 weeks" },
];

const METRICS: Metric[] = [
  { after: "+16%", label: "FGA active users", detail: "After launch" },
  { after: "17", label: "Financial Advisors", detail: "Interviewed" },
  { after: "3", label: "Design iterations", detail: "Stakeholder and user reviews" },
];

const TEAM = ["2 Stakeholders", "Client-side engineer", "Project Manager", "2 Designers", "2 Researchers"];

const ITERATIONS = [
  {
    id: "1",
    label: "Iteration 1",
    name: "iteration1",
    aspect: "aspect-[996/788]",
    notes: [
      "Stakeholders and SMEs didn't want the plan adjustable here — they wanted to grow active FGA users.",
      "Added the content stakeholders considered useful for advisors.",
    ],
  },
  {
    id: "2",
    label: "Iteration 2",
    name: "iteration2",
    aspect: "aspect-[914/788]",
    notes: [
      "Users liked Combined Details and easy access to What If scenarios.",
      "Adjusting the plan here was preferable but not critical.",
      "The left side carried more than users needed, so content was sorted into necessary, good to have and not necessary.",
    ],
  },
  {
    id: "3",
    label: "Iteration 3",
    name: "iteration3",
    aspect: "aspect-[1072/788]",
    notes: [
      "“Good to have” content moved into a drawer for easy access.",
      "Popular information became individual cards for readability.",
      "Goals tie to the probability of success and plan net worth.",
      "Added the content SMEs and stakeholders required.",
    ],
  },
];

const USE_CASES = [
  {
    title: "Probability of success above 85%",
    name: "fga-above85-vitq6dd2",
    steps: [
      "Check the retirement age and the current scenario's probability of success.",
      "If it looks good, export the planning snapshot — checking plan net worth, retirement income and annual additions as the client needs.",
    ],
  },
  {
    title: "Probability of success below 85%",
    name: "below",
    steps: [
      "Check the retirement age and the current scenario's probability of success.",
      "If it doesn't look good, review Combined Details and alternative scenarios — plus plan net worth, retirement income and annual additions as needed.",
      "Export the What If scenario and the snapshot.",
    ],
  },
];

const SCREENS = [
  { id: "dashboard", label: "Main Dashboard", name: "main-dashboard", aspect: "aspect-[2500/4594]", tall: true },
  { id: "menu", label: "Dashboard Menu", name: "main-dashboard-menu", aspect: "aspect-[2500/4733]", tall: true },
  { id: "no-plan-dashboard", label: "No Plan (Dashboard)", name: "main-dashboard-noplan", aspect: "aspect-[1596/1922]" },
  { id: "no-plan", label: "No Plan", name: "no-plan", aspect: "aspect-[2500/1613]" },
  { id: "flow-1", label: "Screen Flow 1", name: "screenflow", aspect: "aspect-[1818/1492]" },
  { id: "flow-2", label: "Screen Flow 2", name: "screenflow2", aspect: "aspect-[2500/2009]" },
  { id: "flow-3", label: "Screen Flow 3", name: "screenflow3", aspect: "aspect-[2482/1932]" },
];

const DELIVERABLES = [
  "Research consolidation documents",
  "Corner-case wires and flows",
  "Screen flows",
  "Components guide",
  "Prototype",
  "Parent dashboard card for planning",
];

export default function FgaCaseStudy() {
  guardHidden("fga");
  return (
    <CaseStudyLayout
      eyebrow="Case Study — Wealth Management Product & UX"
      title="FGA Planning Dashboard"
      subtitle="A planning dashboard that helps Financial Advisors review and act on client plans, built around a third-party planning tool."
      meta={META}
      metrics={METRICS}
      sections={SECTIONS}
    >
      <div className="pt-16">
        <ImageSlot
          dir={DIR}
          name="apple-cinema-display-in-home-office-3"
          alt="The FGA planning dashboard on a desktop display"
          aspect="aspect-[2500/1638]"
          sizes="(min-width: 1280px) 1000px, 100vw"
          className="rounded-2xl"
        />
      </div>

      {/* 01 */}
      <Section index="01" id="introduction" title="Introduction" first>
        <Lead>
          The future digital planning and discovery experience for{" "}
          <Em>Financial Advisors (FAs) and CSAs,</Em> built into the daily
          advisor lifecycle — aiming for higher FGA adoption and more effective
          advisors.
        </Lead>
        <div className="mt-16">
          <TwoCol
            left={
              <Block label="Role">
                Lead designer, responsible for{" "}
                <Em>research consolidation, concepts and prototypes,</Em> overall
                design decisions and final deliverables, over an eight-week
                engagement.
              </Block>
            }
            right={
              <Block label="Team">
                <ul className="space-y-2">
                  {TEAM.map((t) => (
                    <Dot key={t}>{t}</Dot>
                  ))}
                </ul>
              </Block>
            }
          />
        </div>
      </Section>

      {/* 02 */}
      <Section index="02" id="research" title="Research">
        <Subhead>Current FGA breakdown</Subhead>
        <Body className="max-w-3xl">
          After a system walkthrough with SMEs, a simple sitemap and screen flow
          of the current FGA{" "}
          <Em>gave the team a shared reference</Em> for what users described in
          interviews.
        </Body>
        <div className="mt-8 grid items-start gap-8 md:grid-cols-2">
          <Shot dir={DIR} name="fga-sitemap" alt="Current FGA sitemap" aspect="aspect-[2103/1734]" />
          <Shot dir={DIR} name="fga-screenflow" alt="Current FGA screen flow" aspect="aspect-[2103/1734]" />
        </div>

        <Subhead>Problem statement</Subhead>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Shot
            dir={DIR}
            name="research-consolidation"
            alt="Research consolidation from 17 advisor interviews"
            aspect="aspect-[1303/720]"
          />
          <div>
            <Body>
              Interviews with <Em>17 FAs</Em> were shared with stakeholders to
              shape the scope and problem statement. The main pain point:
            </Body>
            <p className="mt-6 text-xl font-semibold leading-snug text-neutral-900 sm:text-2xl dark:text-white">
              Hard to find the information they need.
            </p>
            <Body className="mt-6">
              FGA was built for planning intake, not for review — yet once
              intake is done, <Em>reviewing and adjusting</Em> are the main use
              cases.
            </Body>
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <Block label="Constraint">
            FGA is a third-party integration with little room to change, so the
            answer was <Em>a dashboard</Em> that helps advisors digest the plan
            and dive into FGA more easily.
          </Block>
        </div>
      </Section>

      {/* 03 */}
      <Section index="03" id="iteration" title="Ideation, Validation & Iteration">
        <Lead>
          Each round was reviewed with <Em>stakeholders, SMEs and users</Em>{" "}
          before the next.
        </Lead>
        <div className="mt-12 space-y-16">
          {ITERATIONS.map((i) => (
            <div key={i.id} className="grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-14">
              <Shot
                dir={DIR}
                name={i.name}
                alt={`FGA dashboard, ${i.label.toLowerCase()}`}
                aspect={i.aspect}
                sizes="(min-width: 1024px) 640px, 100vw"
              />
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.01em] text-neutral-900 sm:text-2xl dark:text-white">
                  {i.label}
                </h3>
                <ul className="mt-6 space-y-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  {i.notes.map((n) => (
                    <Dot key={n}>{n}</Dot>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 04 */}
      <Section index="04" id="prototype" title="Final Prototype">
        <Shot
          dir={DIR}
          name="urban-208"
          alt="Walkthrough of the final FGA dashboard prototype"
          aspect="aspect-[4/3]"
          sizes="(min-width: 1280px) 1000px, 100vw"
        />

        <Subhead>Before a meeting with a client</Subhead>
        <Body className="max-w-3xl">
          Including the corner case where a client reaches out for specific
          information or an update.
        </Body>
        <div className="mt-10 grid gap-x-10 gap-y-14 md:grid-cols-2">
          {USE_CASES.map((u, i) => (
            <figure key={u.name}>
              <Shot
                dir={DIR}
                name={u.name}
                alt={`Use case ${i + 1}: ${u.title}`}
                aspect="aspect-[640/414]"
              />
              <figcaption className="mt-5">
                <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-[#4329a6] dark:text-indigo-300">
                  Use case {i + 1}
                </span>
                <span className="mt-1.5 block font-semibold text-neutral-900 dark:text-white">
                  {u.title}
                </span>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[13px] leading-[1.6] text-zinc-600 marker:text-zinc-400 dark:text-zinc-400">
                  {u.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* 05 */}
      <Section index="05" id="deliverables" title="Other Deliverables">
        <ImageTabs
          label="Deliverables"
          items={SCREENS.map((s) => ({
            id: s.id,
            label: s.label,
            image: s.tall ? (
              <Tall dir={DIR} name={s.name} alt={`FGA ${s.label}`} aspect={s.aspect} />
            ) : (
              <Wide dir={DIR} name={s.name} alt={`FGA ${s.label}`} aspect={s.aspect} />
            ),
          }))}
        />
        <ul className="mt-10 grid max-w-3xl gap-x-10 gap-y-2 text-base leading-8 text-zinc-600 sm:grid-cols-2 dark:text-zinc-400">
          {DELIVERABLES.map((d) => (
            <Dot key={d}>{d}</Dot>
          ))}
        </ul>
      </Section>

      {/* 06 */}
      <Section index="06" id="results" title="Results & Next Steps">
        <Figure value="+16%" note="FGA active users after launch" />

        <Subhead>Next steps</Subhead>
        <Body className="max-w-3xl">
          A few pieces of content — Key Topics and Asset Allocation — were added
          at the last minute at stakeholders&apos; and SMEs&apos; request.{" "}
          <Em>User testing them</Em> would find the best format for advisors.
        </Body>
      </Section>
    </CaseStudyLayout>
  );
}
