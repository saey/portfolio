import type { Metadata } from "next";
import {
  Block,
  Body,
  CaseStudyLayout,
  Dot,
  Em,
  Lead,
  List,
  Section,
  Subhead,
  TwoCol,
  type Meta,
  type Metric,
} from "../_components/editorial";
import { ImageSlot } from "../_components/ImageSlot";
import { ImageTabs } from "../_components/ImageTabs";

export const metadata: Metadata = {
  title: "Grid UI Unification — Case Study",
  description:
    "Unifying the grid UI of 30+ Prime Service applications on Goldman Sachs Marquee into one governed, reusable system.",
};

/** Media lives in /public/projects/grid-unification/<name>.webp. */
const DIR = "projects/grid-unification";

const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "ecosystem", label: "Ecosystem" },
  { id: "scope", label: "Scope" },
  { id: "audit", label: "What We Have & Need" },
  { id: "testing", label: "Global Filter Testing" },
  { id: "craft", label: "Crafting the Elements" },
  { id: "design", label: "Design Implementation" },
  { id: "engineering", label: "Engineering Implementation" },
  { id: "conclusion", label: "Conclusion & Next Steps" },
] as const;

const META: Meta[] = [
  { label: "Platform", value: "Goldman Sachs Marquee (B2B)" },
  { label: "Methods", value: "UX Audit · Heuristics · User Testing" },
  { label: "Tooling", value: "Figma · Design System" },
];

const METRICS: Metric[] = [
  { after: "30+", label: "Applications audited", detail: "Prime Service on Marquee" },
  { after: "3", label: "Business lines", detail: "PB, Clearing and DCS" },
  {
    after: "4",
    label: "Systems aligned",
    detail: "GS Design Library, Marquee Design Library, UI Toolkit and the Prime Service repository",
  },
  { after: "11", label: "Target UI elements", detail: "Same function, different UI" },
];

const LAYERS: [string, string][] = [
  [
    "GS Design System & UITK",
    "The core UX team owns the GS Design System and Figma Library; UITK is its corporate engineering library.",
  ],
  [
    "Marquee",
    "The largest B2B application hub at Goldman Sachs, expected to follow the GS Design System as closely as possible.",
  ],
  [
    "Prime Service",
    "A part of Marquee made up of 30+ applications — most of them built around a grid.",
  ],
  [
    "The gap",
    "The GS Design System has no comprehensive grid guidelines. UITK's grid library uses AG-Grid's default style without design review, and Marquee's own grid patterns never considered Prime Service use cases.",
  ],
];

const SCOPE_UI = [
  "Grouping",
  "Column Filter",
  "Row Actions",
  "Bulk Actions",
  "Column Config",
  "Sorting",
  "Global Filter",
  "View: Placement",
  "View: Label",
  "View: CTA",
  "Column Actions",
];

const SCOPE_FRAMES = [
  { id: "column-filter", label: "Column Filter", name: "scope-01" },
  { id: "table-filter", label: "Table Filter", name: "scope-02" },
  { id: "row-actions", label: "Row Actions", name: "scope-03" },
  { id: "bulk-actions", label: "Bulk Actions", name: "scope-04" },
  { id: "column-config", label: "Column Config", name: "scope-05" },
  { id: "column-actions", label: "Column Actions", name: "scope-06" },
  { id: "grouping", label: "Grouping", name: "scope-07" },
  { id: "view-placement", label: "View: Placement", name: "scope-08" },
  { id: "view-label", label: "View: Label", name: "scope-09" },
  { id: "view-cta", label: "View: CTA", name: "scope-10" },
];

const NEEDS_WORK = [
  {
    name: "marquee-actions",
    title: "Row Actions",
    text: "Actions sit behind a right-click menu. Most Prime Service applications are utilities, so they need a clearer call to action.",
  },
  {
    name: "marquee-column-config",
    title: "Column Config",
    text: "Some applications carry hundreds of columns, and “Select all” / “Deselect all” — missing from the Marquee UI — were in high demand.",
  },
  {
    name: "marquee-column-filter",
    title: "Column Filter",
    text: "Only filters with operators are supported. Most Prime Service filters need no operator, so the pattern adds an unnecessary click.",
  },
  {
    name: "marquee-grouping",
    title: "Grouping",
    text: "Only multiple grouping is supported. For applications that group by a single column, that is another unnecessary click.",
  },
  {
    name: "marquee-sorting",
    title: "Sorting",
    text: "Only single sorting is supported, yet some Prime Service applications already in production sort by multiple columns.",
  },
  {
    name: "marquee-global-filter",
    title: "Global Filter",
    text: "Users pick a column before they can choose options — too many clicks for filter-heavy work like applying 20+ filters across hundreds of columns.",
  },
];

