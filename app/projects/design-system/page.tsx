import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { rounded } from "../../fonts";
import { AuditTerminal } from "./_components/AuditTerminal";
import { BeforeAfter } from "./_components/BeforeAfter";
import { CardSystemDemo } from "./_components/CardSystemDemo";
import { DocViewer } from "./_components/DocViewer";
import { ImageSlot, ScrollImage, type ImageAsset } from "../_components/ImageSlot";
import { RemediationLab } from "./_components/RemediationLab";
import { SectionNav } from "../_components/SectionNav";
import { STAGE } from "../_components/stage";

const iconProps = {
  viewBox: "0 0 24 24",
  className: "h-12 w-12",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Icons for the color system principles. */
const ICONS = {
  // Accessibility & Component Remediation
  cta: (
    <svg {...iconProps}>
      <rect x="2.5" y="7" width="19" height="10" rx="5" fill="currentColor" fillOpacity={0.15} />
      <path d="M8.5 12h7" strokeWidth={2} />
    </svg>
  ),
  inputs: (
    <svg {...iconProps}>
      <rect x="2.5" y="6.5" width="19" height="11" rx="2" />
      <path d="M7 9.5v5" />
    </svg>
  ),
  focus: (
    <svg {...iconProps}>
      <rect x="6.5" y="8.5" width="11" height="7" rx="1.5" />
      <rect x="3" y="5" width="18" height="14" rx="3.5" strokeDasharray="2.5 2.5" />
    </svg>
  ),
  touch: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.25" fill="currentColor" />
    </svg>
  ),
  states: (
    <svg {...iconProps}>
      <path d="M5 4l6.5 16 2.4-6.6L20.5 11z" />
      <path d="M17 17l3.5 3.5" />
    </svg>
  ),
  // AEM & Engineering Compatibility
  elastic: (
    <svg {...iconProps}>
      <path d="M3 5v14M21 5v14M7 12h10M9.5 9.5L7 12l2.5 2.5M14.5 9.5L17 12l-2.5 2.5" />
    </svg>
  ),
  authoring: (
    <svg {...iconProps}>
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />
      <path d="M14.5 5.5l3 3" />
    </svg>
  ),
  grid: (
    <svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M15 3v18" />
    </svg>
  ),
  ratios: (
    <svg {...iconProps}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 10V9h2M18 14v1h-2" />
    </svg>
  ),
  // Half-filled circle: light and dark.
  modes: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" />
    </svg>
  ),
  // One token feeding several components.
  reuse: (
    <svg {...iconProps}>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="M8.3 10.8l7.4-4M8.3 13.2l7.4 4" />
    </svg>
  ),
  // Foreground layered on a background.
  pairings: (
    <svg {...iconProps}>
      <rect x="3.5" y="3.5" width="12" height="12" rx="2" />
      <rect x="8.5" y="8.5" width="12" height="12" rx="2" fill="currentColor" fillOpacity={0.15} />
    </svg>
  ),
  // Short, searchable names.
  naming: (
    <svg {...iconProps}>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="M15 15l5 5M8 10.5h5" />
    </svg>
  ),
};

export const metadata: Metadata = {
  title: "Design System Refactoring & Remediation — Case Study",
  description:
    "Rebuilding an agency-made, component-by-component Figma library into a role-based semantic token architecture optimized for AEM.",
};

/**
 * Image registry. Save files to /public/projects/design-system/<name>.png
 * (jpg / webp / avif also work) and they replace the placeholders automatically.
 */
