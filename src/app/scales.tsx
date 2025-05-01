export const majorScales: Record<string, string[]> = {
  C: ["C", "D", "E", "F", "G", "A", "B"],
  "C#": ["C#", "D#", "F", "F#", "G#", "A#", "C"],
  D: ["D", "E", "F#", "G", "A", "B", "C#"],
  "D#": ["D#", "F", "G", "G#", "A#", "C", "D"],
  E: ["E", "F#", "G#", "A", "B", "C#", "D#"],
  F: ["F", "G", "A", "A#", "C", "D", "E"],
  "F#": ["F#", "G#", "A#", "B", "C#", "D#", "F"],
  G: ["G", "A", "B", "C", "D", "E", "F#"],
  "G#": ["G#", "A#", "C", "C#", "D#", "F", "G"],
  A: ["A", "B", "C#", "D", "E", "F#", "G#"],
  "A#": ["A#", "C", "D", "D#", "F", "G", "A"],
  B: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
};

export const naturalMinorScales: Record<string, string[]> = {
  C: ["C", "D", "D#", "F", "G", "G#", "A#"],
  "C#": ["C#", "D#", "E", "F#", "G#", "A", "B"],
  D: ["D", "E", "F", "G", "A", "A#", "C"],
  "D#": ["D#", "F", "F#", "G#", "A#", "B", "C#"],
  E: ["E", "F#", "G", "A", "B", "C", "D"],
  F: ["F", "G", "G#", "A#", "C", "C#", "D#"],
  "F#": ["F#", "G#", "A", "B", "C#", "D", "E"],
  G: ["G", "A", "A#", "C", "D", "D#", "F"],
  "G#": ["G#", "A#", "B", "C#", "D#", "E", "F#"],
  A: ["A", "B", "C", "D", "E", "F", "G"],
  "A#": ["A#", "C", "C#", "D#", "F", "F#", "G#"],
  B: ["B", "C#", "D", "E", "F#", "G", "A"],
};

export const harmonicMinorScales: Record<string, string[]> = {
  C: ["C", "D", "D#", "F", "G", "G#", "B"],
  "C#": ["C#", "D#", "E", "F#", "G#", "A", "C"],
  D: ["D", "E", "F", "G", "A", "A#", "C#"],
  "D#": ["D#", "F", "F#", "G#", "A#", "B", "D"],
  E: ["E", "F#", "G", "A", "B", "C", "D#"],
  F: ["F", "G", "G#", "A#", "C", "C#", "E"],
  "F#": ["F#", "G#", "A", "B", "C#", "D", "F"],
  G: ["G", "A", "A#", "C", "D", "D#", "F#"],
  "G#": ["G#", "A#", "B", "C#", "D#", "E", "G"],
  A: ["A", "B", "C", "D", "E", "F", "G#"],
  "A#": ["A#", "C", "C#", "D#", "F", "F#", "A"],
  B: ["B", "C#", "D", "E", "F#", "G", "A#"],
};

export const melodicMinorScales: Record<string, string[]> = {
  C: ["C", "D", "D#", "F", "G", "A", "B"],
  "C#": ["C#", "D#", "E", "F#", "G#", "A#", "C"],
  D: ["D", "E", "F", "G", "A", "B", "C#"],
  "D#": ["D#", "F", "F#", "G#", "A#", "C", "D"],
  E: ["E", "F#", "G", "A", "B", "C#", "D#"],
  F: ["F", "G", "G#", "A#", "C", "D", "E"],
  "F#": ["F#", "G#", "A", "B", "C#", "D#", "F"],
  G: ["G", "A", "A#", "C", "D", "E", "F#"],
  "G#": ["G#", "A#", "B", "C#", "D#", "F", "G"],
  A: ["A", "B", "C", "D", "E", "F#", "G#"],
  "A#": ["A#", "C", "C#", "D#", "F", "G", "A"],
  B: ["B", "C#", "D", "E", "F#", "G#", "A#"],
};

export const enharmonicMap: Record<string, string> = {
  Bb: "A#",
  Eb: "D#",
  Ab: "G#",
  Db: "C#",
  Gb: "F#",
};
