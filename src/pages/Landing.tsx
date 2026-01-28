import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignedOut, SignedIn, UserButton } from '@clerk/clerk-react';
import './Landing.css';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="landing">
      {/* Navigation */}
      <nav className="landing-nav">
        <motion.div 
          className="nav-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="nav-icon">💳</span>
          <span className="nav-text">NanoFin</span>
        </motion.div>
        
        <SignedOut>
          <motion.button
            className="nav-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/sign-in')}
          >
            Get Started
          </motion.button>
        </SignedOut>

        <SignedIn>
          <motion.div
            className="user-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              className="nav-cta"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </button>
            <UserButton afterSignOutUrl="/" />
          </motion.div>
        </SignedIn>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="hero-title"
              variants={itemVariants}
            >
              Fair Credit <span className="gradient-text">Access</span> for <br /> Everyone
            </motion.h1>

            <motion.p 
              className="hero-description"
              variants={itemVariants}
            >
              Get AI-powered credit decisions tailored to your financial behavior. 
              No hidden scores. No unfair rejections. Just transparency and growth.
            </motion.p>

            <motion.div 
              className="hero-buttons"
              variants={itemVariants}
            >
              <SignedOut>
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/sign-up')}
                >
                  Start Free Trial
                </motion.button>
              </SignedOut>

              <SignedIn>
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </motion.button>
              </SignedIn>

              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="hero-card-container">
            <motion.div
              className="hero-card"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="card-header">💰 Credit Score</div>
              <div className="card-value">758</div>
              <div className="card-footer">↑ +5 this month</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features">
        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Powerful Features Built for You</h2>
          <p>Everything you need to understand and improve your financial health</p>
        </motion.div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Decisions</h3>
            <p>Adaptive credit scoring based on your real financial behavior, not just credit history</p>
          </motion.div>

          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">📊</div>
            <h3>Clear Analytics</h3>
            <p>Understand exactly why you got your score with transparent, explainable insights</p>
          </motion.div>

          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">🎮</div>
            <h3>Financial Games</h3>
            <p>Learn money skills while having fun with our interactive Financial Arcade</p>
          </motion.div>

          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">📈</div>
            <h3>Real-Time Tracking</h3>
            <p>Monitor your financial health with live dashboards and instant notifications</p>
          </motion.div>

          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">🔐</div>
            <h3>Bank-Level Security</h3>
            <p>Your data is encrypted and protected with military-grade security standards</p>
          </motion.div>

          <motion.div className="feature-card" variants={itemVariants}>
            <div className="feature-icon">💡</div>
            <h3>Smart Recommendations</h3>
            <p>Get personalized next steps to improve your credit and grow your wealth</p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Ready to Take Control of Your Financial Future?</h2>
          <p>Join thousands of users already using NanoFin to build better credit and financial habits.</p>
          
          <SignedOut>
            <motion.button
              className="btn-large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/sign-up')}
            >
              Get Started Now
            </motion.button>
          </SignedOut>

          <SignedIn>
            <motion.button
              className="btn-large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </motion.button>
          </SignedIn>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <p>&copy; 2026 NanoFin. Fair credit for everyone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
