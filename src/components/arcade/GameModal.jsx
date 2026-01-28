import React, { useEffect, useRef, useState } from 'react';

const GameModal = ({ game, onClose, onGameComplete }) => {
  const modalRef = useRef(null);
  const [sessionStart] = useState(Date.now());
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getGameUrl = () => {
    switch (game) {
      case 'finquest':
        return '/games/FinQUEST-main/index.html';
      case 'financefrenzy':
        return '/games/FinanceFrenzy-main/index.html';
      default:
        return '';
    }
  };

  const getGameTitle = () => {
    switch (game) {
      case 'finquest':
        return '🌳 FinQUEST - Financial Literacy Game';
      case 'financefrenzy':
        return '💰 FinanceFrenzy - Scenario Simulator';
      default:
        return 'Game';
    }
  };

  const handleGameExit = () => {
    const duration = (Date.now() - sessionStart) / 1000; // duration in seconds
    onGameComplete({
      duration,
      score: 0,
      level: 1,
      xp: 50,
    });
  };

  return (
    <div className="game-modal-overlay" onClick={handleBackdropClick}>
      <div className="game-modal-content" ref={modalRef}>
        <div className="modal-header">
          <h2 className="modal-title">{getGameTitle()}</h2>
          <button className="modal-close-btn" onClick={handleGameExit} title="Exit Game (ESC)">
            ✕
          </button>
        </div>
        <div className="modal-body">
          <iframe
            ref={iframeRef}
            src={getGameUrl()}
            className="game-iframe"
            title={getGameTitle()}
            frameBorder="0"
            allow="fullscreen"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
