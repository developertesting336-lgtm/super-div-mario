"use client";

import React, { useState, useRef, useEffect } from "react";

export interface MarioArcadeHandle {
  warpTo: (world: number, stage: number) => void;
  triggerShroom: () => void;
  triggerStar: () => void;
  requestFullscreen: () => void;
}

interface MarioArcadeProps {
  onRefReady?: (handle: MarioArcadeHandle) => void;
}

export default function MarioArcade({ onRefReady }: MarioArcadeProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [mode, setMode] = useState<"direct" | "suite">("direct");
  const [scanlines, setScanlines] = useState(true);
  const [screenHeight, setScreenHeight] = useState<"default" | "tall">("default");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scaleMode, setScaleMode] = useState<"fill" | "fit">("fill");
  const [statusMessage, setStatusMessage] = useState<string | null>(
    "🎮 Click screen to focus controls! Arrow keys or WASD to run, Up/Space to jump."
  );
  const [isFocused, setIsFocused] = useState(false);
  const [turboActive, setTurboActive] = useState(false);
  const [autoRespawn, setAutoRespawn] = useState(false);

  // Helper to show temporary status notifications
  const notify = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => {
      setStatusMessage(null);
    }, 4500);
  };

  // Safe accessor to iframe window
  const getIframeWindow = () => {
    try {
      if (!iframeRef.current) return null;
      return iframeRef.current.contentWindow;
    } catch {
      return null;
    }
  };

  // Actions
  const warpTo = (world: number, stage: number) => {
    const win = getIframeWindow() as any;
    if (win) {
      if (typeof win.setMap === "function") {
        win.setMap(world, stage);
        notify(`🚀 Warped to World ${world}-${stage}!`);
      } else {
        win.postMessage({ type: "setMap", map: [world, stage] }, "*");
        notify(`🚀 Warped to World ${world}-${stage}!`);
      }
      iframeRef.current?.focus();
    }
  };

  const triggerRandomMap = (theme?: string) => {
    const win = getIframeWindow() as any;
    if (win && typeof win.setMapRandom === "function") {
      win.setMapRandom(theme || "Overworld");
      notify(`🎲 Generated new procedural ${theme || "Overworld"} map!`);
      iframeRef.current?.focus();
    } else {
      notify("Map generator available in Direct mode!");
    }
  };

  const triggerShroom = () => {
    const win = getIframeWindow() as any;
    if (win && typeof win.playerShroom === "function" && win.player) {
      win.playerShroom(win.player);
      notify("🍄 Mushroom Power-Up activated!");
      iframeRef.current?.focus();
    } else {
      notify("Hit screen once to spawn Mario before activating power-ups!");
    }
  };

  const triggerStar = () => {
    const win = getIframeWindow() as any;
    if (win && typeof win.playerStar === "function" && win.player) {
      win.playerStar(win.player);
      notify("⭐ Starman Invincibility activated!");
      iframeRef.current?.focus();
    } else {
      notify("Hit screen once to spawn Mario before activating power-ups!");
    }
  };

  const toggleAutoRevive = () => {
    const win = getIframeWindow() as any;
    if (win) {
      if (typeof win.toggleAutoRespawn === "function") {
        win.toggleAutoRespawn();
      } else {
        win.postMessage({ type: "toggleAutoRespawn" }, "*");
      }
      setAutoRespawn((prev) => !prev);
      notify(!autoRespawn ? "♾️ Infinite Auto-Revive: ON" : "♾️ Infinite Auto-Revive: OFF");
      iframeRef.current?.focus();
    }
  };

  const toggleTurbo = () => {
    const win = getIframeWindow() as any;
    if (win && typeof win.fastforward === "function") {
      const nextState = !turboActive;
      win.fastforward(nextState ? 1 : 0);
      setTurboActive(nextState);
      notify(nextState ? "⚡ Turbo Speed 2X: ON" : "⚡ Turbo Speed: Normal (1X)");
      iframeRef.current?.focus();
    }
  };

  const triggerEditor = () => {
    const win = getIframeWindow() as any;
    if (win && typeof win.loadEditor === "function") {
      win.loadEditor();
      notify("🛠️ In-game Level Editor activated!");
      iframeRef.current?.focus();
    } else {
      setMode("suite");
      notify("Switching to Arcade Suite with Level Editor...");
    }
  };

  const reloadGame = () => {
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = "";
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc;
          notify("🔄 Game restarted fresh!");
        }
      }, 50);
    }
  };

  const toggleScaleMode = () => {
    const nextMode = scaleMode === "fill" ? "fit" : "fill";
    setScaleMode(nextMode);
    iframeRef.current?.contentWindow?.postMessage({ type: "setScaleMode", mode: nextMode }, "*");
    notify(nextMode === "fill" ? "🖥️ Scaling: FULLSCREEN FILL (100%)" : "📺 Scaling: ASPECT FIT (4:3)");
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      const fs = !!document.fullscreenElement;
      setIsFullscreen(fs);
      setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage({ type: "resize" }, "*");
        iframeRef.current?.contentWindow?.postMessage({ type: "setScaleMode", mode: scaleMode }, "*");
      }, 60);
      setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage({ type: "resize" }, "*");
      }, 300);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, [scaleMode]);

  useEffect(() => {
    if (onRefReady) {
      onRefReady({
        warpTo,
        triggerShroom,
        triggerStar,
        requestFullscreen: toggleFullscreen,
      });
    }
  }, [onRefReady]);

  // Height class mapping
  const heightClass = isFullscreen
    ? "h-full flex-1"
    : screenHeight === "tall"
    ? "h-[660px]"
    : "h-[540px]";

  const gameSrc = mode === "direct" ? "/mario/mario.html" : "/mario/index.html";

  return (
    <section id="play-arcade" className="relative w-full max-w-6xl mx-auto px-4 py-8">
      {/* Outer Retro Arcade Cabinet */}
      <div
        ref={containerRef}
        className={`relative transition-all ${
          isFullscreen
            ? "fixed inset-0 z-50 rounded-none border-none p-0 bg-black flex flex-col h-screen w-screen overflow-hidden"
            : "rounded-2xl border-4 border-[#333a4c] bg-[#141620] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(229,37,33,0.15)] p-4 sm:p-6"
        }`}
      >
        {/* Top Cabinet Marquee & Controls Bar */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 font-retro text-xs text-zinc-300 ${
            isFullscreen
              ? "shrink-0 px-4 py-2.5 bg-zinc-950/95 border-b border-zinc-800"
              : "mb-4 border-b-2 border-zinc-800 pb-3"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse" />
            <span className="font-bold text-white tracking-wider">
              ARCADE CONSOLE
            </span>
            <span className="hidden sm:inline-block rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
              60 FPS
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 p-1">
            <button
              onClick={() => {
                setMode("direct");
                notify("Switched to Classic Canvas Mode");
              }}
              className={`rounded px-3 py-1 text-[10px] transition-colors ${
                mode === "direct"
                  ? "bg-[#e52521] text-white font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              🕹️ CLASSIC
            </button>
            <button
              onClick={() => {
                setMode("suite");
                notify("Switched to Full Suite (Level Editor & Map Select)");
              }}
              className={`rounded px-3 py-1 text-[10px] transition-colors ${
                mode === "suite"
                  ? "bg-[#00a800] text-white font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              🛠️ SUITE + EDITOR
            </button>
          </div>

          {/* Display & Screen Actions */}
          <div className="flex items-center gap-2">
            {/* Screen Scaling Mode (Fill vs Fit) */}
            <button
              onClick={toggleScaleMode}
              title="Toggle scaling mode: FILL screen or FIT original aspect"
              className="rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-[10px] text-zinc-300 hover:border-[#fcd116] hover:text-white transition-colors"
            >
              {scaleMode === "fill" ? "🖥️ FULL FILL" : "📺 4:3 FIT"}
            </button>

            <button
              onClick={() => setScanlines(!scanlines)}
              title="Toggle retro CRT scanline effect"
              className={`rounded border border-zinc-700 px-2 py-1 text-[10px] transition-colors ${
                scanlines
                  ? "bg-[#5c94fc]/20 text-[#5c94fc] border-[#5c94fc]/40"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              📺 CRT {scanlines ? "ON" : "OFF"}
            </button>

            {!isFullscreen && (
              <button
                onClick={() =>
                  setScreenHeight(screenHeight === "default" ? "tall" : "default")
                }
                title="Toggle screen height"
                className="hidden sm:inline-block rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-[10px] text-zinc-300 hover:text-white"
              >
                {screenHeight === "default" ? "↕ EXPAND" : "↕ COMPACT"}
              </button>
            )}

            <button
              onClick={reloadGame}
              title="Restart game instance"
              className="rounded border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-[10px] text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
            >
              🔄 RESET
            </button>

            <button
              onClick={toggleFullscreen}
              title="Toggle Fullscreen"
              className="rounded bg-[#e52521] px-2.5 py-1 text-[10px] text-white font-bold shadow-[2px_2px_0_#000] transition-transform hover:scale-105 active:scale-95"
            >
              {isFullscreen ? "✕ EXIT FS" : "⛶ FULLSCREEN"}
            </button>
          </div>
        </div>

        {/* The Screen Bezel */}
        <div
          className={`relative bg-black overflow-hidden flex items-center justify-center ${
            isFullscreen
              ? "flex-1 w-full border-none rounded-none"
              : "rounded-xl border-4 border-[#07080c] shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]"
          }`}
        >
          {/* Status Message Overlay Bar */}
          {statusMessage && (
            <div className="absolute top-3 left-1/2 z-30 -translate-x-1/2 rounded-full border border-[#fcd116]/60 bg-black/90 px-4 py-1.5 font-retro text-[10px] sm:text-xs text-[#fcd116] shadow-[0_4px_16px_rgba(0,0,0,0.8)] backdrop-blur-sm animate-bounce">
              {statusMessage}
            </div>
          )}

          {/* Embedded Game Iframe */}
          <div className={`relative w-full ${isFullscreen ? "h-full flex-1" : heightClass}`}>
            <iframe
              ref={iframeRef}
              src={gameSrc}
              title="Super Mario Bros HTML5 Game"
              className="w-full h-full border-0 bg-black block"
              tabIndex={0}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            {/* Retro CRT Scanline Overlay */}
            {scanlines && (
              <div className="crt-scanlines pointer-events-none absolute inset-0 z-10" />
            )}

            {/* Click to Focus Overlay if not focused */}
            {!isFocused && !isFullscreen && (
              <button
                onClick={() => {
                  iframeRef.current?.focus();
                  setIsFocused(true);
                  notify("Keyboard focused! Use Arrow keys / WASD to play.");
                }}
                className="group absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-lg border-2 border-[#fcd116] bg-black/85 px-3 py-2 font-retro text-[10px] text-white shadow-[0_4px_12px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all hover:bg-[#e52521] hover:border-white"
              >
                <span className="animate-pulse">🎮</span>
                <span>CLICK TO FOCUS INPUT</span>
              </button>
            )}
          </div>
        </div>

        {/* ARCADE DECK & CONTROL CONSOLE (Below Screen) */}
        {!isFullscreen && (
          <div className="mt-5 space-y-4 rounded-xl border border-zinc-800 bg-[#0d0f17] p-4">
            {/* Row 1: Powerups & Action Cheats */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="font-retro text-[11px] text-[#fcd116] flex items-center gap-2">
                <span>⚡ ARCADE POWERS:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={triggerShroom}
                  className="flex items-center gap-1.5 rounded-lg border-2 border-red-500 bg-red-950/60 px-3 py-1.5 font-retro text-[10px] text-white shadow-[2px_2px_0_#000] transition-all hover:bg-red-600 active:scale-95"
                >
                  <span>🍄</span>
                  <span>SUPER SHROOM</span>
                </button>

                <button
                  onClick={triggerStar}
                  className="flex items-center gap-1.5 rounded-lg border-2 border-yellow-400 bg-yellow-950/60 px-3 py-1.5 font-retro text-[10px] text-[#fcd116] shadow-[2px_2px_0_#000] transition-all hover:bg-yellow-500 hover:text-black active:scale-95"
                >
                  <span>⭐</span>
                  <span>STARMAN</span>
                </button>

                <button
                  onClick={toggleAutoRevive}
                  className={`flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 font-retro text-[10px] shadow-[2px_2px_0_#000] transition-all active:scale-95 ${
                    autoRespawn
                      ? "border-emerald-400 bg-emerald-600 text-white"
                      : "border-emerald-700 bg-emerald-950/50 text-emerald-300 hover:bg-emerald-800/80"
                  }`}
                >
                  <span>♾️</span>
                  <span>AUTO-REVIVE: {autoRespawn ? "ON" : "OFF"}</span>
                </button>

                <button
                  onClick={toggleTurbo}
                  className={`flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 font-retro text-[10px] shadow-[2px_2px_0_#000] transition-all active:scale-95 ${
                    turboActive
                      ? "border-cyan-400 bg-cyan-600 text-white"
                      : "border-cyan-700 bg-cyan-950/50 text-cyan-300 hover:bg-cyan-800/80"
                  }`}
                >
                  <span>⚡</span>
                  <span>TURBO 2X</span>
                </button>

                <button
                  onClick={triggerEditor}
                  className="flex items-center gap-1.5 rounded-lg border-2 border-purple-500 bg-purple-950/60 px-3 py-1.5 font-retro text-[10px] text-purple-200 shadow-[2px_2px_0_#000] transition-all hover:bg-purple-600 hover:text-white active:scale-95"
                >
                  <span>🛠️</span>
                  <span>LEVEL EDITOR</span>
                </button>
              </div>
            </div>

            {/* Row 2: Warp Zone Level Selectors */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 pt-3">
              <div className="font-retro text-[11px] text-[#5c94fc] flex items-center gap-2">
                <span>🚀 WARP ZONE:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => warpTo(1, 1)}
                  className="rounded border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 font-retro text-[10px] text-zinc-300 hover:border-[#5c94fc] hover:bg-[#5c94fc]/20 hover:text-white"
                >
                  W1-1 Grass
                </button>

                <button
                  onClick={() => warpTo(1, 2)}
                  className="rounded border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 font-retro text-[10px] text-zinc-300 hover:border-[#5c94fc] hover:bg-[#5c94fc]/20 hover:text-white"
                >
                  W1-2 Underground
                </button>

                <button
                  onClick={() => warpTo(1, 4)}
                  className="rounded border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 font-retro text-[10px] text-zinc-300 hover:border-red-500 hover:bg-red-500/20 hover:text-white"
                >
                  W1-4 Castle
                </button>

                <button
                  onClick={() => warpTo(2, 2)}
                  className="rounded border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 font-retro text-[10px] text-zinc-300 hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-white"
                >
                  W2-2 Underwater
                </button>

                <button
                  onClick={() => warpTo(4, 1)}
                  className="rounded border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 font-retro text-[10px] text-zinc-300 hover:border-[#fcd116] hover:bg-[#fcd116]/20 hover:text-white"
                >
                  W4-1 Clouds
                </button>

                <button
                  onClick={() => warpTo(8, 4)}
                  className="rounded border border-red-800/80 bg-red-950/40 px-2.5 py-1 font-retro text-[10px] text-red-300 hover:bg-red-600 hover:text-white"
                >
                  W8-4 Bowser Final
                </button>

                <button
                  onClick={() => triggerRandomMap("Overworld")}
                  className="rounded border border-emerald-500/80 bg-emerald-950/40 px-3 py-1 font-retro text-[10px] text-emerald-300 hover:bg-emerald-600 hover:text-white shadow-[2px_2px_0_#000]"
                >
                  🎲 Procedural Map
                </button>
              </div>
            </div>

            {/* Row 3: Quick Key Reference Tip */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/60 pt-2 text-xs text-zinc-400">
              <div className="flex items-center gap-3">
                <span>
                  <strong className="text-zinc-200">Move:</strong> Arrow Keys / WASD
                </span>
                <span>•</span>
                <span>
                  <strong className="text-zinc-200">Jump:</strong> Up / W / Space
                </span>
                <span>•</span>
                <span>
                  <strong className="text-zinc-200">Sprint / Fire:</strong> Shift / Ctrl
                </span>
                <span>•</span>
                <span>
                  <strong className="text-zinc-200">Pause:</strong> P
                </span>
                <span>•</span>
                <span>
                  <strong className="text-zinc-200">Mute:</strong> M
                </span>
              </div>

              <div className="font-mono text-[11px] text-zinc-500">
                Tip: Click on game screen before pressing keys
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
