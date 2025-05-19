"use client";

import React from "react";
import { enharmonicMap } from "../scales";

interface KeyboardProps {
  octaves: number[];
  whiteNotesBase: string[];
  blackNotesBase: { note: string; position: number }[];
  handlePlayNote: (note: string, octave: number) => void;
  getKeyColor: (note: string) => string;
}

export default function Keyboard({ octaves, whiteNotesBase, blackNotesBase, handlePlayNote, getKeyColor }: KeyboardProps) {
  return (
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
  );
}
