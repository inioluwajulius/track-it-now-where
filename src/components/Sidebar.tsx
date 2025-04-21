
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Truck, Route, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

type MenuItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-md transition-all",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-sidebar p-4 shadow-lg z-10 flex flex-col">
      <div className="mb-8 mt-4">
        <Link to="/" className="flex items-center gap-2">
          <Truck size={28} className="text-white" />
          <span className="text-xl font-bold text-white">Track-It-Now</span>
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <MenuItem 
          to="/" 
          icon={<MapPin />} 
          label="Dashboard" 
          isActive={currentPath === '/'} 
        />
        <MenuItem 
          to="/tracking" 
          icon={<Route />} 
          label="Track Shipment" 
          isActive={currentPath === '/tracking' || currentPath.startsWith('/shipment/')} 
        />
        <MenuItem 
          to="/reports" 
          icon={<Navigation />} 
          label="Reports" 
          isActive={currentPath === '/reports'} 
        />
      </div>
    </div>
  );
};
