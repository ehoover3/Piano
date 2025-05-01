import React from "react";

const ChordProgressionsButtons: React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
      {["Progression 1", "Progression 2", "Progression 3"].map((progression) => (
        <button key={progression} className='px-3 py-1 mb-2 rounded-md border bg-white text-black'>
          {progression}
        </button>
      ))}
    </div>
  );
};

export default ChordProgressionsButtons;
