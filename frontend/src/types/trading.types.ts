import type { BaseEntity } from './common.types';

export interface Order extends BaseEntity {
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop_loss';
  quantity: number;
  price?: number;
  stopPrice?: number;
  status: 'pending' | 'filled' | 'cancelled' | 'rejected';
  filledQuantity: number;
  averageFillPrice: number;
  fees: number;
  agentId?: string;
}

export interface Trade extends BaseEntity {
  orderId: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  fees: number;
  totalValue: number;
  pnl?: number;
  pnlPercent?: number;
}

export interface OrderFormData {
  symbol: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop_loss';
  quantity: number;
  price?: number;
  stopPrice?: number;
}