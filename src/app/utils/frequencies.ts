export const baseFrequencies: Record<string, number> = {
  C: 261.63,
  "C#": 277.18,
  D: 293.66,
  "D#": 311.13,
  E: 329.63,
  F: 349.23,
  "F#": 369.99,
  G: 392.0,
  "G#": 415.3,
  A: 440.0,
  "A#": 466.16,
  B: 493.88,
};

export const getFrequency = (note: string, octave: number): number => {
  const baseOctave = 4;
  const semitoneRatio = Math.pow(2, 1 / 12);
  const baseFreq = baseFrequencies[note];
  const distance = (octave - baseOctave) * 12;
  return baseFreq * Math.pow(semitoneRatio, distance);
};
