import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import "../pages/FinQuestGame.css";

export function FinQuestGame() {
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const sessionStartRef = useRef(Date.now());

  // Handle back to arcade
  const goBack = () => {
    // Record session
    const duration = Math.round((Date.now() - sessionStartRef.current) / 1000);
    const existingHistory = JSON.parse(localStorage.getItem("gameHistory") || "[]");
    existingHistory.push({
      id: Date.now(),
      game: "finquest",
      timestamp: new Date().toISOString(),
      duration: duration,
      score: 0,
    });
    localStorage.setItem("gameHistory", JSON.stringify(existingHistory.slice(-10)));

    navigate("/arcade");
  };

  // ESC key handler to go back
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        goBack();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="game-page-container finquest-game-page">
      {/* Header with back button */}
      <div className="game-page-header">
        <div className="game-header-content">
          <h1>🌳 FinQUEST</h1>
          <p className="game-subtitle">Financial Quest Simulation</p>
        </div>
        <button className="btn-back" onClick={goBack}>
          ← Back to Arcade
        </button>
      </div>

      {/* Game iframe - full screen */}
      <div className="game-page-content">
        <iframe
          ref={iframeRef}
          src="/games/FinQUEST-main/index.html"
          title="FinQUEST Game"
          className="game-iframe"
        />
      </div>

      {/* ESC hint */}
      <div className="game-hint">Press ESC to exit game</div>
    </div>
  );
}
