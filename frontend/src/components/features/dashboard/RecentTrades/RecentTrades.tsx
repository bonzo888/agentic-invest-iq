import React from 'react';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../../common/Card';
import './RecentTrades.css';

interface Trade {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  timestamp: string;
  totalValue: number;
}

// Dummy data for recent trades
const DUMMY_TRADES: Trade[] = [
  {
    id: '1',
    symbol: 'AAPL',
    side: 'buy',
    quantity: 50,
    price: 175.50,
    timestamp: '2024-01-15T14:30:00Z',
    totalValue: 8775.00,
  },
  {
    id: '2',
    symbol: 'GOOGL',
    side: 'sell',
    quantity: 25,
    price: 140.25,
    timestamp: '2024-01-15T13:45:00Z',
    totalValue: 3506.25,
  },
  {
    id: '3',
    symbol: 'SPY',
    side: 'buy',
    quantity: 10,
    price: 420.75,
    timestamp: '2024-01-15T11:20:00Z',
    totalValue: 4207.50,
  },
  {
    id: '4',
    symbol: 'TSLA',
    side: 'sell',
    quantity: 15,
    price: 185.30,
    timestamp: '2024-01-15T10:15:00Z',
    totalValue: 2779.50,
  },
];

export const RecentTrades: React.FC = () => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="recent-trades">
      <CardHeader>
        <h3>Recent Trades</h3>
        <span className="trades-count">{DUMMY_TRADES.length} trades today</span>
      </CardHeader>

      <CardContent>
        <div className="trades-list">
          {DUMMY_TRADES.map((trade) => (
            <div key={trade.id} className="trade-item">
              <div className="trade-main">
                <div className="trade-symbol">
                  <span className="symbol">{trade.symbol}</span>
                  <div className={`trade-side trade-side--${trade.side}`}>
                    {trade.side === 'buy' ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                    <span>{trade.side.toUpperCase()}</span>
                  </div>
                </div>
                
                <div className="trade-details">
                  <span className="trade-quantity">{trade.quantity} shares</span>
                  <span className="trade-price">@ {formatCurrency(trade.price)}</span>
                </div>
              </div>
              
              <div className="trade-meta">
                <div className="trade-value">{formatCurrency(trade.totalValue)}</div>
                <div className="trade-time">
                  <Clock size={14} />
                  <span>{formatTime(trade.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="trades-footer">
          <button className="view-all-btn">
            View All Trades
          </button>
        </div>
      </CardContent>
    </Card>
  );
};