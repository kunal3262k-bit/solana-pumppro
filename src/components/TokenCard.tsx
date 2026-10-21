"use client";

import React from "react";
import { Token } from "@/lib/types";
import { BondingCurveRing } from "./BondingCurveRing";
import { formatSol, formatUsd } from "@/lib/utils";
import { ShieldCheck, ShieldAlert, TrendingUp, Zap } from "lucide-react";

interface TokenCardProps {
  token: Token;
  isSelected: boolean;
  onSelect: (token: Token) => void;
  onInstantSnipe?: (token: Token, amountSol: number) => void;
}

export const TokenCard: React.FC<TokenCardProps> = ({
  token,
  isSelected,
  onSelect,
  onInstantSnipe,
}) => {
  const isSafe = token.rugShieldScore >= 80;

  const handleSnipe = (e: React.MouseEvent, amountSol: number) => {
    e.stopPropagation();
    if (onInstantSnipe) {
      onInstantSnipe(token, amountSol);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(token)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(token);
        }
      }}
      className={`group relative cursor-pointer rounded-2xl border p-4 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-brand-neon ${
        isSelected
          ? "border-brand-neon bg-surface-card shadow-lg shadow-brand-neon/10"
          : "border-surface-border bg-surface hover:border-zinc-700 hover:bg-surface-card/60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Token Info */}
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-surface-border bg-surface-card">
            <img src={token.image} alt={token.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white group-hover:text-brand-neon transition-colors">
                {token.name}
              </h3>
              <span className="rounded bg-surface-card border border-surface-border px-1.5 py-0.5 text-[10px] font-mono font-bold text-zinc-400">
                ${token.ticker}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
              <span>MCap: {formatSol(token.marketCapSol)}</span>
              <span>•</span>
              <span className="text-zinc-500">{token.createdTimeAgo}</span>
            </div>
          </div>
        </div>

        {/* Circular Progress Gauge */}
        <BondingCurveRing percentage={token.bondingCurvePercent} size={46} strokeWidth={5} />
      </div>

      {/* Description Snippet */}
      <p className="mt-3 text-xs text-zinc-400 line-clamp-1">{token.description}</p>

      {/* 1-Tap Snipe Bar (Sub-Second Latency) */}
      <div className="mt-3 flex items-center justify-between gap-2 rounded-xl bg-surface-card/80 border border-surface-border/60 px-2.5 py-1.5">
        <span className="text-[10px] font-mono font-bold text-zinc-400 flex items-center gap-1">
          <Zap size={11} className="text-brand-neon fill-brand-neon" /> 1-Tap Snipe:
        </span>
        <div className="flex items-center gap-1.5">
          {[0.1, 0.5, 1.0].map((amt) => (
            <button
              key={amt}
              onClick={(e) => handleSnipe(e, amt)}
              title={`Instantly buy ${amt} SOL of $${token.ticker} with 0 popups`}
              className="px-2 py-0.5 rounded-lg bg-surface border border-surface-border/80 text-[10px] font-mono font-bold text-brand-neon hover:bg-brand-neon hover:text-zinc-950 active:scale-90 transition-all shadow-sm"
            >
              +{amt}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Badges */}
      <div className="mt-3 flex items-center justify-between border-t border-surface-border/60 pt-2.5 text-[11px]">
        {/* Safety Indicator */}
        <div className="flex items-center gap-1.5 font-mono">
          {isSafe ? (
            <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[10px]">
              <ShieldCheck size={13} /> Rug-Shield {token.rugShieldScore}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-yellow-400 font-semibold text-[10px]">
              <ShieldAlert size={13} /> Audit {token.rugShieldScore}
            </span>
          )}
        </div>

        {/* 24h Price Change */}
        <div
          className={`flex items-center gap-1 font-mono font-bold text-[11px] ${
            token.priceChange24h >= 0 ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          <TrendingUp size={12} className={token.priceChange24h < 0 ? "rotate-180" : ""} />
          {token.priceChange24h >= 0 ? "+" : ""}
          {token.priceChange24h}%
        </div>
      </div>
    </div>
  );
};
