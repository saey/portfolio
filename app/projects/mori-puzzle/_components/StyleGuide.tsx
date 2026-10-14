import { Frame } from "./Frame";

const DIR = "projects/mori-puzzle/Style";

const ITEMS = [
  { name: "Screenshot 2026-10-13 at 10.10.16\u202fPM", label: "Logo", note: "木 means tree, 林 woods, and 森 forest (mori). The character shows progress visually — the same idea as the app — so 森 became its symbol." },
  { name: "Screenshot 2026-10-13 at 10.10.25\u202fPM", label: "Typography", note: "Kyokasho is the textbook typeface, with a simple, steady stroke that sits well beside sans-serif Latin. Roboto works across platforms, and its wide face shares kanji’s proportions." },
  { name: "Screenshot 2026-10-13 at 10.10.34\u202fPM", label: "Color", note: "Forest green comes from “Mori.” Like traditional Japanese palettes made from natural pigments, the tones are muted. As trees grow into a forest, kanji grow from their parts." },
  { name: "Screenshot 2026-10-13 at 10.10.41\u202fPM", label: "Pattern", note: "Traditional Japanese Kamon patterns. Backgrounds grow more granular inside content areas to express hierarchy." },
  { name: "Screenshot 2026-10-13 at 10.10.45\u202fPM", label: "Icons", note: "Kanji are grouped by radical; size and shape express hierarchy. The “New” badge borrows the rising sun — Japan as the land of the rising sun." },
  { name: "Screenshot 2026-10-13 at 10.10.53\u202fPM", label: "Buttons", note: "Golden Sand, the opposite of the Forest theme, marks the primary action; Sprout marks the secondary action." },
];

/** Style guide screenshots: logo, type, color, pattern, icons and buttons. */
export function StyleGuide() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {ITEMS.map((it) => (
        <figure key={it.label}>
          <Frame dir={DIR} name={it.name} alt={`Mori style guide: ${it.label}`} sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw" />
          <figcaption className="mt-3">
            <span className="block text-xs font-medium uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400">{it.label}</span>
            <span className="mt-2 block text-sm leading-6 text-zinc-600 dark:text-zinc-400">{it.note}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
