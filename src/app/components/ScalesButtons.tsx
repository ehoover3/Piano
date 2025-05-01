"use client";

import { enharmonicMap } from "../scales";

interface ScalesButtonsProps {
  selectedScale: string | null;
  handleSelectScale: (scale: string) => void;
  clearScale: () => void;
}

export default function ScalesButtons({ selectedScale, handleSelectScale, clearScale }: ScalesButtonsProps) {
  const sharpScales = ["C", "G", "D", "A", "E", "B", "F#"];
  const flatScales = ["F", "Bb", "Eb", "Ab", "Db", "Gb"];

  return (
    <div className='grid grid-cols-7 gap-2 mb-6'>
      {sharpScales.map((scale) => (
        <button key={scale} onClick={() => handleSelectScale(scale)} className={`px-3 py-1 rounded-md border ${selectedScale === scale ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          {scale}
        </button>
      ))}

      <button onClick={clearScale} className='px-3 py-1 rounded-md border bg-red-400 text-white'>
        Clear
      </button>

      {flatScales.map((scale) => (
        <button key={scale} onClick={() => handleSelectScale(scale)} className={`px-3 py-1 rounded-md border ${selectedScale === (enharmonicMap[scale] || scale) ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          {scale}
        </button>
      ))}
    </div>
  );
}
