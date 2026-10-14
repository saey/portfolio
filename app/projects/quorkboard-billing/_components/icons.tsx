/* Inline icons drawn after Lucide (Clock, Receipt, FileText, Check), so no icon package is needed. */

const props = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function ClockIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...props} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export function ReceiptIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg {...props} className={className}>
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 17.5v-11" />
    </svg>
  );
}

export function FileTextIcon({
  className = "h-6 w-6",
}: {
  className?: string;
}) {
  return (
    <svg {...props} className={className}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8" />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg {...props} className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
