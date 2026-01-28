import React from 'react';

const TrainingStatsCard = ({ gameState, gameHistory }) => {
  const calculateBehaviorScore = () => {
    const levelBonus = (gameState.finquestLevelCompleted || 0) * 10;
    const xpBonus = Math.min((gameState.finquestXP || 0) / 50, 30);
    const sessionBonus = Math.min((gameState.financefrenzySessions || 0) * 5, 20);
    const total = Math.min(levelBonus + xpBonus + sessionBonus, 100);
    return Math.round(total);
  };

  const behaviorScore = calculateBehaviorScore();
  const scorePercentage = (behaviorScore / 100) * 360;

  return (
    <div className="training-stats-card">
      <h3 className="stats-title">📊 Training Stats</h3>
      
      <div className="behavior-score-container">
        <div className="score-circle" style={{ '--score-percentage': `${scorePercentage}deg` }} data-score={behaviorScore}>
        </div>
        <div className="score-label">Behavior Readiness</div>
      </div>

      <div className="stats-list">
        <div className="stat-item">
          <span className="stat-name">🎮 FinQUEST Level</span>
          <span className="stat-number">{gameState.finquestLevelCompleted || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-name">⚡ XP Earned</span>
          <span className="stat-number">{gameState.finquestXP || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-name">🎯 FF Sessions</span>
          <span className="stat-number">{gameState.financefrenzySessions || 0}</span>
        </div>
        <div className="stat-item">
          <span className="stat-name">📈 Total Games</span>
          <span className="stat-number">{gameHistory.length}</span>
        </div>
      </div>

      {gameHistory.length > 0 && (
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255, 107, 107, 0.1)' }}>
          <h4 style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 600 }}>
            Recent Sessions
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {gameHistory.slice(0, 3).map((session) => (
              <div key={session.id} style={{ fontSize: '11px', color: '#aaa' }}>
                <span>{session.game === 'finquest' ? '🎮' : '💰'} {session.game}</span>
                <span style={{ float: 'right' }}>{new Date(session.timestamp).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingStatsCard;
