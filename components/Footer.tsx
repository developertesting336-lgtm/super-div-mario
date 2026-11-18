"use client";

import React from "react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t-4 border-zinc-800 bg-[#08090f] py-12 px-4 text-center font-retro text-xs text-zinc-500">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-[#fcd116] bg-[#e52521] text-white font-bold">
            M
          </div>
          <div className="text-left">
            <div className="text-white text-xs">SUPER MARIO BROS.</div>
            <div className="text-[10px] text-zinc-400 font-mono">HTML5 CANVAS EDITION</div>
          </div>
        </div>

        <div className="text-center sm:text-left text-[10px] leading-relaxed text-zinc-400 font-sans max-w-md">
          Super Mario Bros. is originally developed and published by Nintendo (1985). This project is a non-commercial open-source web tribute built with HTML5 Canvas and JavaScript. All characters and trademarks belong to Nintendo.
        </div>

        <button
          onClick={scrollToTop}
          className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-[10px] text-zinc-300 hover:border-[#fcd116] hover:text-white transition-all active:scale-95 shadow-[2px_2px_0_#000]"
        >
          ▲ BACK TO TOP
        </button>
      </div>
    </footer>
  );
}
