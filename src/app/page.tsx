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

export default function Home() {
  const [playedNote, setPlayedNote] = useState<string | null>(null);

  const handlePlayNote = (note: string) => {
    setPlayedNote(note);
    console.log("Playing note:", note);
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
        <div className='mt-4 text-lg mt-6'>
          Played: <span className='font-semibold'>{playedNote}</span>
        </div>
      )}
    </div>
  );
}
