import Image from "next/image";

export type Persona = {
  team: string;
  avatar: string;
  painPoint: string;
  story: string;
  scope: string[];
};

/** Research persona as a text card; only the avatar comes from the original artwork. */
export function PersonaCard({ persona: p }: { persona: Persona }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-neutral-50 p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="flex items-center gap-4">
        <Image
          src={p.avatar}
          alt=""
          width={56}
          height={56}
          className="h-14 w-14 rounded-full"
        />
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            User group
          </p>
          <h4 className="mt-0.5 text-lg font-semibold text-neutral-900 dark:text-white">
            {p.team}
          </h4>
        </div>
      </div>

      <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-[#4329a6] dark:text-indigo-300">
        Pain point
      </p>
      <p className="mt-2 text-base font-semibold leading-snug text-neutral-900 dark:text-white">
        {p.painPoint}
      </p>
      <p className="mt-3 text-xs leading-[1.6] text-zinc-600 dark:text-zinc-400">
        {p.story}
      </p>

      <div className="mt-auto pt-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
          Scope
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {p.scope.map((s) => (
            <li
              key={s}
              className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
