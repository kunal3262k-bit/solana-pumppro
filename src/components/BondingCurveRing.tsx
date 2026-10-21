"use client";

import React from "react";
import { Zap } from "lucide-react";

interface BondingCurveRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showDetails?: boolean;
}

export const BondingCurveRing: React.FC<BondingCurveRingProps> = ({
  percentage,
  size = 64,
  strokeWidth = 6,
  showDetails = false,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const isGraduating = percentage >= 85;

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1f2333"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isGraduating ? "#00ff88" : "#8b5cf6"}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold font-mono tracking-tight text-white">
            {percentage}%
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-zinc-400">Raydium Curve</span>
            {isGraduating && (
              <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold animate-pulse">
                <Zap size={10} /> Graduating Soon
              </span>
            )}
          </div>
          <span className="text-[11px] text-zinc-500 font-mono">
            {percentage}% completed towards Raydium DEX pool
          </span>
        </div>
      )}
    </div>
  );
};
