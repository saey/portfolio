"use client";

type ToggleProps<T extends string> = {
  label: string;
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md";
  /** "dark" for use on dark surfaces such as the terminal. */
  tone?: "auto" | "dark";
  /**
   * 1 — top-level tabs of a demo: a segmented control with the active tab filled in the header violet.
   * 2 — secondary view or variant switch (subtle underlined text).
   */
  level?: 1 | 2;
};

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 dark:focus-visible:outline-indigo-400";

export function Toggle<T extends string>({
  label,
  options,
  value,
  onChange,
  size = "sm",
  tone = "auto",
  level = 2,
}: ToggleProps<T>) {
  const dark = tone === "dark";

  if (level === 2) {
    return (
      <div role="group" aria-label={label} className="inline-flex flex-wrap gap-x-4 gap-y-1">
        {options.map((o) => {
          const active = o.id === value;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.id)}
              className={`rounded-none border-b-2 pb-1 pt-0.5 text-xs transition-colors ${focus} ${
                active
                  ? dark
                    ? "border-indigo-400 font-medium text-white"
                    : "border-indigo-700 font-medium text-zinc-900 dark:border-indigo-400 dark:text-white"
                  : dark
                    ? "border-transparent text-zinc-500 hover:text-zinc-200"
                    : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex flex-wrap gap-1 rounded-full p-1 ${
        dark ? "bg-white/10" : "bg-neutral-200/60 dark:bg-white/10"
      }`}
    >
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            className={`rounded-full font-medium transition-all ${focus} ${
              size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm"
            } ${
              active
                ? "bg-indigo-800 text-white shadow-sm dark:bg-indigo-600"
                : dark
                  ? "text-zinc-400 hover:bg-white/10 hover:text-white"
                  : "text-neutral-600 hover:bg-white/50 hover:text-neutral-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
