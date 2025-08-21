import type { BaseEntity } from './common.types';

export interface Agent extends BaseEntity {
  name: string;
  type: 'financial_analyzer' | 'trading_agent';
  status: 'active' | 'inactive' | 'error';
  lastRun: string;
  config: AgentConfig;
  performance: AgentPerformance;
}

export interface AgentRecommendation extends BaseEntity {
  agentId: string;
  symbol: string;
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  reasoning: string;
  targetPrice?: number;
  stopLoss?: number;
  positionSize?: number;
  priority: 'low' | 'medium' | 'high';
}

export interface AgentConfig {
  riskTolerance: number;
  maxPositionSize: number;
  sectors: string[];
  tradingHours: {
    start: string;
    end: string;
  };
  analysisFrequency: number;
}

export interface AgentPerformance {
  totalRecommendations: number;
  successfulTrades: number;
  successRate: number;
  totalReturn: number;
  averageReturn: number;
  sharpeRatio: number;
}

export interface AgentLog extends BaseEntity {
  agentId: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  metadata?: Record<string, any>;
}