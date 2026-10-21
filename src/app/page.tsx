"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { TokenCard } from "@/components/TokenCard";
import { QuickTradePanel } from "@/components/QuickTradePanel";
import { RugShieldAudit } from "@/components/RugShieldAudit";
import { BondingCurveRing } from "@/components/BondingCurveRing";
import { BeforeAfterTeardown } from "@/components/BeforeAfterTeardown";
import { MOCK_TOKENS } from "@/lib/mock-data";
import { Token, Position, TradeHistoryItem } from "@/lib/types";
import { formatSol, formatUsd, truncateAddress } from "@/lib/utils";
import {
  TrendingUp,
  Shield,
  Zap,
  Flame,
  Search,
  ExternalLink,
  Layers,
  ArrowRight,
  Sparkles,
  BarChart3,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";

export default function Home() {
  const [activeView, setActiveView] = useState<"prototype" | "teardown">("prototype");
  const [tokens, setTokens] = useState<Token[]>(MOCK_TOKENS);
  const [selectedToken, setSelectedToken] = useState<Token>(MOCK_TOKENS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [walletBalanceSol, setWalletBalanceSol] = useState<number>(24.85);
  const [positions, setPositions] = useState<Position[]>([]);
  const [tradeNotification, setTradeNotification] = useState<string | null>(null);

  // Filter tokens based on category and search query
  const filteredTokens = tokens.filter((token) => {
    const matchesSearch =
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.ticker.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === "Graduating") return token.bondingCurvePercent >= 85;
    if (selectedCategory === "SafePick") return token.rugShieldScore >= 80;
    if (selectedCategory === "Trending") return token.category === "Trending";
    if (selectedCategory === "New") return token.category === "New";
    return true;
  });

  const handleResetWallet = () => {
    setWalletBalanceSol(25.0);
    setPositions([]);
    showToast("Wallet reset to 25.00 SOL");
  };

  const showToast = (msg: string) => {
    setTradeNotification(msg);
    setTimeout(() => {
      setTradeNotification(null);
    }, 4000);
  };

  const handleExecuteTrade = (
    type: "buy" | "sell",
    amountSol: number,
    autoTp?: number,
    autoSl?: number
  ) => {
    if (type === "buy") {
      if (amountSol > walletBalanceSol) {
        showToast("Insufficient SOL balance!");
        return;
      }

      const newBalance = walletBalanceSol - amountSol;
      setWalletBalanceSol(newBalance);

      const tokensPurchased = amountSol / selectedToken.priceSol;
      const newPosition: Position = {
        id: `pos-${Date.now()}`,
        tokenId: selectedToken.id,
        tokenTicker: selectedToken.ticker,
        tokenName: selectedToken.name,
        tokenImage: selectedToken.image,
        amountTokens: tokensPurchased,
        investedSol: amountSol,
        currentValueSol: amountSol,
        pnlSol: 0,
        pnlPercent: 0,
        entryPriceSol: selectedToken.priceSol,
        autoTakeProfit: autoTp,
        autoStopLoss: autoSl,
        createdAt: "Just now",
      };

      setPositions((prev) => [newPosition, ...prev]);

      // Update bonding curve slightly for realistic responsiveness
      setTokens((prev) =>
        prev.map((t) => {
          if (t.id === selectedToken.id) {
            const addedPercent = Math.min(100, Math.round(t.bondingCurvePercent + amountSol * 1.2));
            return {
              ...t,
              bondingCurvePercent: addedPercent,
              solInCurve: Number((t.solInCurve + amountSol).toFixed(2)),
              solRequiredToGraduate: Math.max(0, Number((t.solRequiredToGraduate - amountSol).toFixed(2))),
            };
          }
          return t;
        })
      );

      showToast(`Bought ${(tokensPurchased / 1_000_000).toFixed(2)}M ${selectedToken.ticker} for ${amountSol} SOL!`);
    } else {
      // Sell logic
      const posIndex = positions.findIndex((p) => p.tokenId === selectedToken.id);
      if (posIndex === -1) {
        showToast(`No open position found for ${selectedToken.ticker}`);
        return;
      }

      const positionToClose = positions[posIndex];
      const returnedSol = positionToClose.investedSol * 1.05; // simulated 5% profit
      setWalletBalanceSol((prev) => prev + returnedSol);
      setPositions((prev) => prev.filter((_, idx) => idx !== posIndex));

      showToast(`Sold position in ${selectedToken.ticker} for +${returnedSol.toFixed(2)} SOL (+5.0%)!`);
    }
  };

  const handleClosePosition = (positionId: string) => {
    const pos = positions.find((p) => p.id === positionId);
    if (!pos) return;

    setWalletBalanceSol((prev) => prev + pos.currentValueSol);
    setPositions((prev) => prev.filter((p) => p.id !== positionId));
    showToast(`Closed position in ${pos.tokenTicker}: +${pos.currentValueSol.toFixed(2)} SOL credited!`);
  };

  return (
    <div className="min-h-screen bg-background text-zinc-100 flex flex-col">
      {/* Top Navigation */}
      <Header
        walletBalanceSol={walletBalanceSol}
        activeView={activeView}
        onToggleView={setActiveView}
        onResetWallet={handleResetWallet}
      />

      {/* Floating Notification */}
      {tradeNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-brand-neon px-4 py-3 text-xs font-bold font-mono text-zinc-950 shadow-2xl animate-bounce">
          <Zap size={16} />
          <span>{tradeNotification}</span>
        </div>
      )}

      {/* Banner: Superteam Earn Bounty Highlight */}
      <div className="border-b border-surface-border bg-gradient-to-r from-emerald-950/30 via-surface to-purple-950/30 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono">
            <span className="flex h-2 w-2 rounded-full bg-brand-neon animate-pulse" />
            <span className="text-zinc-300">Superteam Earn $1,500 USDC Bounty:</span>
            <span className="font-bold text-white">Redesign Your Favourite App on Solana (Pump.fun)</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <button
              onClick={() => setActiveView(activeView === "prototype" ? "teardown" : "prototype")}
              className="text-brand-neon hover:underline flex items-center gap-1 font-bold"
            >
              {activeView === "prototype" ? "Read Complete UX Case Study →" : "← Back to Live Terminal"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeView === "teardown" ? (
          /* UX Case Study Teardown View */
          <BeforeAfterTeardown />
        ) : (
          /* Live Terminal Prototype View */
          <div className="space-y-6">
            {/* Filter Bar & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { label: "All Curvature", val: "All", icon: Layers },
                  { label: "Graduating (85%+)", val: "Graduating", icon: Zap },
                  { label: "Trending Velocity", val: "Trending", icon: Flame },
                  { label: "Rug-Shield Verified", val: "SafePick", icon: Shield },
                  { label: "Fresh Launches", val: "New", icon: Clock },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = selectedCategory === item.val;
                  return (
                    <button
                      key={item.val}
                      onClick={() => setSelectedCategory(item.val)}
                      className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold transition-all border ${
                        isActive
                          ? "border-brand-neon bg-brand-neon/10 text-brand-neon shadow-sm"
                          : "border-surface-border bg-surface hover:border-zinc-700 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <Icon size={13} />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[240px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search token or ticker..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-surface-border bg-surface pl-9 pr-4 py-1.5 text-xs font-mono text-white placeholder-zinc-500 focus:border-brand-neon focus:outline-none"
                />
              </div>
            </div>

            {/* Split Grid: Main Stage (Selected Token Details) + Quick Trade Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left / Center (8 cols): Selected Token Deep Dive */}
              <div className="lg:col-span-8 space-y-6">
                {/* Hero Card for Selected Token */}
                <div className="rounded-2xl border border-surface-border bg-surface p-5 shadow-xl relative overflow-hidden">
                  {/* Subtle Background Glow */}
                  <div className="absolute top-0 right-0 w-72 h-72 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-surface-border/80">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-surface-border bg-surface-card shadow-lg">
                        <img
                          src={selectedToken.image}
                          alt={selectedToken.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-extrabold text-white tracking-tight">
                            {selectedToken.name}
                          </h2>
                          <span className="rounded-lg bg-surface-card border border-surface-border px-2 py-0.5 text-xs font-mono font-bold text-brand-neon">
                            ${selectedToken.ticker}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-mono">
                          <span>Creator: {truncateAddress(selectedToken.creatorAddress)}</span>
                          <span>•</span>
                          <span>Launched {selectedToken.createdTimeAgo}</span>
                          <span>•</span>
                          <span>{selectedToken.holdersCount} Holders</span>
                        </div>
                      </div>
                    </div>

                    {/* Radial Graduation Indicator */}
                    <div className="flex items-center gap-4 bg-surface-card/60 p-3 rounded-2xl border border-surface-border">
                      <BondingCurveRing
                        percentage={selectedToken.bondingCurvePercent}
                        size={64}
                        strokeWidth={6}
                        showDetails={true}
                      />
                    </div>
                  </div>

                  {/* Token Description */}
                  <p className="mt-4 text-xs text-zinc-300 leading-relaxed max-w-2xl">
                    {selectedToken.description}
                  </p>

                  {/* High Velocity Stats Matrix */}
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                    <div className="p-3 rounded-xl bg-surface-card/50 border border-surface-border/60">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Market Cap</div>
                      <div className="text-sm font-extrabold text-white mt-0.5">
                        {formatSol(selectedToken.marketCapSol)}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">
                        ~{formatUsd(selectedToken.marketCapUsd)}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-card/50 border border-surface-border/60">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Curve Liquidity</div>
                      <div className="text-sm font-extrabold text-brand-neon mt-0.5">
                        {selectedToken.solInCurve} SOL
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">
                        {selectedToken.solRequiredToGraduate} SOL to DEX
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-card/50 border border-surface-border/60">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Token Price</div>
                      <div className="text-sm font-extrabold text-white mt-0.5">
                        {selectedToken.priceSol.toFixed(9)}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">
                        ~{formatUsd(selectedToken.priceUsd)}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-card/50 border border-surface-border/60">
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">24h Momentum</div>
                      <div
                        className={`text-sm font-extrabold mt-0.5 flex items-center gap-1 ${
                          selectedToken.priceChange24h >= 0 ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        <TrendingUp size={14} className={selectedToken.priceChange24h < 0 ? "rotate-180" : ""} />
                        {selectedToken.priceChange24h >= 0 ? "+" : ""}
                        {selectedToken.priceChange24h}%
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">High Velocity</div>
                    </div>
                  </div>

                  {/* Rug-Shield Security Audit Card */}
                  <div className="mt-5">
                    <RugShieldAudit token={selectedToken} />
                  </div>
                </div>

                {/* Live Token Feed Grid */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Flame size={16} className="text-orange-400" />
                      Live Bonding Curves ({filteredTokens.length})
                    </h3>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      Click any token to inspect and trade
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredTokens.map((token) => (
                      <TokenCard
                        key={token.id}
                        token={token}
                        isSelected={selectedToken.id === token.id}
                        onSelect={setSelectedToken}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sidebar (4 cols): Quick Trade & Position Management */}
              <div className="lg:col-span-4 space-y-6">
                {/* 1-Thumb Quick Buy Execution Panel */}
                <QuickTradePanel
                  token={selectedToken}
                  walletBalanceSol={walletBalanceSol}
                  onExecuteTrade={handleExecuteTrade}
                />

                {/* Open Positions Drawer */}
                <div className="rounded-2xl border border-surface-border bg-surface p-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-border/80">
                    <div className="flex items-center gap-2">
                      <Layers size={16} className="text-brand-purple" />
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                        Active Positions ({positions.length})
                      </h3>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">Auto TP/SL Active</span>
                  </div>

                  {positions.length === 0 ? (
                    <div className="py-8 text-center text-zinc-500 text-xs font-mono">
                      <p>No active positions.</p>
                      <p className="text-[11px] mt-1 text-zinc-600">
                        Use Quick Buy above to test 1-tap trade execution.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-3 space-y-2.5">
                      {positions.map((pos) => (
                        <div
                          key={pos.id}
                          className="rounded-xl border border-surface-border/80 bg-surface-card p-3 font-mono text-xs flex items-center justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">${pos.tokenTicker}</span>
                              <span className="text-[10px] text-zinc-400">
                                {pos.investedSol.toFixed(2)} SOL
                              </span>
                            </div>
                            <div className="text-[10px] text-zinc-500 mt-0.5">
                              {pos.autoTakeProfit && (
                                <span className="text-emerald-400 mr-2">TP: +{pos.autoTakeProfit}%</span>
                              )}
                              {pos.autoStopLoss && (
                                <span className="text-rose-400">SL: -{pos.autoStopLoss}%</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold text-xs">+{pos.pnlPercent}%</span>
                            <button
                              onClick={() => handleClosePosition(pos.id)}
                              className="px-2 py-1 rounded bg-surface border border-surface-border hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40 text-[10px] font-bold text-zinc-300 transition-colors"
                            >
                              Exit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Design Philosophy Callout */}
                <div className="rounded-2xl border border-brand-purple/30 bg-brand-purple/5 p-4 text-xs">
                  <div className="flex items-center gap-2 text-brand-purple font-bold mb-1">
                    <Sparkles size={15} />
                    <span>Why PumpPro Wins</span>
                  </div>
                  <p className="text-zinc-300 text-[11px] leading-relaxed">
                    Pump.fun generates millions in fees but suffers from high churn due to rugpulls and friction.
                    PumpPro solves this through on-chain transparency, thumb-driven execution, and zero-loss automated exit stops.
                  </p>
                  <button
                    onClick={() => setActiveView("teardown")}
                    className="mt-3 text-[11px] font-bold text-brand-neon hover:underline flex items-center gap-1 font-mono"
                  >
                    Explore UX Case Study Teardown →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-border bg-surface/50 py-6 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            Built with ❤️ on Solana for Superteam Earn • Design Submission 2026
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <button onClick={() => setActiveView("teardown")} className="hover:text-white">
              UX Case Study
            </button>
            <span>•</span>
            <button onClick={() => setActiveView("prototype")} className="hover:text-white">
              Interactive Prototype
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
