import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SignedOut } from '@clerk/clerk-react';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Assessment',
      description: 'Advanced machine learning algorithms evaluate creditworthiness accurately',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Get instant credit scores and financial insights in seconds',
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Bank-level encryption protects your financial data',
    },
    {
      icon: '📊',
      title: 'Data-Driven',
      description: 'Transparent analytics show exactly what influences your score',
    },
    {
      icon: '🌍',
      title: 'Inclusive Access',
      description: 'Empowering unbanked nano-entrepreneurs worldwide',
    },
    {
      icon: '💡',
      title: 'Smart Insights',
      description: 'Personalized recommendations to improve your financial health',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Users Helped', icon: '👥' },
    { number: '95%', label: 'Accuracy Rate', icon: '✅' },
    { number: '24/7', label: 'Support', icon: '🤝' },
    { number: '$1M+', label: 'Loans Enabled', icon: '💰' },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-background">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>

        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="hero-title">
            Unlock Your Financial <span className="gradient-text">Potential</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            NanoFin provides intelligent credit assessment for unbanked entrepreneurs. 
            Get your credit score instantly and access loans tailored to your needs.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-cta">
            <SignedOut>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/sign-up')}
              >
                Get Started Free
              </button>
            </SignedOut>
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/howitworks')}
            >
              Learn More →
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="card-header">Quick Assessment</div>
          <div className="card-body">
            <div className="stat-item">
              <span>📈</span>
              <p>Your Credit Score</p>
              <h3>750+</h3>
            </div>
            <div className="divider"></div>
            <div className="stat-item">
              <span>💳</span>
              <p>Loan Eligibility</p>
              <h3>₹5,00,000</h3>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="text-gradient">NanoFin</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Industry-leading AI technology meets human-centered financial inclusion
          </motion.p>
        </div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ translateY: -8 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-background">
          <div className="stat-orb"></div>
        </div>

        <motion.div
          className="stats-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="stat-box"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <span className="stat-emoji">{stat.icon}</span>
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="cta-background">
          <div className="cta-orb cta-orb-1"></div>
          <div className="cta-orb cta-orb-2"></div>
        </div>

        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Transform Your Financial Future?</h2>
          <p>Join thousands of nano-entrepreneurs already using NanoFin to access credit</p>

          <div className="cta-buttons">
            <SignedOut>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/sign-up')}
              >
                Start Your Journey
              </button>
            </SignedOut>
            <button
              className="btn btn-secondary-light btn-lg"
              onClick={() => navigate('/services')}
            >
              Explore Services
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
