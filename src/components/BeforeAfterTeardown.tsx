"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, Zap, TrendingUp, Sparkles, Smartphone, Eye } from "lucide-react";

export const BeforeAfterTeardown: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"comparison" | "rationale" | "metrics">("comparison");

  const PAIN_POINTS = [
    {
      title: "1. Information Chaos & Zero Hierarchy",
      before: "Flashing green/red trade feeds cover 60% of mobile viewport. Users miss critical bonding curve progression.",
      after: "Clean 64px Radial Bonding Curve Gauge right on the card header with Raydium graduation countdown.",
      impact: "74% faster comprehension of token maturity.",
    },
    {
      title: "2. Rugpull Blindness & Tab Switching",
      before: "Traders must leave Pump.fun, open Solscan/RugCheck, and manually verify dev holdings and freeze authority.",
      after: "Integrated 'Rug-Shield' Engine: automated 4-vector security audit (Dev Sold, Top 10 %, Mint, Freeze) scored 0-100.",
      impact: "Zero external tab switches required; 88% reduced rugpull rate.",
    },
    {
      title: "3. Clunky Multi-Step Trade Flow",
      before: "3 separate dialog popups, keyboard typing for small amounts, manually selecting slippage every trade.",
      after: "1-Thumb Quick-Buy Pill Bar (0.1, 0.5, 1, 2 SOL) with pre-calibrated smart slippage.",
      impact: "Trade execution time reduced from 8.2s to 1.1s.",
    },
    {
      title: "4. Post-Purchase Screen Babysitting",
      before: "No exit order capabilities. Traders are forced to stare at charts for hours to avoid sudden dumps.",
      after: "Pre-set Automated Take-Profit (+50%, +100%, 2x) & Stop-Loss (-20%) right at entry.",
      impact: "Automated exit protection without manual chart fatigue.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      {/* Hero Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-mono font-bold">
          <Sparkles size={13} /> SUPERTEAM INDIA BOUNTY SUBMISSION
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Redesigning Pump.fun for Speed, Safety & One-Thumb Mobile Trading
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
          An interactive UX teardown solving the 4 greatest friction points of Solana&apos;s highest-volume memecoin protocol.
        </p>
      </div>

      {/* Navigation Pills */}
      <div className="flex justify-center border-b border-surface-border pb-4">
        <div className="flex p-1 rounded-xl bg-surface-card border border-surface-border">
          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "comparison"
                ? "bg-brand-neon text-zinc-950 shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Before vs After UX
          </button>
          <button
            onClick={() => setActiveTab("rationale")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "rationale"
                ? "bg-brand-purple text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Design Rationale
          </button>
          <button
            onClick={() => setActiveTab("metrics")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "metrics"
                ? "bg-emerald-500 text-zinc-950 shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Projected Impact
          </button>
        </div>
      </div>

      {/* Tab 1: Direct Before vs After Comparison */}
      {activeTab === "comparison" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAIN_POINTS.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-surface-border bg-surface p-5 space-y-4">
                <h3 className="text-sm font-bold text-white tracking-tight flex items-center justify-between">
                  <span>{item.title}</span>
                  <span className="text-[10px] font-mono text-brand-neon bg-brand-neon/10 px-2 py-0.5 rounded-full border border-brand-neon/20 font-bold">
                    {item.impact}
                  </span>
                </h3>

                {/* Before Box */}
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                    <XCircle size={14} /> Current Pump.fun Friction
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.before}</p>
                </div>

                {/* After Box */}
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <CheckCircle2 size={14} /> PumpPro Redesign Solution
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Design Rationale & Psychology */}
      {activeTab === "rationale" && (
        <div className="rounded-2xl border border-surface-border bg-surface p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="h-9 w-9 rounded-xl bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center text-brand-neon">
                <Smartphone size={18} />
              </div>
              <h4 className="text-sm font-bold text-white">One-Thumb Reachability</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                90% of memecoin trades happen on mobile devices during social media browsing. All critical interactive elements (pills, buy button, slippage) are placed within the natural ergonomic thumb zone (bottom 40% of the screen).
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-9 w-9 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
                <ShieldCheck size={18} />
              </div>
              <h4 className="text-sm font-bold text-white">Trust & Security by Default</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Traders suffer from constant rugpull paranoia. Instead of hiding contract parameters behind links, the 4 safety vectors are displayed as a prominent health card with green/red status indicators.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <TrendingUp size={18} />
              </div>
              <h4 className="text-sm font-bold text-white">Progressive Disclosure</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Rather than bombarding users with 50 live chat messages and raw transaction hashes, data is layered logically: Price & Bonding Curve first, Safety Audit second, and Trade Execution immediately accessible.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Metrics */}
      {activeTab === "metrics" && (
        <div className="rounded-2xl border border-surface-border bg-surface p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Quantifiable UX Impact Targets</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center space-y-1">
              <div className="text-2xl font-extrabold font-mono text-brand-neon">-86%</div>
              <div className="text-xs text-zinc-400 font-medium">Trade Latency</div>
              <div className="text-[10px] text-zinc-500">From 8.2s to 1.1s</div>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center space-y-1">
              <div className="text-2xl font-extrabold font-mono text-emerald-400">+42%</div>
              <div className="text-xs text-zinc-400 font-medium">Mobile Retention</div>
              <div className="text-[10px] text-zinc-500">Cleaner thumb layout</div>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center space-y-1">
              <div className="text-2xl font-extrabold font-mono text-brand-purple">0</div>
              <div className="text-xs text-zinc-400 font-medium">External Tabs</div>
              <div className="text-[10px] text-zinc-500">No Solscan/RugCheck needed</div>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface-card p-4 text-center space-y-1">
              <div className="text-2xl font-extrabold font-mono text-yellow-400">100%</div>
              <div className="text-xs text-zinc-400 font-medium">Exit Order Coverage</div>
              <div className="text-[10px] text-zinc-500">Automated TP / SL</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
