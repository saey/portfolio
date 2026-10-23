import type { Metadata } from "next";
import {
  Block,
  Body,
  CaseStudyLayout,
  Em,
  Lead,
  Section,
  Subhead,
  TwoCol,
  type Meta,
} from "../_components/editorial";
import { ImageSlot } from "../_components/ImageSlot";
import { KANJI_FONT } from "./_components/kanji";
import { PrototypeStage } from "./_components/PrototypeStage";
import { RadicalExplorer } from "./_components/RadicalExplorer";
import { Captioned, FRAME, Frame, Gallery } from "./_components/Frame";
import { ImageTabs } from "../_components/ImageTabs";
import { RecordingSlot } from "./_components/RecordingSlot";
import { StyleGuide } from "./_components/StyleGuide";

export const metadata: Metadata = {
  title: "Mori Puzzle — Case Study",
  description: "Gamifying Kanji learning into an intuitive, interactive mobile experience.",
};

/** Figma prototype embed (Share → Embed). */
const FIGMA_PROTOTYPE_URL =
  "https://embed.figma.com/proto/qwIC3S3cg17mhd4WDghZJN/MORI-PUZZLE?node-id=0-848&p=f&viewport=668%2C359%2C0.13&scaling=scale-down&content-scaling=fixed&page-id=0%3A187&embed-host=share";

const SECTIONS = [
  { id: "problem", label: "Problem & Research" },
  { id: "concept", label: "Solution & Concept" },
  { id: "heuristics", label: "Heuristic Evaluation" },
  { id: "flow", label: "User Flow & Architecture" },
  { id: "style", label: "Style & UI System" },
  { id: "prototype", label: "Prototype" },
] as const;

const META: Meta[] = [
  { label: "Type", value: "Personal project" },
  { label: "Platform", value: "iOS / Mobile" },
  { label: "Tooling", value: "Figma · User Research" },
];

/** Images and recordings live in /public/projects/mori-puzzle/<name>.<ext>. */
const MEDIA_DIR = "projects/mori-puzzle";

const BARRIERS = [
  {
    title: "Complex Shapes",
    impact: "2,000+ Essential Characters",
    body: "Overwhelming visual complexity deters beginners before they even start.",
  },
  {
    title: "Massive Volume",
    impact: "106 Hiragana/Katakana vs 2,000 Kanji",
    body: "Traditional rote memorization creates an unsustainable cognitive load.",
  },
  {
    title: "Loss of Motivation",
    impact: "High Drop-off Rate",
    body: "“Once hobby learning turns into mandatory practice, the brain resists.”",
  },
];

const PERSONAS = [
  { id: "lin", label: "Lin", n: 1, caption: "Lin — nerdy hipster, not yet committed. Profile and empathy map." },
  { id: "betta", label: "Betta", n: 2, caption: "Betta — business woman, currently committed. Profile and empathy map." },
  { id: "james", label: "James", n: 3, caption: "James — husband of a Japanese partner, formerly committed. Profile and empathy map." },
];

const COMPETITORS = [
  { id: "overview", label: "Overview", name: "competitive overview", caption: "Kanji learning vs word puzzle apps, rated on content and usability criteria." },
  { id: "skritter", label: "Skritter", name: "competitive1" },
  { id: "kanji", label: "Kanji!", name: "competitive2" },
  { id: "wordmaster", label: "Wordmaster", name: "competitive3" },
  { id: "anagram", label: "Anagram", name: "competitive4" },
];

const FLOWS = [
  { id: "lin", label: "Lin", caption: "Enjoy-use: Single Play and VS Play." },
  { id: "betta", label: "Betta", caption: "Study-use: Library and Single Play." },
  { id: "james", label: "James", caption: "Completing: Library, then Single Play." },
  { id: "invited", label: "Invited player", caption: "Got invited: joins a VS Play game from a message." },
];

const RECORDINGS = [
  {
    name: "gif/regular-play",
    title: "Regular Play",
    note: "Build kanji from parts against the clock, then review them in the Library.",
    alt: "Regular Play: combining parts into kanji, scoring, and browsing the Library",
  },
  {
    name: "gif/vs-play",
    title: "VS Play",
    note: "Challenge a friend over iMessage and compare scores.",
    alt: "VS Play: inviting a friend through iMessage and playing a round",
  },
];

