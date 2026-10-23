import type { Metadata } from "next";
import {
  Body,
  CaseStudyLayout,
  Dot,
  Em,
  Lead,
  Section,
  Subhead,
  type Meta,
  type Metric,
} from "../_components/editorial";
import { ImageSlot } from "../_components/ImageSlot";
import { guardHidden } from "../hidden";
import { ImageTabs } from "../_components/ImageTabs";
import { Shot, Wide } from "../_components/Shot";

export const metadata: Metadata = {
  title: "UBS Client Discovery — Case Study",
  description:
    "A platform that helps Financial Advisors discover, capture and recall what matters to each client.",
};

/** Media lives in /public/projects/ubs-client-discovery/<name>.<ext>. */
const DIR = "projects/ubs-client-discovery";

const SECTIONS = [
  { id: "overview", label: "Overview & Process" },
  { id: "business", label: "Business Pain Points" },
  { id: "research", label: "User Pain Points" },
  { id: "scope", label: "Scope & Journey" },
  { id: "concepts", label: "Concepts & Review" },
  { id: "testing", label: "Testing & Iteration" },
  { id: "product", label: "Final Product" },
  { id: "next", label: "Next Steps" },
] as const;

const META: Meta[] = [
  { label: "Role", value: "Lead Product Designer" },
  { label: "Platform", value: "Wealth Management · Desktop & Mobile" },
  { label: "Team", value: "2 Designers · 2 Researchers" },
];

const METRICS: Metric[] = [
  { after: "6", label: "Advisors interviewed", detail: "Initial research" },
  { before: "13", after: "4", label: "Concepts", detail: "13 presented, 8 tested, 4 built" },
  { after: "28", label: "Test sessions", detail: "Across two rounds" },
  { after: "50%", label: "Prefer paper notes", detail: "In in-person meetings" },
];

const PROCESS = [
  "Stakeholder interviews on business pain points",
  "Initial user interviews on user pain points",
  "Shape the product scope with the business",
  "Brainstorm and ideate concepts",
  "Concept review with stakeholders",
  "Concept review with users",
  "Low-fi user testing",
  "Mid-fi user testing",
  "High-fi user testing",
];

const FINDINGS = [
  "Most advisors have 50+ clients, but nothing helps them recall “what I knew about this client.”",
  "Advisors also struggle to discover “what I don't know about this client.”",
  "Digital interfaces feel uncomfortable in in-person meetings, so advisors prefer paper notes — and struggle to organize them.",
  "Advisors hesitate to record meetings for auto-transcripts, worried clients will feel insecure and trust will suffer.",
  "For first discovery conversations, advisors guide the talk with questionnaires and informational PDFs.",
];

const PROBLEMS: [string, string][] = [
  ["Discover", "No support for discovering “what I don't know about this client.”"],
  ["Recall", "No support for recalling “what I knew about this client.”"],
  ["Capture", "No standard way to capture paper notes."],
];

const ITERATIONS = [
  { id: "1", label: "Iteration 1", name: "iteration1", aspect: "aspect-[2494/1080]" },
  { id: "2", label: "Iteration 2", name: "iteration2", aspect: "aspect-[2494/1080]" },
  { id: "3", label: "Iteration 3", name: "iteration3", aspect: "aspect-[2494/1080]" },
];

const MEETING_PREP = [
  { name: "review-past-notes", title: "Review past notes", text: "Review past meeting notes by topic." },
  {
    name: "add-meeting-note",
    title: "Add a meeting",
    text: "New meetings arrive automatically through the Outlook API, and can also be created by hand.",
  },
  {
    name: "desktop-tagdragdrop",
    title: "Tag missing topics",
    text: "See which topics haven't been covered with a client, and add them as tags to the next meeting.",
  },
  {
    name: "desktop-familytree",
    title: "Family tree",
    text: "Many clients have complex family trees; advisors need to stay current to give proper advice.",
  },
];

const ON_THE_WAY = [
  { name: "mobile-reviewnotes", title: "Meeting agenda", text: "Recall the agenda at the last minute, on the way to the meeting." },
  { name: "mobile-familytree", title: "Family tree", text: "Check the family tree right before the meeting." },
  { name: "mobile-crminfo", title: "CRM info", text: "Check CRM details right before the meeting." },
];

