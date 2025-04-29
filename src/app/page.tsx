"use client";

import { useState } from "react";

const octaves = [3, 4, 5, 6]; // Main octaves

const whiteNotesBase = ["C", "D", "E", "F", "G", "A", "B"];
const blackNotesBase = [
  { note: "C#", position: 0 },
  { note: "D#", position: 1 },
  // No black key between E and F
  { note: "F#", position: 3 },
  { note: "G#", position: 4 },
  { note: "A#", position: 5 },
];

// Frequencies for base octave (4th octave)
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

// Major scales
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

// Function to get frequency for any note in any octave
const getFrequency = (note: string, octave: number) => {
  const baseOctave = 4;
  const semitoneRatio = Math.pow(2, 1 / 12); // 12th root of 2
  const baseFreq = baseFrequencies[note];
  const distance = (octave - baseOctave) * 12;
  return baseFreq * Math.pow(semitoneRatio, distance);
};

export default function Home() {
  const [playedNote, setPlayedNote] = useState<string | null>(null);
  const [selectedScale, setSelectedScale] = useState<string | null>(null);

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

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Digital Keyboard (4 Octaves + C7)</h1>

      {/* Scale selection buttons */}
      <div className='flex flex-wrap justify-center gap-2 mb-6'>
        {Object.keys(majorScales).map((scale) => (
          <button key={scale} onClick={() => setSelectedScale(scale)} className={`px-3 py-1 rounded-md border ${selectedScale === scale ? "bg-blue-500 text-white" : "bg-white text-black"}`}>
            {scale} Major
          </button>
        ))}
        {selectedScale && (
          <button onClick={() => setSelectedScale(null)} className='px-3 py-1 rounded-md border bg-red-400 text-white'>
            Clear
          </button>
        )}
      </div>

      {/* Piano */}
      <div className='relative'>
        {/* White keys */}
        <div className='flex'>
          {octaves.map((octave) =>
            whiteNotesBase.map((note) => (
              <button
                key={`${note}${octave}`}
                onClick={() => handlePlayNote(note, octave)}
                className={`relative w-16 h-64 border border-gray-400 rounded-md shadow-md active:bg-gray-300 flex items-end justify-center pb-2 ${
                  selectedScale && majorScales[selectedScale]?.includes(note)
                    ? selectedScale === note
                      ? "bg-red-400" // Root note
                      : "bg-blue-300" // Other scale notes
                    : "bg-white"
                }`}>
                <span className='text-xs text-gray-600'>
                  {note}
                  {octave}
                </span>
              </button>
            ))
          )}
          {/* Add final C7 key */}
          <button key='C7' onClick={() => handlePlayNote("C", 7)} className={`relative w-16 h-64 border border-gray-400 rounded-md shadow-md active:bg-gray-300 flex items-end justify-center pb-2 ${selectedScale && majorScales[selectedScale]?.includes("C") ? (selectedScale === "C" ? "bg-red-400" : "bg-blue-300") : "bg-white"}`}>
            <span className='text-xs text-gray-600'>C7</span>
          </button>
        </div>

        {/* Black keys */}
        <div className='absolute top-0 left-0 flex flex-wrap h-64 pointer-events-none'>
          {octaves.map((octave) =>
            whiteNotesBase.map((_, idx) => {
              const blackKey = blackNotesBase.find((b) => b.position === idx);
              if (!blackKey) {
                return <div key={`spacer-${octave}-${idx}`} className='relative w-16'></div>;
              }
              return (
                <div key={`${blackKey.note}${octave}`} className='relative w-16'>
                  <div className='flex justify-end'>
                    <button
                      onClick={() => handlePlayNote(blackKey.note, octave)}
                      className={`pointer-events-auto w-10 h-40 rounded-b-md shadow-md -mb-0.5 active:bg-gray-800 flex items-end justify-center pb-1 ${selectedScale && majorScales[selectedScale]?.includes(blackKey.note) ? (selectedScale === blackKey.note ? "bg-red-500" : "bg-blue-500") : "bg-black"}`}
                      style={{ marginRight: "-0.5rem", zIndex: 10 }}>
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
          {/* No black key after C7 — just a spacer */}
          <div className='relative w-16'></div>
        </div>
      </div>

      {/* Played note display */}
      {playedNote && (
        <div className='mt-6 text-lg'>
          Played: <span className='font-semibold'>{playedNote}</span>
        </div>
      )}
    </div>
  );
}
