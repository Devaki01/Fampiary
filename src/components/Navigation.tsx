import React from 'react';
import { Hexagon, Search, Radio, User, GitGraph } from 'lucide-react';
import './Navigation.css';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const navItems = [
    { id: 'hive', icon: Hexagon, label: 'Hive' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'tree', icon: GitGraph, label: 'Tree' },
    { id: 'swarm', icon: Radio, label: 'Swarm' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="navigation glass">
      <div className="nav-brand">
        <Hexagon className="brand-icon" />
        <h1>Fampiary</h1>
      </div>
      <div className="nav-items">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-button ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
