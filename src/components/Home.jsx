import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './HeroSection';
import Header from './Header.jsx';
import './Home.css';

const featuredStartups = [
  {
    name: 'CloudSync',
    logo: 'https://via.placeholder.com/80x40/0070d2/ffffff?text=CS',
    desc: 'Cloud-based file management for teams.',
  },
  {
    name: 'GreenGrid',
    logo: 'https://via.placeholder.com/80x40/43a047/ffffff?text=GG',
    desc: 'Smart energy solutions for a greener planet.',
  },
  {
    name: 'FinSight',
    logo: 'https://via.placeholder.com/80x40/ff9800/ffffff?text=FS',
    desc: 'AI-powered financial analytics for businesses.',
  },
  {
    name: 'MedixAI',
    logo: 'https://via.placeholder.com/80x40/8e24aa/ffffff?text=MA',
    desc: 'AI-driven diagnostics for modern healthcare.',
  },
  {
    name: 'EduNova',
    logo: 'https://via.placeholder.com/80x40/0288d1/ffffff?text=EN',
    desc: 'Revolutionizing online education for all ages.',
  },
  {
    name: 'Shoply',
    logo: 'https://via.placeholder.com/80x40/f44336/ffffff?text=SH',
    desc: 'Next-gen e-commerce for local businesses.',
  },
  {
    name: 'UrbanFleet',
    logo: 'https://via.placeholder.com/80x40/607d8b/ffffff?text=UF',
    desc: 'Smart mobility solutions for urban transport.',
  },
  {
    name: 'SecureNet',
    logo: 'https://via.placeholder.com/80x40/009688/ffffff?text=SN',
    desc: 'Advanced cybersecurity for small businesses.',
  },
];

const benefits = [
  { icon: '🚀', title: 'Accelerate Your Growth', text: 'Unlock rapid scaling with tailored funding, expert mentorship, and strategic partnerships designed for your unique journey.' },
  { icon: '🤝', title: 'Unmatched Connections', text: 'Tap into a global network of investors, founders, and industry leaders ready to support and collaborate.' },
  { icon: '🌍', title: 'Global Impact', text: 'Expand your reach and make a difference with access to international markets and resources.' },
  { icon: '🔒', title: 'Trust & Transparency', text: 'Experience a secure, transparent platform built on integrity, reliability, and long-term relationships.' },
  { icon: '💡', title: 'Innovation at the Core', text: 'Join a community that celebrates creativity, breakthrough ideas, and positive change.' },
];

const insights = [
  {
    title: 'How Ventures Helps Startups Scale Globally',
    summary: 'Discover our unique approach to supporting founders as they expand into new markets and industries.',
    author: 'Ava Patel',
  },
  {
    title: 'Building a Culture of Collaboration',
    summary: 'Why teamwork and shared vision are at the heart of every successful investment.',
    author: 'Ventures Editorial Team',
  },
  {
    title: 'Tech for Good: Investing in Impact',
    summary: 'Our commitment to funding startups that drive positive change in society and the environment.',
    author: 'Ventures Impact Team',
  },
];

const stats = [
  { label: 'Startups Funded', value: 120 },
  { label: 'Investors', value: 45 },
  { label: 'Total Funding ($M)', value: 300 },
];

function AnimatedCounter({ value }) {
  const [display, setDisplay] = useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let increment = end / 60;
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setDisplay(end);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{display}</span>;
}

