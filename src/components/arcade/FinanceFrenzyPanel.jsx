import React, { useState } from 'react';

const FinanceFrenzyPanel = ({ onPlay, sessions }) => {
  return (
    <div className="game-panel">
      <span className="game-icon">💰</span>
      <h3>FinanceFrenzy</h3>
      <p className="game-type">Scenario Simulator</p>
      
      <p className="game-description">
        Test your financial decision-making against real-world shocks: job loss, medical emergencies, market crashes, and unexpected expenses.
      </p>

      <div className="game-stats">
        <div className="stat-box">
          <div className="stat-label">Sessions Played</div>
          <div className="stat-value">{sessions || 0}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Difficulty</div>
          <div className="stat-value">Hard 🔥</div>
        </div>
      </div>

      <button className="btn-play" onClick={onPlay}>
        ▶️ Play Now
      </button>
    </div>
  );
};

export default FinanceFrenzyPanel;
