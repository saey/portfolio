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
  title: "Quork Board: Financial Analysis — Case Study",
  description:
    "Turning Excel-based reporting into portfolio, project and client financial analysis for Unqork's operations and leadership.",
};

/** Media lives in /public/projects/quorkboard-financial/<name>.webp. */
const DIR = "projects/quorkboard-financial";

const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "research", label: "Interviews & Journey" },
  { id: "requirements", label: "Requirements & Sitemap" },
  { id: "iteration", label: "Design Iteration" },
  { id: "final", label: "Final Design" },
  { id: "results", label: "Results & Next Steps" },
] as const;

const META: Meta[] = [
  { label: "Platform", value: "Enterprise SaaS (Unqork)" },
  { label: "Duration", value: "20 weeks" },
  { label: "Tooling", value: "Figma · User Research · Information Architecture" },
];

const METRICS: Metric[] = [
  { after: "+43%", label: "SUS survey score", detail: "System usability" },
  { after: "6", label: "Users interviewed", detail: "Finance and Operations" },
  { after: "3", label: "User groups", detail: "Operations, Finance and Leadership" },
];

const TEAM = ["2 Designers", "Project Manager", "2 SMEs from the Finance and Operations teams"];
const USERS = ["Internal Operations team", "Business leadership (CEO, CFO, COO)", "Internal Finance team"];

const ITERATIONS = [
  {
    id: "portfolio-v1",
    label: "Portfolio v1",
    name: "financial-dashboard-v1",
    caption: "Financial (portfolio) analysis, first iteration.",
  },
  { id: "portfolio-v2", label: "Portfolio v2", name: "financial-dashboard-v2", caption: "Financial (portfolio) analysis, second iteration." },
  { id: "portfolio-v3", label: "Portfolio v3", name: "financial-dashboard-v3", caption: "Financial (portfolio) analysis, third iteration." },
  { id: "project-v1", label: "Project v1", name: "product-financial-v1", caption: "Project financial analysis, first iteration." },
  { id: "project-v2", label: "Project v2", name: "product-financial-v2", caption: "Project financial analysis, second iteration." },
  { id: "project-v2b", label: "Project v2 (alt)", name: "product-financial-v2-1", caption: "Project financial analysis, an alternative to the second iteration." },
];

/** Final screens; tall pages scroll inside their frame. */
const PORTFOLIO_SCREENS = [
  { id: "summary", label: "Portfolio Summary", name: "qorkboard-portfolio-summary", aspect: "aspect-[2500/4166]", tall: true },
  { id: "analysis", label: "Financial Analysis", name: "qorkboard-financial-analysis", aspect: "aspect-[2500/4604]", tall: true },
  { id: "report", label: "Financial Report", name: "portfolio-financial-report", aspect: "aspect-[2446/1834]" },
  { id: "health", label: "Project Health", name: "portfolio-project-health", aspect: "aspect-[2426/1820]" },
];

const CLIENT_SCREENS = [
  { id: "projects", label: "Projects", name: "qorkboard-projects", aspect: "aspect-[4/3]" },
  { id: "project", label: "Project Analysis", name: "qorkboard-project-page-financial-analysis", aspect: "aspect-[2500/4045]", tall: true },
  { id: "history", label: "Project History", name: "project-history", aspect: "aspect-[2438/1828]" },
  { id: "accounts", label: "Client Accounts", name: "qorkboard-client-accounts", aspect: "aspect-[4/3]" },
  { id: "client", label: "Client Analysis", name: "qorkboard-client-page-financial-analysis", aspect: "aspect-[2500/4613]", tall: true },
];

function screenTabs(screens: typeof CLIENT_SCREENS) {
  return screens.map((s) => ({
    id: s.id,
    label: s.label,
    image: s.tall ? (
      <Tall dir={DIR} name={s.name} alt={`Quork Board ${s.label} screen`} aspect={s.aspect} />
    ) : (
      <Wide dir={DIR} name={s.name} alt={`Quork Board ${s.label} screen`} aspect={s.aspect} />
    ),
  }));
}