export default function Home() {
  // Carousel state
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const visibleStartups = featuredStartups.slice(carouselIdx, carouselIdx + 3);
  const canPrev = carouselIdx > 0;
  const canNext = carouselIdx < featuredStartups.length - 3;

  // Modal state for startup details
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);

  // Auto-play carousel
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (canNext) {
        handleNext();
      } else {
        setCarouselIdx(0);
        setDirection(1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselIdx, canNext]);

  // Swipe gesture support for carousel
  const touchStartX = React.useRef(null);
  const touchEndX = React.useRef(null);

  function handleTouchStart(e) {
    touchStartX.current = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e) {
    touchEndX.current = e.changedTouches[0].screenX;
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50 && canNext) {
      handleNext();
    } else if (diff < -50 && canPrev) {
      handlePrev();
    }
  }

  function handlePrev() {
    setDirection(-1);
    setCarouselIdx(carouselIdx - 1);
  }
  function handleNext() {
    setDirection(1);
    setCarouselIdx(carouselIdx + 1);
  }

  // Open modal with startup details
  function openModal(startup) {
    setSelectedStartup(startup);
    setModalOpen(true);
  }

  // Close modal
  function closeModal() {
    setModalOpen(false);
    setSelectedStartup(null);
  }

  // Newsletter feedback
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  function handleNewsletter(e) {
    e.preventDefault();
    setNewsletterSuccess(true);
    setTimeout(() => setNewsletterSuccess(false), 2000);
  }

  // Smooth scroll
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="home-root">
      {/* Navigation Bar */}
      <Header />

      {/* Animated Hero Section */}
      <HeroSection
        title="Backing Visionaries, Building Tomorrow"
        subtitle="At Ventures, we empower bold entrepreneurs to turn their ideas into world-changing companies. Our team partners with founders to provide the resources, mentorship, and network needed to accelerate growth and create lasting impact."
        primaryBtnText="For Startups"
        primaryBtnAction={() => scrollToSection('portfolio')}
        secondaryBtnText="For Investors"
        secondaryBtnAction={() => scrollToSection('benefits')}
      />

      {/* Animated Counters */}
      <section style={{display: 'flex', justifyContent: 'center', gap: '3rem', margin: '2.5rem 0'}}>
        {stats.map((stat, idx) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 * idx }} style={{textAlign: 'center'}}>
            <div style={{fontSize: '2.2rem', fontWeight: 700, color: '#0070d2'}}><AnimatedCounter value={stat.value} /></div>
            <div style={{fontSize: '1.08rem', color: '#444'}}>{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Benefits Section with Animation */}
      <section className="benefits-section" id="benefits">
        <h2>Why Choose Ventures?</h2>
        <p style={{textAlign: 'center', color: '#555', maxWidth: 600, margin: '0 auto 2rem auto', fontSize: '1.08rem'}}>
          We're more than just investors—we're your partners in growth. Here's what sets Ventures apart:
        </p>
        <div className="benefits-cards">
          {benefits.map((b, idx) => (
            <motion.div className="benefit-card" key={idx} whileHover={{ scale: 1.06, boxShadow: '0 8px 32px rgba(0,112,210,0.10)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }}>
              <div className="benefit-icon" style={{fontSize: '2.2rem'}}>{b.icon}</div>
              <div className="benefit-title" style={{fontWeight: 600, margin: '0.5rem 0'}}>{b.title}</div>
              <div className="benefit-text" style={{color: '#444', fontSize: '1rem'}}>{b.text}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Startups Carousel */}
      <section className="portfolio-section" id="portfolio">
        <h2>Featured Startups</h2>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem'}}>
          <button className="see-all-btn" style={{padding: '0.5rem 1rem', fontSize: '1.2rem'}} onClick={handlePrev} disabled={!canPrev}>&lt;</button>
          <div className="portfolio-logos" style={{minWidth: 720, minHeight: 320, position: 'relative', overflow: 'hidden'}}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={carouselIdx}
                custom={direction}
                initial={{ x: direction > 0 ? 400 : -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -400 : 400, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30, ease: "easeOut" }}
                style={{ display: 'flex', gap: '2.2rem', position: 'absolute', width: '100%' }}
              >
                {visibleStartups.map((startup, idx) => (
                  <motion.div
                    className="portfolio-logo-item"
                    key={startup.name}
                    whileHover={{ scale: 1.09, boxShadow: '0 12px 36px rgba(0,112,210,0.13)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                  >
                    <img src={startup.logo} alt={`${startup.name} logo`} />
                    <div className="portfolio-company-name">{startup.name}</div>
                    <div className="portfolio-company-desc">{startup.desc}</div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <button className="see-all-btn" style={{padding: '0.5rem 1rem', fontSize: '1.2rem'}} onClick={handleNext} disabled={!canNext}>&gt;</button>
        </div>
        <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
          <Link to="/startups" className="see-all-btn">See All Startups</Link>
        </div>
      </section>

      {/* Quick Action Cards with Animation */}
      <section className="quick-actions-section">
        <div className="quick-actions-cards">
          {['/register', '/login', '/contact'].map((to, idx) => (
            <motion.div key={to} whileHover={{ scale: 1.08, boxShadow: '0 8px 32px rgba(0,112,210,0.10)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }}>
              <Link to={to} className="quick-action-card">
                {to === '/register' ? 'Register' : to === '/login' ? 'Login' : 'Contact Us'}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do-section">
        <h2>How We Support Founders</h2>
        <div className="what-we-do-cards">
          <div className="wwd-card">
            <h3>Strategic Guidance</h3>
            <p>We work closely with founders to refine business models, navigate challenges, and unlock new opportunities for growth.</p>
          </div>
          <div className="wwd-card">
            <h3>Global Network</h3>
            <p>Our extensive network connects startups with industry leaders, partners, and customers around the world.</p>
          </div>
          <div className="wwd-card">
            <h3>Operational Support</h3>
            <p>From hiring to go-to-market, we provide hands-on support to help startups scale efficiently and sustainably.</p>
          </div>
          <div className="wwd-card">
            <h3>Purpose-Driven Investment</h3>
            <p>We invest in companies that are committed to making a positive difference for people and the planet.</p>
          </div>
        </div>
      </section>

      {/* Insights/News Section */}
      <section className="insights-section" id="perspectives">
        <h2>Latest Insights</h2>
        <div className="insights-cards">
          {insights.map((item, idx) => (
            <motion.div className="insight-card" key={idx} whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,112,210,0.10)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <span className="insight-author">By {item.author}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section (More Prominent) */}
      <section className="newsletter-section" style={{background: '#eaf1fb', border: '2px solid #0070d2', borderRadius: 16, margin: '2rem auto', maxWidth: 500}}>
        <h2 style={{color: '#0070d2'}}>Join Our Community</h2>
        <form className="newsletter-form" onSubmit={handleNewsletter}>
          <input type="email" placeholder="Your Email Address" required />
          <button type="submit">Sign Up</button>
        </form>
        {newsletterSuccess && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{color: '#43a047', marginTop: '1rem', fontWeight: 500}}>
            Thank you for subscribing!
          </motion.div>
        )}
        <p style={{marginTop: '1rem', color: '#888'}}>Get the latest updates, founder stories, and investment news from Ventures.</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="footer-social">
          <a href="#"><span role="img" aria-label="X">🐦</span></a>
          <a href="#"><span role="img" aria-label="LinkedIn">💼</span></a>
        </div>
        <div className="footer-copy">© 2024 Ventures. Empowering the next generation of innovators.</div>
      </footer>
    </div>
  );
}