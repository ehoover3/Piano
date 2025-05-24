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
      {/* Header with Scale and Chord type controls */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <span className='text-xl font-semibold'>Scales</span>
          <button onClick={cycleScaleType} className={`px-3 py-1 rounded-md border text-white ${selectedScale ? "bg-blue-600" : "bg-gray-600"}`}>
            {scaleType}
          </button>
          <button onClick={() => setSelectionMode("scale")} className={`px-2 py-1 text-sm rounded ${selectionMode === "scale" ? "bg-blue-300" : "bg-gray-200"}`}>
            Select
          </button>
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-xl font-semibold'>Chords</span>
          <button onClick={cycleChordType} className={`px-3 py-1 rounded-md border text-white ${selectedChordRoot ? "bg-green-600" : "bg-gray-600"}`}>
            {chordType}
          </button>
          <button onClick={() => setSelectionMode("chord")} className={`px-2 py-1 text-sm rounded ${selectionMode === "chord" ? "bg-green-300" : "bg-gray-200"}`}>
            Select
          </button>
        </div>
      </div>

      {/* Unified chromatic note selector */}
      <div className='flex flex-wrap gap-2 items-center'>
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
    </div>
  );
};

export default UIButtons;
