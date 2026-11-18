"use client";

import React from "react";

interface WorldsSectionProps {
  onWarp?: (world: number, stage: number) => void;
}

export default function WorldsSection({ onWarp }: WorldsSectionProps) {
  const worlds = [
    {
      world: 1,
      stage: 1,
      title: "World 1-1: Grassland Overworld",
      biome: "Overworld",
      themeColor: "border-[#5c94fc] text-[#5c94fc]",
      bgColor: "bg-blue-950/20",
      description:
        "The quintessential video game level. Clear blue skies, question mark blocks, Goombas, and the first super mushrooms.",
      features: "4 Hidden Blocks • Warp Pipes • Flagpole",
    },
    {
      world: 1,
      stage: 2,
      title: "World 1-2: Subterranean Underworld",
      biome: "Underworld",
      themeColor: "border-[#fcd116] text-[#fcd116]",
      bgColor: "bg-amber-950/20",
      description:
        "Enter the dark subterranean tunnels with blue bricks, moving elevator platforms, and the legendary Warp Zone to Worlds 2, 3, & 4.",
      features: "Elevator Platforms • Warp Zone Room",
    },
    {
      world: 1,
      stage: 4,
      title: "World 1-4: Bowser's Lava Castle",
      biome: "Castle",
      themeColor: "border-[#e52521] text-[#e52521]",
      bgColor: "bg-red-950/20",
      description:
        "Volcanic fortress filled with spinning fire bars, Podoboo lava bubbles, and Bowser guarding Princess Peach's decoy Toad.",
      features: "Axe Switch • Fire Bars • Bowser Showdown",
    },
    {
      world: 2,
      stage: 2,
      title: "World 2-2: Deep Blue Underwater",
      biome: "Underwater",
      themeColor: "border-cyan-400 text-cyan-400",
      bgColor: "bg-cyan-950/20",
      description:
        "Submerged aquatic expedition with buoyant zero-gravity physics, schooling Cheep-Cheeps, and deceptive jet-propelled Bloopers.",
      features: "Buoyant Physics • Bloopers • Coral Reefs",
    },
    {
      world: 3,
      stage: 1,
      title: "World 3-1: Moonlight Night Trek",
      biome: "Night Overworld",
      themeColor: "border-indigo-400 text-indigo-400",
      bgColor: "bg-indigo-950/20",
      description:
        "Under the starry night sky, face Piranha Plants leaping from pipes, Koopa Paratroopas, and treacherous bridge chasms.",
      features: "Koopa Paratroopas • Night Palette • High Bridges",
    },
    {
      world: 8,
      stage: 4,
      title: "World 8-4: The Final Fortress",
      biome: "Final Stronghold",
      themeColor: "border-rose-600 text-rose-500",
      bgColor: "bg-rose-950/30",
      description:
        "The climactic finale maze! Choose the correct pipe paths through lava caverns to confront King Koopa Bowser and rescue Princess Peach.",
      features: "Castle Maze Puzzle • Final Bowser Battle • Princess Peach",
    },
  ];

  const handleWarp = (world: number, stage: number) => {
    if (onWarp) {
      onWarp(world, stage);
    }
    // Smooth scroll back to game arcade
    const arcadeElem = document.getElementById("play-arcade");
    arcadeElem?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="worlds" className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-block rounded-md bg-[#5c94fc] px-3 py-1 font-retro text-[10px] text-white shadow-[2px_2px_0_#000]">
          EXPLORE THE MUSHROOM KINGDOM
        </div>
        <h2 className="mt-3 font-retro text-xl sm:text-2xl text-white tracking-wide">
          WORLDS & LEVEL DIRECTORY
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl mx-auto">
          32 handcrafted levels spanning lush grasslands, subterranean grottos, sunken oceans, and fiery fortresses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {worlds.map((w, idx) => (
          <div
            key={idx}
            className={`flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#12141c] p-6 shadow-md transition-all hover:border-zinc-700 ${w.bgColor}`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`rounded-md border px-2 py-0.5 font-retro text-[9px] font-bold ${w.themeColor}`}
                >
                  {w.biome}
                </span>
                <span className="font-retro text-[10px] text-zinc-500">
                  STAGE {w.world}-{w.stage}
                </span>
              </div>

              <h3 className="font-retro text-xs text-white mb-2 leading-relaxed">
                {w.title}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                {w.description}
              </p>
            </div>

            <div className="border-t border-zinc-800/80 pt-4">
              <div className="mb-3 font-mono text-[11px] text-zinc-500">
                {w.features}
              </div>

              <button
                onClick={() => handleWarp(w.world, w.stage)}
                className="w-full rounded-lg bg-[#e52521] py-2 font-retro text-[10px] text-white shadow-[2px_2px_0_#000] transition-all hover:bg-red-600 active:scale-95"
              >
                🚀 WARP TO THIS LEVEL
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
