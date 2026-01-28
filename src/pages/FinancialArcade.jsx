import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinancialArcade.css';
import TrainingStatsCard from '../components/arcade/TrainingStatsCard';
import FinQuestPanel from '../components/arcade/FinQuestPanel';
import FinanceFrenzyPanel from '../components/arcade/FinanceFrenzyPanel';

export const FinancialArcade = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({
    finquestLevelCompleted: 0,
    finquestXP: 0,
    financefrenzySessions: 0,
    totalScore: 0,
    lastPlayed: null,
  });

  const [gameHistory, setGameHistory] = useState([]);

  // Load game state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('arcadeGameState');
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }
    const savedHistory = localStorage.getItem('gameHistory');
    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save game state to localStorage
  useEffect(() => {
    localStorage.setItem('arcadeGameState', JSON.stringify(gameState));
  }, [gameState]);

  const launchGame = (gameName) => {
    if (gameName === 'finquest') {
      navigate('/arcade/FinQUEST');
    } else if (gameName === 'financefrenzy') {
      navigate('/arcade/FinanceFrenzy');
    }
  };

  return (
    <div className="financial-arcade-page">
      {/* Arcade Header */}
      <div className="arcade-header-banner">
        <div className="arcade-title-container">
          <h1 className="arcade-title">🎮 FINANCIAL ARCADE</h1>
          <p className="arcade-subtitle">Master Your Money. Level Up Your Skills.</p>
        </div>
        <button className="btn-back-to-dashboard" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="arcade-main-content">
        {/* Left Side - Training Stats */}
        <aside className="arcade-sidebar">
          <TrainingStatsCard gameState={gameState} gameHistory={gameHistory} />
        </aside>

        {/* Right Side - Games */}
        <main className="arcade-games-section">
          <div className="games-container">
            <FinQuestPanel 
              onPlay={() => launchGame('finquest')}
              levelCompleted={gameState.finquestLevelCompleted}
              xp={gameState.finquestXP}
            />
            <FinanceFrenzyPanel 
              onPlay={() => launchGame('financefrenzy')}
              sessions={gameState.financefrenzySessions}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default FinancialArcade;