const IMAGES = {
  typography: { name: "web/typography", alt: "Responsive typography: Stat and Heading styles across lg, md and sm breakpoints" },
  patternsBefore: { name: "patterns-before", alt: "CTAs and tabs with similar styling, bottom-aligned text" },
  patternsAfter: { name: "patterns-after", alt: "Distinct CTAs and tabs, combobox, top-aligned text" },
  layoutBefore: { name: "web/flex-before", alt: "HP Hero before: fixed-height slots with text overflowing its container" },
  layoutAfter: { name: "Audit Examples/Content Flexibility After2", alt: "HP Hero after: elastic slots that grow with long headlines and stacked content" },
  gridBefore: { name: "Audit Examples/Content Grid Before 2", alt: "Legacy grid components before the merge: Compact Card Package, Styled List Breaker, Card Grid and Value Prop Package" },
  gridAfter: { name: "Audit Examples/Content Grid After", alt: "Content Grid after the merge: vertical and horizontal headers with card grid items, and the mobile layout" },
  aiCollections: { name: "web/ai-collections", alt: "Claude audit: collection sizes against recommended ranges, and a theme reduction roadmap" },
  aiLayers: { name: "web/ai-layers", alt: "Claude audit: primitives, theme variables and swatches — three broken layers" },
  aiColor: { name: "web/ai-color", alt: "Claude audit: color system issues and recommendations" },
  aiFont: { name: "web/ai-font", alt: "Claude audit: typography issues and the label token recommendation" },
  guideAuthoring: { name: "Guideline/Accessibility Authoring Guideline", alt: "Accessibility Authoring Guideline" },
  guideComponents: { name: "Guideline/Accessiblity Components Design Guideline", alt: "Accessibility Components Design Guideline" },
  guideTemplates: { name: "Guideline/Components Templates and Design Guidelines", alt: "Component Templates and Design Guidelines" },
  handoffMaster: { name: "web/handoff-master", alt: "Content Grid master components on white, gray and navy backgrounds" },
  handoffResponsive: { name: "web/handoff-responsive", alt: "Content Grid on tablet and mobile, with corner case examples" },
  handoffSpecs: { name: "web/handoff-specs", alt: "Content Grid specs mapped to AEM authoring fields" },
  handoffVariations: { name: "web/handoff-variations", alt: "Grid item variation chart and sm/md card comparison" },
} satisfies Record<string, ImageAsset>;

/** Flip to true once the UX best practices content is ready. */
const SHOW_UX_BEST_PRACTICES = false;
const SHOW_GRIDS = false;

const SECTIONS = [
  { id: "summary", label: "Executive Summary" },
  { id: "problem", label: "Problem & AI Audit" },
  { id: "tokens", label: "Tokens & Typography" },
  { id: "remediation", label: "Accessibility & Components" },
  { id: "aem", label: "AEM & Engineering" },
  { id: "tradeoffs", label: "Trade-offs" },
] as const;

const META = [
  { label: "Role", value: "Lead Product Designer & Director" },
  { label: "Team", value: "5 IC designers, 4 product owners" },
  { label: "Platform", value: "Figma · AEM" },
  { label: "Tooling", value: "Claude · Figma MCP" },
];

type Metric = { before?: string; after: string; label: string; detail: string };

const METRICS: Metric[] = [
  { before: "336", after: "59", label: "Theme colors", detail: "−82%" },
  { before: "32", after: "23", label: "Components", detail: "−28%" },
  { before: "22", after: "7", label: "Image aspect ratios", detail: "−68%" },
  { after: "AA", label: "WCAG", detail: "Core interactive components" },
  { after: "1:1", label: "Figma-to-code tokens", detail: "Mapped to CSS classes" },
];

