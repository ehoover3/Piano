"use client";

import { useState } from "react";
import { majorScales, naturalMinorScales, harmonicMinorScales, melodicMinorScales, enharmonicMap } from "./scales";
import Scales from "./components/Scales";
import Chords from "./components/Chords";

const octaves = [3, 4, 5, 6];

const whiteNotesBase = ["C", "D", "E", "F", "G", "A", "B"];
const blackNotesBase = [
  { note: "C#", position: 0 },
  { note: "D#", position: 1 },
  { note: "F#", position: 3 },
  { note: "G#", position: 4 },
  { note: "A#", position: 5 },
];

const baseFrequencies: Record<string, number> = {
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

const getFrequency = (note: string, octave: number) => {
  const baseOctave = 4;
  const semitoneRatio = Math.pow(2, 1 / 12);
  const baseFreq = baseFrequencies[note];
  const distance = (octave - baseOctave) * 12;
  return baseFreq * Math.pow(semitoneRatio, distance);
};

export default function Home() {
  const [playedNote, setPlayedNote] = useState<string | null>(null);
  const [selectedScale, setSelectedScale] = useState<string | null>(null);
  const [scaleType, setScaleType] = useState<"Major" | "Natural Minor" | "Harmonic Minor" | "Melodic Minor">("Major");
  const [chordType, setChordType] = useState<"Major" | "Minor" | "Diminished" | "Augmented" | "Sus2" | "Sus4" | "Major Seventh" | "Minor Seventh" | "Dominant Seventh" | "Diminished Seventh" | "Half-Diminished Seventh" | "Minor-Major Seventh" | "Augmented Seventh" | "Augmented Major Seventh">("Major");
  const [selectedChordRoot, setSelectedChordRoot] = useState<string | null>(null);

  const playSound = (note: string, octave: number) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = getFrequency(note, octave);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);
    oscillator.stop(audioContext.currentTime + 1);
  };

  const handlePlayNote = (note: string, octave: number) => {
    setPlayedNote(`${note}${octave}`);
    playSound(note, octave);
  };

  const isBlackNote = (note: string) => note.includes("#");

  const getKeyColor = (note: string) => {
    const normalizedNote = enharmonicMap[note] || note;
    const normalizedChordRoot = selectedChordRoot ? enharmonicMap[selectedChordRoot] || selectedChordRoot : null;

    if (selectedChordRoot) {
      const chordNotes = getChordNotes(selectedChordRoot, chordType).map((n) => enharmonicMap[n] || n);
      if (normalizedNote === normalizedChordRoot) return "#248232"; // Green for root
      if (chordNotes.includes(normalizedNote)) return "#007BFF"; // Blue for chord tones
      return "";
    }
    if (selectedScale) {
      let scaleNotes: string[] | undefined;
      if (scaleType === "Major") {
        scaleNotes = majorScales[selectedScale];
      } else if (scaleType === "Natural Minor") {
        scaleNotes = naturalMinorScales[selectedScale];
      } else if (scaleType === "Harmonic Minor") {
        scaleNotes = harmonicMinorScales[selectedScale];
      } else if (scaleType === "Melodic Minor") {
        scaleNotes = melodicMinorScales[selectedScale];
      }

      if (!scaleNotes) return "";

      if (note === selectedScale) return "#248232"; // Green for root
      if (scaleNotes.includes(note)) {
        return isBlackNote(note) ? "#339BFF" : "#007BFF";
      }
    }
    return "";
  };

  const handleSelectScale = (note: string) => {
    const mappedNote = enharmonicMap[note] || note;
    setSelectedChordRoot(null);
    setSelectedScale(mappedNote);
  };

  const cycleScaleType = () => {
    setScaleType((prev) => {
      if (prev === "Major") return "Natural Minor";
      if (prev === "Natural Minor") return "Harmonic Minor";
      if (prev === "Harmonic Minor") return "Melodic Minor";
      return "Major";
    });
    setSelectedChordRoot(null);
  };

  const cycleChordType = () => {
    setSelectedScale(null);
    setChordType((prev) => {
      const chordTypes = ["Major", "Minor", "Diminished", "Augmented", "Sus2", "Sus4", "Major Seventh", "Minor Seventh", "Dominant Seventh", "Diminished Seventh", "Half-Diminished Seventh", "Minor-Major Seventh", "Augmented Seventh", "Augmented Major Seventh"] as const;
      const currentIndex = chordTypes.indexOf(prev);
      const nextIndex = (currentIndex + 1) % chordTypes.length;
      return chordTypes[nextIndex];
    });
  };

  const getChordNotes = (root: string, type: "Major" | "Minor" | "Diminished" | "Augmented" | "Sus2" | "Sus4" | "Major Seventh" | "Minor Seventh" | "Dominant Seventh" | "Diminished Seventh" | "Half-Diminished Seventh" | "Minor-Major Seventh" | "Augmented Seventh" | "Augmented Major Seventh") => {
    const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const normalizedRoot = enharmonicMap[root] || root; // 👈 Normalize flat to sharp
    const index = chromatic.indexOf(normalizedRoot);
    if (index === -1) return [];

    const majorThird = chromatic[(index + 4) % 12];
    const minorThird = chromatic[(index + 3) % 12];
    const perfectFifth = chromatic[(index + 7) % 12];
    const diminishedFifth = chromatic[(index + 6) % 12];
    const augmentedFifth = chromatic[(index + 8) % 12];
    const majorSecond = chromatic[(index + 2) % 12];
    const perfectFourth = chromatic[(index + 5) % 12];
    const majorSeventh = chromatic[(index + 11) % 12];
    const minorSeventh = chromatic[(index + 10) % 12];
    const diminishedSeventh = chromatic[(index + 9) % 12]; // technically double-flatted 7th

    switch (type) {
      case "Major":
        return [root, majorThird, perfectFifth];
      case "Minor":
        return [root, minorThird, perfectFifth];
      case "Diminished":
        return [root, minorThird, diminishedFifth];
      case "Augmented":
        return [root, majorThird, augmentedFifth];
      case "Sus2":
        return [root, majorSecond, perfectFifth];
      case "Sus4":
        return [root, perfectFourth, perfectFifth];
      case "Major Seventh":
        return [root, majorThird, perfectFifth, majorSeventh];
      case "Minor Seventh":
        return [root, minorThird, perfectFifth, minorSeventh];
      case "Dominant Seventh":
        return [root, majorThird, perfectFifth, minorSeventh];
      case "Diminished Seventh":
        return [root, minorThird, diminishedFifth, diminishedSeventh];
      case "Half-Diminished Seventh":
        return [root, minorThird, diminishedFifth, minorSeventh];
      case "Minor-Major Seventh":
        return [root, minorThird, perfectFifth, majorSeventh];
      case "Augmented Seventh":
        return [root, majorThird, augmentedFifth, minorSeventh];
      case "Augmented Major Seventh":
        return [root, majorThird, augmentedFifth, majorSeventh];
      default:
        return [];
    }
  };

  const handleSelectChord = (note: string | null) => {
    setSelectedChordRoot(note);
    setSelectedScale(null); // 🛠 Clear scale selection
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100'>
      <div className='grid grid-cols-4 gap-4 w-full mb-6'>
        <div className='flex flex-col items-center'>
          <div className='flex items-center gap-2 mb-2'></div>
        </div>
        <div className='flex justify-center items-center text-xl font-semibold'></div>
        <Scales selectedScale={selectedScale} scaleType={scaleType} cycleScaleType={cycleScaleType} handleSelectScale={handleSelectScale} clearScale={() => setSelectedScale(null)} />
        <Chords selectedChordRoot={selectedChordRoot} handleSelectChord={handleSelectChord} chordType={chordType} cycleChordType={cycleChordType} />
      </div>

      <div className='relative'>
        <div className='flex'>
          {octaves.map((octave) =>
            whiteNotesBase.map((note) => (
              <button key={`${note}${octave}`} onClick={() => handlePlayNote(note, octave)} className='relative w-16 h-64 border border-gray-400 rounded-md shadow-md active:bg-gray-300 flex items-end justify-center pb-2' style={{ backgroundColor: getKeyColor(note) || "white" }}>
                <span className='text-xs text-gray-600'>
                  {note}
                  {octave}
                </span>
              </button>
            ))
          )}
          <button key='C7' onClick={() => handlePlayNote("C", 7)} className='relative w-16 h-64 border border-gray-400 rounded-md shadow-md active:bg-gray-300 flex items-end justify-center pb-2' style={{ backgroundColor: getKeyColor("C") || "white" }}>
            <span className='text-xs text-gray-600'>C7</span>
          </button>
        </div>

        <div className='absolute top-0 left-0 flex flex-wrap h-64 pointer-events-none'>
          {octaves.map((octave) =>
            whiteNotesBase.map((_, idx) => {
              const blackKey = blackNotesBase.find((b) => b.position === idx);
              if (!blackKey) return <div key={`spacer-${octave}-${idx}`} className='relative w-16'></div>;
              return (
                <div key={`${blackKey.note}${octave}`} className='relative w-16'>
                  <div className='flex justify-end'>
                    <button
                      onClick={() => handlePlayNote(blackKey.note, octave)}
                      className='pointer-events-auto w-10 h-40 rounded-b-md shadow-md -mb-0.5 active:bg-gray-800 flex items-end justify-center pb-1'
                      style={{
                        backgroundColor: getKeyColor(blackKey.note) || "black",
                        marginRight: "-0.5rem",
                        zIndex: 10,
                      }}>
                      <span className='text-[10px] text-white'>
                        {blackKey.note}
                        {octave}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
          <div className='relative w-16'></div>
        </div>
      </div>

      {playedNote && (
        <div className='mt-6 text-lg'>
          Played: <span className='font-semibold'>{playedNote}</span>
        </div>
      )}
    </div>
  );
}
