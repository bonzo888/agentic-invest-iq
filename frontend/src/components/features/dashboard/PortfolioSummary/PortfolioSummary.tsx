import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { usePortfolio } from '../../../../hooks/usePortfolio';
import { Card, CardHeader, CardContent } from '../../../common/Card';
import { Loading } from '../../../common/Loading';
import './PortfolioSummary.css';

interface MetricCardProps {
  label: string;
  value: string;
  change?: number;
  changePercent?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  changePercent,
  icon,
  trend = 'neutral',
}) => {
  const formatChange = (value: number) => {
    const prefix = value >= 0 ? '+' : '';
    return `${prefix}${value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    })}`;
  };

  const formatPercent = (value: number) => {
    const prefix = value >= 0 ? '+' : '';
    return `${prefix}${value.toFixed(2)}%`;
  };

  return (
    <div className="metric-card">
      <div className="metric-card-header">
        <div className="metric-icon">{icon}</div>
        <span className="metric-label">{label}</span>
      </div>
      
      <div className="metric-value">{value}</div>
      
      {change !== undefined && changePercent !== undefined && (
        <div className={`metric-change metric-change--${trend}`}>
          {trend === 'up' && <TrendingUp size={16} />}
          {trend === 'down' && <TrendingDown size={16} />}
          <span>
            {formatChange(change)} ({formatPercent(changePercent)})
          </span>
        </div>
      )}
    </div>
  );
};

export const PortfolioSummary: React.FC = () => {
  const { portfolio, loading, error } = usePortfolio();

  if (loading) {
    return (
      <Card>
        <Loading message="Loading portfolio..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="error-message">
          <p>Error loading portfolio: {error}</p>
        </div>
      </Card>
    );
  }

  if (!portfolio) {
    return (
      <Card>
        <div className="empty-state">
          <p>No portfolio data available</p>
        </div>
      </Card>
    );
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  };

  return (
    <Card className="portfolio-summary">
      <CardHeader>
        <h2>Portfolio Summary</h2>
        <span className="last-updated">
          Last updated: {new Date().toLocaleTimeString()}
        </span>
      </CardHeader>

      <CardContent>
        <div className="metrics-grid">
          <MetricCard
            label="Total Value"
            value={formatCurrency(portfolio.totalValue)}
            change={portfolio.totalPnL}
            changePercent={portfolio.totalPnLPercent}
            icon={<DollarSign size={24} />}
            trend={portfolio.totalPnL >= 0 ? 'up' : 'down'}
          />
          
          <MetricCard
            label="Day P&L"
            value={formatCurrency(portfolio.dayPnL)}
            change={portfolio.dayPnL}
            changePercent={portfolio.dayPnLPercent}
            icon={portfolio.dayPnL >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            trend={portfolio.dayPnL >= 0 ? 'up' : 'down'}
          />
          
          <MetricCard
            label="Cash Balance"
            value={formatCurrency(portfolio.cashBalance)}
            icon={<DollarSign size={24} />}
          />
          
          <MetricCard
            label="Positions"
            value={portfolio.positions.length.toString()}
            icon={<PieChart size={24} />}
          />
        </div>

        <div className="allocation-section">
          <h3>Asset Allocation</h3>
          <div className="allocation-chart">
            {portfolio.allocation.map((item, index) => (
              <div key={index} className="allocation-item">
                <div className="allocation-bar">
                  <div
                    className="allocation-fill"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <div className="allocation-details">
                  <span className="allocation-category">{item.category}</span>
                  <span className="allocation-value">
                    {formatCurrency(item.value)} ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};