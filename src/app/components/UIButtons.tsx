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
  sharpKeys: string[];
  flatKeys: string[];
  cycleType: () => void;
  handleSelect: (note: string | null) => void;
  isScale?: boolean;
};

const NoteSelector: React.FC<NoteSelectorProps> = ({ title, currentType, selectedNote, typeColor, sharpKeys, flatKeys, cycleType, handleSelect, isScale = false }) => {
  const renderButton = (note: string) => {
    const isSelected = selectedNote === (isScale ? enharmonicMap[note] || note : note);
    return (
      <button key={note} onClick={() => handleSelect(note)} className={`px-3 py-1 rounded-md border ${isSelected ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        {note}
      </button>
    );
  };

  return (
    <div>
      <span className='text-xl font-semibold'>{title}</span>
      <button onClick={cycleType} className={`ml-2 px-3 py-1 rounded-md border text-white bg-${typeColor}-600`}>
        {currentType}
      </button>
      <div className='grid grid-cols-7 gap-2 mb-6 mt-2'>
        {sharpKeys.map(renderButton)}
        <button onClick={() => handleSelect(null)} className='px-3 py-1 rounded-md border bg-red-400 text-white'>
          Clear
        </button>
        {flatKeys.map(renderButton)}
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
  const sharpKeys = ["C", "G", "D", "A", "E", "B", "F#"];
  const flatKeys = ["F", "Bb", "Eb", "Ab", "Db", "Gb"];

  return (
    <div className='col-span-4 grid grid-cols-2 gap-4'>
      <NoteSelector title='Scales' currentType={scaleType} selectedNote={selectedScale} typeColor={selectedScale ? "blue" : "gray"} sharpKeys={sharpKeys} flatKeys={flatKeys} cycleType={cycleScaleType} handleSelect={(note) => (note ? handleSelectScale(note) : clearScale())} isScale />
      <NoteSelector title='Chords' currentType={chordType} selectedNote={selectedChordRoot} typeColor={selectedChordRoot ? "green" : "gray"} sharpKeys={sharpKeys} flatKeys={flatKeys} cycleType={cycleChordType} handleSelect={handleSelectChord} />
    </div>
  );
};

export default UIButtons;
