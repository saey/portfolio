"use client";

import { useState, type ReactNode } from "react";
import { Toggle } from "../../_components/Toggle";
import { STAGE, SURFACE } from "../../_components/stage";

/* Illustrative data only — partners, clients, people and amounts are made up. */

type View = "billing" | "invoice" | "reconciliation";

const VIEWS = [
  { id: "billing", label: "Billing Management" },
  { id: "invoice", label: "Invoice Flow" },
  { id: "reconciliation", label: "Reconciliation" },
] as const;

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const button =
  "rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700";
const primary = `${button} bg-[#4329a6] text-white hover:bg-[#35208a]`;
const secondary = `${button} border border-zinc-300 text-zinc-700 hover:border-[#4329a6] hover:text-[#4329a6] dark:border-zinc-700 dark:text-zinc-300`;

export function FinanceDemo() {
  const [view, setView] = useState<View>("billing");

  return (
    <div className={STAGE}>
      <Toggle
        label="Demo view"
        options={VIEWS}
        value={view}
        onChange={setView}
        size="md"
        level={1}
      />
      <div className="mt-6">
        {view === "billing" && <BillingManagement />}
        {view === "invoice" && <InvoiceFlow />}
        {view === "reconciliation" && <Reconciliation />}
      </div>
    </div>
  );
}

