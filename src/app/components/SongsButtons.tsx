import React from "react";

const SongsButtons: React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
      {["Song 1", "Song 2", "Song 3"].map((song) => (
        <button key={song} className='px-3 py-1 mb-2 rounded-md border bg-white text-black'>
          {song}
        </button>
      ))}
    </div>
  );
};

export default SongsButtons;
