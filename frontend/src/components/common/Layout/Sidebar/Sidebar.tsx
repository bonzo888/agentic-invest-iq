import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PieChart, 
  TrendingUp, 
  Bot, 
  Settings,
  BarChart3,
  Wallet,
  Activity
} from 'lucide-react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import './Sidebar.css';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Portfolio',
    href: '/portfolio',
    icon: PieChart,
  },
  {
    name: 'Trading',
    href: '/trading',
    icon: TrendingUp,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Agents',
    href: '/agents',
    icon: Bot,
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: Wallet,
  },
  {
    name: 'Performance',
    href: '/performance',
    icon: Activity,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'sidebar--collapsed' : ''}`}>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name} className="sidebar-menu-item">
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`
                  }
                >
                  <Icon className="sidebar-icon" size={20} />
                  {!sidebarCollapsed && (
                    <span className="sidebar-text">{item.name}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {!sidebarCollapsed && (
        <div className="sidebar-footer">
          <div className="sidebar-upgrade">
            <h3>Upgrade to Pro</h3>
            <p>Get advanced features and unlimited trading signals</p>
            <button className="upgrade-btn">
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};