import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import Card from '../components/common/Card';
import './ArcadePage.css';

const ArcadePage: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const games = [
    {
      title: 'FinQUEST',
      icon: '📚',
      description: 'Master financial literacy through 8 challenging levels covering budgeting, investments, debt management, taxes, retirement planning, and more.',
      features: ['8 Interactive Levels', 'Real Scenarios', 'Instant Feedback', 'Achievements & Badges'],
      color: '#667eea',
      path: '/arcade/FinQUEST',
    },
    {
      title: 'FinanceFrenzy',
      icon: '💰',
      description: 'Simulate real market conditions and manage your portfolio across different scenarios. Build wealth through strategic trading decisions.',
      features: ['Live Market Data', 'Portfolio Management', 'Risk Analysis', 'Performance Tracking'],
      color: '#ff6b35',
      path: '/arcade/FinanceFrenzy',
    },
  ];

  return (
    <Layout>
      <div className="arcade-page">
        {/* Header */}
        <motion.div
          className="arcade-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>🎮 Financial Arcade</h1>
          <p>Learn money skills while having fun. Play games to improve your financial behavior and score.</p>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          className="games-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {games.map((game) => (
            <motion.div
              key={game.path}
              className="game-card-wrapper"
              variants={itemVariants}
            >
              <Card
                icon={game.icon}
                title={game.title}
                className="game-card"
                hoverable
              >
                <p className="game-description">{game.description}</p>
                
                <div className="game-features">
                  {game.features.map((feature) => (
                    <div key={feature} className="feature-tag">
                      ✓ {feature}
                    </div>
                  ))}
                </div>

                <motion.button
                  className="game-btn"
                  style={{ borderColor: game.color, color: game.color }}
                  whileHover={{ scale: 1.05, backgroundColor: game.color, color: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(game.path)}
                >
                  Play Now 🚀
                </motion.button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="stats-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2>Your Training Progress</h2>

          <div className="stats-grid">
            <Card icon="⭐" title="Training Score">
              <div className="stat-value">750</div>
              <div className="stat-label">out of 1000</div>
              <div className="stat-progress">
                <div className="progress-bar" style={{ width: '75%' }}></div>
              </div>
            </Card>

            <Card icon="🎮" title="Games Played">
              <div className="stat-value">12</div>
              <div className="stat-label">sessions completed</div>
            </Card>

            <Card icon="🏆" title="Achievements">
              <div className="stat-value">5</div>
              <div className="stat-label">badges earned</div>
            </Card>

            <Card icon="📈" title="Improvement">
              <div className="stat-value">+18%</div>
              <div className="stat-label">from last month</div>
            </Card>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          className="recommendations-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2>Recommended Next Steps</h2>

          <Card className="recommendation-card" hoverable>
            <div className="recommendation-content">
              <div className="rec-icon">💡</div>
              <div className="rec-text">
                <h4>Your DTI is High</h4>
                <p>Your debt-to-income ratio is above optimal. Play the "Debt Management" level in FinQUEST to learn strategies to reduce it.</p>
              </div>
              <motion.button
                className="rec-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/arcade/FinQUEST')}
              >
                Start Level →
              </motion.button>
            </div>
          </Card>

          <Card className="recommendation-card" hoverable>
            <div className="recommendation-content">
              <div className="rec-icon">🎯</div>
              <div className="rec-text">
                <h4>Build Your Emergency Fund</h4>
                <p>Practice budget management in FinanceFrenzy. Simulate building a 3-month emergency fund across different income scenarios.</p>
              </div>
              <motion.button
                className="rec-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/arcade/FinanceFrenzy')}
              >
                Play Now →
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ArcadePage;
