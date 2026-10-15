import type { Metadata } from "next";
import {
  Block,
  Body,
  CaseStudyLayout,
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
import { ImageTabs } from "../_components/ImageTabs";
import { FinanceDemo } from "./_components/FinanceDemo";
import {
  CheckIcon,
  ClockIcon,
  FileTextIcon,
  ReceiptIcon,
} from "./_components/icons";
import { PersonaCard, type Persona } from "./_components/PersonaCard";
import {
  ProductWalkthrough,
  type WalkthroughFlow,
} from "./_components/ProductWalkthrough";

export const metadata: Metadata = {
  title: "Quork Board: Timesheet, Billing & Invoice — Case Study",
  description:
    "Digitizing legacy Excel-based operations into an automated financial workflow platform for Unqork enterprise operations.",
};

/** Media lives in /public/projects/Quork Board/. */
const DIR = "projects/Quork Board";
const SCREENS = `${DIR}/Product Gif`;

const SECTIONS = [
  { id: "summary", label: "Executive Summary" },
  { id: "discovery", label: "Discovery & Requirements" },
  { id: "architecture", label: "Architecture & Workflows" },
  { id: "product", label: "Final Product" },
  { id: "demo", label: "Interactive Demo" },
  { id: "results", label: "Results & Next Steps" },
] as const;

const META: Meta[] = [
  { label: "Role", value: "Lead Product & UX Designer" },
  { label: "Platform", value: "Enterprise SaaS (Unqork)" },
  { label: "Tooling", value: "Figma · User Research · User Flow Architecture" },
];

const METRICS: Metric[] = [
  {
    before: "1.3",
    after: "3.8",
    label: "SUS survey score",
    detail: "System usability",
  },
  {
    after: "−46%",
    label: "Reconciliation time",
    detail: "Billing, on average",
  },
  { after: "+31%", label: "Accuracy", detail: "Billing and invoicing" },
  {
    after: "−14%",
    label: "Invoice pushback",
    detail: "Caused by resourcing errors",
  },
];

/** Product screens and recordings, all 4:3. */
function Screen({ name, alt }: { name: string; alt: string }) {
  return (
    <ImageSlot
      dir={SCREENS}
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
    id: "timesheet",
    label: "Timesheet",
    steps: [
      {
        actor: "Talent",
        caption: "Default values are pre-filled from Resource Planning.",
        image: (
          <Screen
            name="Time_1_Talent_Default"
            alt="Talent timesheet pre-filled with planned hours"
          />
        ),
      },
      {
        actor: "Talent",
        caption: "Add a note if needed, then submit.",
        note: "If a timesheet isn't submitted by the end of the billing cycle, the default values are submitted automatically.",
        image: (
          <Screen
            name="Time_2_Talent_NoteAndSubmit"
            alt="Talent adds a note and submits the timesheet"
          />
        ),
      },
      {
        actor: "OP / Admin",
        caption: "Operations adjusts time records if needed.",
        image: (
          <Screen
            name="Time_3_OP_Project_Timerecord"
            alt="Operations view of project time records"
          />
        ),
      },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    steps: [
      {
        actor: "OP / Admin",
        caption: "Remind the SI Partner, or send the bill template.",
        image: (
          <Screen
            name="Billing_1_Remind"
            alt="Sending a bill template reminder to an SI Partner"
          />
        ),
      },
      {
        actor: "OP / Admin",
        caption: "Explore the bill details.",
        image: (
          <Screen
            name="Billing_2_DrawerExplore"
            alt="Bill details in a side drawer"
          />
        ),
      },
      {
        actor: "OP / Admin",
        caption: "Explore and adjust discrepancies.",
        note: "Bills are checked against internal records automatically; only those outside the threshold are flagged.",
        image: (
          <Screen
            name="Billing_3_Discrepancies"
            alt="Flagged bill discrepancies being adjusted"
          />
        ),
      },
      {
        actor: "OP / Admin",
        caption: "Approve the bill.",
        image: (
          <Screen
            name="Billing_4_Approved"
            alt="Operations approves the bill"
          />
        ),
      },
      {
        actor: "Finance",
        caption: "OP-approved bills arrive in Finance's review queue.",
        image: (
          <Screen
            name="Billing_5_FD_Default"
            alt="Finance review queue with approved bills"
          />
        ),
      },
      {
        actor: "Finance",
        caption: "Review the bill details.",
        image: (
          <Screen
            name="Billing_6_FD_Explore"
            alt="Finance reviews bill details"
          />
        ),
      },
      {
        actor: "Finance",
        caption: "Adjust expenses if needed.",
        image: (
          <Screen
            name="Billing_7_FD_Expense_Edit"
            alt="Finance edits an expense line"
          />
        ),
      },
      {
        actor: "Finance",
        caption: "Pay the SI Partner in a third-party application.",
        image: (
          <Screen
            name="Billing_8_FD_Pay"
            alt="Bill marked as paid to the SI Partner"
          />
        ),
      },
    ],
  },
  {
    id: "invoice",
    label: "Invoice",
    steps: [
      {
        actor: "System",
        caption: "Invoices are generated automatically in “Need Action.”",
        note: "Invoices are built from internal records, so nobody re-keys hours from spreadsheets.",
        image: (
          <Screen
            name="Invoice_1_OP_DefaultList"
            alt="Invoice list with auto-generated invoices in Need Action"
          />
        ),
      },
      {
        actor: "OP / Admin",
        caption: "Explore the invoice details.",
        image: (
          <Screen
            name="Invoice_2_OP_Drawer"
            alt="Invoice details in a side drawer"
          />
        ),
      },
      {
        actor: "OP / Admin",
        caption: "Share the invoice internally if needed.",
        image: <Screen name="Invoice_3_OP_Share" alt="Sharing an invoice" />,
      },
      {
        actor: "OP / Admin",
        caption: "Send the invoice to the client.",
        note: "The client then pays or rejects it in the Client Portal, which was out of scope.",
        image: (
          <Screen
            name="Invoice_4_OP_Submit"
            alt="Sending the invoice to the client"
          />
        ),
      },
    ],
  },
];

const SCOPE = [
  {
    icon: <ClockIcon className="h-10 w-10 [stroke-width:1.3]" />,
    title: "Timesheet",
    text: "Hours pre-filled from resource planning, submitted by talent and adjusted by Operations.",
  },
  {
    icon: <ReceiptIcon className="h-10 w-10 [stroke-width:1.3]" />,
    title: "Billing",
    text: "SI Partner bills checked against internal records, approved by Operations and paid by Finance.",
  },
  {
    icon: <FileTextIcon className="h-10 w-10 [stroke-width:1.3]" />,
    title: "Invoice",
    text: "Client invoices generated from the same records, reviewed and sent from one queue.",
  },
];

/** Original artwork crops: only the avatars are reused. */
const PERSONAS: Persona[] = [
  {
    team: "Operations Team",
    avatar: "/projects/Quork Board/avatar-op.webp",
    painPoint:
      "Manual discrepancy checks to prevent invoice and resourcing errors",
    story:
      "Checking discrepancies across multiple Excel files caused frequent errors and pushback from clients and SI Partners. The team wanted to cut invoice pushback caused by manual resourcing input errors.",
    scope: ["Automate bill discrepancies", "Invoice status tracking"],
  },
  {
    team: "Finance Department",
    avatar: "/projects/Quork Board/avatar-finance.webp",
    painPoint: "Manual billing tracking",
    story:
      "Finance sometimes lost track of where each bill stood and which were ready to pay, while others still needed OP adjustments and constant check-ins. SI Partners complained about late payments and couldn't tell where their bills were.",
    scope: ["Track billing status", "Surface items that need action"],
  },
];

const CHECKPOINTS = [
  {
    title: "Bill-vs-record check",
    text: "Every SI Partner bill is compared with time records; only lines outside the threshold are flagged.",
  },
  {
    title: "Default timesheet submission",
    text: "Planned hours are submitted automatically if talent misses the end of the billing cycle.",
  },
  {
    title: "Invoices from internal records",
    text: "Client invoices are generated from the same records, ready for review in “Need Action.”",
  },
];

const NEXT_STEPS: [string, string][] = [
  [
    "Itemized invoices per client",
    "Dropped from the MVP; to be revisited based on user feedback.",
  ],
  [
    "Digitized SOWs and contracts",
    "SOWs vary by SI Partner and live only as PDFs. Making them searchable would speed up billing and enable planned-vs-actual fee checks.",
  ],
  ["SI Partner Portal", "Automatic reminders with the bill template attached."],
  [
    "Auto-sent invoices",
    "Without digitized SOWs, users may not trust fully automated billing, so I designed the ideal post-MVP flow for when they are.",
  ],
];

export default function QuorkBoardBillingCaseStudy() {
  return (
    <CaseStudyLayout
      eyebrow="Case Study — Enterprise SaaS"
      title={
        <span className="block leading-[1.15]">
          Quork Board:
          <br />
          Timesheet, Billing &amp; Invoice
        </span>
      }
      subtitle="Digitizing legacy Excel-based operations into an automated financial workflow platform for Unqork enterprise operations."
      meta={META}
      metrics={METRICS}
      sections={SECTIONS}
    >
      <div className="pt-16">
        <ImageSlot
          dir={DIR}
          name="Quork Board - Timesheet Invoice Billing"
          alt="Quork Board timesheet, billing and invoice screens"
          aspect="aspect-[2896/1376]"
          sizes="(min-width: 1280px) 1000px, 100vw"
          className="rounded-2xl"
        />
      </div>

      {/* 01 */}
      <Section
        index="01"
        id="summary"
        title="Executive Summary & Problem Statement"
        first
      >
        <TwoCol
          left={
            <Block label="Background">
              Unqork ran its internal operations on{" "}
              <Em>Excel spreadsheets and manual hand-offs.</Em> Every billing
              cycle meant time-consuming bottlenecks, lost records and
              reconciliation errors that reached clients and SI Partners.
            </Block>
          }
          right={
            <Block label="Solution">
              <Em>An Automated Financial Operations Suite</Em> that
              connects Timesheet, Billing and Invoice workflows — so one set of
              records drives what talent submits, what partners are paid and
              what clients are invoiced.
            </Block>
          }
        />

        <dl className="mt-16 grid gap-x-10 gap-y-8 md:grid-cols-3">
          {SCOPE.map((s) => (
            <div key={s.title}>
              <span
                aria-hidden
                className="mb-4 block text-[#4329a6] dark:text-indigo-300"
              >
                {s.icon}
              </span>
              <dt className="font-semibold text-neutral-900 dark:text-white">
                {s.title}
              </dt>
              <dd className="mt-1.5 text-[13px] leading-[1.6] text-zinc-600 dark:text-zinc-400">
                {s.text}
              </dd>
            </div>
          ))}
        </dl>

        <Body className="mt-12 max-w-3xl">
          A 20-week engagement covering Financial Analysis, Resourcing,
          Timesheet, Billing and Invoice, with two designers, a project manager
          and two SMEs from the Finance and Operations teams.
        </Body>
      </Section>

      {/* 02 */}
      <Section index="02" id="discovery" title="Discovery & Requirements">
        <Lead>
          I interviewed{" "}
          <Em>four engagement managers and the Operations team,</Em> alongside
          finance SMEs, to map the current process, its pain points and what
          each team needed — the findings that set the product scope.
        </Lead>

        <Subhead>Two teams, two kinds of manual work</Subhead>
        <div className="grid gap-6 md:grid-cols-2">
          {PERSONAS.map((p) => (
            <PersonaCard key={p.team} persona={p} />
          ))}
        </div>

        <div className="mt-20 grid items-center gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.01em] text-neutral-900 sm:text-2xl dark:text-white">
              Requirement cheat sheet
            </h3>
            <Body className="mt-6">
              With the Operations and Finance teams, I built{" "}
              <Em>a shared requirement cheat sheet</Em> — starting from
              interview findings and flow walkthroughs, and mapping each need
              directly to system scope. It became the baseline every later
              decision was checked against.
            </Body>
          </div>
          <figure>
            <ImageSlot
              dir={DIR}
              name="Requirement_Gathering_Resourcing"
              alt="Requirement cheat sheet mapping engagement manager and operations needs to granularity and goals, beside the teams' existing spreadsheets"
              aspect="aspect-[2500/1697]"
              fit="contain"
              sizes="(min-width: 1024px) 640px, 100vw"
              className="rounded-xl"
            />
          </figure>
        </div>
      </Section>

      {/* 03 */}
      <Section index="03" id="architecture" title="Architecture & Workflows">
        <Lead>
          I mapped the current flows from the interviews to find{" "}
          <Em>where automation could replace manual checks,</Em> then digitized
          them end to end.
        </Lead>

        <div className="mt-12">
          <ImageTabs
            label="User flow"
            items={[
              {
                id: "billing",
                label: "Billing Flow",
                image: (
                  <ImageSlot
                    dir={DIR}
                    name="SIP+Bill+to+Pay"
                    alt="Billing flow: SI Partner bill to payment across SI Partner, Finance, Ops, Talent and Engagement Manager lanes"
                    aspect="aspect-[1500/1087]"
                    fit="contain"
                    className="rounded-lg !bg-white"
                  />
                ),
                caption:
                  "SI Partner bill to payment. Bills are checked against time records automatically; only discrepancies go to the right owner — Talent, Engagement Manager or Ops.",
              },
              {
                id: "invoice",
                label: "Client Invoice Flow",
                image: (
                  <ImageSlot
                    dir={DIR}
                    name="Client+Invoice+to+receive+payment"
                    alt="Client invoice flow from generation to payment"
                    aspect="aspect-[2500/1546]"
                    fit="contain"
                    className="rounded-lg !bg-white"
                  />
                ),
                caption:
                  "Client invoice to payment. Invoices are generated from the same records the bills are checked against.",
              },
            ]}
          />
        </div>

        <div className="mt-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#4329a6] dark:text-indigo-300">
            Key automation checkpoints
          </p>
          <ul className="mt-5 grid gap-x-10 gap-y-6 md:grid-cols-3">
            {CHECKPOINTS.map((c) => (
              <li key={c.title} className="flex gap-3">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#4329a6] [stroke-width:2] dark:text-indigo-300" />
                <span>
                  <span className="block text-sm font-semibold text-neutral-900 dark:text-white">
                    {c.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-[1.6] text-zinc-600 dark:text-zinc-400">
                    {c.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Subhead>Proposed sitemap</Subhead>
        <Body className="max-w-3xl">
          A high-level sitemap built from the interviews, scope and
          requirements. Billing and invoicing live where people already work —
          in the portfolio, client, project and talent views — rather than in a
          separate tool.
        </Body>
        <figure className="mt-10">
          <ImageSlot
            dir={DIR}
            name="Sitemap_BillingInvoice"
            alt="Sitemap: OMT landing with Portfolio, Talent, Intake and Environment; client invoices, SI Partner bills, time reports and timesheets highlighted"
            aspect="aspect-[2484/1142]"
            fit="contain"
            className="rounded-xl !bg-white"
          />
        </figure>
      </Section>

      {/* 04 */}
      <Section index="04" id="product" title="Final Product">
        <Lead>
          Three connected flows, each with a clear owner at every step —{" "}
          <Em>
            from the hours talent submits to the bill Finance pays and the
            invoice a client receives.
          </Em>
        </Lead>
        <div className="mt-12">
          <ProductWalkthrough flows={FLOWS} />
        </div>
      </Section>

      {/* 05 */}
      <Section index="05" id="demo" title="Interactive Financial Dashboard">
        <Body className="max-w-3xl">
          The core interactions, rebuilt in code. Move bills through their
          statuses, send invoices, and resolve flagged lines to see how{" "}
          <Em>each status exposes exactly one next step</Em> and who owns it.
        </Body>
        <div className="mt-10">
          <FinanceDemo />
        </div>
        <p className="mt-4 text-xs text-zinc-500">
          Recreated in code from the shipped design. Partners, clients, people
          and amounts are illustrative.
        </p>
      </Section>

      {/* 06 */}
      <Section index="06" id="results" title="Results & Next Steps">
        <div className="grid gap-x-16 gap-y-12 sm:grid-cols-2">
          <Figure value="1.3 → 3.8" note="SUS survey score" />
          <Figure value="−46%" note="Billing reconciliation time, on average" />
          <Figure value="+31%" note="Accuracy" />
          <Figure
            value="−14%"
            note="Client invoice pushback caused by resourcing"
          />
        </div>

        <Subhead>Next steps</Subhead>
        <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {NEXT_STEPS.map(([term, desc]) => (
            <div key={term}>
              <dt className="font-semibold text-neutral-900 dark:text-white">
                {term}
              </dt>
              <dd className="mt-1.5 text-[13px] leading-[1.6] text-zinc-600 dark:text-zinc-400">
                {desc}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </CaseStudyLayout>
  );
}
