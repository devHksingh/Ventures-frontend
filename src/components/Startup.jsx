import React from 'react';
import { motion } from 'framer-motion';
import ThreeBackground from './ThreeBackground';
import './Startup.css';

const Startup = () => {
  return (
    <>
      <ThreeBackground />
      <div className="startup-container">
        <motion.div 
          className="startup-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>For Startups</h1>
          <p>Connect with investors who believe in your vision</p>
        </motion.div>

        <motion.div 
          className="startup-benefits"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="benefits-grid">
            <div className="benefit-item">
              <i className="fas fa-users"></i>
              <h3>Access to Investors</h3>
              <p>Connect with a network of qualified investors</p>
            </div>
            <div className="benefit-item">
              <i className="fas fa-bullhorn"></i>
              <h3>Showcase Your Vision</h3>
              <p>Present your startup to potential investors</p>
            </div>
            <div className="benefit-item">
              <i className="fas fa-handshake"></i>
              <h3>Build Relationships</h3>
              <p>Create meaningful connections with investors</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="startup-process"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2>How It Works</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Profile</h3>
              <p>Set up your startup profile and pitch</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Get Verified</h3>
              <p>Complete our verification process</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Connect</h3>
              <p>Engage with interested investors</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Grow</h3>
              <p>Secure funding and scale your business</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="startup-resources"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <h2>Resources for Startups</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <i className="fas fa-book"></i>
              <h3>Guides</h3>
              <p>Learn how to create compelling pitches</p>
            </div>
            <div className="resource-card">
              <i className="fas fa-video"></i>
              <h3>Webinars</h3>
              <p>Expert insights and best practices</p>
            </div>
            <div className="resource-card">
              <i className="fas fa-comments"></i>
              <h3>Community</h3>
              <p>Connect with other founders</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="cta-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h2>Ready to Grow Your Startup?</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="startup-cta-btn"
          >
            Join as Startup
          </motion.button>
        </motion.div>
      </div>
    </>
  );
};

export default Startup; 