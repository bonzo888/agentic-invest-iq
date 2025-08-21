import React from 'react';
import { PortfolioSummary } from '../../components/features/dashboard/PortfolioSummary';
import { RecentTrades } from '../../components/features/dashboard/RecentTrades';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your portfolio overview.</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-row">
          <div className="dashboard-col dashboard-col--full">
            <PortfolioSummary />
          </div>
        </div>

        <div className="dashboard-row">
          <div className="dashboard-col dashboard-col--half">
            <RecentTrades />
          </div>
          
          <div className="dashboard-col dashboard-col--half">
            <div className="coming-soon-card">
              <h3>Performance Chart</h3>
              <p>Portfolio performance visualization coming soon...</p>
            </div>
          </div>
        </div>

        <div className="dashboard-row">
          <div className="dashboard-col dashboard-col--third">
            <div className="coming-soon-card">
              <h3>Market Overview</h3>
              <p>Market data and indices coming soon...</p>
            </div>
          </div>
          
          <div className="dashboard-col dashboard-col--third">
            <div className="coming-soon-card">
              <h3>AI Recommendations</h3>
              <p>Agent recommendations coming soon...</p>
            </div>
          </div>
          
          <div className="dashboard-col dashboard-col--third">
            <div className="coming-soon-card">
              <h3>Watchlist</h3>
              <p>Stock watchlist coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};