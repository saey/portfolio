/** Textbook-style (Kyokasho) face for kanji, falling back to Mincho. */
export const KANJI_FONT = '[font-family:YuKyokasho,"Hiragino_Mincho_ProN","Yu_Mincho",serif]';

/** Mori palette from the style guide. */
export const MORI = {
  forest: "#194B44",
  sand: "#DAB428",
  sprout: "#6A7D39",
  persimmon: "#CF492E",
  shoji: "#EEF0DF",
} as const;

/** Kamon-inspired dot lattice for forest-colored surfaces. */
export const KAMON =
  "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_1.5px,transparent_2px)] bg-[length:10px_10px]";
