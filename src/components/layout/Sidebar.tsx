import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', icon: '📊', path: '/dashboard', color: '#00d4ff' },
    { label: 'Financial Arcade', icon: '🎮', path: '/arcade', color: '#ff6b35' },
    { label: 'Profile', icon: '👤', path: '/profile', color: '#7c3aed' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <motion.div 
          className="sidebar-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}
      <motion.aside 
        className={`sidebar ${isOpen ? 'open' : 'closed'}`}
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="sidebar-header">
          <motion.div 
            className="sidebar-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="logo-icon">💳</span>
            <span className="logo-text">NanoFin</span>
          </motion.div>
          <button 
            className="sidebar-close"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
              style={{
                borderLeftColor: location.pathname === item.path ? item.color : 'transparent',
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p className="sidebar-text">© 2026 NanoFin. All rights reserved.</p>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
