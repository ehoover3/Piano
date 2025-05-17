"use client";

import { enharmonicMap } from "../scales";

interface ScalesButtonsProps {
  selectedScale: string | null;
  scaleType: "Major" | "Natural Minor" | "Harmonic Minor" | "Melodic Minor";
  cycleScaleType: () => void;
  handleSelectScale: (scale: string) => void;
  clearScale: () => void;
}

export default function ScalesButtons({ selectedScale, scaleType, cycleScaleType, handleSelectScale, clearScale }: ScalesButtonsProps) {
  const sharpScales = ["C", "G", "D", "A", "E", "B", "F#"];
  const flatScales = ["F", "Bb", "Eb", "Ab", "Db", "Gb"];

  return (
    <div>
      {" "}
      <span className='text-xl font-semibold'>Learn Scales</span>
      <button onClick={cycleScaleType} className='px-3 py-1 rounded-md border bg-white text-black'>
        {scaleType}
      </button>
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
    </div>
  );
}
