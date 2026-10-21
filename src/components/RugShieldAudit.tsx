"use client";

import React from "react";
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Token } from "@/lib/types";

interface RugShieldAuditProps {
  token: Token;
}

export const RugShieldAudit: React.FC<RugShieldAuditProps> = ({ token }) => {
  const isSafe = token.rugShieldScore >= 80;
  const isMedium = token.rugShieldScore >= 60 && token.rugShieldScore < 80;

  return (
    <div className="rounded-xl border border-surface-border bg-surface-card/60 p-3.5 backdrop-blur-md">
      {/* Header with Safety Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-surface-border/60">
        <div className="flex items-center gap-2">
          {isSafe ? (
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck size={18} />
            </div>
          ) : isMedium ? (
            <div className="p-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              <AlertTriangle size={18} />
            </div>
          ) : (
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShieldAlert size={18} />
            </div>
          )}
          <div>
            <h4 className="text-xs font-semibold text-white tracking-wide">Rug-Shield AI Audit</h4>
            <p className="text-[10px] text-zinc-400 font-mono">Real-time on-chain safety verification</p>
          </div>
        </div>

        {/* Score Pill */}
        <div className="text-right">
          <div
            className={`text-sm font-extrabold font-mono ${
              isSafe ? "text-emerald-400" : isMedium ? "text-yellow-400" : "text-rose-400"
            }`}
          >
            {token.rugShieldScore} / 100
          </div>
          <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500">
            {isSafe ? "Low Risk" : isMedium ? "Moderate Risk" : "High Risk"}
          </span>
        </div>
      </div>

      {/* Grid of 4 Core Safety Vectors */}
      <div className="grid grid-cols-2 gap-2 pt-3 text-[11px]">
        {/* Vector 1: Dev Holdings */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-surface/50 border border-surface-border/40">
          <span className="text-zinc-400">Dev Sold</span>
          <div className="flex items-center gap-1 font-medium">
            {token.devHasSold ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={12} /> Yes ({token.devHoldingPercent}%)
              </span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1">
                <XCircle size={12} /> Holds {token.devHoldingPercent}%
              </span>
            )}
          </div>
        </div>

        {/* Vector 2: Top 10 Concentration */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-surface/50 border border-surface-border/40">
          <span className="text-zinc-400">Top 10 Supply</span>
          <span
            className={`font-mono font-bold ${
              token.top10HoldingPercent < 15
                ? "text-emerald-400"
                : token.top10HoldingPercent < 25
                ? "text-yellow-400"
                : "text-rose-400"
            }`}
          >
            {token.top10HoldingPercent}%
          </span>
        </div>

        {/* Vector 3: Mint Authority */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-surface/50 border border-surface-border/40">
          <span className="text-zinc-400">Mint Auth</span>
          {token.mintAuthRevoked ? (
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <CheckCircle2 size={12} /> Revoked
            </span>
          ) : (
            <span className="text-rose-400 flex items-center gap-1 font-medium">
              <XCircle size={12} /> Active
            </span>
          )}
        </div>

        {/* Vector 4: Freeze Authority */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-surface/50 border border-surface-border/40">
          <span className="text-zinc-400">Freeze Auth</span>
          {token.freezeAuthRevoked ? (
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <CheckCircle2 size={12} /> Revoked
            </span>
          ) : (
            <span className="text-rose-400 flex items-center gap-1 font-medium">
              <XCircle size={12} /> Active
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