export default function MoriPuzzleCaseStudy() {
  return (
    <CaseStudyLayout
      eyebrow="Case Study — Mobile Product & UX"
      title="Mori Puzzle"
      subtitle="Gamifying Kanji learning into an intuitive, interactive mobile experience."
      meta={META}
      sections={SECTIONS}
    >
      <div className="pt-16">
        <ImageSlot
          dir={MEDIA_DIR}
          name="hero"
          alt="Mori Puzzle app screens on iPhone"
          aspect="aspect-video"
          sizes="(min-width: 1280px) 1000px, 100vw"
          className="rounded-2xl"
        />
      </div>

      {/* 01 */}
      <Section index="01" id="problem" title="Problem Statement & User Research" first>
        <Lead>
          Kanji is one of the biggest hurdles in learning Japanese. <Em>A survey and interviews with 25 people</Em>{" "}
          interested in studying the language looked at where — and why — they give up.
        </Lead>

        <Subhead>Three barriers</Subhead>
        <ol className="grid gap-10 md:grid-cols-3 md:gap-12">
          {BARRIERS.map((b) => (
            <li key={b.title}>
              <p className="text-lg font-bold text-[#4329a6] dark:text-indigo-400">{b.title}</p>
              <p className="mt-3 text-xl font-semibold leading-snug tracking-[-0.01em] text-neutral-900 dark:text-white">
                {b.impact}
              </p>
              <p className="mt-3 leading-7 text-neutral-600 dark:text-zinc-400">{b.body}</p>
            </li>
          ))}
        </ol>

        <figure className="mt-20 border-l-2 border-indigo-700 pl-6 sm:pl-10 dark:border-indigo-400">
          <blockquote className="max-w-3xl text-2xl font-light leading-snug tracking-[-0.01em] text-neutral-900 sm:text-3xl dark:text-white">
            “It was fun at the beginning as a hobby, but once it turns into practice, my brain tries to forget about
            it.”
          </blockquote>
          <figcaption className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">Research participant</figcaption>
        </figure>

        <Subhead>Research demographic &amp; results</Subhead>
        <Gallery cols={2}>
          <Captioned caption="Who took part: gender, age, occupation, reading level, study methods and motivation.">
            <Frame name="Research demographic" alt="Research demographic of 25 participants" />
          </Captioned>
          <Captioned caption="How often participants study kanji, and what works or fails in the tools they use.">
            <Frame name="Research result" alt="Research results: study frequency and study tools" />
          </Captioned>
        </Gallery>

        <Subhead>Two kinds of learners</Subhead>
        <TwoCol
          left={
            <Block label="With a specific goal">
              Use several study tools at once — then <Em>lose motivation once the goal is reached.</Em>
            </Block>
          }
          right={
            <Block label="Without a goal">
              Rely on apps, but <Em>find it hard to stay consistent</Em> without something pulling them back.
            </Block>
          }
        />

        <Subhead>Personas</Subhead>
        <Gallery>
          <ImageTabs
            label="Persona"
            items={PERSONAS.map((p) => ({
              id: p.id,
              label: p.label,
              caption: p.caption,
              image: (
                <div className="grid gap-8 md:grid-cols-2">
                  <Frame name={`persona${p.n}`} alt={`${p.label} persona profile`} aspect={FRAME.portrait} />
                  <Frame name={`persona map${p.n}`} alt={`${p.label} empathy map`} aspect={FRAME.portrait} />
                </div>
              ),
            }))}
          />
        </Gallery>
      </Section>

      {/* 02 */}
      <Section index="02" id="concept" title="Solution & Linguistic Concept">
        <Lead>
          <Em>About 80% of kanji are combinations of a small set of fundamental elements.</Em> Learn that core set —
          roughly 20% — and the rest becomes a puzzle you already have the pieces for.
        </Lead>

        <div className="mt-6">
          <Gallery cols={2}>
            <Captioned caption="80% of kanji combine basic kanji (KEISEI + KAII); 20% are basic kanji made from pictures or symbols.">
              <Frame name="Intro2" alt="Kanji breakdown: 80% combinations of basic kanji, 20% basic kanji" />
            </Captioned>
            <Captioned caption="The four kanji types — SHIJI, SHOKEI, KEISEI and KAII — with examples.">
              <Frame name="intro1" alt="SHIJI 5%, SHOKEI 15%, KEISEI 60% and KAII 20%, with examples" />
            </Captioned>
          </Gallery>
        </div>

        <Subhead>The 80/20 radical rule, as a puzzle</Subhead>
        <Body className="max-w-3xl">
          Instead of drilling each character by rote, the game asks players to <Em>combine parts into kanji.</Em>{" "}
          Every solved puzzle teaches structure, so the next unfamiliar character already looks half-known.
        </Body>
        <Gallery>
          <RadicalExplorer />
        </Gallery>

        <Subhead>Why “Mori”</Subhead>
        <div className="grid items-center gap-10 md:grid-cols-[1fr_240px] md:gap-16">
          <Body className="max-w-3xl">
            <span className={KANJI_FONT}>森</span> (mori) means <Em>forest</Em> — three trees,{" "}
            <span className={KANJI_FONT}>木</span>, grown into one character. It is the product idea in a single kanji:
            small pieces build on each other until they form something larger.
          </Body>
          <Frame
            dir={`${MEDIA_DIR}/Style`}
            name={"Screenshot 2026-10-13 at 10.10.16\u202fPM"}
            alt="Mori logo: the kanji 森 in forest green"
            sizes="240px"
            className="w-full max-w-[240px] justify-self-center"
          />
        </div>
      </Section>

      {/* 03 */}
      <Section index="03" id="heuristics" title="Competitive Heuristic Evaluation">
        <Lead>
          Four apps were evaluated against <Em>Nielsen Norman Group’s 10 usability heuristics,</Em> plus three criteria
          specific to the problem: Learning, Motivation and Interactivity.
        </Lead>

        <div className="mt-6">
          <Gallery>
            <ImageTabs
              label="Competitor"
              items={COMPETITORS.map((c) => ({
                id: c.id,
                label: c.label,
                caption: c.caption,
                image: (
                  <Frame name={c.name} alt={`Heuristic evaluation: ${c.label}`} aspect={FRAME.wide} sizes="(min-width: 1024px) 1000px, 100vw" />
                ),
              }))}
            />
          </Gallery>
        </div>

        <div className="mt-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400">Opportunity</p>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">
            <Em>Pair a clean, game-like interface with genuine learning features,</Em> and borrow Anagram’s
            asynchronous battles for relaxed competition between friends.
          </p>
        </div>
      </Section>

      {/* 04 */}
      <Section index="04" id="flow" title="User Flow & System Architecture">
        <Lead>
          Each persona enters Mori through a different door. <Em>Single Play, VS Play and the Library</Em> form the
          three pillars, connected so that play and study feed each other.
        </Lead>
        <div className="mt-6">
          <Gallery>
            <ImageTabs
              label="User flow"
              items={FLOWS.map((f, i) => ({
                id: f.id,
                label: f.label,
                caption: f.caption,
                image: (
                  <Frame
                    name={`userflow${i + 1}`}
                    alt={`User flow for ${f.label}: ${f.caption}`}
                    aspect={FRAME.wide}
                    sizes="(min-width: 1024px) 1000px, 100vw"
                  />
                ),
              }))}
            />
          </Gallery>
        </div>
      </Section>

      {/* 05 */}
      <Section index="05" id="style" title="Style & UI System">
        <Gallery>
          <StyleGuide />
        </Gallery>
      </Section>

      {/* 06 */}
      <Section index="06" id="prototype" title="Interactive Prototype">
        <Lead>
          <Em>Watch Regular Play and VS Play in motion,</Em> or click through the live Figma prototype.
        </Lead>
        <div className="mt-6">
          <Gallery>
              <PrototypeStage
              figmaUrl={FIGMA_PROTOTYPE_URL}
              recording={
                <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
                  {RECORDINGS.map((r) => (
                    <figure key={r.name}>
                      <RecordingSlot name={r.name} alt={r.alt} />
                      <figcaption className="mt-4 text-center">
                        <span className="block text-sm font-semibold text-neutral-900 dark:text-white">{r.title}</span>
                        <span className="mt-1 block text-sm leading-6 text-zinc-500 dark:text-zinc-400">{r.note}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              }
            />
          </Gallery>
        </div>
      </Section>
    </CaseStudyLayout>
  );
}
