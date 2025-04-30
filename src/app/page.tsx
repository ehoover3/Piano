"use client";

import { useState } from "react";

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

const majorScales: Record<string, string[]> = {
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

const naturalMinorScales: Record<string, string[]> = {
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

const harmonicMinorScales: Record<string, string[]> = {
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

const melodicMinorScales: Record<string, string[]> = {
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

const enharmonicMap: Record<string, string> = {
  Bb: "A#",
  Eb: "D#",
  Ab: "G#",
  Db: "C#",
  Gb: "F#",
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
    if (!selectedScale) return "";
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
    return "";
  };

  const handleSelectScale = (note: string) => {
    const mappedNote = enharmonicMap[note] || note;
    setSelectedScale(mappedNote);
  };

  const cycleScaleType = () => {
    setScaleType((prev) => {
      if (prev === "Major") return "Natural Minor";
      if (prev === "Natural Minor") return "Harmonic Minor";
      if (prev === "Harmonic Minor") return "Melodic Minor";
      return "Major";
    });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Digital Keyboard (4 Octaves + C7)</h1>

      <div className='grid grid-cols-4 gap-4 w-full mb-6'>
        <div className='flex justify-center items-center text-xl font-semibold'>Learn Songs</div>
        <div className='flex flex-col items-center'>
          <div className='flex items-center gap-2 mb-2'>
            <span className='text-xl font-semibold'>Learn Scales</span>
            <button onClick={cycleScaleType} className='px-3 py-1 rounded-md border bg-white text-black'>
              {scaleType}
            </button>
          </div>
        </div>
        <div className='flex justify-center items-center text-xl font-semibold'>Learn Chords</div>
        <div className='flex justify-center items-center text-xl font-semibold'>Learn Chord Progressions</div>

        <div className='flex flex-col items-center'>
          {["Song 1", "Song 2", "Song 3"].map((song) => (
            <button key={song} className='px-3 py-1 mb-2 rounded-md border bg-white text-black'>
              {song}
            </button>
          ))}
        </div>

        <div>
          <div className='grid grid-cols-7 gap-2 mb-6'>
            {["C", "G", "D", "A", "E", "B", "F#"].map((scale) => (
              <button key={scale} onClick={() => handleSelectScale(scale)} className={`px-3 py-1 rounded-md border ${selectedScale === scale ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                {scale}
              </button>
            ))}
            <button onClick={() => setSelectedScale(null)} className='px-3 py-1 rounded-md border bg-red-400 text-white'>
              Clear
            </button>
            {["F", "Bb", "Eb", "Ab", "Db", "Gb"].map((scale) => (
              <button key={scale} onClick={() => handleSelectScale(scale)} className={`px-3 py-1 rounded-md border ${selectedScale === (enharmonicMap[scale] || scale) ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                {scale}
              </button>
            ))}
          </div>
        </div>

        <div className='flex flex-col items-center'>
          {["Chord 1", "Chord 2", "Chord 3"].map((chord) => (
            <button key={chord} className='px-3 py-1 mb-2 rounded-md border bg-white text-black'>
              {chord}
            </button>
          ))}
        </div>

        <div className='flex flex-col items-center'>
          {["Progression 1", "Progression 2", "Progression 3"].map((progression) => (
            <button key={progression} className='px-3 py-1 mb-2 rounded-md border bg-white text-black'>
              {progression}
            </button>
          ))}
        </div>
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