const MISSING = [
  {
    name: "missing-column-actions",
    title: "Column Actions",
    text: "Marquee has no column action pattern.",
  },
  {
    name: "missing-view",
    title: "View",
    text: "Marquee has no View component.",
  },
];

const CRAFTED = [
  {
    id: "actions",
    label: "Row Actions",
    name: "new-actions",
    caption:
      "An ellipsis appears on hover as the action CTA — aligned with GSDS and a clearer visual cue.",
  },
  {
    id: "column-filter",
    label: "Column Filter",
    name: "new-column-filter",
    caption: "A no-operator variation shows the options directly, removing the extra click.",
  },
  {
    id: "grouping",
    label: "Grouping",
    name: "new-grouping",
    caption: "A single-grouping variation for applications that group by one column.",
  },
  {
    id: "sorting",
    label: "Sorting",
    name: "new-sorting",
    caption: "A multiple-sorting variation for applications already sorting by several columns.",
  },
  {
    id: "global-filter",
    label: "Global Filter",
    name: "new-global-filter",
    caption:
      "A new side filter pattern, shaped by usability testing after critical feedback from Prime Service SMEs.",
  },
  {
    id: "column-config",
    label: "Column Config",
    name: "new-column-config",
    caption:
      "“Select all” and “Deselect all” for data-heavy applications with hundreds of columns.",
  },
];

const NEW_COMPONENTS = [
  {
    name: "new-view",
    title: "View",
    text: "Already used across Prime Service, but never standardized. A View stores the column configuration so users can save, reload and share it.",
  },
  {
    name: "new-column-actions",
    title: "Column Actions",
    text: "Gives users custom configuration per column: pin, autosize and hide.",
  },
];

const GUIDE_PAGES = [
  { id: "grouping", label: "Grouping", name: "dg-grouping", caption: "Added the single-grouping variation." },
  { id: "actions", label: "Actions", name: "dg-actions", caption: "Added the CTA variation." },
  { id: "column-actions", label: "Column Actions", name: "dg-column-actions", caption: "Added a Column Actions section." },
  { id: "column-config", label: "Column Config", name: "dg-column-config", caption: "Added the Select / Deselect all UI." },
  { id: "column-filter", label: "Column Filter", name: "dg-column-filter", caption: "Added the no-operator variation." },
  { id: "global-filter", label: "Global Filter", name: "dg-global-filter", caption: "Added the side filter variation." },
  { id: "sorting", label: "Sorting", name: "dg-sorting", caption: "Added the multi-sorting variation." },
  { id: "view", label: "View", name: "dg-view-1", caption: "Added a View section." },
];

const DATA_TYPES = ["Free text", "Single select", "Multi select", "Numeric", "Calendar"];

/** Screenshot shown whole inside a white frame, so neighbors share one height. */
function Shot({
  name,
  alt,
  aspect,
  sizes = "(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw",
}: {
  name: string;
  alt: string;
  aspect: string;
  sizes?: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-6 dark:border-zinc-800">
      <ImageSlot
        dir={DIR}
        name={name}
        alt={alt}
        aspect={aspect}
        fit="contain"
        sizes={sizes}
        className="!bg-transparent"
      />
    </div>
  );
}

/** Screenshot with a short title and note underneath. */
function Card({
  name,
  title,
  text,
  aspect = "aspect-[4/3]",
}: {
  name: string;
  title: string;
  text: string;
  aspect?: string;
}) {
  return (
    <figure>
      <Shot name={name} alt={`${title}: ${text}`} aspect={aspect} />
      <figcaption className="mt-4">
        <span className="block font-semibold text-neutral-900 dark:text-white">{title}</span>
        <span className="mt-1.5 block text-[13px] leading-[1.6] text-zinc-600 dark:text-zinc-400">
          {text}
        </span>
      </figcaption>
    </figure>
  );
}