function Panel({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-xl border border-zinc-200 dark:border-zinc-800 ${SURFACE}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-white">
            {title}
          </p>
          <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: "gray" | "violet" | "amber" | "green" | "red";
  children: ReactNode;
}) {
  const tones = {
    gray: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
    violet:
      "bg-indigo-50 text-[#4329a6] dark:bg-indigo-950 dark:text-indigo-300",
    amber: "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    green:
      "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    red: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  };
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* ---------- Billing Management ---------- */

type BillStatus =
  "awaiting" | "reminded" | "discrepancy" | "review" | "approved" | "paid";

type Bill = {
  id: string;
  partner: string;
  project: string;
  amount: number;
  status: BillStatus;
};

const BILLS: Bill[] = [
  {
    id: "B-1041",
    partner: "Northwind Partners",
    project: "Claims Portal",
    amount: 48200,
    status: "awaiting",
  },
  {
    id: "B-1042",
    partner: "Bluepeak Consulting",
    project: "Onboarding Hub",
    amount: 31650,
    status: "discrepancy",
  },
  {
    id: "B-1043",
    partner: "Arcline Systems",
    project: "Policy Admin",
    amount: 27400,
    status: "review",
  },
  {
    id: "B-1044",
    partner: "Meridian Digital",
    project: "Payments API",
    amount: 19800,
    status: "approved",
  },
  {
    id: "B-1045",
    partner: "Harbor & Finch",
    project: "Agent Desktop",
    amount: 22300,
    status: "paid",
  },
];

const BILL_STATUS: Record<
  BillStatus,
  {
    label: string;
    tone: "gray" | "violet" | "amber" | "green" | "red";
    owner: string;
  }
> = {
  awaiting: { label: "Awaiting bill", tone: "gray", owner: "OP / Admin" },
  reminded: { label: "Reminder sent", tone: "gray", owner: "SI Partner" },
  discrepancy: { label: "Discrepancy", tone: "red", owner: "OP / Admin" },
  review: { label: "Ready to approve", tone: "amber", owner: "OP / Admin" },
  approved: { label: "With Finance", tone: "violet", owner: "Finance" },
  paid: { label: "Paid", tone: "green", owner: "—" },
};

/** The single next action for each status, mirroring the bill-to-pay flow. */
const BILL_ACTION: Partial<
  Record<BillStatus, { label: string; next: BillStatus }>
> = {
  awaiting: { label: "Send reminder", next: "reminded" },
  reminded: { label: "Bill received", next: "review" },
  discrepancy: { label: "Resolve", next: "review" },
  review: { label: "Approve", next: "approved" },
  approved: { label: "Pay partner", next: "paid" },
};

function BillingManagement() {
  const [bills, setBills] = useState(BILLS);
  const [filter, setFilter] = useState<"action" | "all">("action");

  const needsAction = (b: Bill) =>
    b.status === "awaiting" ||
    b.status === "discrepancy" ||
    b.status === "review";
  const shown =
    filter === "action" ? bills.filter((b) => b.status !== "paid") : bills;
  const advance = (id: string) =>
    setBills((all) =>
      all.map((b) =>
        b.id === id && BILL_ACTION[b.status]
          ? { ...b, status: BILL_ACTION[b.status]!.next }
          : b,
      ),
    );

  const stats = [
    { label: "Need action", value: String(bills.filter(needsAction).length) },
    {
      label: "With Finance",
      value: money(
        bills
          .filter((b) => b.status === "approved")
          .reduce((s, b) => s + b.amount, 0),
      ),
    },
    {
      label: "Paid this cycle",
      value: money(
        bills
          .filter((b) => b.status === "paid")
          .reduce((s, b) => s + b.amount, 0),
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`rounded-xl border border-zinc-200 px-4 py-3 dark:border-zinc-800 ${SURFACE}`}
          >
            <dt className="text-[11px] uppercase tracking-wider text-zinc-500">
              {s.label}
            </dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums text-neutral-900 sm:text-xl dark:text-white">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <Panel
        title="SI Partner bills"
        subtitle="Billing cycle Sep 1 – 15 · each status shows its one next step"
        action={
          <div className="flex items-center gap-3">
            <Toggle
              label="Bill filter"
              options={
                [
                  { id: "action", label: "Open" },
                  { id: "all", label: "All" },
                ] as const
              }
              value={filter}
              onChange={setFilter}
            />
            <button
              type="button"
              onClick={() => setBills(BILLS)}
              className={secondary}
            >
              Reset
            </button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-[11px] uppercase tracking-wider text-zinc-500">
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-5 py-2.5 font-medium">Bill</th>
                <th className="px-3 py-2.5 font-medium">
                  SI Partner · Project
                </th>
                <th className="px-3 py-2.5 text-right font-medium">Amount</th>
                <th className="px-3 py-2.5 font-medium">Status</th>
                <th className="px-3 py-2.5 font-medium">Owner</th>
                <th className="px-5 py-2.5 text-right font-medium">
                  Next step
                </th>
              </tr>
            </thead>
            <tbody>
              {shown.map((b) => {
                const status = BILL_STATUS[b.status];
                const action = BILL_ACTION[b.status];
                return (
                  <tr
                    key={b.id}
                    className="border-b border-zinc-100 last:border-0 dark:border-zinc-900"
                  >
                    <td className="px-5 py-3 font-mono text-xs text-zinc-500">
                      {b.id}
                    </td>
                    <td className="px-3 py-3">
                      <span className="block font-medium text-neutral-900 dark:text-white">
                        {b.partner}
                      </span>
                      <span className="text-xs text-zinc-500">{b.project}</span>
                    </td>
                    <td className="px-3 py-3 text-right tabular-nums">
                      {money(b.amount)}
                    </td>
                    <td className="px-3 py-3">
                      <Badge tone={status.tone}>{status.label}</Badge>
                    </td>
                    <td className="px-3 py-3 text-xs text-zinc-500">
                      {status.owner}
                    </td>
                    <td className="px-5 py-3 text-right">
                      {action ? (
                        <button
                          type="button"
                          onClick={() => advance(b.id)}
                          className={
                            b.status === "reminded" ? secondary : primary
                          }
                        >
                          {action.label}
                        </button>
                      ) : (
                        <span className="text-xs text-zinc-400">Done</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

/* ---------- Invoice Flow ---------- */

type InvoiceStage = "need" | "ready" | "sent";

type Invoice = {
  id: string;
  client: string;
  period: string;
  amount: number;
  stage: InvoiceStage;
};

const INVOICES: Invoice[] = [
  {
    id: "INV-2207",
    client: "Atlas Insurance",
    period: "Sep 1 – 15",
    amount: 86400,
    stage: "need",
  },
  {
    id: "INV-2208",
    client: "Crescent Bank",
    period: "Sep 1 – 15",
    amount: 54250,
    stage: "need",
  },
  {
    id: "INV-2209",
    client: "Lumen Health",
    period: "Sep 1 – 15",
    amount: 39900,
    stage: "ready",
  },
  {
    id: "INV-2203",
    client: "Pioneer Mutual",
    period: "Aug 16 – 31",
    amount: 61200,
    stage: "sent",
  },
];

const COLUMNS: {
  id: InvoiceStage;
  title: string;
  hint: string;
  action?: { label: string; next: InvoiceStage };
}[] = [
  {
    id: "need",
    title: "Need Action",
    hint: "Auto-generated from time records",
    action: { label: "Review details", next: "ready" },
  },
  {
    id: "ready",
    title: "Ready to Send",
    hint: "Checked by OP / Admin",
    action: { label: "Send to client", next: "sent" },
  },
  {
    id: "sent",
    title: "Sent",
    hint: "Client pays or rejects in the Client Portal",
  },
];

function InvoiceFlow() {
  const [invoices, setInvoices] = useState(INVOICES);
  const move = (id: string, next: InvoiceStage) =>
    setInvoices((all) =>
      all.map((i) => (i.id === id ? { ...i, stage: next } : i)),
    );

  return (
    <Panel
      title="Client invoices"
      subtitle="Generated automatically — OP / Admin only reviews and sends"
      action={
        <button
          type="button"
          onClick={() => setInvoices(INVOICES)}
          className={secondary}
        >
          Reset
        </button>
      }
    >
      <div className="grid gap-4 p-5 md:grid-cols-3">
        {COLUMNS.map((col) => {
          const items = invoices.filter((i) => i.stage === col.id);
          return (
            <section
              key={col.id}
              aria-label={col.title}
              className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900"
            >
              <div className="flex items-baseline justify-between px-1">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
                  {col.title}
                </h4>
                <span className="text-xs tabular-nums text-zinc-500">
                  {items.length}
                </span>
              </div>
              <p className="mt-0.5 px-1 text-[11px] text-zinc-500">
                {col.hint}
              </p>
              <ul className="mt-3 space-y-2">
                {items.map((inv) => (
                  <li
                    key={inv.id}
                    className={`rounded-lg border border-zinc-200 p-3 dark:border-zinc-800 ${SURFACE}`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">
                        {inv.client}
                      </span>
                      <span className="font-mono text-[11px] text-zinc-400">
                        {inv.id}
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between text-xs text-zinc-500">
                      <span>{inv.period}</span>
                      <span className="tabular-nums text-zinc-700 dark:text-zinc-300">
                        {money(inv.amount)}
                      </span>
                    </div>
                    {col.action && (
                      <button
                        type="button"
                        onClick={() => move(inv.id, col.action!.next)}
                        className={`mt-3 ${primary}`}
                      >
                        {col.action.label}
                      </button>
                    )}
                  </li>
                ))}
                {items.length === 0 && (
                  <li className="px-1 py-4 text-center text-xs text-zinc-400">
                    Nothing here
                  </li>
                )}
              </ul>
            </section>
          );
        })}
      </div>
    </Panel>
  );
}

/* ---------- Reconciliation ---------- */

type Issue = "hours" | "rate" | "project";

type Line = {
  name: string;
  role: string;
  recordHours: number;
  billedHours: number;
  recordRate: number;
  billedRate: number;
  issue?: Issue;
};

const LINES: Line[] = [
  {
    name: "A. Rivera",
    role: "Senior Engineer",
    recordHours: 80,
    billedHours: 80,
    recordRate: 145,
    billedRate: 145,
  },
  {
    name: "J. Chen",
    role: "Engineer",
    recordHours: 72,
    billedHours: 80,
    recordRate: 120,
    billedRate: 120,
    issue: "hours",
  },
  {
    name: "M. Okafor",
    role: "Tech Lead",
    recordHours: 80,
    billedHours: 80,
    recordRate: 165,
    billedRate: 180,
    issue: "rate",
  },
  {
    name: "S. Patel",
    role: "QA Analyst",
    recordHours: 0,
    billedHours: 40,
    recordRate: 95,
    billedRate: 95,
    issue: "project",
  },
];

/** Discrepancy types from the bill-to-pay flow, and who resolves each. */
const ISSUES: Record<Issue, { label: string; owner: string }> = {
  hours: { label: "Talent hours", owner: "Talent adjusts timesheet" },
  rate: {
    label: "Rate mismatch",
    owner: "Engagement Manager adjusts contract",
  },
  project: { label: "Wrong project", owner: "OP / Admin reassigns" },
};

type Resolution = "record" | "bill";

function Reconciliation() {
  const [resolved, setResolved] = useState<
    Record<string, Resolution | undefined>
  >({});

  const lineTotal = (l: Line) => {
    const r = resolved[l.name];
    return r === "bill"
      ? l.billedHours * l.billedRate
      : r === "record"
        ? l.recordHours * l.recordRate
        : l.billedHours * l.billedRate;
  };
  const billed = LINES.reduce((s, l) => s + l.billedHours * l.billedRate, 0);
  const record = LINES.reduce((s, l) => s + l.recordHours * l.recordRate, 0);
  const adjusted = LINES.reduce((s, l) => s + lineTotal(l), 0);
  const open = LINES.filter((l) => l.issue && !resolved[l.name]).length;

  return (
    <Panel
      title="Bill vs. record · Bluepeak Consulting"
      subtitle="Onboarding Hub · B-1042 · lines outside the threshold are flagged automatically"
      action={
        <div className="flex items-center gap-3">
          {open === 0 ? (
            <Badge tone="green">Ready to approve</Badge>
          ) : (
            <Badge tone="red">{open} flagged</Badge>
          )}
          <button
            type="button"
            onClick={() => setResolved({})}
            className={secondary}
          >
            Reset
          </button>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-zinc-500">
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-5 py-2.5 font-medium">Talent</th>
              <th className="px-3 py-2.5 text-right font-medium">Record</th>
              <th className="px-3 py-2.5 text-right font-medium">Billed</th>
              <th className="px-3 py-2.5 font-medium">Discrepancy</th>
              <th className="px-5 py-2.5 text-right font-medium">
                Resolve with
              </th>
            </tr>
          </thead>
          <tbody>
            {LINES.map((l) => {
              const issue = l.issue && ISSUES[l.issue];
              const choice = resolved[l.name];
              return (
                <tr
                  key={l.name}
                  className={`border-b border-zinc-100 last:border-0 dark:border-zinc-900 ${issue && !choice ? "bg-rose-50/50 dark:bg-rose-950/20" : ""}`}
                >
                  <td className="px-5 py-3">
                    <span className="block font-medium text-neutral-900 dark:text-white">
                      {l.name}
                    </span>
                    <span className="text-xs text-zinc-500">{l.role}</span>
                  </td>
                  <td className="px-3 py-3 text-right text-xs tabular-nums text-zinc-600 dark:text-zinc-400">
                    {l.recordHours}h × ${l.recordRate}
                  </td>
                  <td
                    className={`px-3 py-3 text-right text-xs tabular-nums ${issue ? "font-medium text-rose-700 dark:text-rose-300" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    {l.billedHours}h × ${l.billedRate}
                  </td>
                  <td className="px-3 py-3">
                    {issue ? (
                      <>
                        <Badge tone={choice ? "gray" : "red"}>
                          {issue.label}
                        </Badge>
                        <span className="mt-1 block text-[11px] text-zinc-500">
                          {issue.owner}
                        </span>
                      </>
                    ) : (
                      <Badge tone="green">Match</Badge>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    {issue ? (
                      <Toggle
                        label={`Resolve ${l.name}`}
                        options={
                          [
                            { id: "record", label: "Record" },
                            { id: "bill", label: "Bill" },
                          ] as const
                        }
                        value={choice ?? ("" as Resolution)}
                        onChange={(v) =>
                          setResolved((r) => ({ ...r, [l.name]: v }))
                        }
                      />
                    ) : (
                      <span className="text-xs text-zinc-400">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <dl className="grid grid-cols-3 gap-3 border-t border-zinc-200 px-5 py-4 text-sm dark:border-zinc-800">
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-zinc-500">
            Billed
          </dt>
          <dd className="mt-1 font-semibold tabular-nums">{money(billed)}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-zinc-500">
            Internal record
          </dt>
          <dd className="mt-1 font-semibold tabular-nums">{money(record)}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wider text-zinc-500">
            Adjusted bill
          </dt>
          <dd className="mt-1 font-semibold tabular-nums text-[#4329a6] dark:text-indigo-300">
            {money(adjusted)}
            <span className="ml-2 text-xs font-normal text-zinc-500">
              {adjusted === billed ? "" : `${money(adjusted - billed)}`}
            </span>
          </dd>
        </div>
      </dl>
    </Panel>
  );
}
