"use client";

import React, { useState, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import MarioArcade, { MarioArcadeHandle } from "@/components/MarioArcade";
import ControlsSection from "@/components/ControlsSection";
import PowerupsSection from "@/components/PowerupsSection";
import WorldsSection from "@/components/WorldsSection";
import SoundboardSection from "@/components/SoundboardSection";
import CheatsSection from "@/components/CheatsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [arcadeHandle, setArcadeHandle] = useState<MarioArcadeHandle | null>(null);
  const [coins, setCoins] = useState(99);
  const [score, setScore] = useState(3850);

  const handleRefReady = useCallback((handle: MarioArcadeHandle) => {
    setArcadeHandle(handle);
  }, []);

  const handleWarp = (world: number, stage: number) => {
    arcadeHandle?.warpTo(world, stage);
  };

  const handleCoinClick = () => {
    setCoins((c) => c + 1);
    setScore((s) => s + 200);
  };

  const handleFullscreen = () => {
    arcadeHandle?.requestFullscreen();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0b0c10] text-[#ededed]">
      {/* Retro HUD & Navbar */}
      <Navbar
        coinCount={coins}
        score={score}
        onCoinClick={handleCoinClick}
        onFullscreen={handleFullscreen}
      />

      <main className="flex-1">
        {/* HERO HEADER */}
        <section className="relative overflow-hidden border-b border-zinc-800/80 bg-gradient-to-b from-[#141724] via-[#0d0f17] to-[#0b0c10] py-12 px-4 sm:py-16">
          {/* Subtle Background Glows */}
          <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#e52521]/15 blur-3xl" />
          <div className="pointer-events-none absolute top-20 right-10 h-72 w-72 rounded-full bg-[#5c94fc]/10 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            {/* Retro Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#fcd116] bg-black/70 px-4 py-1.5 font-retro text-[10px] text-[#fcd116] shadow-[0_0_15px_rgba(252,209,22,0.3)] backdrop-blur-md mb-6">
              <span className="animate-pulse">★</span>
              <span>AUTHENTIC 1985 NES REMAKE IN HTML5</span>
              <span className="animate-pulse">★</span>
            </div>

            {/* Main Title */}
            <h1 className="font-retro text-2xl sm:text-4xl md:text-5xl text-white tracking-wider leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
              SUPER MARIO BROS.
            </h1>
            <p className="font-retro text-xs sm:text-sm text-[#fcd116] mt-3 tracking-widest">
              WEB BROWSER ARCADE EDITION
            </p>

            {/* Subtitle */}
            <p className="mt-5 text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed font-sans">
              Experience the timeless platformer that defined gaming history. Play all 32 original worlds, generate infinite procedural levels, create custom stages, and jump right into the action directly below!
            </p>

            {/* Hero Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 font-retro text-xs">
              <a
                href="#play-arcade"
                className="flex items-center gap-2 rounded-xl bg-[#e52521] px-6 py-3.5 text-white shadow-[0_4px_16px_rgba(229,37,33,0.5),3px_3px_0_#000] transition-all hover:bg-red-600 hover:scale-105 active:scale-95"
              >
                <span>🎮</span>
                <span>PLAY GAME NOW</span>
              </a>

              <a
                href="#controls"
                className="flex items-center gap-2 rounded-xl border-2 border-zinc-700 bg-zinc-900/90 px-5 py-3.5 text-zinc-200 shadow-[3px_3px_0_#000] transition-all hover:border-[#fcd116] hover:text-white hover:scale-105 active:scale-95"
              >
                <span>⌨️</span>
                <span>CONTROLS & CHEATS</span>
              </a>

              <a
                href="#soundboard"
                className="flex items-center gap-2 rounded-xl border-2 border-zinc-700 bg-zinc-900/90 px-5 py-3.5 text-zinc-200 shadow-[3px_3px_0_#000] transition-all hover:border-[#00a800] hover:text-white hover:scale-105 active:scale-95"
              >
                <span>🔊</span>
                <span>SOUNDBOARD</span>
              </a>
            </div>

            {/* Feature Highlights Ticker */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="rounded-lg border border-zinc-800 bg-[#12141c]/80 p-3">
                <div className="font-retro text-[10px] text-[#5c94fc]">32 WORLDS</div>
                <div className="text-xs text-zinc-400 mt-0.5">Complete NES Campaign</div>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-[#12141c]/80 p-3">
                <div className="font-retro text-[10px] text-[#00a800]">PROCEDURAL</div>
                <div className="text-xs text-zinc-400 mt-0.5">Infinite Map Generator</div>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-[#12141c]/80 p-3">
                <div className="font-retro text-[10px] text-[#fcd116]">LEVEL BUILDER</div>
                <div className="text-xs text-zinc-400 mt-0.5">Custom Tile Editor</div>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-[#12141c]/80 p-3">
                <div className="font-retro text-[10px] text-[#e52521]">CONTROLLER</div>
                <div className="text-xs text-zinc-400 mt-0.5">USB / Gamepad Ready</div>
              </div>
            </div>
          </div>
        </section>

        {/* EMBEDDED MARIO ARCADE PLAYER CABINET */}
        <MarioArcade onRefReady={handleRefReady} />

        {/* CONTROLS & PHYSICS SECTION */}
        <ControlsSection />

        {/* ICONIC POWERUPS & ITEMS */}
        <PowerupsSection
          onTriggerShroom={() => arcadeHandle?.triggerShroom()}
          onTriggerStar={() => arcadeHandle?.triggerStar()}
        />

        {/* WORLDS & LEVEL DIRECTORY */}
        <WorldsSection onWarp={handleWarp} />

        {/* INTERACTIVE SOUNDBOARD & CHIPTUNE THEMES */}
        <SoundboardSection />

        {/* CHEATS & LEVEL BUILDER */}
        <CheatsSection />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
