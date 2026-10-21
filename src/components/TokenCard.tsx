"use client";

import React from "react";
import Image from "next/image";
import { Token } from "@/lib/types";
import { BondingCurveRing } from "./BondingCurveRing";
import { formatSol, formatUsd } from "@/lib/utils";
import { ShieldCheck, ShieldAlert, TrendingUp, Users } from "lucide-react";

interface TokenCardProps {
  token: Token;
  isSelected: boolean;
  onSelect: (token: Token) => void;
}

export const TokenCard: React.FC<TokenCardProps> = ({ token, isSelected, onSelect }) => {
  const isSafe = token.rugShieldScore >= 80;

  return (
    <div
      onClick={() => onSelect(token)}
      className={`group relative cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
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

      {/* Footer Badges */}
      <div className="mt-3.5 flex items-center justify-between border-t border-surface-border/60 pt-3 text-[11px]">
        {/* Safety Indicator */}
        <div className="flex items-center gap-1.5 font-mono">
          {isSafe ? (
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck size={14} /> Rug-Shield {token.rugShieldScore}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-yellow-400 font-semibold">
              <ShieldAlert size={14} /> Audit {token.rugShieldScore}
            </span>
          )}
        </div>

        {/* 24h Price Change */}
        <div
          className={`flex items-center gap-1 font-mono font-bold ${
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
