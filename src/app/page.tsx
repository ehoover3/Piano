"use client";

import { useState } from "react";
import { majorScales, naturalMinorScales, harmonicMinorScales, melodicMinorScales, enharmonicMap } from "./scales";
import { getFrequency } from "./utils/frequencies";
import Keyboard from "./components/Keyboard";
import UIButtons from "./components/UIButtons";

const colors = { black: "#339BFF", blue: "#007BFF", green: "#248232" };
const octaves = [3, 4, 5, 6];
const whiteNotesBase = ["C", "D", "E", "F", "G", "A", "B"];
const blackNotesBase = [
  { note: "C#", position: 0 },
  { note: "D#", position: 1 },
  { note: "F#", position: 3 },
  { note: "G#", position: 4 },
  { note: "A#", position: 5 },
];

export default function Home() {
  const [playedNote, setPlayedNote] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>("C");
  const [selectedChord, setSelectedChord] = useState<null | "Major" | "Minor" | "Diminished" | "Augmented" | "Sus2" | "Sus4" | "Major Seventh" | "Minor Seventh" | "Dominant Seventh" | "Diminished Seventh" | "Half-Diminished Seventh" | "Minor-Major Seventh" | "Augmented Seventh" | "Augmented Major Seventh">(null);
  const [selectedScale, setSelectedScale] = useState<null | "Major" | "Natural Minor" | "Harmonic Minor" | "Melodic Minor">(null);

  const playSound = (note: string, octave: number) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = getFrequency(note, octave);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);
    oscillator.stop(audioContext.currentTime + 1);
  };

  const handlePlayNote = (note: string, octave: number) => {
    setPlayedNote(`${note}${octave}`);
    playSound(note, octave);
  };

  const isBlackNote = (note: string) => note.includes("#");

  const getKeyColor = (note: string) => {
    const normalizedNote = enharmonicMap[note] || note;
    const normalizedChordRoot = selectedNote ? enharmonicMap[selectedNote] || selectedNote : null;
    if (selectedNote && selectedChord) {
      const chordNotes = getChordNotes(selectedNote, selectedChord).map((n) => enharmonicMap[n] || n);
      if (normalizedNote === normalizedChordRoot) return colors.green;
      if (chordNotes.includes(normalizedNote)) return colors.blue;
      return "";
    }
    if (selectedNote) {
      let scaleNotes: string[] | undefined;
      if (selectedScale === "Major") {
        scaleNotes = majorScales[selectedNote];
      } else if (selectedScale === "Natural Minor") {
        scaleNotes = naturalMinorScales[selectedNote];
      } else if (selectedScale === "Harmonic Minor") {
        scaleNotes = harmonicMinorScales[selectedNote];
      } else if (selectedScale === "Melodic Minor") {
        scaleNotes = melodicMinorScales[selectedNote];
      }
      if (!scaleNotes) return "";
      if (note === selectedNote) return colors.green;
      if (scaleNotes.includes(note)) {
        return isBlackNote(note) ? colors.black : colors.blue;
      }
    }
    return "";
  };

  const getChordNotes = (root: string, type: "Major" | "Minor" | "Diminished" | "Augmented" | "Sus2" | "Sus4" | "Major Seventh" | "Minor Seventh" | "Dominant Seventh" | "Diminished Seventh" | "Half-Diminished Seventh" | "Minor-Major Seventh" | "Augmented Seventh" | "Augmented Major Seventh") => {
    const chromatic = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const normalizedRoot = enharmonicMap[root] || root;
    const index = chromatic.indexOf(normalizedRoot);
    if (index === -1) return [];

    const majorThird = chromatic[(index + 4) % 12];
    const minorThird = chromatic[(index + 3) % 12];
    const perfectFifth = chromatic[(index + 7) % 12];
    const diminishedFifth = chromatic[(index + 6) % 12];
    const augmentedFifth = chromatic[(index + 8) % 12];
    const majorSecond = chromatic[(index + 2) % 12];
    const perfectFourth = chromatic[(index + 5) % 12];
    const majorSeventh = chromatic[(index + 11) % 12];
    const minorSeventh = chromatic[(index + 10) % 12];
    const diminishedSeventh = chromatic[(index + 9) % 12]; // technically double-flatted 7th

    switch (type) {
      case "Major":
        return [root, majorThird, perfectFifth];
      case "Minor":
        return [root, minorThird, perfectFifth];
      case "Diminished":
        return [root, minorThird, diminishedFifth];
      case "Augmented":
        return [root, majorThird, augmentedFifth];
      case "Sus2":
        return [root, majorSecond, perfectFifth];
      case "Sus4":
        return [root, perfectFourth, perfectFifth];
      case "Major Seventh":
        return [root, majorThird, perfectFifth, majorSeventh];
      case "Minor Seventh":
        return [root, minorThird, perfectFifth, minorSeventh];
      case "Dominant Seventh":
        return [root, majorThird, perfectFifth, minorSeventh];
      case "Diminished Seventh":
        return [root, minorThird, diminishedFifth, diminishedSeventh];
      case "Half-Diminished Seventh":
        return [root, minorThird, diminishedFifth, minorSeventh];
      case "Minor-Major Seventh":
        return [root, minorThird, perfectFifth, majorSeventh];
      case "Augmented Seventh":
        return [root, majorThird, augmentedFifth, minorSeventh];
      case "Augmented Major Seventh":
        return [root, majorThird, augmentedFifth, majorSeventh];
      default:
        return [];
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100'>
      <UIButtons selectedNote={selectedNote} selectedScale={selectedScale} setSelectedScale={setSelectedScale} setSelectedChord={setSelectedChord} setSelectedNote={setSelectedNote} />
      <Keyboard octaves={octaves} whiteNotesBase={whiteNotesBase} blackNotesBase={blackNotesBase} handlePlayNote={handlePlayNote} getKeyColor={getKeyColor} />
      {playedNote && (
        <div className='mt-6 text-lg'>
          Played: <span className='font-semibold'>{playedNote}</span>
        </div>
      )}
      <div>TEST</div>
      <div>playedNote: {playedNote}</div>
      <div>selectedNote: {selectedNote}</div>
      <div>scaleType: {selectedScale}</div>
      <div>chordType: {selectedChord}</div>
    </div>
  );
}
