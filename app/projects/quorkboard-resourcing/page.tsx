import type { Metadata } from "next";
import {
  Block,
  Body,
  CaseStudyLayout,
  Dot,
  Em,
  Figure,
  Lead,
  List,
  Section,
  Subhead,
  TwoCol,
  type Meta,
  type Metric,
} from "../_components/editorial";
import { ImageSlot } from "../_components/ImageSlot";
import { guardHidden } from "../hidden";
import { ImageTabs } from "../_components/ImageTabs";
import { Shot, Wide } from "../_components/Shot";
import {
  ProductWalkthrough,
  type WalkthroughFlow,
} from "../quorkboard-billing/_components/ProductWalkthrough";

export const metadata: Metadata = {
  title: "Quork Board: Resourcing — Case Study",
  description:
    "Digitizing how Unqork staffs its projects — from an engagement manager's request to the Operations team's talent assignment.",
};

/** Media lives in /public/projects/quorkboard-resourcing/<name>.<ext>. */
const DIR = "projects/quorkboard-resourcing";

const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "flows", label: "Interviews & Current Flow" },
  { id: "requirements", label: "Requirements & Sitemap" },
  { id: "iteration", label: "Design Iteration" },
  { id: "product", label: "Final Product" },
  { id: "results", label: "Results & Next Steps" },
] as const;

const META: Meta[] = [
  { label: "Platform", value: "Enterprise SaaS (Unqork)" },
  { label: "Duration", value: "20 weeks" },
  { label: "Tooling", value: "Figma · User Research · User Flows" },
];

const METRICS: Metric[] = [
  { before: "1.3", after: "3.8", label: "SUS survey score", detail: "System usability" },
  { after: "−62%", label: "Assignment time", detail: "New projects, on average" },
  { after: "−14%", label: "Invoice pushback", detail: "Caused by resourcing" },
  { after: "10+", label: "Feedback sessions", detail: "Weekly, across 20 weeks" },
];

const TEAM = ["2 Designers", "Project Manager", "2 SMEs from the Finance and Operations teams"];

const ITERATIONS = [
  { id: "1", label: "Iteration 1", name: "iteration1", aspect: "aspect-[2438/2414]" },
  { id: "2", label: "Iteration 2", name: "iteration2", aspect: "aspect-[2500/1952]" },
  { id: "3", label: "Iteration 3", name: "iteration3", aspect: "aspect-[2500/2307]" },
];

/** Product screens and recordings, all 4:3. */
function Screen({ name, alt }: { name: string; alt: string }) {
  return (
    <ImageSlot
      dir={DIR}
      name={name}
      alt={alt}
      aspect="aspect-[4/3]"
      fit="contain"
      sizes="(min-width: 1024px) 600px, 100vw"
      className="!bg-transparent rounded-md"
    />
  );
}

const FLOWS: WalkthroughFlow[] = [
  {
    id: "new-project",
    label: "New project",
    steps: [
      {
        actor: "Engagement manager",
        caption: "Open the new project's resourcing.",
        image: <Screen name="em-0-initialscreen" alt="Initial resourcing screen for a new project" />,
      },
      {
        actor: "Engagement manager",
        caption: "Enter the initial resourcing.",
        image: <Screen name="em-1-initial" alt="Engagement manager entering the initial resourcing" />,
      },
      {
        actor: "Engagement manager",
        caption: "Add a note for the Operations team.",
        image: <Screen name="em-2-addnote" alt="Adding a note to the resourcing request" />,
      },
      {
        actor: "Engagement manager",
        caption: "Submit the request.",
        image: <Screen name="em-3-submit" alt="Submitting the resourcing request" />,
      },
      {
        actor: "Engagement manager",
        caption: "The request waits for the Operations team.",
        image: <Screen name="em-4-aftersubmitscreen" alt="Project screen after the request is submitted" />,
      },
      {
        actor: "Operations",
        caption: "Start the assignment.",
        image: <Screen name="op-0-assignstart" alt="Operations starts the talent assignment" />,
      },
      {
        actor: "Operations",
        caption: "Select talent for each role.",
        image: <Screen name="op-1-selecttalent-small" alt="Operations selecting talent" />,
      },
      {
        actor: "Operations",
        caption: "Check a talent's details.",
        image: <Screen name="op-1-talentdetails" alt="Talent details" />,
      },
      {
        actor: "Operations",
        caption: "Review recommended talent.",
        image: <Screen name="op-2-recommendation" alt="Recommended talent for a role" />,
      },
      {
        actor: "Operations",
        caption: "Or search for talent directly.",
        image: <Screen name="op-3-search" alt="Searching for talent" />,
      },
      {
        actor: "Operations",
        caption: "Add a note.",
        image: <Screen name="op-2-addnote" alt="Operations adding a note" />,
      },
      {
        actor: "Operations",
        caption: "Submit the assignment.",
        image: <Screen name="op-3-submit" alt="Operations submitting the assignment" />,
      },
    ],
  },
  {
    id: "adjustment",
    label: "Resourcing adjustment",
    steps: [
      {
        actor: "Project manager",
        caption: "Request a resourcing adjustment on an ongoing project, with a note.",
        image: <Screen name="pm-addnote" alt="Project manager requesting a resourcing adjustment" />,
      },
      {
        actor: "Operations",
        caption: "Assign talent, just as for a new project.",
        image: <Screen name="op-1-selecttalent-small" alt="Operations selecting talent" />,
      },
    ],
  },
];

