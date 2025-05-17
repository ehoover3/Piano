import React from "react";

type ChordsProps = {
  selectedChordRoot: string | null;
  handleSelectChord: (chordRoot: string | null) => void;
  chordType: string;
  cycleChordType: () => void;
};

const Chords: React.FC<ChordsProps> = ({ selectedChordRoot, handleSelectChord, chordType, cycleChordType }) => {
  const firstSetChords = ["C", "G", "D", "A", "E", "B", "F#"];
  const secondSetChords = ["F", "Bb", "Eb", "Ab", "Db", "Gb"];

  return (
    <div>
      <span>Learn Chords</span>
      <button onClick={cycleChordType} className='px-3 py-1 rounded-md border bg-white text-black ml-2'>
        {chordType}
      </button>
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

export default Chords;
