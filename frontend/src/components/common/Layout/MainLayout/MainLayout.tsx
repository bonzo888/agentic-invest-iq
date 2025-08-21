import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import './MainLayout.css';

export const MainLayout: React.FC = () => {
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);

  return (
    <div className="main-layout">
      <Header />
      <Sidebar />
      <main className={`main-content ${sidebarCollapsed ? 'main-content--expanded' : ''}`}>
        <div className="main-content-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
};