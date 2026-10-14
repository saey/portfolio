import { existsSync } from "node:fs";
import path from "node:path";

const DIR = "projects/mori-puzzle";
const FORMATS = ["mp4", "webm", "gif"] as const;

/**
 * Screen recording of the prototype. Save /public/projects/mori-puzzle/<name>.mp4
 * (webm or gif also work) and it replaces the placeholder.
 */
export function RecordingSlot({ name, alt }: { name: string; alt: string }) {
  const ext = FORMATS.find((e) =>
    existsSync(path.join(process.cwd(), "public", DIR, `${name}.${e}`)),
  );
  const src = ext && `/${DIR}/${name}.${ext}`;

  return (
    // Recordings already include the device frame; only the placeholder draws one.
    <div
      className={`mx-auto w-full max-w-[280px] overflow-hidden ${
        src
          ? ""
          : "rounded-[2.75rem] border-[10px] border-neutral-900 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900"
      }`}
    >
      {src && ext !== "gif" ? (
        <video
          src={src}
          aria-label={alt}
          className="aspect-[330/662] w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls
        />
      ) : src ? (
        // eslint-disable-next-line @next/next/no-img-element -- animated GIFs should not be re-encoded
        <img
          src={src}
          alt={alt}
          className="aspect-[330/662] w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`Recording placeholder: ${alt}`}
          className="flex aspect-[330/662] w-full flex-col items-center justify-center gap-2 p-6 text-center"
        >
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {alt}
          </span>
          <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-600">
            public/{DIR}/{name}.mp4 · .gif
          </span>
        </div>
      )}
    </div>
  );
}
