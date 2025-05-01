// components/ChordsButtons.js
import React from "react";

type ChordsButtonsProps = {
  selectedChordRoot: string | null;
  handleSelectChord: (chordRoot: string | null) => void;
};

const ChordsButtons: React.FC<ChordsButtonsProps> = ({ selectedChordRoot, handleSelectChord }) => {
  const firstSetChords = ["C", "G", "D", "A", "E", "B", "F#"];
  const secondSetChords = ["F", "Bb", "Eb", "Ab", "Db", "Gb"];

  return (
    <div>
      <div className='grid grid-cols-7 gap-2 mb-6'>
        {firstSetChords.map((chordRoot) => (
          <button key={chordRoot} onClick={() => handleSelectChord(chordRoot)} className={`px-3 py-1 rounded-md border ${selectedChordRoot === chordRoot ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            {chordRoot}
          </button>
        ))}
        <button onClick={() => handleSelectChord(null)} className='px-3 py-1 rounded-md border bg-red-400 text-white'>
          Clear
        </button>
        {secondSetChords.map((chordRoot) => (
          <button key={chordRoot} onClick={() => handleSelectChord(chordRoot)} className={`px-3 py-1 rounded-md border ${selectedChordRoot === chordRoot ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            {chordRoot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChordsButtons;