function Recording({ name, title, text, aspect }: { name: string; title: string; text: string; aspect: string }) {
  return (
    <figure>
      <Shot dir={DIR} name={name} alt={`${title}: ${text}`} aspect={aspect} />
      <figcaption className="mt-4">
        <span className="block font-semibold text-neutral-900 dark:text-white">{title}</span>
        <span className="mt-1.5 block text-[13px] leading-[1.6] text-zinc-600 dark:text-zinc-400">{text}</span>
      </figcaption>
    </figure>
  );
}

function UseCase({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-10 mt-20 flex items-baseline gap-4">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400">
        Use case {n}
      </span>
      <h3 className="text-2xl font-semibold tracking-[-0.01em] text-neutral-900 sm:text-3xl dark:text-white">
        {title}
      </h3>
    </div>
  );
}

export default function UbsClientDiscoveryCaseStudy() {
  guardHidden("ubs-client-discovery");
  return (
    <CaseStudyLayout
      eyebrow="Case Study — Wealth Management Product & UX"
      title="UBS Client Discovery"
      subtitle="A platform that helps Financial Advisors discover, capture and recall what matters to each client."
      meta={META}
      metrics={METRICS}
      sections={SECTIONS}
    >
      <div className="pt-16">
        <ImageSlot
          dir={DIR}
          name="promotionalscreen1-v2"
          alt="Client discovery platform on desktop and mobile"
          aspect="aspect-[1800/937]"
          sizes="(min-width: 1280px) 1000px, 100vw"
          className="rounded-2xl"
        />
      </div>

      {/* 01 */}
      <Section index="01" id="overview" title="Overview & Process" first>
        <Lead>
          Two designers and two researchers worked with the client&apos;s key
          stakeholders on <Em>a next-generation platform</Em> that helps
          Financial Advisors hold meaningful conversations with their clients.
        </Lead>
        <Body className="mt-8 max-w-3xl">
          The solution follows how advisors themselves want to capture client
          information — built in step with the client and{" "}
          <Em>tested exhaustively</Em> with the advisors who would use it.
        </Body>

        <Subhead>Process</Subhead>
        <ol className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((p, i) => (
            <li key={p} className="flex gap-4">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {i + 1}
              </span>
              <span className="text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">{p}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* 02 */}
      <Section index="02" id="business" title="Business Requirements & Pain Points">
        <Lead>
          The internal system didn&apos;t support advisors&apos; client
          discovery, and <Em>complaints were coming in.</Em>
        </Lead>
        <Body className="mt-8 max-w-3xl">
          The business also saw a loss: advisors who keep client information
          privately <Em>take their clients with them</Em> when they leave the
          firm. Client discovery shapes the relationship and the quality of
          service — and helps keep both clients and advisors.
        </Body>
      </Section>

      {/* 03 */}
      <Section index="03" id="research" title="Initial Research & User Pain Points">
        <Lead>
          Conversations with <Em>six advisors</Em> showed how they run discovery
          today, and surfaced their key goals and pain points.
        </Lead>
        <ul className="mt-10 max-w-3xl space-y-3 text-base leading-8 text-zinc-600 dark:text-zinc-400">
          {FINDINGS.map((f) => (
            <Dot key={f}>{f}</Dot>
          ))}
        </ul>
      </Section>

      {/* 04 */}
      <Section index="04" id="scope" title="Scope & User Journey">
        <Lead>
          A workshop with the business turned the user pain points into{" "}
          <Em>the product scope and problem statement.</Em>
        </Lead>

        <dl className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
          {PROBLEMS.map(([term, desc]) => (
            <div key={term}>
              <dt className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400">
                {term}
              </dt>
              <dd className="mt-3 text-base leading-7 text-neutral-900 dark:text-white">{desc}</dd>
            </div>
          ))}
        </dl>

        <Subhead>User journey & flows</Subhead>
        <Body className="max-w-3xl">
          A comprehensive journey, including related applications, showed{" "}
          <Em>where the pain points lay</Em> and how the new application would fit
          the current flow.
        </Body>
        <div className="mt-8">
          <Shot
            dir={DIR}
            name="user-journey"
            alt="User journey for client discovery, including related applications"
            aspect="aspect-[2290/1132]"
            sizes="(min-width: 1280px) 1000px, 100vw"
          />
        </div>
      </Section>

      {/* 05 */}
      <Section index="05" id="concepts" title="Concepts & Business/User Review">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Shot
            dir={DIR}
            name="concept-mini"
            alt="Concept sketches presented to the client"
            aspect="aspect-square"
          />
          <div className="space-y-6">
            <Body>
              The research and journeys led to <Em>13 concepts</Em> presented to
              the client. With stakeholders, 8 were chosen to test with advisors.
            </Body>
            <Body>
              Advisors gave feedback on each and ranked them by benefit. The
              results narrowed them to <Em>4 core concepts</Em> — the basis of a
              solution built on user needs.
            </Body>
          </div>
        </div>
        <div className="mt-10">
          <Shot
            dir={DIR}
            name="concept-testing"
            alt="Concept testing results"
            aspect="aspect-[1874/672]"
            sizes="(min-width: 1280px) 1000px, 100vw"
          />
        </div>
      </Section>

      {/* 06 */}
      <Section index="06" id="testing" title="User Testing & Iteration">
        <Lead>
          The four top-ranked concepts were woven into{" "}
          <Em>one integrated product,</Em> then tested over two rounds —{" "}
          <Em>28 sessions</Em> in total.
        </Lead>
        <Body className="mt-8 max-w-3xl">
          After each round, the product was refined with advisor feedback and
          the client&apos;s stakeholders — ending in a product shaped around
          advisors&apos; needs, intuitive and easy to use.
        </Body>
        <div className="mt-12">
          <ImageTabs
            label="Iterations"
            items={ITERATIONS.map((i) => ({
              id: i.id,
              label: i.label,
              image: <Wide dir={DIR} name={i.name} alt={`Client discovery, ${i.label.toLowerCase()}`} aspect={i.aspect} />,
            }))}
          />
        </div>
      </Section>

      {/* 07 */}
      <Section index="07" id="product" title="Final Product">
        <Lead>
          A platform for gathering discovery information: advisors{" "}
          <Em>capture client details easily,</Em> and the most relevant ones{" "}
          <Em>play back when they&apos;re needed.</Em>
        </Lead>

        <UseCase n={1} title="Remote meeting" />
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Meeting prep · Desktop</p>
        <div className="mt-6 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {MEETING_PREP.map((r) => (
            <Recording key={r.name} {...r} aspect="aspect-[1376/824]" />
          ))}
        </div>
        <div className="mt-14 grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Recording
            name="desktop-editsimple"
            title="Conduct the meeting"
            text="In remote meetings, advisors tend to type notes on their computer."
            aspect="aspect-[1376/824]"
          />
        </div>

        <UseCase n={2} title="In-person meeting" />
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Right before the meeting · Mobile</p>
        <div className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {ON_THE_WAY.map((r) => (
            <Recording key={r.name} {...r} aspect="aspect-[362/730]" />
          ))}
          <Recording
            name="mobile-capturenote"
            title="Capture paper notes"
            text="Half of users prefer paper notes in in-person meetings but struggle to organize them."
            aspect="aspect-[362/730]"
          />
        </div>
        <div className="mt-14 grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Recording
            name="desktop-edit"
            title="After the meeting · Desktop"
            text="A few meetings or days later, advisors come back to organize their notes digitally."
            aspect="aspect-[1000/599]"
          />
        </div>
      </Section>

      {/* 08 */}
      <Section index="08" id="next" title="Next Steps">
        <div className="max-w-3xl space-y-6">
          <Body>
            The final product received <Em>excellent user feedback</Em> in the
            final design review. Suggested KPIs: active user rate and data
            collection rate.
          </Body>
          <Body>
            Some features stayed out of the MVP. Outlook API features need extra
            compliance work, so the business excluded them; a few lower-priority
            features were dropped for timeline and engineering resources, despite
            a clear user need. Post-MVP suggestions:
          </Body>
          <ul className="space-y-3 text-base leading-8 text-zinc-600 dark:text-zinc-400">
            <Dot>Share the meeting agenda with clients and coworkers by email.</Dot>
            <Dot>
              All-in-one meeting materials to download, print and email to
              clients — including performance data and marketing materials. This
              needs more research into what advisors want to share.
            </Dot>
          </ul>
        </div>
      </Section>
    </CaseStudyLayout>
  );
}
