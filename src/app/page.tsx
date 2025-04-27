"use client";

import { useState } from "react";

const whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];
const blackNotes = [
  { note: "C#", position: 0 },
  { note: "D#", position: 1 },
  // No black key between E and F
  { note: "F#", position: 3 },
  { note: "G#", position: 4 },
  { note: "A#", position: 5 },
];

// Frequencies for notes (around the 4th octave)
const noteFrequencies: Record<string, number> = {
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

export default function Home() {
  const [playedNote, setPlayedNote] = useState<string | null>(null);

  const playSound = (note: string) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine"; // You can change to 'square', 'triangle', etc.
    oscillator.frequency.value = noteFrequencies[note]; // Set frequency
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1); // Fade out
    oscillator.stop(audioContext.currentTime + 1); // Stop after 1 second
  };

  const handlePlayNote = (note: string) => {
    setPlayedNote(note);
    console.log("Playing note:", note);
    playSound(note);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Digital Keyboard</h1>

      <div className='relative'>
        {/* White keys */}
        <div className='flex'>
          {whiteNotes.map((note) => (
            <button key={note} onClick={() => handlePlayNote(note)} className='relative w-16 h-64 bg-white border border-gray-400 rounded-md shadow-md active:bg-gray-300 flex items-end justify-center pb-2'>
              <span className='text-xs text-gray-600'>{note}</span>
            </button>
          ))}
        </div>

        {/* Black keys */}
        <div className='absolute top-0 left-0 flex h-64 pointer-events-none'>
          {whiteNotes.map((_, index) => {
            const blackKey = blackNotes.find((b) => b.position === index);
            if (!blackKey) {
              return <div key={index} className='relative w-16'></div>;
            }
            return (
              <div key={blackKey.note} className='relative w-16'>
                <div className='flex justify-end'>
                  <button onClick={() => handlePlayNote(blackKey.note)} className='pointer-events-auto w-10 h-40 bg-black rounded-b-md shadow-md -mb-0.5 active:bg-gray-800 flex items-end justify-center pb-1' style={{ marginRight: "-0.5rem", zIndex: 10 }}>
                    <span className='text-[10px] text-white'>{blackKey.note}</span>
                  </button>
                </div>
              </div>
            );
          })}
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
