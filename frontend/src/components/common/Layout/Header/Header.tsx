import React from 'react';
import { Menu, Bell, User, LogOut, TrendingUp } from 'lucide-react';
import { useAuth } from '../../../../hooks/useAuth';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { toggleSidebar } from '../../../../store/uiSlice';
import { Button } from '../../Button';
import './Header.css';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, logout } = useAuth();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="header">
      <div className="header-left">
        <Button
          variant="secondary"
          size="medium"
          onClick={handleToggleSidebar}
          icon={<Menu size={20} />}
          className="header-menu-btn"
        />
        
        <div className="header-logo">
          <TrendingUp className="logo-icon" />
          <span className="logo-text">InvestIQ</span>
        </div>
      </div>

      <div className="header-center">
        <div className="header-breadcrumb">
          <span>Dashboard</span>
        </div>
      </div>

      <div className="header-right">
        <div className="header-notifications">
          <Button
            variant="secondary"
            size="medium"
            icon={<Bell size={20} />}
            className="header-notification-btn"
          />
          <span className="notification-badge">3</span>
        </div>

        <div className="header-user">
          <div className="user-info">
            <span className="user-name">{user?.firstName} {user?.lastName}</span>
            <span className="user-email">{user?.email}</span>
          </div>
          
          <div className="user-avatar">
            <User size={20} />
          </div>
          
          <Button
            variant="secondary"
            size="medium"
            onClick={handleLogout}
            icon={<LogOut size={16} />}
            className="header-logout-btn"
          />
        </div>
      </div>
    </header>
  );
};