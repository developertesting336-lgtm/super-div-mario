"use client";

import React from "react";

interface PowerupsSectionProps {
  onTriggerShroom?: () => void;
  onTriggerStar?: () => void;
}

export default function PowerupsSection({
  onTriggerShroom,
  onTriggerStar,
}: PowerupsSectionProps) {
  const items = [
    {
      name: "SUPER MUSHROOM",
      icon: "🍄",
      badgeColor: "bg-red-500",
      description:
        "Transforms regular Mario into Super Mario! Increases height, enables brick breaking, and shields Mario from one fatal enemy hit.",
      effect: "Break Bricks & Extra Hit",
      actionText: "Give Shroom",
      action: onTriggerShroom,
    },
    {
      name: "FIRE FLOWER",
      icon: "🌸",
      badgeColor: "bg-orange-500",
      description:
        "Upgrades Super Mario with fiery red-and-white overalls. Enables hurling bouncing fireballs that defeat Goombas, Koopas, and even Bowser!",
      effect: "Ranged Fireballs",
    },
    {
      name: "SUPER STAR",
      icon: "⭐",
      badgeColor: "bg-yellow-400 text-black",
      description:
        "Grants Mario invulnerability with glowing flashing colors and upbeat tempo music. Run straight through enemies to defeat them instantly!",
      effect: "Total Invincibility",
      actionText: "Activate Star",
      action: onTriggerStar,
    },
    {
      name: "1-UP MUSHROOM",
      icon: "🟢",
      badgeColor: "bg-emerald-500",
      description:
        "Rare green mushroom hidden in invisible question blocks and treacherous chasms. Instantly grants an extra life and fanfare chime.",
      effect: "+1 Life Reserve",
    },
    {
      name: "GOLD COINS",
      icon: "🪙",
      badgeColor: "bg-amber-400 text-black",
      description:
        "Found in question mark blocks, bricks, and coin clouds. Collect 100 gold coins across your adventure to earn a free 1-UP life!",
      effect: "100 Coins = 1-UP",
    },
    {
      name: "VINE / BEANSTALK",
      icon: "🌿",
      badgeColor: "bg-green-600",
      description:
        "Hidden in specific mystery blocks. Sprouts high into the clouds, leading to secret sky bonus stages filled with coins and shortcuts.",
      effect: "Sky Warp Portal",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <div className="inline-block rounded-md bg-[#00a800] px-3 py-1 font-retro text-[10px] text-white shadow-[2px_2px_0_#000]">
          ARSENAL & ITEMS
        </div>
        <h2 className="mt-3 font-retro text-xl sm:text-2xl text-white tracking-wide">
          ICONIC POWER-UPS
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl mx-auto">
          The legendary power items that revolutionized video game platforming in 1985.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="group relative rounded-xl border border-zinc-800 bg-[#12141c] p-6 shadow-md transition-all hover:border-zinc-700 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                {item.icon}
              </span>
              <span
                className={`rounded px-2 py-0.5 font-retro text-[9px] font-bold ${item.badgeColor}`}
              >
                {item.effect}
              </span>
            </div>

            <h3 className="font-retro text-xs text-white mb-2 tracking-wide group-hover:text-[#fcd116] transition-colors">
              {item.name}
            </h3>

            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              {item.description}
            </p>

            {item.action && (
              <button
                onClick={item.action}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900/90 py-1.5 font-retro text-[10px] text-zinc-300 transition-colors hover:border-[#fcd116] hover:bg-[#fcd116]/10 hover:text-white"
              >
                ⚡ {item.actionText}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
