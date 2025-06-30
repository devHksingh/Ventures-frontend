import React from 'react';
import './AboutUs.css';
import Header from './Header.jsx';
import HeroSection from './HeroSection';

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="about-container">
        <HeroSection
          title="About Ventures"
          subtitle="Empowering innovation through meaningful connections"
        />
        <div className="about-content">
          <div className="mission-section">
            <h2>Our Mission</h2>
            <p>To bridge the gap between innovative startups and visionary investors, creating a thriving ecosystem for growth and success.</p>
          </div>
          <div className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <span role="img" aria-label="Innovation" style={{fontSize: '2.5rem', marginBottom: '1.5rem', display: 'block'}}>💡</span>
                <h3>Innovation</h3>
                <p>Fostering creative solutions and breakthrough ideas.</p>
              </div>
              <div className="value-card">
                <span role="img" aria-label="Community" style={{fontSize: '2.5rem', marginBottom: '1.5rem', display: 'block'}}>🤝</span>
                <h3>Community</h3>
                <p>Building strong networks and lasting relationships.</p>
              </div>
              <div className="value-card">
                <span role="img" aria-label="Growth" style={{fontSize: '2.5rem', marginBottom: '1.5rem', display: 'block'}}>📈</span>
                <h3>Growth</h3>
                <p>Supporting sustainable development and success.</p>
              </div>
            </div>
          </div>
          <div className="team-section">
            <h2>Our Team</h2>
            <p>We are a dedicated team of professionals committed to transforming the startup ecosystem. Our diverse backgrounds and shared passion for innovation drive us to support founders and investors every step of the way.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs; 