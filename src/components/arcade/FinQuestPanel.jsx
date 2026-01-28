import React from 'react';

const FinQuestPanel = ({ onPlay, levelCompleted, xp }) => {
  return (
    <div className="game-panel">
      <span className="game-icon">🌳</span>
      <h3>FinQUEST</h3>
      <p className="game-type">Interactive Learning Game</p>
      
      <p className="game-description">
        Master 8 levels of financial literacy: budgeting, savings, investments, taxes, debt, retirement, real estate, and wealth building.
      </p>

      <div className="game-stats">
        <div className="stat-box">
          <div className="stat-label">Current Level</div>
          <div className="stat-value">{levelCompleted || 1}/8</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Experience Points</div>
          <div className="stat-value">{xp || 0} XP</div>
        </div>
      </div>

      <button className="btn-play" onClick={onPlay}>
        ▶️ Play Now
      </button>
    </div>
  );
};

export default FinQuestPanel;
