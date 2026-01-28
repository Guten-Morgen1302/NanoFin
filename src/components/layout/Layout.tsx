import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Layout.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={`layout-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <motion.main 
          className="layout-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;
