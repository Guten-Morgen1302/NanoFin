import React from 'react';
import { motion } from 'framer-motion';
import './HowItWorks.css';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Sign Up & Verify',
      description: 'Create your account and verify your identity in just 2 minutes',
      icon: '📱',
    },
    {
      number: '02',
      title: 'Enter Financial Data',
      description: 'Share basic information about your business and finances securely',
      icon: '📊',
    },
    {
      number: '03',
      title: 'AI Assessment',
      description: 'Our AI analyzes your data and calculates your credit score',
      icon: '🤖',
    },
    {
      number: '04',
      title: 'Get Your Score',
      description: 'Receive instant credit score and loan eligibility details',
      icon: '✅',
    },
    {
      number: '05',
      title: 'View Offers',
      description: 'Explore loan options from verified lenders matched to your profile',
      icon: '💳',
    },
    {
      number: '06',
      title: 'Access Funds',
      description: 'Apply for loans and get funds directly to your account',
      icon: '🎉',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="howitworks-page">
      <div className="howitworks-background">
        <div className="howitworks-orb-1"></div>
        <div className="howitworks-orb-2"></div>
      </div>

      {/* Header */}
      <section className="howitworks-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1>How NanoFin Works</h1>
          <p>Get credit in 6 simple steps, completely online</p>
        </motion.div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <motion.div
          className="steps-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                className="step-card"
                variants={itemVariants}
                whileHover={{ translateY: -8 }}
              >
                <div className="step-icon">{step.icon}</div>
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>

              {idx < steps.length - 1 && (
                <motion.div
                  className="step-connector"
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <span className="arrow">→</span>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Complete Your Journey in <span className="highlight">48 Hours</span>
        </motion.h2>

        <motion.div
          className="timeline-items"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="timeline-item" variants={itemVariants}>
            <div className="timeline-time">0 min</div>
            <div className="timeline-content">
              <h4>Instant Sign Up</h4>
              <p>Start in seconds</p>
            </div>
          </motion.div>

          <motion.div className="timeline-item" variants={itemVariants}>
            <div className="timeline-time">5 min</div>
            <div className="timeline-content">
              <h4>Data Entry</h4>
              <p>Complete your profile</p>
            </div>
          </motion.div>

          <motion.div className="timeline-item" variants={itemVariants}>
            <div className="timeline-time">10 min</div>
            <div className="timeline-content">
              <h4>AI Processing</h4>
              <p>Get your credit score</p>
            </div>
          </motion.div>

          <motion.div className="timeline-item" variants={itemVariants}>
            <div className="timeline-time">24h</div>
            <div className="timeline-content">
              <h4>Loan Approval</h4>
              <p>Receive approval decision</p>
            </div>
          </motion.div>

          <motion.div className="timeline-item" variants={itemVariants}>
            <div className="timeline-time">48h</div>
            <div className="timeline-content">
              <h4>Funds Received</h4>
              <p>Money in your account</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          className="faq-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="faq-item" variants={itemVariants}>
            <h4>What documents do I need?</h4>
            <p>Just your ID and basic business information. No extensive documentation required.</p>
          </motion.div>

          <motion.div className="faq-item" variants={itemVariants}>
            <h4>Is my data secure?</h4>
            <p>Yes! We use bank-grade encryption and follow strict data privacy regulations.</p>
          </motion.div>

          <motion.div className="faq-item" variants={itemVariants}>
            <h4>What's the credit score range?</h4>
            <p>Scores range from 300-900. Higher scores indicate better creditworthiness.</p>
          </motion.div>

          <motion.div className="faq-item" variants={itemVariants}>
            <h4>Can I apply for multiple loans?</h4>
            <p>Yes! Once approved, you can access multiple loans based on your eligibility.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="howitworks-cta">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Start Your Financial Journey?</h2>
          <p>Join thousands of nano-entrepreneurs who have successfully accessed credit</p>
          <button className="btn btn-primary btn-lg">Begin Now</button>
        </motion.div>
      </section>
    </div>
  );
};

export default HowItWorks;