const NEXT_STEPS: [string, string][] = [
  [
    "Improve the initial assignment flow",
    "The MVP follows today's workflow and responsibilities, as stakeholders asked. Post-MVP, the flow could be much shorter without the engagement manager's initial schedule, since Operations checks and adjusts schedules during assignment anyway.",
  ],
  [
    "An initial set of recommendations",
    "Start from the best set of assignments. Left out of the MVP for engineering feasibility — for now, recommendations appear only when Operations picks talent one by one.",
  ],
  [
    "Save for later",
    "Save assignment progress. Not critical, but good to have.",
  ],
  [
    "Talent skill sets",
    "Include skill sets in recommendations. Today they can only be requested in notes and picked by hand; left out of the MVP for engineering feasibility.",
  ],
];

export default function QuorkResourcingCaseStudy() {
  guardHidden("quorkboard-resourcing");
  return (
    <CaseStudyLayout
      eyebrow="Case Study — Enterprise Product & UX"
      title="Quork Board: Resourcing"
      subtitle="Digitizing how Unqork staffs its projects — from an engagement manager's request to the Operations team's talent assignment."
      meta={META}
      metrics={METRICS}
      sections={SECTIONS}
    >
      <div className="pt-16">
        <ImageSlot
          dir={DIR}
          name="quork-board-resourcing"
          alt="Quork Board resourcing screens"
          aspect="aspect-[2500/1778]"
          sizes="(min-width: 1280px) 1000px, 100vw"
          className="rounded-2xl"
        />
      </div>

      {/* 01 */}
      <Section index="01" id="introduction" title="Introduction" first>
        <TwoCol
          left={
            <Block label="Background">
              Unqork wanted to run its internal operations more effectively, but
              relied on <Em>Excel and manual processes</Em> — time-consuming, and
              records often got lost.
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
        <Body className="mt-12 max-w-3xl">
          A 20-week engagement covering Financial Analysis, Resourcing, Billing
          and Invoice. This case study follows <Em>Resourcing.</Em>
        </Body>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <Shot
            dir={DIR}
            name="user-em"
            alt="Engagement managers: pain points and scope"
            aspect="aspect-[1194/1520]"
          />
          <Shot
            dir={DIR}
            name="user-op-resourcing"
            alt="Operations team: pain points and scope"
            aspect="aspect-[1194/1520]"
          />
        </div>
      </Section>

      {/* 02 */}
      <Section index="02" id="flows" title="Interviews & Current User Flow">
        <Lead>
          Interviews with <Em>four engagement managers and the Operations team</Em>{" "}
          revealed the current process, its pain points and the needs that
          shaped the product scope.
        </Lead>
        <Body className="mt-8 max-w-3xl">
          The findings were mapped into user flows to confirm the team&apos;s
          understanding. With stakeholders and users,{" "}
          <Em>the decision was to digitize the current flow.</Em>
        </Body>

        <Subhead>New project: assign talent</Subhead>
        <Shot
          dir={DIR}
          name="new-project"
          alt="Current flow for assigning talent to a new project"
          aspect="aspect-[2500/793]"
          sizes="(min-width: 1280px) 1000px, 100vw"
        />

        <Subhead>Ongoing project: resourcing adjustment</Subhead>
        <Shot
          dir={DIR}
          name="existing-project"
          alt="Current flow for adjusting resourcing on an ongoing project"
          aspect="aspect-[2500/904]"
          sizes="(min-width: 1280px) 1000px, 100vw"
        />
      </Section>

      {/* 03 */}
      <Section index="03" id="requirements" title="Requirements & Sitemap">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.01em] text-neutral-900 sm:text-2xl dark:text-white">
              Requirement cheat sheet
            </h3>
            <Body className="mt-6">
              <Em>A shared requirement cheat sheet,</Em> built with the
              engagement managers and Operations team. Its baseline came from
              the interviews and current-flow walkthroughs; everyone then shaped
              the requirement scope together.
            </Body>
          </div>
          <Shot
            dir={DIR}
            name="requirement-gathering-resourcing"
            alt="Requirement cheat sheet for Resourcing"
            aspect="aspect-[2500/1697]"
          />
        </div>

        <Subhead>Proposed sitemap</Subhead>
        <Shot
          dir={DIR}
          name="proposed-sitemap-resourcing"
          alt="Proposed sitemap for Resourcing"
          aspect="aspect-[2500/1072]"
          sizes="(min-width: 1280px) 1000px, 100vw"
        />
      </Section>

      {/* 04 */}
      <Section index="04" id="iteration" title="Design Iteration">
        <Lead>
          Weekly design feedback and testing —{" "}
          <Em>10+ feedback sessions and iterations</Em> within 20 weeks.
        </Lead>
        <div className="mt-12">
          <ImageTabs
            label="Design iterations"
            items={ITERATIONS.map((i) => ({
              id: i.id,
              label: i.label,
              image: (
                <Wide dir={DIR} name={i.name} alt={`Resourcing design, ${i.label.toLowerCase()}`} aspect={i.aspect} />
              ),
            }))}
          />
        </div>
      </Section>

      {/* 05 */}
      <Section index="05" id="product" title="Final Product">
        <Lead>
          Two use cases: <Em>staffing a new project,</Em> and{" "}
          <Em>adjusting resourcing on an ongoing one.</Em>
        </Lead>
        <div className="mt-12">
          <ProductWalkthrough flows={FLOWS} />
        </div>
      </Section>

      {/* 06 */}
      <Section index="06" id="results" title="Results & Next Steps">
        <div className="grid gap-x-16 gap-y-12 sm:grid-cols-2">
          <Figure value="1.3 → 3.8" note="SUS survey score" />
          <Figure value="−62%" note="Assignment time for new projects, on average" />
          <Figure value="−14%" note="Client invoice pushback caused by resourcing" />
        </div>

        <Subhead>Next steps</Subhead>
        <List items={NEXT_STEPS} className="mt-0" />
      </Section>
    </CaseStudyLayout>
  );
}
