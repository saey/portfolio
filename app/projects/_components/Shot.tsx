import { ImageSlot } from "./ImageSlot";

/* Screenshot frames shared by the case studies imported from the old portfolio. */

type ShotProps = {
  /** Folder under /public, e.g. "projects/fga". */
  dir: string;
  name: string;
  alt: string;
  /** Tailwind aspect-ratio class; match the image so it fills the frame. */
  aspect: string;
  sizes?: string;
};

/** Screenshot shown whole inside a white frame, so neighbors share one height. */
export function Shot({
  dir,
  name,
  alt,
  aspect,
  sizes = "(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw",
}: ShotProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-6 dark:border-zinc-800">
      <ImageSlot
        dir={dir}
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
export function Card({
  dir,
  name,
  title,
  text,
  aspect = "aspect-[4/3]",
}: {
  dir: string;
  name: string;
  title: string;
  text: string;
  aspect?: string;
}) {
  return (
    <figure>
      <Shot dir={dir} name={name} alt={`${title}: ${text}`} aspect={aspect} />
      <figcaption className="mt-4">
        <span className="block font-semibold text-neutral-900 dark:text-white">{title}</span>
        <span className="mt-1.5 block text-[13px] leading-[1.6] text-zinc-600 dark:text-zinc-400">
          {text}
        </span>
      </figcaption>
    </figure>
  );
}

/** Full-width image without a frame, for use inside ImageTabs. */
export function Wide({ dir, name, alt, aspect }: Omit<ShotProps, "sizes">) {
  return (
    <ImageSlot
      dir={dir}
      name={name}
      alt={alt}
      aspect={aspect}
      fit="contain"
      sizes="(min-width: 1280px) 1000px, 100vw"
      className="!bg-transparent"
    />
  );
}

/** Long page screenshot at full width inside a scrollable frame. */
export function Tall({ dir, name, alt, aspect }: Omit<ShotProps, "sizes">) {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`${alt} (scrollable)`}
      className="max-h-[640px] overflow-y-auto rounded-xl border border-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 dark:border-zinc-800"
    >
      <ImageSlot
        dir={dir}
        name={name}
        alt={alt}
        aspect={aspect}
        position="top"
        sizes="(min-width: 1280px) 1000px, 100vw"
      />
    </div>
  );
}
