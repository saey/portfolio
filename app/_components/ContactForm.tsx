"use client";

import type { FormEvent } from "react";

const field =
  "mt-2 block w-full border-0 border-b border-[#cfcae0] bg-transparent px-0 py-2 text-sm text-[#1e1b2e] placeholder:text-[#6e6886] focus:border-[#4329a6] focus:outline-none focus:ring-0 dark:border-zinc-700 dark:text-white dark:focus:border-indigo-300";

const label =
  "text-xs uppercase tracking-widest text-[#6e6886] dark:text-[#a39dbb]";

/**
 * Minimal contact form. There is no backend yet, so submitting opens the
 * visitor's email app with the message prefilled and addressed to `to`.
 */
export function ContactForm({ to }: { to: string }) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = `Hello from ${name}`;
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-lg space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className={field}
          />
        </label>
        <label className="block">
          <span className={label}>Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </label>
      </div>
      <label className="block">
        <span className={label}>Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className={`${field} resize-y`}
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-full bg-[#4329a6] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#35208a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-700 dark:focus-visible:outline-indigo-400"
        >
          Send
        </button>
        <span className="text-xs text-[#6e6886] dark:text-[#a39dbb]">
          Opens your email app.
        </span>
      </div>
    </form>
  );
}