export default function QuorkFinancialCaseStudy() {
  guardHidden("quorkboard-financial");
  return (
    <CaseStudyLayout
      eyebrow="Case Study — Enterprise Product & UX"
      title="Quork Board: Financial Analysis"
      subtitle="Turning Excel-based reporting into portfolio, project and client financial analysis for Unqork's operations and leadership."
      meta={META}
      metrics={METRICS}
      sections={SECTIONS}
    >
      <div className="pt-16">
        <ImageSlot
          dir={DIR}
          name="macbook-pro-mockup"
          alt="Quork Board financial analysis on a laptop"
          aspect="aspect-[2500/1463]"
          sizes="(min-width: 1280px) 1000px, 100vw"
          className="rounded-2xl"
        />
      </div>

      {/* 01 */}
      <Section index="01" id="introduction" title="Introduction" first>
        <Lead>
          Unqork wanted to run its internal operations more effectively. The
          business relied on <Em>Excel and manual processes</Em> — time-consuming,
          and records often got lost.
        </Lead>
        <Body className="mt-8 max-w-3xl">
          A 20-week engagement covering Financial Analysis, Resourcing,
          Timesheet, Billing and Invoice. This case study follows{" "}
          <Em>Financial Analysis.</Em>
        </Body>

        <div className="mt-16">
          <TwoCol
            left={
              <Block label="Team">
                <ul className="space-y-2">
                  {TEAM.map((t) => (
                    <Dot key={t}>{t}</Dot>
                  ))}
                </ul>
              </Block>
            }
            right={
              <Block label="Primary users">
                <ul className="space-y-2">
                  {USERS.map((u) => (
                    <Dot key={u}>{u}</Dot>
                  ))}
                </ul>
              </Block>
            }
          />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <Shot
            dir={DIR}
            name="user-op"
            alt="Operations team and leadership: manual reporting from Excel and third-party systems"
            aspect="aspect-[1194/1520]"
          />
          <Shot
            dir={DIR}
            name="user-financial"
            alt="Finance team: pain points and scope"
            aspect="aspect-[1194/1520]"
          />
        </div>
      </Section>

      {/* 02 */}
      <Section index="02" id="research" title="User Interviews & Journey">
        <Lead>
          Interviews with <Em>six Finance and Operations users</Em> revealed the
          current process, its pain points and the needs that shaped the product
          scope.
        </Lead>

        <Subhead>User journey</Subhead>
        <Body className="max-w-3xl">
          The findings became a user journey for Timesheet, Billing and Invoice
          —{" "}
          <Em>visualizing a complicated flow</Em> and confirming the team&apos;s
          understanding was correct.
        </Body>
        <div className="mt-8">
          <Shot
            dir={DIR}
            name="user-journey-timesheetbilling"
            alt="User journey for Timesheet, Billing and Invoice"
            aspect="aspect-[2496/1002]"
            sizes="(min-width: 1280px) 1000px, 100vw"
          />
        </div>
      </Section>

      {/* 03 */}
      <Section index="03" id="requirements" title="Requirements & Sitemap">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.01em] text-neutral-900 sm:text-2xl dark:text-white">
              Requirement cheat sheet
            </h3>
            <Body className="mt-6">
              <Em>A shared requirement cheat sheet</Em> for Financial Analysis
              let SMEs and stakeholders collaborate. Its baseline came from the
              interviews and current-flow walkthroughs; everyone then shaped the
              requirement scope together.
            </Body>
          </div>
          <Shot
            dir={DIR}
            name="requirement-gathering-financial"
            alt="Requirement cheat sheet for Financial Analysis"
            aspect="aspect-[2500/1697]"
          />
        </div>

        <Subhead>Proposed sitemap</Subhead>
        <Body className="max-w-3xl">
          A high-level sitemap, built from the interviews, scope and
          requirements.
        </Body>
        <div className="mt-8">
          <Shot
            dir={DIR}
            name="proposed-sitemap"
            alt="Proposed Quork Board sitemap"
            aspect="aspect-[2500/1072]"
            sizes="(min-width: 1280px) 1000px, 100vw"
          />
        </div>
      </Section>

      {/* 04 */}
      <Section index="04" id="iteration" title="Design Iteration">
        <Lead>
          Portfolio-level and project-level analysis each went through{" "}
          <Em>several rounds</Em> before the final design.
        </Lead>
        <div className="mt-12">
          <ImageTabs
            label="Design iterations"
            items={ITERATIONS.map((i) => ({
              id: i.id,
              label: i.label,
              caption: i.caption,
              image: <Wide dir={DIR} name={i.name} alt={i.caption} aspect="aspect-square" />,
            }))}
          />
        </div>
      </Section>

      {/* 05 */}
      <Section index="05" id="final" title="Final Design">
        <Subhead>Portfolio summary & financial analysis</Subhead>
        <ImageTabs label="Portfolio screens" items={screenTabs(PORTFOLIO_SCREENS)} />

        <Subhead>Client (account) financial analysis</Subhead>
        <ImageTabs label="Client screens" items={screenTabs(CLIENT_SCREENS)} />
        <p className="mt-4 text-xs text-zinc-500">
          Long pages scroll inside their frame.
        </p>
      </Section>

      {/* 06 */}
      <Section index="06" id="results" title="Results & Next Steps">
        <Figure value="+43%" note="SUS survey score" />
        <Body className="mt-10 max-w-3xl">
          The business was also able to <Em>cut a third-party integration</Em>{" "}
          that didn&apos;t support the Unqork system.
        </Body>

        <Subhead>Next steps</Subhead>
        <Body className="max-w-3xl">
          The timeline was tight for the size of the scope.{" "}
          <Em>Content sorting should run alongside user testing,</Em> and every
          corner case should be reviewed with engineers and turned into design
          patterns.
        </Body>
      </Section>
    </CaseStudyLayout>
  );
}
