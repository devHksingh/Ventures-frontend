import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({ title, subtitle, primaryBtnText, primaryBtnAction, secondaryBtnText, secondaryBtnAction }) {
  return (
    <motion.header
      className="hero-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
        {primaryBtnText && (
          <button className="hero-btn" onClick={primaryBtnAction}>
            {primaryBtnText}
          </button>
        )}
        {secondaryBtnText && (
          <button className="hero-btn hero-btn-secondary" onClick={secondaryBtnAction}>
            {secondaryBtnText}
          </button>
        )}
      </div>
    </motion.header>
  );
}
