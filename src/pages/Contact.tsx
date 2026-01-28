import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'support@nanofin.com',
      link: 'mailto:support@nanofin.com',
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+91 8000 800 007',
      link: 'tel:+918000800007',
    },
    {
      icon: '📍',
      label: 'Address',
      value: 'Bangalore, India',
      link: '',
    },
    {
      icon: '⏰',
      label: 'Hours',
      value: 'Mon - Fri, 9AM - 6PM',
      link: '',
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
    <div className="contact-page">
      <div className="contact-background">
        <div className="contact-orb-1"></div>
        <div className="contact-orb-2"></div>
      </div>

      {/* Header */}
      <section className="contact-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Send us a message anytime.</p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="contact-content">
        {/* Contact Form */}
        <motion.div
          className="contact-form-wrapper"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="form-header">
            <h2>Send us a Message</h2>
            <p>Fill out the form below and we'll get back to you within 24 hours</p>
          </div>

          {submitted && (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✓ Thank you! We've received your message and will respond soon.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXXXXXXX"
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="feedback">Feedback</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your inquiry..."
                rows={6}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-lg">
              Send Message
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="contact-info-wrapper"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>Contact Information</h2>

          <motion.div className="contact-info-grid" variants={containerVariants}>
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                className="info-card"
                variants={itemVariants}
                whileHover={{ translateY: -5 }}
              >
                <span className="info-icon">{info.icon}</span>
                <div className="info-content">
                  <h4>{info.label}</h4>
                  {info.link ? (
                    <a href={info.link}>{info.value}</a>
                  ) : (
                    <p>{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <div className="social-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-link">🔗 LinkedIn</a>
              <a href="#" className="social-link">🐦 Twitter</a>
              <a href="#" className="social-link">📘 Facebook</a>
              <a href="#" className="social-link">📲 Instagram</a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Brief */}
      <section className="contact-faq">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Quick Answers
        </motion.h2>

        <motion.div
          className="faq-brief-items"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="faq-brief-item" variants={itemVariants}>
            <h4>Response Time</h4>
            <p>We typically respond within 24 hours during business days</p>
          </motion.div>

          <motion.div className="faq-brief-item" variants={itemVariants}>
            <h4>Urgent Support</h4>
            <p>For urgent matters, call our support line during business hours</p>
          </motion.div>

          <motion.div className="faq-brief-item" variants={itemVariants}>
            <h4>Chat Support</h4>
            <p>Available on our website for quick questions and assistance</p>
          </motion.div>

          <motion.div className="faq-brief-item" variants={itemVariants}>
            <h4>Email Ticketing</h4>
            <p>Your inquiry gets a unique ticket number for tracking</p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
