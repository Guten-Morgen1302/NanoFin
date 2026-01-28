import React from 'react';
import './EntrepreneurProfile.css';

export const EntrepreneurProfile = ({ data }) => {
  const {
    name,
    mobile,
    kycStatus,
    nanoScore,
    scoreBreakdown
  } = data;

  const scorePercentage = (score, max) => (score / max) * 100;

  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50'; // green
    if (score >= 60) return '#FFC107'; // amber
    return '#f44336'; // red
  };

  return (
    <div className="entrepreneur-profile">
      <h2>
        <span className="icon">📊</span> Entrepreneur Profile
      </h2>

      <div className="profile-info">
        <div className="info-row">
          <label>Name:</label>
          <span>{name}</span>
        </div>
        <div className="info-row">
          <label>Mobile:</label>
          <span>{mobile}</span>
        </div>
        <div className="info-row">
          <label>KYC Status:</label>
          <span className="kyc-status compliant">{kycStatus}</span>
        </div>
      </div>

      <div className="score-section">
        <div className="score-card">
          <label>Nano Entrepreneur Score</label>
          <div 
            className="score-display"
            style={{ color: getScoreColor(nanoScore) }}
          >
            {nanoScore.toFixed(2)}/100
          </div>
        </div>

        <div className="breakdown-section">
          <h3>Score Breakdown:</h3>
          
          <div className="breakdown-item">
            <label>Income Stability: {scoreBreakdown['Income Stability'].toFixed(2)}</label>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{
                  width: `${scorePercentage(scoreBreakdown['Income Stability'], 40)}%`,
                  backgroundColor: getScoreColor(scoreBreakdown['Income Stability'])
                }}
              ></div>
            </div>
          </div>

          <div className="breakdown-item">
            <label>Business Resilience: {scoreBreakdown['Business Resilience'].toFixed(2)}</label>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{
                  width: `${scorePercentage(scoreBreakdown['Business Resilience'], 30)}%`,
                  backgroundColor: getScoreColor(scoreBreakdown['Business Resilience'])
                }}
              ></div>
            </div>
          </div>

          <div className="breakdown-item">
            <label>Transaction Discipline: {scoreBreakdown['Transaction Discipline'].toFixed(2)}</label>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{
                  width: `${scorePercentage(scoreBreakdown['Transaction Discipline'], 20)}%`,
                  backgroundColor: getScoreColor(scoreBreakdown['Transaction Discipline'])
                }}
              ></div>
            </div>
          </div>

          <div className="breakdown-item">
            <label>Growth Potential: {scoreBreakdown['Growth Potential'].toFixed(2)}</label>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{
                  width: `${scorePercentage(scoreBreakdown['Growth Potential'], 10)}%`,
                  backgroundColor: getScoreColor(scoreBreakdown['Growth Potential'])
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntrepreneurProfile;
