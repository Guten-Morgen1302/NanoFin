import React from 'react';
import './LanguagePreference.css';

export const LanguagePreference = ({ language, onLanguageChange, children }) => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="language-section">
          <h3>🌐 Language Preference</h3>
          <p className="subtitle">Choose Your Preferred Language</p>
          <select 
            value={language} 
            onChange={(e) => onLanguageChange(e.target.value)}
            className="language-select"
          >
            <option value="english">English</option>
            <option value="hindi">हिंदी</option>
            <option value="tamil">தமிழ்</option>
            <option value="kannada">ಕನ್ನಡ</option>
            <option value="telugu">తెలుగు</option>
          </select>
        </div>

        <div className="tips-section">
          <h3>💡 Financial Management Tips</h3>
          <ul className="tips-list">
            <li>Maintain consistent income streams</li>
            <li>Control and minimize unnecessary expenses</li>
            <li>Build an emergency fund</li>
            <li>Invest in business growth</li>
            <li>Regularly review financial performance</li>
          </ul>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default LanguagePreference;
