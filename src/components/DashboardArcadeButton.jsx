// Optional: Add this button to Dashboard.jsx to link to the arcade

import { useNavigate } from 'react-router-dom';

const DashboardArcadeButton = () => {
  const navigate = useNavigate();
  
  return (
    <button 
      className="btn-arcade-access"
      onClick={() => navigate('/arcade')}
      style={{
        padding: '12px 24px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #ff6b6b, #ffa500)',
        border: 'none',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-3px)';
        e.target.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      🎮 Play Financial Arcade
    </button>
  );
};

export default DashboardArcadeButton;

