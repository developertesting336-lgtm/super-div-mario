"use client";

import React, { useState, useEffect } from "react";

interface NavbarProps {
  onCoinClick?: () => void;
  coinCount?: number;
  score?: number;
  onFullscreen?: () => void;
}

export default function Navbar({
  onCoinClick,
  coinCount = 99,
  score = 3850,
  onFullscreen,
}: NavbarProps) {
  const [coins, setCoins] = useState(coinCount);
  const [displayScore, setDisplayScore] = useState(score);
  const [coinAnim, setCoinAnim] = useState(false);
  const [time, setTime] = useState(365);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 10 ? prev - 1 : 400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBlockClick = () => {
    setCoins((c) => c + 1);
    setDisplayScore((s) => s + 200);
    setCoinAnim(true);
    setTimeout(() => setCoinAnim(false), 500);

    try {
      const audio = new Audio("/mario/Sounds/Sounds/mp3/Coin.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch {}

    if (onCoinClick) onCoinClick();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-[#e52521] bg-[#0c0d14]/95 backdrop-blur-md">
      {/* Top Retro HUD Bar */}
      <div className="border-b border-zinc-800 bg-black/60 px-4 py-2 font-retro text-[10px] sm:text-xs text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-2">
          <div className="flex items-center gap-4 sm:gap-8">
            <div>
              <span className="text-[#e52521]">MARIO</span>
              <div className="font-bold tracking-wider text-[#fcd116]">
                {String(displayScore).padStart(6, "0")}
              </div>
            </div>

            {/* Interactive Coin Counter */}
            <button
              onClick={handleBlockClick}
              title="Hit the ? block for coins!"
              className="group flex items-center gap-1.5 rounded border border-[#fcd116]/40 bg-zinc-900/80 px-2 py-1 transition-all hover:border-[#fcd116] hover:bg-[#fcd116]/20 active:scale-95"
            >
              <span
                className={`inline-block text-sm transition-transform ${
                  coinAnim ? "-translate-y-1 scale-125" : "group-hover:rotate-12"
                }`}
              >
                🪙
              </span>
              <span className="text-white">x</span>
              <span className="font-bold text-[#fcd116]">
                {String(coins).padStart(2, "0")}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <div>
              <span className="text-[#5c94fc]">WORLD</span>
              <div className="text-center font-bold text-white">1 - 1</div>
            </div>

            <div>
              <span className="text-[#00a800]">TIME</span>
              <div className="text-center font-bold text-[#fcd116]">{time}</div>
            </div>

            {onFullscreen && (
              <button
                onClick={onFullscreen}
                className="hidden rounded bg-[#e52521] px-2.5 py-1 text-[10px] text-white transition-colors hover:bg-red-600 sm:inline-block"
              >
                ⛶ FULLSCREEN
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav Links */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#play-arcade" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded border-2 border-[#fcd116] bg-[#e52521] text-lg font-bold shadow-[2px_2px_0px_#000]">
            M
          </div>
          <div>
            <div className="font-retro text-xs sm:text-sm tracking-wide text-white group-hover:text-[#fcd116] transition-colors">
              SUPER MARIO
            </div>
            <div className="text-[10px] font-mono tracking-widest text-zinc-400">
              HTML5 RETRO ARCADE
            </div>
          </div>
        </a>

        <div className="flex items-center gap-2 sm:gap-5 font-retro text-[10px] sm:text-xs">
          <a
            href="#play-arcade"
            className="rounded bg-[#e52521] px-3 py-1.5 text-white transition-all hover:bg-red-600 hover:shadow-[0_0_12px_rgba(229,37,33,0.6)] active:scale-95"
          >
            PLAY NOW
          </a>
          <a
            href="#controls"
            className="hidden text-zinc-300 transition-colors hover:text-[#fcd116] md:inline-block"
          >
            CONTROLS
          </a>
          <a
            href="#worlds"
            className="hidden text-zinc-300 transition-colors hover:text-[#5c94fc] md:inline-block"
          >
            WORLDS
          </a>
          <a
            href="#soundboard"
            className="hidden text-zinc-300 transition-colors hover:text-[#00a800] lg:inline-block"
          >
            SOUNDS
          </a>
          <a
            href="#cheats"
            className="hidden text-zinc-300 transition-colors hover:text-[#fcd116] lg:inline-block"
          >
            CHEATS
          </a>
        </div>
      </nav>
    </header>
  );
}