function Wide({ name, alt, aspect }: { name: string; alt: string; aspect: string }) {
  return (
    <ImageSlot
      dir={DIR}
      name={name}
      alt={alt}
      aspect={aspect}
      fit="contain"
      sizes="(min-width: 1280px) 1000px, 100vw"
      className="!bg-transparent"
    />
  );
}

export default function GridUnificationCaseStudy() {
  return (
    <CaseStudyLayout
      eyebrow="Case Study — Design System & Layout Governance"
      title="Grid UI Unification"
      subtitle="Unifying the grid UI of 30+ Prime Service applications on Goldman Sachs Marquee into one governed, reusable system."
      meta={META}
      metrics={METRICS}
      sections={SECTIONS}
    >
      <div className="pt-16">
        <ImageSlot
          dir={DIR}
          name="cover"
          alt="Unified Marquee grid with filter, search, sort, group, view and primary action controls"
          aspect="aspect-[2500/1003]"
          sizes="(min-width: 1280px) 1000px, 100vw"
          className="rounded-2xl"
        />
      </div>

      {/* 01 */}
      <Section index="01" id="introduction" title="Introduction" first>
        <TwoCol
          left={
            <Block label="Problem">
              While working on the Reporting applications, it became clear that
              Prime Service applications had been built{" "}
              <Em>without design guidelines</Em> — with critical UI
              misalignments between them, especially in the grid that most of
              them rely on.
            </Block>
          }
          right={
            <Block label="Mission">
              Prime Service runs <Em>30+ applications</Em> on Marquee, a B2B
              application hub, and each had its own grid styles. The mission:{" "}
              <Em>unify every grid UI</Em> and make it reusable and iterative.
            </Block>
          }
        />
      </Section>

      {/* 02 */}
      <Section index="02" id="ecosystem" title="Understanding the Ecosystem">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          <Shot
            name="hierarchy"
            alt="Hierarchy: GS Design System and UITK, Marquee, and Prime Service applications"
            aspect="aspect-[1612/1964]"
          />
          <List items={LAYERS} className="mt-0 sm:grid-cols-1" />
        </div>

        <Subhead>Current ecosystem</Subhead>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Shot
            name="ecosystem-current"
            alt="Current ecosystem: GS and Marquee guides, UITK and Prime Service applications are not aligned"
            aspect="aspect-[908/646]"
          />
          <div className="space-y-6">
            <Body>
              UITK is the only shared engineering library — but its team sits
              outside the Marquee business unit, and{" "}
              <Em>Marquee engineers can&apos;t update it.</Em> With no library of
              its own, most of Marquee is built with custom code.
            </Body>
            <Body>
              On the design side, Marquee&apos;s grid guide never considered
              Prime Service use cases, so each application&apos;s designer drew
              their own grid for the same needs —{" "}
              <Em>harming the brand and the experience</Em> for users who work
              across applications.
            </Body>
          </div>
        </div>

        <Subhead>Target state</Subhead>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Shot
            name="ecosystem-target"
            alt="Target state: Prime Service use cases added to the Marquee guide and library, with grid components stored in a shared library"
            aspect="aspect-[1201/810]"
          />
          <div className="space-y-6">
            <Body>
              Update the Marquee Design Guide and Library with Prime Service use
              cases, so every Prime Service application can use{" "}
              <Em>standardized grid components.</Em>
            </Body>
            <Body>
              Store every grid component in a shared library, so engineers stop
              hunting for or rebuilding components —{" "}
              <Em>and updates reach every application automatically.</Em>
            </Body>
          </div>
        </div>
      </Section>

      {/* 03 */}
      <Section index="03" id="scope" title="Scope: Target UI Elements">
        <Lead>
          Research across 30+ applications surfaced the grid UI that needed
          aligning — components with{" "}
          <Em>the same functionality but a different UI and experience</Em> in
          each application.
        </Lead>

        <ul className="mt-10 flex flex-wrap gap-2">
          {SCOPE_UI.map((s) => (
            <li
              key={s}
              className="rounded-full border border-zinc-300 px-3.5 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
            >
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <ImageTabs
            label="Grid UI audit"
            items={SCOPE_FRAMES.map((f) => ({
              id: f.id,
              label: f.label,
              image: (
                <Wide
                  name={f.name}
                  alt={`${f.label} audit: each pattern in use and the applications that use it`}
                  aspect="aspect-[3/1]"
                />
              ),
            }))}
          />
        </div>
        <p className="mt-4 text-xs text-zinc-500">
          Each audit groups the applications by the pattern they use today.
        </p>
      </Section>

      {/* 04 */}
      <Section index="04" id="audit" title="What We Have and What We Need">
        <Lead>
          Each Marquee pattern was reviewed with Prime Service SMEs to decide
          whether it could be <Em>used as is, needed enhancement or a new
          variation,</Em> or was missing entirely.
        </Lead>

        <Subhead>Good to use as is</Subhead>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Shot
            name="marquee-bulk-actions"
            alt="Marquee bulk actions bar"
            aspect="aspect-[456/167]"
          />
          <Body>
            <Em>Bulk Actions</Em> already covers every Prime Service use case.
            No enhancement was needed — only a dedicated Prime Service section
            in the Bulk Action library.
          </Body>
        </div>

        <Subhead>Needs enhancement or a variation</Subhead>
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {NEEDS_WORK.map((c) => (
            <Card key={c.name} {...c} />
          ))}
        </div>

        <Subhead>Missing components</Subhead>
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {MISSING.map((c) => (
            <Card key={c.name} {...c} />
          ))}
        </div>
      </Section>

      {/* 05 */}
      <Section index="05" id="testing" title="Global Filter User Testing">
        <Lead>
          The SME review returned strong feedback that the Global Filter{" "}
          <Em>didn&apos;t fit Prime Service use cases</Em> — so it went through
          comprehensive user testing.
        </Lead>

        <div className="mt-12 grid items-start gap-8 md:grid-cols-[minmax(0,852fr)_minmax(0,1474fr)]">
          <Shot
            name="filter-research"
            alt="Global filter user testing plan"
            aspect="aspect-[852/913]"
          />
          <Shot
            name="filter-research-result"
            alt="Global filter user testing results"
            aspect="aspect-[1474/791]"
          />
        </div>

        <TwoCol
          left={
            <Body className="mt-10">
              Testing covered <Em>11 users from all three business lines.</Em>{" "}
              With limited time, prototypes were demonstrated to groups of
              three to five users in Q&amp;A sessions, and users answered a
              questionnaire afterwards.
            </Body>
          }
          right={
            <Body className="md:mt-10">
              Filter-heavy applications need{" "}
              <Em>search across filter columns and options,</Em> and most users
              preferred <Em>a side filter</Em> for keeping their options
              visible.
            </Body>
          }
        />

        <Subhead>Engineering feasibility</Subhead>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Shot
            name="filter-feasibility"
            alt="AG-Grid filter capabilities mapped against use cases"
            aspect="aspect-[1610/1521]"
          />
          <Body>
            Before designing a new variation, AG-Grid&apos;s capabilities were
            reviewed with engineers against real use cases — sorting out{" "}
            <Em>which variations and options were necessary and feasible.</Em>
          </Body>
        </div>

        <Subhead>Filter UI variations</Subhead>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <Body>
              The filter UI was designed for every data type, each with{" "}
              <Em>no-operator, operator and multiple-input</Em> versions:
            </Body>
            <ul className="mt-6 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              {DATA_TYPES.map((t) => (
                <Dot key={t}>{t}</Dot>
              ))}
            </ul>
          </div>
          <Shot
            name="filter-variations"
            alt="Filter variations for each data type"
            aspect="aspect-[1357/1542]"
          />
        </div>
      </Section>

      {/* 06 */}
      <Section index="06" id="craft" title="Crafting the Missing Elements">
        <Lead>
          Each gap became an <Em>enhancement or a new variation</Em> of an
          existing Marquee component — shown here beside the original.
        </Lead>

        <div className="mt-12">
          <ImageTabs
            label="Enhancements and variations"
            items={CRAFTED.map((c) => ({
              id: c.id,
              label: c.label,
              caption: c.caption,
              image: (
                <Wide
                  name={c.name}
                  alt={`${c.label}: the Marquee component beside the new variation`}
                  aspect="aspect-[921/460]"
                />
              ),
            }))}
          />
        </div>

        <Subhead>New components</Subhead>
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
          {NEW_COMPONENTS.map((c) => (
            <Card key={c.name} {...c} aspect="aspect-[921/435]" />
          ))}
        </div>
      </Section>

      {/* 07 */}
      <Section index="07" id="design" title="Design Implementation">
        <Lead>
          Most elements went into the <Em>Design Guide</Em>. The Figma Library
          is a design utility, so repeated grid components only needed to show
          their CTAs — sort, group, filter and so on.
        </Lead>

        <Subhead>Marquee Design Guide</Subhead>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Shot
            name="dg-overview"
            alt="Grid section of the Marquee Design Guide"
            aspect="aspect-[939/540]"
          />
          <Body>
            The guide has a dedicated grid section. Every enhancement, variation
            and new component is captured there,{" "}
            <Em>so designers come back to one place</Em> to find the right
            pattern.
          </Body>
        </div>

        <div className="mt-12">
          <ImageTabs
            label="Design Guide updates"
            items={GUIDE_PAGES.map((g) => ({
              id: g.id,
              label: g.label,
              caption: g.caption,
              image: (
                <Wide
                  name={g.name}
                  alt={`Design Guide, ${g.label}: ${g.caption}`}
                  aspect="aspect-[3/2]"
                />
              ),
            }))}
          />
        </div>

        <Subhead>Marquee Figma Library</Subhead>
        <div className="grid items-start gap-8 md:grid-cols-2">
          <Shot
            name="library-filter"
            alt="Side Filter component in the Figma Library"
            aspect="aspect-[973/773]"
          />
          <Shot
            name="library-action-bar"
            alt="Prime Service Action Bar component in the Figma Library"
            aspect="aspect-[973/773]"
          />
        </div>
        <ul className="mt-8 max-w-3xl space-y-2 text-base leading-8 text-zinc-600 dark:text-zinc-400">
          <Dot>Added the new variations to existing components.</Dot>
          <Dot>
            Created new components for designers, such as the{" "}
            <Em>Side Filter</Em> and the <Em>Prime Service Action Bar.</Em>
          </Dot>
        </ul>

        <Subhead>Prime Service grid application template</Subhead>
        <Shot
          name="prime-template"
          alt="Prime Service grid application template"
          aspect="aspect-[1427/577]"
          sizes="(min-width: 1280px) 1000px, 100vw"
        />
        <Body className="mt-8 max-w-3xl">
          Since most applications center on grid content, a template with the
          grid UI built in <Em>speeds up the design process</Em> and makes sure
          every Prime Service designer uses the correct components.
        </Body>
      </Section>

      {/* 08 */}
      <Section index="08" id="engineering" title="Engineering Implementation">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Shot
            name="engineering-result"
            alt="Result: grid components stored in a Prime Service shared repository"
            aspect="aspect-[908/646]"
          />
          <div className="space-y-6">
            <h3 className="text-xl font-semibold tracking-[-0.01em] text-neutral-900 sm:text-2xl dark:text-white">
              Prime Service shared repository
            </h3>
            <Body>
              Working closely with engineers throughout, the team built{" "}
              <Em>a shared repository</Em> for Prime Service and stored every
              grid component in it — open to all engineers, Marquee included.
            </Body>
            <Body>
              It speeds up engineering, prevents UI drift between applications,
              and <Em>updates every application automatically</Em> whenever the
              design iterates.
            </Body>
          </div>
        </div>
      </Section>

      {/* 09 */}
      <Section index="09" id="conclusion" title="Conclusion & Next Steps">
        <div className="max-w-3xl space-y-6">
          <Body>
            In a large organization, business units rarely line up with product
            units, so the user experience easily drifts apart. Designers and
            engineers need to talk to each other and share{" "}
            <Em>a system that ties everyone together</Em> — one that is
            sustainable for engineers as well as designers.
          </Body>
          <Body>
            No unification is ever final: new applications launch every quarter
            and existing ones keep iterating, so{" "}
            <Em>a sustainable system matters most.</Em>
          </Body>
          <Body>
            Marquee&apos;s resources and budget kept the shared repository at
            the Prime Service level this time. The bigger picture is a
            repository at the <Em>Marquee level, or merged into UITK,</Em> if
            the business allows it.
          </Body>
        </div>
      </Section>
    </CaseStudyLayout>
  );
}