export default function DesignSystemCaseStudy() {
  return (
    <div className="flex-1 bg-[#F9FAFB] font-sans text-zinc-900 selection:bg-indigo-200 dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-indigo-900">
      {/* Header band */}
      <div className="bg-indigo-800 text-white dark:bg-indigo-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <header className="pt-10">
            <Link
              href="/"
              className="rounded text-sm text-indigo-200 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              ← Case Studies
            </Link>

            <p className="mt-20 text-xs font-medium uppercase tracking-[0.25em] text-indigo-200">
              Case Study — Design Systems
            </p>
            <h1 className={`mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-6xl ${rounded.className}`}>
              Design System Refactoring &amp; Remediation
            </h1>
            <p className="mt-8 max-w-2xl text-xl font-normal leading-relaxed text-indigo-100">
              Rebuilding an agency-delivered, component-by-component library into
              a role-based semantic token architecture: accessible by default,
              ready for two languages, and built around how AEM actually works.
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-wider opacity-75">
              {META.map((m) => (
                <div key={m.label} className="flex gap-2">
                  <dt className="text-indigo-200">{m.label}</dt>
                  <dd className="text-white">{m.value}</dd>
                </div>
              ))}
            </dl>
          </header>

          {/* Results */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 pb-16 pt-8 sm:grid-cols-3 lg:grid-cols-5">
            {METRICS.map((m) => (
              <Stat key={m.label} metric={m} />
            ))}
          </dl>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
          <aside className="hidden pt-24 lg:block">
            <SectionNav sections={SECTIONS} />
          </aside>

          <main className="min-w-0">
            {/* 01 */}
            <Section index="01" id="summary" title="Executive Summary" first>
              <TwoCol
                left={
                  <Block label="Context">
                    The original library was delivered by an agency and <Em>built
                    component by component</Em>. It shipped the first launch, but
                    every new theme, language and page template added more
                    weight to a system with no shared foundation.
                  </Block>
                }
                right={
                  <Block label="Outcome">
                    <Em>A full refactor toward role-based semantic tokens,</Em>{" "}
                    accessibility fixed at the component level, and a library
                    aligned with AEM and engineering — using Claude for a token
                    audit and Figma MCP for hand-off to code.
                  </Block>
                }
              />

              <Subhead>Streamline components</Subhead>
              <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
                <Figure value="32 → 23" note="components · −28%" />
                <Body>
                  I reviewed every component through two lenses — the{" "}
                  <Em>Authoring Experience (AX)</Em> in AEM, and the cost of
                  maintaining it across design and development — then merged
                  redundant structures and consolidated their variants.
                </Body>
              </div>
              <List
                cols={3}
                items={[
                  ["Redundant components", "Removed duplicate components and variations, and consolidated variations that were never presented."],
                  ["UI matched to function", "Resolved components that looked identical but behaved differently, and ones that did the same job with different designs."],
                  ["Library structure", "Organized into Core, Components and Local Elements for easier maintenance."],
                ]}
              />

              <Subhead>Example: Content Grid</Subhead>
              <BeforeAfter
                title="Content Grid"
                minimal
                compareFirst
                before={<ImageSlot {...IMAGES.gridBefore} aspect="aspect-[1928/930]" fit="contain" className="rounded-xl" />}
                after={<ImageSlot {...IMAGES.gridAfter} aspect="aspect-[1938/1400]" className="rounded-xl" />}
                beforeNotes={<LegacyGrids />}
                afterNotes={<ContentGridSummary />}
              />
            </Section>

            {/* 02 */}
            <Section index="02" id="problem" title="Problem Statement & AI Audit">
              <Lead>
                <Em>Every component carried its own isolated copy of color styles,</Em>{" "}
                each behind a long, component-specific path name — such as{" "}
                <Code>colors/text/button/primary/default/base/disabled</Code>.
              </Lead>
              <List
                cols={3}
                items={[
                  ["Massive technical debt", "The same value existed under dozens of names. A single brand change touched every component, and no one could say which value was canonical."],
                  ["Broken theme scalability", "Colors were bound to elements, not roles, and the Theme collection also held fonts, spacing, sizes and borders — so four theme modes existed for two real appearances."],
                  ["No governance", "Without naming rules or ownership, styles were added ad hoc and drifted further from the code."],
                ]}
              />

              <Subhead>AI-assisted token audit</Subhead>
              <Body className="max-w-3xl">
                Before changing anything, <Em>I audited the existing
                variables and tokens with Claude</Em> — flagging invalid styles, duplicate values, overlong paths and
                structural gaps in the token hierarchy. What would have taken
                days of manual inspection became a prioritized remediation plan
                the team could review and agree on.
              </Body>
              <div className={`mt-10 ${STAGE}`}>
                <AuditTerminal />
              </div>

              <Subhead>From findings to decisions</Subhead>
              <DocViewer
                label="AI audit"
                pages={[
                  {
                    id: "collections",
                    label: "Collections",
                    title: "~2–3× over the recommended range",
                    image: <DocImage image={IMAGES.aiCollections} aspect="aspect-[760/567]" />,
                    points: [
                      "Each collection measured against ranges from large-scale CMS design systems",
                      "Theme flagged: 4 themes instead of 2, component-based instead of semantic",
                      "The 4th breakpoint (1600+) flagged for removal",
                      "Roadmap: cut to 2 themes first (−50%), then consolidate into semantic tokens — the final Theme landed at 59",
                    ],
                  },
                  {
                    id: "layers",
                    label: "Layers",
                    title: "Three layers, all broken",
                    image: <DocImage image={IMAGES.aiLayers} aspect="aspect-[769/547]" />,
                    points: [
                      "Primitives: spacing named 0, 1, 2… with no semantic meaning",
                      "Theme: background variations modeled as separate themes, and spacing stored per theme (35 × 4 = 140 variables)",
                      "Swatches: documented apart from variables — about 75% of Button/Secondary states were incorrect",
                    ],
                  },
                  {
                    id: "color",
                    label: "Color library",
                    title: "Color organization with semantic tokens",
                    image: <DocImage image={IMAGES.aiColor} scroll />,
                    points: [
                      "Adopt a 3-layer architecture: Primitive → Semantic → Component",
                      "Unify the two primary CTA definitions into one token that switches by theme",
                      "Restrict background authoring to the page level — from 27+ contrast combinations to 4–5 pre-validated pairs",
                      "Pre-validate every approved background pairing for text, CTAs, icons and borders",
                    ],
                  },
                  {
                    id: "font",
                    label: "Font library",
                    title: "Fewer heading variations, a new label category",
                    image: <DocImage image={IMAGES.aiFont} scroll />,
                    points: [
                      "One weight per heading level; size alone defines hierarchy",
                      "Add a label token category — body tokens were used as UI labels across 10+ components",
                      "Fix body/sm/medium and body/md/medium resolving to the same 14px",
                    ],
                  },
                ]}
              />
            </Section>

            {/* 03 */}
            <Section index="03" id="tokens" title="Token & Typography Architecture">
              <Lead>
                I moved the system from element-bound tokens to{" "}
                <Em>role-based semantic tokens</Em> — named for what a color
                does, not where it appears. <Em>Theme is now only for color
                switching,</Em> and Light and Dark resolve from the same set.
              </Lead>

              <div className="mt-16 grid gap-12 sm:grid-cols-2">
                <Figure value="336 → 59" note="theme colors · −82% · 4 modes → 2" large />
                <Figure value="578 → 377" note="published tokens · −35% · incl. multi-language" large />
              </div>

              <List
                cols={3}
                items={[
                  ["Shorter paths", "colors/text/button/primary/default/base/disabled became foreground/disabled."],
                  ["Semantic, not per component", "Tokens describe a role — background, foreground, action — and every component shares them."],
                  ["Collections reordered", "Theme comes first, so designers see and choose semantic colors before anything else."],
                ]}
              />

              <Subhead>Color system principles</Subhead>
              <List
                cols={4}
                items={[
                  ["Two modes", "Theme modes limited to Light and Dark, with primary, secondary and tertiary backgrounds in each.", ICONS.modes],
                  ["Reusable, not specific", "A variable is created only when multiple components need it.", ICONS.reuse],
                  ["Few pairings", "Foreground and background combinations kept low — avoiding authorable colors on authorable backgrounds.", ICONS.pairings],
                  ["No over-tokenization", "Names stay short, self-explanatory and searchable, grouped into bg, foreground, border, gradient, shadow and utility.", ICONS.naming],
                ]}
              />

              <Subhead>Sub-collections for multi-language</Subhead>
              <Body className="max-w-3xl">
                English and Japanese need different sizes, line heights and
                spacing to read well. Typography lives in{" "}
                <Code>Responsive EN</Code> with a <Code>Responsive JA</Code>{" "}
                sub-collection, each with its own dynamic scale across
                breakpoints. <Em>Components switch language without separate
                variants.</Em>
              </Body>
              <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div>
                  <pre className="rounded-xl bg-zinc-50 p-5 font-mono text-xs leading-7 text-zinc-600 dark:text-zinc-400">
                    {`Theme          59  color switching
Responsive EN  88  language × responsive
└ Responsive JA
Scale          35  absolute values
Brand         195`}
                  </pre>
                  <ul className="mt-6 space-y-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    <Dot>Responsive scale for widths and component paddings</Dot>
                    <Dot>Retired Display, Lead and Quote sizes; added Label and Absolute</Dot>
                    <Dot>Each style documents where it is used, e.g. Stat lg in Stat Block and Content Grid</Dot>
                  </ul>
                </div>
                <figure>
                  <ImageSlot {...IMAGES.typography} aspect="aspect-[2000/1387]" sizes="(min-width: 1024px) 640px, 100vw" className="rounded-xl" />
                  <figcaption className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                    Responsive type scale — Stat and Heading styles across lg (1024+), md (768+) and sm (320+).
                  </figcaption>
                </figure>
              </div>

              {/* Hidden for now. */}
              {SHOW_GRIDS && (
                <>
                  <Subhead>Grids &amp; breakpoints</Subhead>
                  <BreakpointTable />
                </>
              )}
            </Section>

            {/* 04 */}
            <Section index="04" id="remediation" title="Accessibility & Component Remediation">
              <Lead>
                Accessibility was built into the foundation rather than checked
                at the end. Fixes live in tokens and base components, so every
                page inherits <Em>WCAG AA across core interactive components</Em>.
              </Lead>
              <List
                cols={5}
                items={[
                  ["CTA contrast", "Fills and text CTAs raised to AA, including on gray backgrounds.", ICONS.cta],
                  ["Inputs", "Borders and text brought into AA contrast range.", ICONS.inputs],
                  ["Focus rings", "AA-safe color, aligned to component bounds, on every interactive element.", ICONS.focus],
                  ["Touch targets", "Expanded from 16×16 to 28×28 and above.", ICONS.touch],
                  ["Interactive states", "Missing hover, focus, active and disabled states supplied.", ICONS.states],
                ]}
              />

              <Subhead>Button · Color · Tag</Subhead>
              <RemediationLab />
              <p className="mt-4 text-xs text-zinc-500">
                Recreated in code from the audit. Colors are illustrative; contrast ratios are calculated live.
              </p>

              {/* Hidden until the UX best practices section is ready. */}
              {SHOW_UX_BEST_PRACTICES && (
                <>
              <Subhead>UX best practices</Subhead>
              <List
                items={[
                  ["CTA vs. Tab", "Clear visual separation so users can tell an action from navigation at a glance."],
                  ["Combobox pattern", "Introduced for searchable selections, with proper keyboard and screen reader support."],
                  ["Top-aligned text", "Removed bottom-aligned text and kept eyebrows at the top, so pages scan faster."],
                ]}
              />
              <div className="mt-14">
                <p className="text-sm font-medium">Interaction semantics</p>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  CTA styling is reserved for actions. Each pattern gets its own visual treatment, and ideally only one primary CTA is visible per viewport.
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-5">
                  {[
                    ["CTA", "Action"],
                    ["Tab", "Navigation within the section"],
                    ["Anchor link", "Navigation within the page"],
                    ["Tag", "Categorization & filtering"],
                    ["Accordion", "Content disclosure"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-mono text-xs text-indigo-700 dark:text-indigo-400">{k}</dt>
                      <dd className="mt-1 text-[13px] leading-[1.6] text-zinc-600 dark:text-zinc-400">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="mt-14">
                <BeforeAfter
                  title="UI patterns"
                  before={<ImageSlot {...IMAGES.patternsBefore} aspect="aspect-[16/10]" className="rounded-xl" />}
                  after={<ImageSlot {...IMAGES.patternsAfter} aspect="aspect-[16/10]" className="rounded-xl" />}
                />
              </div>
                </>
              )}

              <Subhead>Card system: Card Block & List Item</Subhead>
              <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
                <Figure value="235 → 7" note="card variants → master components" />
                <Body>
                  Basic, Immersive, Grid and Compact cards were rebuilt as two
                  components. A <Em>Card Block</Em> (Feature, Visual, Compact)
                  is clickable as a whole. A <Em>List Item</Em> (Horizontal,
                  Vertical, Wide, Center) holds multiple links. Separating them{" "}
                  <Em>removes link-in-link situations</Em> and streamlines variants.
                </Body>
              </div>
              <div className="mt-12">
                <CardSystemDemo />
              </div>
              <ul className="mt-6 grid gap-2 text-sm leading-6 text-zinc-600 sm:grid-cols-2 dark:text-zinc-400">
                <Dot>Use-case variant names (Event, Person, Episode…) removed</Dot>
                <Dot>Child variations handled at the child component level</Dot>
                <Dot>Compact image ratio changed from 3:2 to 16:9</Dot>
                <Dot>Eyebrow always aligned to the top</Dot>
              </ul>
            </Section>

            {/* 05 */}
            <Section index="05" id="aem" title="AEM & Engineering Compatibility">
              <Lead>
                AEM authors constantly change text length, imagery and language.{" "}
                <Em>The Figma components had to flex the same way the code does.</Em>
              </Lead>
              <List
                cols={4}
                items={[
                  ["Elastic components", "Removed rigid line objects and fixed heights; text overflow and truncation are specified per component.", ICONS.elastic],
                  ["Authoring behavior", "Re-specified component behavior around the authoring experience.", ICONS.authoring],
                  ["Grid alignment", "Components adapt to the grid system and its sizing.", ICONS.grid],
                  ["Image aspect ratios", "Dynamic Media allows one profile per folder, so renditions should stay minimal: 22 → 7 ratios.", ICONS.ratios],
                ]}
              />

              <div className="mt-14">
                <BeforeAfter
                  title="Elastic component architecture — HP Hero"
                  compareFirst
                  before={<ImageSlot {...IMAGES.layoutBefore} aspect="aspect-[475/418]" className="mx-auto max-w-[560px] rounded-xl" />}
                  after={<ImageSlot {...IMAGES.layoutAfter} aspect="aspect-[2031/1990]" className="mx-auto max-w-[560px] rounded-xl" />}
                  beforeCaption="Fixed heights and minimum heights in the right slots — long content overflowed and broke the layout."
                  afterCaption="Heights flex with content and always stack to the top. Background media is full-bleed; on desktop the image fills the space beside the left slot, on tablet and mobile it locks to 16:9."
                />
              </div>

              <Subhead>Guides for authors and designers</Subhead>
              <Body className="max-w-3xl">
                I created <Em>AEM-compatible component templates and design
                guidelines,</Em> along with accessibility guidelines for both
                designers and content authors — so anyone can build accessible
                pages without needing to know the system&apos;s internals.
              </Body>
              <div className="mt-10">
                <DocViewer
                  label="Guideline"
                  pages={[
                    {
                      id: "templates",
                      label: "Templates",
                      title: "Component Templates and Design Guidelines",
                      image: <DocImage image={IMAGES.guideTemplates} scroll />,
                      points: [
                        "Templates to detach before use, with auto grid layout aligned to the CSS grid implementation for MCP",
                        "Typography: 12px minimum, 16px+ for body copy, 14px+ for CTAs and navigation",
                        "Semantic color tokens only; new tokens are reviewed before they are added",
                        "Interaction semantics: CTA = action, Tab = section navigation, Tag = categorization",
                        "Responsive validation across breakpoints and languages before review and hand-off",
                      ],
                    },
                    {
                      id: "components",
                      label: "Components",
                      title: "Accessibility Components Design Guideline",
                      image: <DocImage image={IMAGES.guideComponents} scroll />,
                      points: [
                        "WCAG 2.2 Level AA as the baseline for every component",
                        "Content flexibility: validate at the smallest breakpoint, 200% text resize and 400% zoom",
                        "Contrast: 4.5:1 for text, 3:1 for UI components and focus indicators",
                        "Target size: 24×24 px minimum, 44×44 px recommended",
                        "Keyboard access and visible focus for all interactive elements",
                      ],
                    },
                    {
                      id: "authoring",
                      label: "Authoring",
                      title: "Accessibility Authoring Guideline",
                      image: <DocImage image={IMAGES.guideAuthoring} scroll />,
                      points: [
                        "Alt text only when an image carries meaning; decorative images stay empty",
                        "CTA labels start with a verb, 2–5 words, 25 characters or fewer",
                        "Generic labels like “Learn More” get a descriptive ARIA label built from the card title",
                        "Open in a new tab only when it preserves the user’s workflow, such as external sites and downloads",
                      ],
                    },
                  ]}
                />
              </div>

              <Subhead>Figma MCP: one structure for design and code</Subhead>
              <Body className="max-w-3xl">
                I proposed Figma MCP to the development team as a shared bridge
                between design and code. Instead of treating the design system as
                data closed off inside Figma, <Em>I worked with engineers to make
                the token and component structure MCP-friendly</Em> — semantic
                tokens that map 1:1 to CSS classes, and auto layout aligned with
                the CSS grid — so what designers build is what MCP hands to code.
              </Body>
            </Section>

            {/* 06 */}
            <Section index="06" id="tradeoffs" title="Trade-offs & Strategic Alignment">
              <TwoCol
                left={
                  <Block label="Constraint">
                    MCP can&apos;t reliably read nested components. Flattening
                    them would make the integration cleaner.
                  </Block>
                }
                right={
                  <Block label="Cost">
                    But flattening causes a Figma variant explosion — a library
                    that is harder to use and harder to maintain.
                  </Block>
                }
              />

              <blockquote className="mt-20">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-indigo-700 dark:text-indigo-400">
                  Decision
                </p>
                <p className="mt-5 max-w-3xl text-3xl font-medium leading-tight tracking-[-0.02em] sm:text-4xl">
                  Preserve nested structures in Figma, and support engineering
                  with clear hand-off documentation.
                </p>
                <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  Aligned with the engineering team, we kept nesting where it
                  reflects how components are built, and documented the edge
                  cases and layout variations MCP can&apos;t interpret on its own.
                </p>
              </blockquote>

              <div id="handoff" className="scroll-mt-8">
                <Subhead>Hand-off example: Content Grid</Subhead>
              </div>
              <Body className="max-w-3xl">
                <Em>The Content Grid replaced four legacy components.</Em> Its hand-off
                doc covers every background and layout, maps each element to
                its AEM authoring field, and charts which grid items work at
                which column count — the edge cases MCP can&apos;t infer.
              </Body>
              <div className="mt-10">
                <DocViewer
                  label="Hand-off doc"
                  stacked
                  pages={[
                    {
                      id: "specs",
                      label: "Specs & authoring",
                      title: "Elements mapped to AEM authoring",
                      image: <DocImage image={IMAGES.handoffSpecs} />,
                      points: [
                        "Each element numbered and matched to its AEM dialog field",
                        "Section header, settings and grid item options",
                        "Grid item types: Stat List, Stat List Text, Card Block and List Item",
                      ],
                    },
                    {
                      id: "variations",
                      label: "Variation chart",
                      title: "Which items work where",
                      image: <DocImage image={IMAGES.handoffVariations} aspect="aspect-[6/7]" />,
                      points: [
                        "Allowed grid items per header type and column count",
                        "sm and md card sizes compared side by side",
                      ],
                    },
                    {
                      id: "responsive",
                      label: "Responsive & corner cases",
                      title: "Tablet, mobile and edge cases",
                      image: <DocImage image={IMAGES.handoffResponsive} aspect="aspect-[5/4]" />,
                      points: [
                        "Column changes for tablet and mobile",
                        "Corner cases such as no section header and long stat values",
                        "How content wraps instead of truncating",
                      ],
                    },
                    {
                      id: "master",
                      label: "Master components",
                      title: "Every background, header and column layout",
                      image: <DocImage image={IMAGES.handoffMaster} aspect="aspect-[12/11]" />,
                      points: [
                        "White, gray and navy backgrounds side by side",
                        "Vertical and horizontal section headers",
                        "2, 3 and 4 column layouts on desktop",
                      ],
                    },
                  ]}
                />
              </div>
            </Section>
          </main>
        </div>

        <footer className="flex items-center justify-between border-t border-zinc-200 py-12 text-sm dark:border-zinc-800">
          <Link href="/" className="text-zinc-600 transition-colors hover:text-indigo-700 dark:text-zinc-400 dark:hover:text-indigo-400">
            ← All case studies
          </Link>
          <a href="#summary" className="text-zinc-500 transition-colors hover:text-indigo-700 dark:hover:text-indigo-400">
            Back to top ↑
          </a>
        </footer>
      </div>
    </div>
  );
}

/* ---------- Building blocks ---------- */

function Section({
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

function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-3xl text-xl leading-relaxed text-zinc-700 sm:text-2xl sm:leading-relaxed dark:text-zinc-300">
      {children}
    </p>
  );
}

function Subhead({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-6 mt-20 text-xl font-semibold tracking-[-0.01em] text-neutral-900 sm:text-2xl dark:text-white">
      {children}
    </h3>
  );
}

function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-base leading-8 text-zinc-600 dark:text-zinc-400 ${className}`}>{children}</p>;
}

function Em({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-neutral-900 dark:text-white">{children}</strong>;
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[0.8em] text-indigo-800 [overflow-wrap:anywhere] dark:text-indigo-300">{children}</code>
  );
}

function Dot({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-indigo-600" />
      {children}
    </li>
  );
}

function Figure({ value, note, large }: { value: string; note: string; large?: boolean }) {
  return (
    <div>
      <p
        className={`font-light tracking-[-0.05em] text-indigo-700 dark:text-indigo-400 ${
          large ? "text-6xl sm:text-7xl" : "text-5xl sm:text-6xl"
        }`}
      >
        {value}
      </p>
      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">{note}</p>
    </div>
  );
}

function TwoCol({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400">{label}</p>
      <p className="mt-4 text-base leading-8 text-zinc-700 dark:text-zinc-300">{children}</p>
    </div>
  );
}

/** Term/description grid. An optional third item renders an icon above the term. */
function List({ items, cols = 2 }: { items: [string, string, ReactNode?][]; cols?: 2 | 3 | 4 | 5 }) {
  const grid = { 2: "gap-x-12 sm:grid-cols-2", 3: "gap-x-10 md:grid-cols-3", 4: "gap-x-10 sm:grid-cols-2 lg:grid-cols-4", 5: "gap-x-8 sm:grid-cols-2 lg:grid-cols-5" }[cols];
  return (
    <dl className={`mt-12 grid gap-y-8 ${grid}`}>
      {items.map(([term, desc, icon]) => (
        <div key={term}>
          {icon && (
            <span
              aria-hidden
              className="mb-5 block text-indigo-700 dark:text-indigo-300"
            >
              {icon}
            </span>
          )}
          <dt className="font-semibold text-neutral-900 dark:text-white">{term}</dt>
          <dd className="mt-1.5 text-[13px] leading-[1.6] text-zinc-600 [overflow-wrap:anywhere] dark:text-zinc-400">{desc}</dd>
        </div>
      ))}
    </dl>
  );
}

function DocImage({
  image,
  aspect = "aspect-[4/5]",
  scroll,
}: {
  image: ImageAsset;
  aspect?: string;
  /** Show a tall document at full width inside a scrollable frame. */
  scroll?: boolean;
}) {
  if (scroll) return <ScrollImage {...image} />;
  return (
    <ImageSlot
      {...image}
      aspect={aspect}
      position="top"
      className="rounded-xl"
      sizes="(min-width: 1024px) 640px, 100vw"
    />
  );
}

const BREAKPOINTS = [
  ["Min width", "320", "768", "1024"],
  ["Max width", "767", "1023", "9999"],
  ["Default", "375", "768", "1440"],
  ["Margin", "20", "32", "40"],
  ["Gutter", "20", "20", "32"],
  ["Columns", "4", "6", "12"],
  ["Content max width", "727", "1023", "1600"],
];

function BreakpointTable() {
  return (
    <div className="grid gap-10 md:grid-cols-[1fr_220px] md:gap-16">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[440px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-xs uppercase tracking-[0.15em] text-zinc-500 dark:border-zinc-800">
              <th className="py-3 font-medium">Element</th>
              {["sm / mobile", "md / tablet", "lg / desktop"].map((h) => (
                <th key={h} className="py-3 font-medium">{h}</th>
              ))}
              <th className="py-3 font-medium text-zinc-400 line-through">xl 1600+</th>
            </tr>
          </thead>
          <tbody>
            {BREAKPOINTS.map(([k, ...v]) => (
              <tr key={k}>
                <th className="py-3 pr-4 font-normal text-zinc-600 dark:text-zinc-400">{k}</th>
                {v.map((x, i) => (
                  <td key={i} className="py-3 font-mono text-zinc-900 dark:text-zinc-100">{x}</td>
                ))}
                <td className="py-3 font-mono text-zinc-300 dark:text-zinc-700">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <p className="text-5xl font-light tracking-[-0.05em] text-indigo-700 dark:text-indigo-400">4 → 3</p>
        <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          breakpoints. The 1600px+ screen-size breakpoint was removed; large screens now cap content at 1600px.
        </p>
      </div>
    </div>
  );
}

const LEGACY_GRIDS = [
  ["Compact Card Package", "Single use"],
  ["Styled List Breaker", "Manual grid"],
  ["Card Grid", ""],
  ["Value Prop Package", "Single use"],
];

function LegacyGrids() {
  return (
    <div>
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Four legacy components</p>
      <ul className="mt-3 space-y-2 text-sm">
        {LEGACY_GRIDS.map(([name, note]) => (
          <li key={name} className="flex items-baseline justify-between gap-4">
            <span className="text-zinc-400 line-through decoration-zinc-400 dark:text-zinc-500">{name}</span>
            <span className="text-xs text-zinc-400">{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContentGridSummary() {
  return (
    <div>
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">One Content Grid</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        <Dot>Aligned to the basic page grid</Dot>
        <Dot>Vertical or horizontal header, 2–4 columns</Dot>
        <Dot>Grid items: Stat List, Stat List Text, Card Block, List Item</Dot>
        <Dot>Appendix stat text added</Dot>
      </ul>
      <a
        href="#handoff"
        className="mt-4 inline-block rounded text-sm font-medium text-indigo-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 dark:text-indigo-400"
      >
        See the hand-off doc ↓
      </a>
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
