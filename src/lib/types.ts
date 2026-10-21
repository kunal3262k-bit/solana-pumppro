export interface Token {
  id: string;
  name: string;
  ticker: string;
  image: string;
  description: string;
  marketCapSol: number;
  marketCapUsd: number;
  priceSol: number;
  priceUsd: number;
  priceChange24h: number;
  bondingCurvePercent: number;
  solInCurve: number;
  solRequiredToGraduate: number;
  createdTimeAgo: string;
  creatorAddress: string;
  devHoldingPercent: number;
  devHasSold: boolean;
  top10HoldingPercent: number;
  mintAuthRevoked: boolean;
  freezeAuthRevoked: boolean;
  rugShieldScore: number; // 0-100
  holdersCount: number;
  repliesCount: number;
  graduatingSoon?: boolean;
  category: "Trending" | "Graduating" | "New" | "SafePick";
}

export interface Position {
  id: string;
  tokenId: string;
  tokenTicker: string;
  tokenName: string;
  tokenImage: string;
  amountTokens: number;
  investedSol: number;
  currentValueSol: number;
  pnlSol: number;
  pnlPercent: number;
  entryPriceSol: number;
  autoTakeProfit?: number; // e.g. 50 (for +50%)
  autoStopLoss?: number; // e.g. 20 (for -20%)
  createdAt: string;
}

export interface TradeHistoryItem {
  id: string;
  type: "buy" | "sell";
  tokenTicker: string;
  amountSol: number;
  amountTokens: number;
  txHash: string;
  timestamp: string;
}
