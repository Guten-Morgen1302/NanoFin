import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const Services: React.FC = () => {
  const services = [
    {
      icon: '🤖',
      title: 'AI Credit Scoring',
      description: 'Advanced machine learning models analyze your financial profile to determine creditworthiness instantly',
    },
    {
      icon: '📊',
      title: 'Financial Analytics',
      description: 'Comprehensive data-driven insights showing detailed breakdowns of your financial health',
    },
    {
      icon: '💳',
      title: 'Loan Marketplace',
      description: 'Connect with verified lenders offering competitive rates tailored to your profile',
    },
    {
      icon: '📱',
      title: 'Mobile App',
      description: 'Seamless experience across all devices with real-time notifications and updates',
    },
    {
      icon: '🎓',
      title: 'Financial Education',
      description: 'Learn money management and financial literacy through interactive modules and games',
    },
    {
      icon: '🔐',
      title: 'Security & Privacy',
      description: 'Bank-grade encryption and privacy controls to protect your sensitive financial data',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="services-page">
      <div className="services-background">
        <div className="service-orb service-orb-1"></div>
        <div className="service-orb service-orb-2"></div>
      </div>

      {/* Header */}
      <section className="services-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1>Our Services</h1>
          <p>Comprehensive financial solutions designed for nano-entrepreneurs</p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="services-content">
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="service-item"
              variants={itemVariants}
              whileHover={{ translateY: -10, boxShadow: '0 20px 40px rgba(0, 212, 255, 0.2)' }}
            >
              <div className="service-icon-wrapper">
                <span className="service-icon">{service.icon}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-arrow">→</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Highlight */}
      <section className="services-highlight">
        <motion.div
          className="highlight-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Why Our Services Stand Out</h2>
          <div className="highlight-list">
            <div className="highlight-item">
              <span className="check-icon">✓</span>
              <div>
                <h4>100% Digital Process</h4>
                <p>No paperwork needed. Complete everything from your phone</p>
              </div>
            </div>
            <div className="highlight-item">
              <span className="check-icon">✓</span>
              <div>
                <h4>Instant Approvals</h4>
                <p>Get decisions within minutes, not days or weeks</p>
              </div>
            </div>
            <div className="highlight-item">
              <span className="check-icon">✓</span>
              <div>
                <h4>Transparent Pricing</h4>
                <p>No hidden fees. Know exactly what you're paying</p>
              </div>
            </div>
            <div className="highlight-item">
              <span className="check-icon">✓</span>
              <div>
                <h4>24/7 Support</h4>
                <p>Dedicated customer service whenever you need help</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="highlight-visual"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="visual-card">
            <div className="visual-header">Service Benefits</div>
            <div className="visual-items">
              <div className="visual-item">
                <span>💰</span>
                <p>Save up to 50% on interest rates</p>
              </div>
              <div className="visual-item">
                <span>⚡</span>
                <p>Access within 24 hours</p>
              </div>
              <div className="visual-item">
                <span>📈</span>
                <p>Build your credit history</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="services-cta">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Access Better Financial Services?</h2>
          <p>Start your free assessment today and discover your credit potential</p>
          <button className="btn btn-primary btn-lg">Get Started Now</button>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
