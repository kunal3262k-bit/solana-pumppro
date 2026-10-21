"use client";

import React, { useState } from "react";
import { Zap, ArrowUpDown, Check, Sliders, Shield, AlertCircle } from "lucide-react";
import { Token } from "@/lib/types";
import { formatSol, formatUsd } from "@/lib/utils";

interface QuickTradePanelProps {
  token: Token;
  walletBalanceSol: number;
  onExecuteTrade: (type: "buy" | "sell", amountSol: number, autoTp?: number, autoSl?: number) => void;
}

export const QuickTradePanel: React.FC<QuickTradePanelProps> = ({
  token,
  walletBalanceSol,
  onExecuteTrade,
}) => {
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [amountSol, setAmountSol] = useState<string>("0.5");
  const [enableTp, setEnableTp] = useState<boolean>(true);
  const [tpPercent, setTpPercent] = useState<number>(100); // 2x
  const [enableSl, setEnableSl] = useState<boolean>(true);
  const [slPercent, setSlPercent] = useState<number>(20); // -20%
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const parsedAmount = parseFloat(amountSol) || 0;
  const estimatedTokens = parsedAmount > 0 && token.priceSol > 0 ? parsedAmount / token.priceSol : 0;

  const solPresets = [0.1, 0.5, 1.0, 2.0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedAmount <= 0) return;
    if (tradeType === "buy" && parsedAmount > walletBalanceSol) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onExecuteTrade(
        tradeType,
        parsedAmount,
        enableTp ? tpPercent : undefined,
        enableSl ? slPercent : undefined
      );
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="rounded-2xl border border-surface-border bg-surface p-4 shadow-2xl">
      {/* Tab Switcher: Buy vs Sell */}
      <div className="grid grid-cols-2 p-1 rounded-xl bg-surface-card border border-surface-border mb-4">
        <button
          type="button"
          onClick={() => setTradeType("buy")}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            tradeType === "buy"
              ? "bg-brand-green text-zinc-950 shadow-md font-mono"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Quick Buy (SOL)
        </button>
        <button
          type="button"
          onClick={() => setTradeType("sell")}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            tradeType === "sell"
              ? "bg-brand-red text-white shadow-md font-mono"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Quick Sell
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Preset Amount Pills (Thumb-Optimized) */}
        <div>
          <div className="flex justify-between text-[11px] text-zinc-400 mb-2">
            <span>Instant Amount Presets</span>
            <span className="font-mono">Avail: {walletBalanceSol.toFixed(2)} SOL</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {solPresets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmountSol(preset.toString())}
                className={`py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                  parsedAmount === preset
                    ? "border-brand-neon bg-brand-neon/10 text-brand-neon shadow-sm"
                    : "border-surface-border bg-surface-card hover:bg-surface-card/80 text-zinc-300"
                }`}
              >
                {preset} SOL
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="relative">
          <input
            type="number"
            step="0.01"
            min="0.01"
            max={walletBalanceSol}
            value={amountSol}
            onChange={(e) => setAmountSol(e.target.value)}
            className="w-full rounded-xl border border-surface-border bg-surface-card px-4 py-3 text-base font-mono font-bold text-white placeholder-zinc-500 focus:border-brand-neon focus:outline-none"
            placeholder="0.0"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-zinc-400">
            SOL (~{formatUsd(parsedAmount * 165)})
          </div>
        </div>

        {/* Output Estimation */}
        <div className="rounded-xl bg-surface-card/40 border border-surface-border/50 p-2.5 text-xs text-zinc-300 flex items-center justify-between font-mono">
          <span className="text-zinc-400 text-[11px]">Est. Receive:</span>
          <span className="text-white font-bold">
            {estimatedTokens > 0
              ? `${(estimatedTokens / 1_000_000).toFixed(2)}M ${token.ticker}`
              : `0 ${token.ticker}`}
          </span>
        </div>

        {/* Automated Take-Profit & Stop-Loss Presets */}
        <div className="rounded-xl border border-surface-border/80 bg-surface-card/50 p-3 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-200">
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-brand-purple" />
              Automated Exit Orders
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">Zero Slippage Trailing</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
              <input
                type="checkbox"
                checked={enableTp}
                onChange={(e) => setEnableTp(e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-900 text-brand-green focus:ring-0"
              />
              <span>Auto Take-Profit (+{tpPercent}%)</span>
            </label>
            <div className="flex gap-1">
              {[50, 100, 200].map((tp) => (
                <button
                  key={tp}
                  type="button"
                  onClick={() => setTpPercent(tp)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                    tpPercent === tp ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-500"
                  }`}
                >
                  +{tp}%
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
              <input
                type="checkbox"
                checked={enableSl}
                onChange={(e) => setEnableSl(e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-900 text-brand-red focus:ring-0"
              />
              <span>Auto Stop-Loss (-{slPercent}%)</span>
            </label>
            <div className="flex gap-1">
              {[15, 20, 30].map((sl) => (
                <button
                  key={sl}
                  type="button"
                  onClick={() => setSlPercent(sl)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                    slPercent === sl ? "bg-rose-500/20 text-rose-400" : "text-zinc-500"
                  }`}
                >
                  -{sl}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Big 1-Thumb Action Button */}
        <button
          type="submit"
          disabled={isSubmitting || parsedAmount <= 0 || (tradeType === "buy" && parsedAmount > walletBalanceSol)}
          className={`w-full py-3.5 rounded-xl font-bold font-mono tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all ${
            tradeType === "buy"
              ? "bg-brand-neon hover:bg-emerald-400 text-zinc-950 shadow-emerald-500/20 active:scale-[0.98]"
              : "bg-brand-red hover:bg-rose-600 text-white shadow-rose-500/20 active:scale-[0.98]"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Zap size={16} className="animate-spin" /> Routing via Pump Curve...
            </span>
          ) : (
            <>
              <Zap size={16} />
              {tradeType === "buy" ? `1-Tap Buy ${token.ticker}` : `Sell ${token.ticker}`}
            </>
          )}
        </button>
      </form>
    </div>
  );
};
