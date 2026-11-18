"use client";

import React, { useState } from "react";

export default function ControlsSection() {
  const [activeTab, setActiveTab] = useState<"keyboard" | "gamepad" | "tips">("keyboard");

  return (
    <section id="controls" className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-block rounded-md bg-[#e52521] px-3 py-1 font-retro text-[10px] text-white shadow-[2px_2px_0_#000]">
          HOW TO PLAY
        </div>
        <h2 className="mt-3 font-retro text-xl sm:text-2xl text-white tracking-wide">
          CONTROLS & PHYSICS GUIDE
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl mx-auto">
          Master Mario&apos;s momentum, sliding, and high-altitude jumps with authentic NES physics.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="flex rounded-lg border border-zinc-800 bg-zinc-900/90 p-1 font-retro text-xs">
          <button
            onClick={() => setActiveTab("keyboard")}
            className={`rounded-md px-4 py-2 transition-all ${
              activeTab === "keyboard"
                ? "bg-[#e52521] text-white shadow-[2px_2px_0_#000]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            ⌨️ KEYBOARD
          </button>
          <button
            onClick={() => setActiveTab("gamepad")}
            className={`rounded-md px-4 py-2 transition-all ${
              activeTab === "gamepad"
                ? "bg-[#5c94fc] text-white shadow-[2px_2px_0_#000]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            🎮 GAMEPAD
          </button>
          <button
            onClick={() => setActiveTab("tips")}
            className={`rounded-md px-4 py-2 transition-all ${
              activeTab === "tips"
                ? "bg-[#fcd116] text-black font-bold shadow-[2px_2px_0_#000]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            ⭐ PRO TIPS
          </button>
        </div>
      </div>

      {/* Tab 1: Keyboard */}
      {activeTab === "keyboard" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card: Movement */}
          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🏃</span>
              <h3 className="font-retro text-xs text-white">RUN LEFT / RIGHT</h3>
            </div>
            <div className="flex items-center gap-2 mb-3 font-mono">
              <kbd className="rounded border-2 border-zinc-600 bg-zinc-800 px-2.5 py-1 text-sm font-bold text-white shadow-[0_2px_0_#3f3f46]">
                ◄
              </kbd>
              <kbd className="rounded border-2 border-zinc-600 bg-zinc-800 px-2.5 py-1 text-sm font-bold text-white shadow-[0_2px_0_#3f3f46]">
                ►
              </kbd>
              <span className="text-xs text-zinc-500">or</span>
              <kbd className="rounded border-2 border-zinc-600 bg-zinc-800 px-2.5 py-1 text-sm font-bold text-white shadow-[0_2px_0_#3f3f46]">
                A
              </kbd>
              <kbd className="rounded border-2 border-zinc-600 bg-zinc-800 px-2.5 py-1 text-sm font-bold text-white shadow-[0_2px_0_#3f3f46]">
                D
              </kbd>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Hold direction to accelerate. Mario has real inertia — tap opposite to skid to an abrupt halt with classic skid dust!
            </p>
          </div>

          {/* Card: Jump */}
          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🦘</span>
              <h3 className="font-retro text-xs text-white">JUMP / SWIM</h3>
            </div>
            <div className="flex items-center gap-2 mb-3 font-mono">
              <kbd className="rounded border-2 border-[#5c94fc] bg-blue-950/60 px-3 py-1 text-sm font-bold text-blue-300 shadow-[0_2px_0_#1d4ed8]">
                ▲ UP
              </kbd>
              <kbd className="rounded border-2 border-[#5c94fc] bg-blue-950/60 px-3 py-1 text-sm font-bold text-blue-300 shadow-[0_2px_0_#1d4ed8]">
                W
              </kbd>
              <kbd className="rounded border-2 border-[#5c94fc] bg-blue-950/60 px-3 py-1 text-sm font-bold text-blue-300 shadow-[0_2px_0_#1d4ed8]">
                SPACE
              </kbd>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Variable jump height! Light tap produces a short hop; hold down the jump key to ascend to maximum height. In water levels, tap to stroke upward.
            </p>
          </div>

          {/* Card: Sprint & Fireball */}
          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔥</span>
              <h3 className="font-retro text-xs text-white">SPRINT / FIREBALL</h3>
            </div>
            <div className="flex items-center gap-2 mb-3 font-mono">
              <kbd className="rounded border-2 border-[#e52521] bg-red-950/60 px-3 py-1 text-sm font-bold text-red-300 shadow-[0_2px_0_#b91c1c]">
                SHIFT
              </kbd>
              <kbd className="rounded border-2 border-[#e52521] bg-red-950/60 px-3 py-1 text-sm font-bold text-red-300 shadow-[0_2px_0_#b91c1c]">
                CTRL
              </kbd>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Hold while running to reach supersonic sprint speed and leap across single-block pits. When Fire Mario is active, tap to launch bouncing fireballs!
            </p>
          </div>

          {/* Card: Duck / Down */}
          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🛡️</span>
              <h3 className="font-retro text-xs text-white">CROUCH / PIPE DOWN</h3>
            </div>
            <div className="flex items-center gap-2 mb-3 font-mono">
              <kbd className="rounded border-2 border-zinc-600 bg-zinc-800 px-3 py-1 text-sm font-bold text-white shadow-[0_2px_0_#3f3f46]">
                ▼ DOWN
              </kbd>
              <kbd className="rounded border-2 border-zinc-600 bg-zinc-800 px-3 py-1 text-sm font-bold text-white shadow-[0_2px_0_#3f3f46]">
                S
              </kbd>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Super Mario and Fire Mario can duck to dodge flying Koopa shells or Bullet Bills. Press down atop green pipes to enter secret warp tunnels!
            </p>
          </div>

          {/* Card: Pause & Mute */}
          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⏸️</span>
              <h3 className="font-retro text-xs text-white">PAUSE & MUTE</h3>
            </div>
            <div className="flex items-center gap-2 mb-3 font-mono">
              <kbd className="rounded border-2 border-yellow-500/80 bg-yellow-950/60 px-3 py-1 text-sm font-bold text-yellow-300 shadow-[0_2px_0_#a16207]">
                P
              </kbd>
              <span className="text-xs text-zinc-500">Pause</span>
              <kbd className="rounded border-2 border-yellow-500/80 bg-yellow-950/60 px-3 py-1 text-sm font-bold text-yellow-300 shadow-[0_2px_0_#a16207]">
                M
              </kbd>
              <span className="text-xs text-zinc-500">Mute</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Hit P anytime to freeze the action with classic pause chime. Hit M to silence audio or resume sound effects.
            </p>
          </div>

          {/* Card: Quick Cheats */}
          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧙</span>
              <h3 className="font-retro text-xs text-white">IN-GAME CHEAT KEYS</h3>
            </div>
            <div className="flex items-center gap-2 mb-3 font-mono">
              <kbd className="rounded border-2 border-purple-500 bg-purple-950/60 px-3 py-1 text-sm font-bold text-purple-300 shadow-[0_2px_0_#7e22ce]">
                Q
              </kbd>
              <span className="text-xs text-zinc-500">Quick Star</span>
              <kbd className="rounded border-2 border-purple-500 bg-purple-950/60 px-3 py-1 text-sm font-bold text-purple-300 shadow-[0_2px_0_#7e22ce]">
                L
              </kbd>
              <span className="text-xs text-zinc-500">Luigi Mode</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Use Q to gain immediate invincibility, or press L to switch between Mario and his taller brother Luigi!
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Gamepad */}
      {activeTab === "gamepad" && (
        <div className="rounded-2xl border border-zinc-800 bg-[#12141c] p-6 max-w-3xl mx-auto shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
            <div>
              <h3 className="font-retro text-sm text-white">NATIVE CONTROLLER SUPPORT</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Works automatically with Xbox, PlayStation DualShock/DualSense, Nintendo Switch Pro, and 8BitDo controllers.
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 font-retro text-[10px] text-emerald-400 border border-emerald-500/40">
              ● PLUG & PLAY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="flex items-center justify-between rounded-lg bg-zinc-900/80 p-3 border border-zinc-800">
              <span className="text-zinc-400">D-Pad / Left Stick:</span>
              <span className="font-bold text-white">Move / Duck</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-zinc-900/80 p-3 border border-zinc-800">
              <span className="text-zinc-400">Button A / Cross:</span>
              <span className="font-bold text-[#5c94fc]">Jump / Swim</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-zinc-900/80 p-3 border border-zinc-800">
              <span className="text-zinc-400">Button B / Circle:</span>
              <span className="font-bold text-[#e52521]">Sprint / Fireball</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-zinc-900/80 p-3 border border-zinc-800">
              <span className="text-zinc-400">Start / Options:</span>
              <span className="font-bold text-[#fcd116]">Pause Game</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Pro Tips */}
      {activeTab === "tips" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-5">
            <div className="font-retro text-xs text-[#fcd116] mb-2">01. GAP RUNNING</div>
            <h4 className="text-sm font-bold text-white mb-2">Sprint Over 1-Tile Gaps</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When holding Sprint (Shift), Mario moves so fast that you can run straight over single-block holes without jumping or falling into the pit!
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-5">
            <div className="font-retro text-xs text-[#00a800] mb-2">02. SHELL COMBO</div>
            <h4 className="text-sm font-bold text-white mb-2">Multi-Kill 1-Up Multiplier</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Stomp a Koopa and kick its shell into a line of enemies. Score multiplies from 100 to 8,000 points, and the 8th consecutive enemy grants a free 1-UP!
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-[#12141c] p-5">
            <div className="font-retro text-xs text-[#e52521] mb-2">03. SECRET WARPS</div>
            <h4 className="text-sm font-bold text-white mb-2">Run On The Ceiling</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              In underground stages like World 1-2, jump atop the ceiling elevator blocks and run along the roof past the exit pipe to discover the legendary Warp Zone to Worlds 2, 3, and 4!
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
