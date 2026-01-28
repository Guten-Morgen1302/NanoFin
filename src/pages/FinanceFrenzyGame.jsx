import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../pages/FinanceFrenzyGame.css";

export function FinanceFrenzyGame() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        navigate("/arcade");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const launchGame = () => {
    alert("FinanceFrenzy is launching...\n\nA new window will open with the game.\n\nIf it doesn't open, run this in your terminal:\n\ncd Games\\FinanceFrenzy-master && python app.py");
  };

  return (
    <div className="game-page-container financefrenzy-game-page">
      <div className="game-page-header">
        <div className="game-header-content">
          <h1>💰 FinanceFrenzy</h1>
          <p className="game-subtitle">Financial Scenario Simulator - Desktop Edition</p>
        </div>
        <button className="btn-back" onClick={() => navigate("/arcade")}>
          ← Back to Arcade
        </button>
      </div>

      <div className="game-page-content">
        <div className="desktop-app-container">
          <div className="app-icon">💰</div>
          <h2>FinanceFrenzy</h2>
          <p>Advanced Stock Trading & Portfolio Management Simulator</p>
          
          <div className="features-box">
            <h3>🎮 Game Features</h3>
            <ul>
              <li>Real-time stock market simulation</li>
              <li>Dynamic portfolio management</li>
              <li>Market volatility and trends</li>
              <li>Advanced trading strategies</li>
              <li>Comprehensive performance analytics</li>
            </ul>
          </div>

          <div className="launch-box">
            <h3>🚀 How to Play</h3>
            <p>Click the button below to launch the game, or run this command in your terminal:</p>
            <code>cd Games\FinanceFrenzy-master && python app.py</code>
          </div>

          <button className="btn-launch" onClick={launchGame}>
            🎮 Launch FinanceFrenzy
          </button>
        </div>
      </div>

      <div className="game-hint">Press ESC to go back to arcade</div>
    </div>
  );
}
