import type { BaseEntity } from './common.types';

export interface Position extends BaseEntity {
  symbol: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  sector: string;
  assetType: 'stock' | 'etf' | 'crypto';
}

export interface Portfolio extends BaseEntity {
  userId: string;
  totalValue: number;
  totalCost: number;
  totalPnL: number;
  totalPnLPercent: number;
  dayPnL: number;
  dayPnLPercent: number;
  cashBalance: number;
  positions: Position[];
  allocation: AllocationData[];
}

export interface AllocationData {
  category: string;
  value: number;
  percentage: number;
  color: string;
}

export interface PerformanceData {
  date: string;
  totalValue: number;
  dayPnL: number;
  dayPnLPercent: number;
}