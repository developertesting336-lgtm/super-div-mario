"use client";

import React, { useState } from "react";

export default function CheatsSection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const cheats = [
    {
      command: "playerShroom(player)",
      description: "Instantly upgrade Mario to Super Mario (or Fire Mario if already big).",
      category: "Powerup",
    },
    {
      command: "playerStar(player)",
      description: "Activate invincible Super Star state with flashing rainbow colors.",
      category: "Powerup",
    },
    {
      command: "++player.star",
      description: "Permanent invincibility that lasts for the remainder of the level.",
      category: "God Mode",
    },
    {
      command: "setMap(8, 4)",
      description: "Jump immediately to World 8-4 to fight Bowser in the final fortress.",
      category: "Warp",
    },
    {
      command: "setMapRandom('Castle')",
      description: "Procedurally generate an infinite random Castle labyrinth.",
      category: "Generator",
    },
    {
      command: "loadEditor()",
      description: "Toggle the interactive drag-and-drop level and sprite editor.",
      category: "Editor",
    },
    {
      command: "fastforward(1)",
      description: "Set game speed multiplier to 2X double speed.",
      category: "Speed",
    },
    {
      command: "setLives(99)",
      description: "Set Mario's life counter to 99 lives.",
      category: "Lives",
    },
  ];

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    });
  };

  return (
    <section id="cheats" className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-block rounded-md bg-purple-600 px-3 py-1 font-retro text-[10px] text-white shadow-[2px_2px_0_#000]">
          DEV CONSOLE & HACKS
        </div>
        <h2 className="mt-3 font-retro text-xl sm:text-2xl text-white tracking-wide">
          SECRET CHEAT CODES & LEVEL BUILDER
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl mx-auto">
          Open your browser developer console (F12) while playing the game to execute these real JavaScript commands!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Cheats Table */}
        <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
            <h3 className="font-retro text-xs text-white">JAVASCRIPT CONSOLE CODES</h3>
            <span className="font-mono text-xs text-zinc-500">Press F12 &gt; Console</span>
          </div>

          <div className="space-y-3">
            {cheats.map((c, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/70 p-3 hover:border-zinc-700 transition-colors"
              >
                <div className="pr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="font-mono text-xs font-bold text-[#fcd116]">
                      {c.command}
                    </code>
                    <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[9px] font-mono text-zinc-400">
                      {c.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    {c.description}
                  </p>
                </div>

                <button
                  onClick={() => copyCode(c.command)}
                  className="shrink-0 rounded border border-zinc-700 bg-zinc-800 px-2.5 py-1 font-retro text-[9px] text-zinc-300 hover:border-[#fcd116] hover:text-white transition-all active:scale-95"
                >
                  {copiedCode === c.command ? "✓ COPIED" : "COPY"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Built-in Level Editor Guide */}
        <div className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-[#12141c] p-6 shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <h3 className="font-retro text-xs text-[#00a800]">CUSTOM LEVEL EDITOR</h3>
              <span className="rounded bg-emerald-950/80 px-2 py-0.5 font-retro text-[9px] text-emerald-400 border border-emerald-600/40">
                BUILT-IN FEATURE
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              This HTML5 port includes a full visual level creation engine! Switch to <strong>Suite Mode</strong> in the arcade cabinet or call <code className="text-[#fcd116]">loadEditor()</code> to design custom Super Mario maps directly inside your browser.
            </p>

            <div className="space-y-3 font-mono text-xs text-zinc-400 mb-6">
              <div className="flex items-start gap-2.5 rounded-lg bg-zinc-900/60 p-2.5 border border-zinc-800/80">
                <span className="font-retro text-[10px] text-[#e52521]">1.</span>
                <span>Select from solid blocks, question cubes, green pipes, springboards, and flagpole goals.</span>
              </div>
              <div className="flex items-start gap-2.5 rounded-lg bg-zinc-900/60 p-2.5 border border-zinc-800/80">
                <span className="font-retro text-[10px] text-[#5c94fc]">2.</span>
                <span>Place enemies anywhere: Goombas, Koopas, Hammer Bros, Cheep-Cheeps, and Bowser.</span>
              </div>
              <div className="flex items-start gap-2.5 rounded-lg bg-zinc-900/60 p-2.5 border border-zinc-800/80">
                <span className="font-retro text-[10px] text-[#fcd116]">3.</span>
                <span>Export generated map arrays or test-play your stages instantly in real-time.</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-purple-500/40 bg-purple-950/20 p-4 text-center">
            <div className="font-retro text-xs text-purple-300 mb-1">
              READY TO BUILD?
            </div>
            <p className="text-xs text-zinc-400 mb-3">
              Switch the top arcade mode to &quot;SUITE + EDITOR&quot; to open the level editor drawer.
            </p>
            <a
              href="#play-arcade"
              className="inline-block rounded-lg bg-purple-600 px-4 py-2 font-retro text-[10px] text-white shadow-[2px_2px_0_#000] hover:bg-purple-500 active:scale-95"
            >
              LAUNCH EDITOR IN ARCADE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
