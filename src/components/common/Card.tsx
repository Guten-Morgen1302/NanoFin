import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

interface CardProps {
  title?: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  gradient?: boolean;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  icon,
  children,
  className = '',
  onClick,
  gradient = false,
  hoverable = true,
}) => {
  return (
    <motion.div
      className={`card ${className} ${gradient ? 'gradient' : ''} ${hoverable ? 'hoverable' : ''}`}
      onClick={onClick}
      whileHover={hoverable ? { translateY: -5 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {(title || icon) && (
        <div className="card-header">
          {icon && <span className="card-icon">{icon}</span>}
          {title && <h3 className="card-title">{title}</h3>}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;
