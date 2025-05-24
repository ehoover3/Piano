"use client";

import React, { useState } from "react";
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
  const chromaticNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  const [selectionMode, setSelectionMode] = useState<"scale" | "chord">("scale");

  const handleNoteClick = (note: string) => {
    if (selectionMode === "scale") {
      handleSelectScale(note);
    } else {
      handleSelectChord(note);
    }
  };

  const handleClear = () => {
    if (selectionMode === "scale") {
      clearScale();
    } else {
      handleSelectChord(null);
    }
  };

  return (
    <div className='col-span-4 space-y-4'>
      <div className='flex flex-wrap gap-2 items-center'>
        <div className='text-xl font-semibold'>1. Select a Note</div>
        {chromaticNotes.map((note) => {
          const displayNote = selectionMode === "scale" ? enharmonicMap[note] || note : note;
          const isSelected = selectionMode === "scale" ? selectedScale === note : selectedChordRoot === note;

          return (
            <button key={note} onClick={() => handleNoteClick(note)} className={`px-3 py-1 rounded-md border ${isSelected ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
              {displayNote}
            </button>
          );
        })}
        <button onClick={handleClear} className='px-3 py-1 rounded-md border bg-red-400 text-white'>
          Clear
        </button>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <span className='text-xl font-semibold'>2. Select a Scale</span>
          <button
            onClick={() => {
              cycleScaleType();
              setSelectionMode("scale");
            }}
            className={`px-3 py-1 rounded-md border text-white ${selectedScale ? "bg-blue-600" : "bg-gray-600"}`}>
            {scaleType}
          </button>
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-xl font-semibold'> or Chord</span>
          <button
            onClick={() => {
              cycleChordType();
              setSelectionMode("chord");
            }}
            className={`px-3 py-1 rounded-md border text-white ${selectedChordRoot ? "bg-green-600" : "bg-gray-600"}`}>
            {chordType}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UIButtons;
