"use client";

import React from "react";
import { enharmonicMap } from "../scales";

type ScaleType = "Major" | "Natural Minor" | "Harmonic Minor" | "Melodic Minor";
type ChordType = "Major" | "Minor" | "Diminished" | "Augmented" | "Sus2" | "Sus4" | "Major Seventh" | "Minor Seventh" | "Dominant Seventh" | "Diminished Seventh" | "Half-Diminished Seventh" | "Minor-Major Seventh" | "Augmented Seventh" | "Augmented Major Seventh";

type UIButtonsProps = {
  selectedScale: string | null;
  selectedChordRoot: string | null;
  scaleType: ScaleType;
  chordType: ChordType;
  cycleScaleType: () => void;
  cycleChordType: () => void;
  handleSelectScale: (scale: string) => void;
  handleSelectChord: (chordRoot: string | null) => void;
  clearScale: () => void;
};

const UIButtons: React.FC<UIButtonsProps> = ({ selectedScale, selectedChordRoot, scaleType, chordType, cycleScaleType, cycleChordType, handleSelectScale, handleSelectChord, clearScale }) => {
  const sharpKeys = ["C", "G", "D", "A", "E", "B", "F#"];
  const flatKeys = ["F", "Bb", "Eb", "Ab", "Db", "Gb"];

  return (
    <div className='col-span-4 grid grid-cols-2 gap-4'>
      {/* Scale Selector */}
      <div>
        <span className='text-xl font-semibold'>Learn Scales</span>
        <button onClick={cycleScaleType} className={`ml-2 px-3 py-1 rounded-md border text-white ${selectedScale ? "bg-blue-600" : "bg-gray-400"}`}>
          {scaleType}
        </button>
        <div className='grid grid-cols-7 gap-2 mb-6 mt-2'>
          {sharpKeys.map((note) => (
            <button key={`scale-${note}`} onClick={() => handleSelectScale(note)} className={`px-3 py-1 rounded-md border ${selectedScale === note ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
              {note}
            </button>
          ))}
          <button onClick={clearScale} className='px-3 py-1 rounded-md border bg-red-400 text-white'>
            Clear
          </button>
          {flatKeys.map((note) => (
            <button key={`scale-${note}`} onClick={() => handleSelectScale(note)} className={`px-3 py-1 rounded-md border ${selectedScale === (enharmonicMap[note] || note) ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Chord Selector */}
      <div>
        <span className='text-xl font-semibold'>Learn Chords</span>
        <button onClick={cycleChordType} className={`ml-2 px-3 py-1 rounded-md border text-white ${selectedChordRoot ? "bg-green-600" : "bg-gray-400"}`}>
          {chordType}
        </button>
        <div className='grid grid-cols-7 gap-2 mb-6 mt-2'>
          {sharpKeys.map((note) => (
            <button key={`chord-${note}`} onClick={() => handleSelectChord(note)} className={`px-3 py-1 rounded-md border ${selectedChordRoot === note ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
              {note}
            </button>
          ))}
          <button onClick={() => handleSelectChord(null)} className='px-3 py-1 rounded-md border bg-red-400 text-white'>
            Clear
          </button>
          {flatKeys.map((note) => (
            <button key={`chord-${note}`} onClick={() => handleSelectChord(note)} className={`px-3 py-1 rounded-md border ${selectedChordRoot === note ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
              {note}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UIButtons;
