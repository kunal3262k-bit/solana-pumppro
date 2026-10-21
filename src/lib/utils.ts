import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSol(val: number, decimals: number = 2): string {
  if (val >= 1000) {
    return `${(val / 1000).toFixed(1)}k SOL`;
  }
  return `${val.toFixed(decimals)} SOL`;
}

export function formatUsd(val: number): string {
  if (val >= 1_000_000) {
    return `$${(val / 1_000_000).toFixed(2)}M`;
  }
  if (val >= 1000) {
    return `$${(val / 1000).toFixed(1)}k`;
  }
  if (val < 0.001) {
    return `$${val.toFixed(7)}`;
  }
  if (val < 0.01) {
    return `$${val.toFixed(4)}`;
  }
  return `$${val.toFixed(2)}`;
}

export function formatAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
}

export const truncateAddress = formatAddress;
