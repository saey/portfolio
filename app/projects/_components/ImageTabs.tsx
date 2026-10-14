"use client";

import { useState, type ReactNode } from "react";
import { Toggle } from "./Toggle";
import { STAGE } from "./stage";

export type ImageTab = {
  id: string;
  label: string;
  /** Server-rendered image(s) for this tab. */
  image: ReactNode;
  caption?: string;
};

/** Segmented tabs over a set of screenshots. */
export function ImageTabs({ label, items }: { label: string; items: ImageTab[] }) {
  const [active, setActive] = useState(items[0].id);
  const item = items.find((i) => i.id === active) ?? items[0];

  return (
    <div className={STAGE}>
      <Toggle label={label} options={items} value={active} onChange={setActive} size="md" level={1} />
      <div className="mt-8">{item.image}</div>
      {item.caption && <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{item.caption}</p>}
    </div>
  );
}
