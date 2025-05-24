"use client";

import React from "react";
import { enharmonicMap } from "../scales";

type ScaleType = "Major" | "Natural Minor" | "Harmonic Minor" | "Melodic Minor";
type ChordType = "Major" | "Minor" | "Diminished" | "Augmented" | "Sus2" | "Sus4" | "Major Seventh" | "Minor Seventh" | "Dominant Seventh" | "Diminished Seventh" | "Half-Diminished Seventh" | "Minor-Major Seventh" | "Augmented Seventh" | "Augmented Major Seventh";

type NoteSelectorProps = {
  title: string;
  currentType: string;
  selectedNote: string | null;
  typeColor: string;
  cycleType: () => void;
  handleSelect: (note: string | null) => void;
  isScale?: boolean;
};

const NoteSelector: React.FC<NoteSelectorProps> = ({ title, currentType, selectedNote, typeColor, cycleType, handleSelect, isScale = false }) => {
  const chromaticNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  const renderButton = (note: string) => {
    const displayNote = isScale ? enharmonicMap[note] || note : note;
    const isSelected = selectedNote === displayNote;

    return (
      <button key={note} onClick={() => handleSelect(note)} className={`px-3 py-1 rounded-md border ${isSelected ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        {note}
      </button>
    );
  };

  return (
    <div>
      <span className='text-xl font-semibold'>{title}</span>
      <button onClick={cycleType} className={`ml-2 px-3 py-1 rounded-md border text-white ${typeColor ? `bg-${typeColor}-600` : "bg-gray-600"}`}>
        {currentType}
      </button>
      <div className='mt-2 mb-6 flex flex-wrap gap-2 items-center'>
        {chromaticNotes.map(renderButton)}
        <button onClick={() => handleSelect(null)} className='px-3 py-1 rounded-md border bg-red-400 text-white'>
          Clear
        </button>
      </div>
    </div>
  );
};

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
  return (
    <div className='col-span-4 grid grid-cols-2 gap-4'>
      <NoteSelector title='Scales' currentType={scaleType} selectedNote={selectedScale} typeColor={selectedScale ? "blue" : "gray"} cycleType={cycleScaleType} handleSelect={(note) => (note ? handleSelectScale(note) : clearScale())} isScale />
      <NoteSelector title='Chords' currentType={chordType} selectedNote={selectedChordRoot} typeColor={selectedChordRoot ? "green" : "gray"} cycleType={cycleChordType} handleSelect={handleSelectChord} />
    </div>
  );
};

export default UIButtons;
