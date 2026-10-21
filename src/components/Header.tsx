"use client";

import React from "react";
import { Zap, Wallet, Sliders, ShieldCheck, BarChart3, RefreshCw } from "lucide-react";
import { formatSol } from "@/lib/utils";

interface HeaderProps {
  walletBalanceSol: number;
  activeView: "prototype" | "teardown";
  onToggleView: (view: "prototype" | "teardown") => void;
  onResetWallet: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  walletBalanceSol,
  activeView,
  onToggleView,
  onResetWallet,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-brand-emerald to-brand-neon p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="h-full w-full bg-background rounded-[10px] flex items-center justify-center">
              <Zap size={18} className="text-brand-neon fill-brand-neon" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white">PumpPro</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface-card border border-surface-border text-brand-neon font-bold">
                SOLANA
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono hidden sm:block">
              Superteam Earn UX Redesign Submission
            </p>
          </div>
        </div>

        {/* View Switcher: Prototype vs Case Study Teardown */}
        <div className="flex p-1 rounded-xl bg-surface-card border border-surface-border">
          <button
            onClick={() => onToggleView("prototype")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeView === "prototype"
                ? "bg-brand-neon text-zinc-950 font-bold shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Live Terminal
          </button>
          <button
            onClick={() => onToggleView("teardown")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeView === "teardown"
                ? "bg-brand-purple text-white font-bold shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <BarChart3 size={13} /> UX Case Study
          </button>
        </div>

        {/* Simulated Wallet */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-surface-border bg-surface px-3 py-1.5 font-mono text-xs shadow-sm">
            <Wallet size={14} className="text-brand-neon" />
            <span className="font-bold text-white">{walletBalanceSol.toFixed(2)} SOL</span>
            <button
              onClick={onResetWallet}
              title="Reset balance to 25 SOL"
              className="text-zinc-500 hover:text-zinc-300 transition-colors ml-1"
            >
              <RefreshCw size={12} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
