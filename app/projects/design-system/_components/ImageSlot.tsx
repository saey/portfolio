import { existsSync, openSync, readSync, closeSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

/** Images live in /public/projects/design-system/<name>.<ext> */
const PUBLIC_DIR = "projects/design-system";
const EXTENSIONS = ["png", "jpg", "jpeg", "webp", "avif", "gif"];

export type ImageAsset = {
  /** File basename without extension, e.g. "tokens-after". */
  name: string;
  alt: string;
};

type ImageSlotProps = ImageAsset & {
  /** Tailwind aspect-ratio class, e.g. "aspect-[16/9]". */
  aspect?: string;
  fit?: "cover" | "contain";
  /** Anchor for cropped images; "top" suits tall documents. */
  position?: "center" | "top";
  sizes?: string;
  className?: string;
};

function resolveFile(name: string): { src: string; file: string } | null {
  for (const ext of EXTENSIONS) {
    const file = path.join(process.cwd(), "public", PUBLIC_DIR, `${name}.${ext}`);
    if (existsSync(file)) return { src: `/${PUBLIC_DIR}/${name}.${ext}`, file };
  }
  return null;
}

function resolveSrc(name: string): string | null {
  return resolveFile(name)?.src ?? null;
}

/** Reads width/height from a PNG header; null for other formats. */
function pngSize(file: string): { width: number; height: number } | null {
  const buf = Buffer.alloc(24);
  const fd = openSync(file, "r");
  readSync(fd, buf, 0, 24, 0);
  closeSync(fd);
  if (buf.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

/** Tall document shown at full width inside a scrollable frame (PNG only). */
export function ScrollImage({ name, alt }: ImageAsset) {
  const resolved = resolveFile(name);
  const size = resolved && pngSize(resolved.file);
  if (!resolved || !size) return <ImageSlot name={name} alt={alt} aspect="aspect-[4/5]" position="top" className="rounded-xl" />;
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`${alt} (scrollable)`}
      className="max-h-[640px] overflow-y-auto rounded-xl bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700 dark:bg-zinc-900"
    >
      <Image
        src={resolved.src}
        alt={alt}
        width={size.width}
        height={size.height}
        sizes="(min-width: 1024px) 640px, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}

export function ImageSlot({
  name,
  alt,
  aspect = "aspect-[16/9]",
  fit = "cover",
  position = "center",
  sizes = "(min-width: 1024px) 1024px, 100vw",
  className = "",
}: ImageSlotProps) {
  const src = resolveSrc(name);

  return (
    <div
      className={`relative w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 ${aspect} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={`${fit === "cover" ? "object-cover" : "object-contain"} ${
            position === "top" ? "object-top" : "object-center"
          }`}
        />
      ) : (
        <div
          role="img"
          aria-label={`Image placeholder: ${alt}`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center"
        >
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{alt}</span>
          <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
            {PUBLIC_DIR}/{name}.png
          </span>
        </div>
      )}
    </div>
  );
}
