"use client";

import React, { useState } from "react";
import { enharmonicMap } from "../scales";

type ScaleType = null | "Major" | "Natural Minor" | "Harmonic Minor" | "Melodic Minor";
type ChordType = null | "Major" | "Minor" | "Diminished" | "Augmented" | "Sus2" | "Sus4" | "Major Seventh" | "Minor Seventh" | "Dominant Seventh" | "Diminished Seventh" | "Half-Diminished Seventh" | "Minor-Major Seventh" | "Augmented Seventh" | "Augmented Major Seventh";

type UIButtonsProps = {
  selectedNote: string | null;
  scaleType: ScaleType;
  setScaleType: (type: ScaleType) => void;
  setChordType: (type: ChordType) => void;
  setSelectedNote: (note: string | null) => void;
};

const UIButtons: React.FC<UIButtonsProps> = ({ selectedNote, scaleType, setScaleType, setChordType, setSelectedNote }) => {
  const chromaticNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const scaleTypes: ScaleType[] = ["Major", "Natural Minor", "Harmonic Minor", "Melodic Minor"];
  const chordTypes: ChordType[] = ["Major", "Minor", "Diminished", "Augmented", "Sus2", "Sus4", "Major Seventh", "Minor Seventh", "Dominant Seventh", "Diminished Seventh", "Half-Diminished Seventh", "Minor-Major Seventh", "Augmented Seventh", "Augmented Major Seventh"];
  const [selectionMode, setSelectionMode] = useState<"scale" | "chord">("scale");

  const handleNoteClick = (note: string) => {
    if (selectionMode === "scale") {
      setSelectedNote(note);
    } else {
      setSelectedNote(note);
    }
  };

  return (
    <div className='col-span-4 space-y-4'>
      <div className='flex flex-wrap gap-2 items-center'>
        <div className='text-xl font-semibold'>1. Select Note</div>
        {chromaticNotes.map((note) => {
          const displayNote = selectionMode === "scale" ? enharmonicMap[note] || note : note;
          const isSelected = selectionMode === "scale" ? selectedNote === note : selectedNote === note;
          return (
            <button key={note} onClick={() => handleNoteClick(note)} className={`px-3 py-1 rounded-md border ${isSelected ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
              {displayNote}
            </button>
          );
        })}
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <span className='text-xl font-semibold'>2. Select Scale</span>
          {scaleTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectionMode("scale");
                setChordType(null);
                if (type !== scaleType) setScaleType(type);
                if (selectedNote) setSelectedNote(selectedNote);
              }}
              className={`px-3 py-1 rounded-md border ${type === scaleType ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}>
              {type}
            </button>
          ))}
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-xl font-semibold'>Select Chord</span>
          {chordTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setChordType(type);
                setSelectionMode("chord");
                if (selectedNote) {
                  setSelectedNote(selectedNote); // set chord root to previously selected scale note
                }
              }}
              className={`px-3 py-1 rounded-md border text-white ${selectedNote ? "bg-green-600" : "bg-gray-600"}`}>
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UIButtons;
