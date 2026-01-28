import React from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import './Topbar.css';

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { user } = useUser();

  return (
    <motion.header 
      className="topbar"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="topbar-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          <span className="hamburger"></span>
        </button>
      </div>

      <div className="topbar-center">
        <motion.h2 
          className="topbar-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome back, {user?.firstName || 'User'}! 👋
        </motion.h2>
      </div>

      <div className="topbar-right">
        <motion.div 
          className="notification-bell"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          🔔
          <span className="notification-badge">3</span>
        </motion.div>
        
        <div className="user-menu">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </motion.header>
  );
};

export default Topbar;
