"use client";

import React, { useState, useRef } from "react";

export default function SoundboardSection() {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);
  const themeAudioRef = useRef<HTMLAudioElement | null>(null);

  const sfxList = [
    { name: "Gold Coin", file: "Coin.mp3", icon: "🪙" },
    { name: "Jump Small", file: "Jump Small.mp3", icon: "🦘" },
    { name: "Jump Super", file: "Jump Super.mp3", icon: "🍄" },
    { name: "Power Up", file: "Powerup.mp3", icon: "⭐" },
    { name: "Fireball", file: "Fireball.mp3", icon: "🔥" },
    { name: "1-Up Life", file: "Gain Life.mp3", icon: "🟢" },
    { name: "Pipe Warp", file: "Pipe.mp3", icon: "🟩" },
    { name: "Kick Shell", file: "Kick.mp3", icon: "🐢" },
    { name: "Flagpole Drop", file: "Flagpole.mp3", icon: "🚩" },
    { name: "Stage Clear", file: "Stage Clear.mp3", icon: "🎺" },
    { name: "Bowser Defeat", file: "Bowser Falls.mp3", icon: "💥" },
    { name: "Game Over", file: "Game Over.mp3", icon: "💀" },
  ];

  const themesList = [
    { title: "Overworld Theme", file: "Overworld.mp3", icon: "☀️", composer: "Koji Kondo" },
    { title: "Underground Groove", file: "Underworld.mp3", icon: "🕳️", composer: "Koji Kondo" },
    { title: "Underwater Waltz", file: "Underwater.mp3", icon: "🌊", composer: "Koji Kondo" },
    { title: "Castle Tension", file: "Castle.mp3", icon: "🏰", composer: "Koji Kondo" },
    { title: "Starman Invincible", file: "Star.mp3", icon: "⭐", composer: "Koji Kondo" },
  ];

  const playSfx = (fileName: string, name: string) => {
    setActiveSound(name);
    try {
      const audio = new Audio(`/mario/Sounds/Sounds/mp3/${encodeURIComponent(fileName)}`);
      audio.volume = 0.6;
      audio.play().catch(() => {});
    } catch {}

    setTimeout(() => {
      setActiveSound((cur) => (cur === name ? null : cur));
    }, 800);
  };

  const toggleTheme = (fileName: string, title: string) => {
    if (currentTheme === title) {
      if (themeAudioRef.current) {
        themeAudioRef.current.pause();
        themeAudioRef.current = null;
      }
      setCurrentTheme(null);
      return;
    }

    if (themeAudioRef.current) {
      themeAudioRef.current.pause();
      themeAudioRef.current = null;
    }

    try {
      const audio = new Audio(`/mario/Sounds/Themes/mp3/${encodeURIComponent(fileName)}`);
      audio.volume = 0.5;
      audio.loop = true;
      audio.play().catch(() => {});
      themeAudioRef.current = audio;
      setCurrentTheme(title);
    } catch {
      setCurrentTheme(null);
    }
  };

  return (
    <section id="soundboard" className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-block rounded-md bg-[#fcd116] px-3 py-1 font-retro text-[10px] text-black font-bold shadow-[2px_2px_0_#000]">
          8-BIT SOUNDTRACK
        </div>
        <h2 className="mt-3 font-retro text-xl sm:text-2xl text-white tracking-wide">
          INTERACTIVE SOUNDBOARD
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl mx-auto">
          Play the legendary sound effects and melodic themes composed by Koji Kondo in 1985.
        </p>
      </div>

      {/* Sound Effects Matrix */}
      <div className="mb-10 rounded-2xl border border-zinc-800 bg-[#12141c] p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔊</span>
            <h3 className="font-retro text-xs text-white">SOUND EFFECTS (SFX)</h3>
          </div>
          <span className="font-mono text-xs text-zinc-500">
            Click any button to play sound
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {sfxList.map((s, idx) => (
            <button
              key={idx}
              onClick={() => playSfx(s.file, s.name)}
              className={`flex flex-col items-center justify-center rounded-xl border p-3 font-retro text-[10px] transition-all active:scale-95 ${
                activeSound === s.name
                  ? "border-[#fcd116] bg-[#fcd116]/20 text-[#fcd116] shadow-[0_0_15px_rgba(252,209,22,0.4)] scale-105"
                  : "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800"
              }`}
            >
              <span className="text-2xl mb-1.5">{s.icon}</span>
              <span className="text-center line-clamp-1">{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Background Themes Player */}
      <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎶</span>
            <h3 className="font-retro text-xs text-white">BACKGROUND THEMES (BGM)</h3>
          </div>
          {currentTheme && (
            <div className="flex items-center gap-2 text-xs text-[#00a800] font-retro">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>NOW PLAYING: {currentTheme}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {themesList.map((t, idx) => {
            const isPlaying = currentTheme === t.title;
            return (
              <div
                key={idx}
                className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                  isPlaying
                    ? "border-emerald-500 bg-emerald-950/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    : "border-zinc-800 bg-zinc-900/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <h4 className="font-retro text-xs text-white mb-0.5">
                      {t.title}
                    </h4>
                    <span className="text-[11px] font-mono text-zinc-500">
                      {t.composer}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleTheme(t.file, t.title)}
                  className={`rounded-lg px-3 py-1.5 font-retro text-[10px] transition-all active:scale-95 ${
                    isPlaying
                      ? "bg-emerald-600 text-white shadow-[2px_2px_0_#000]"
                      : "border border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                  }`}
                >
                  {isPlaying ? "⏸ PAUSE" : "▶ PLAY"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
