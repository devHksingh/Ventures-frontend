import React from 'react';

import Header from './Header.jsx';
import HeroSection from './HeroSection';

export default function Investor() {
  return (
    <>
      <Header />
      <HeroSection
        title="For Investors"
        subtitle="Join Ventures and gain access to a curated portfolio of high-potential startups. Partner with us to support innovation, diversify your investments, and help shape the future of technology and business."
      />
      <div style={{padding: '2rem', maxWidth: 800, margin: '2rem auto'}}>
        <section style={{textAlign: 'center', marginBottom: '2.5rem'}}>
          <h2 style={{color: '#1a237e', fontSize: '1.3rem', marginBottom: '1rem'}}>Why Invest with Ventures?</h2>
          <ul style={{listStyle: 'none', padding: 0, fontSize: '1.05rem', color: '#333'}}>
            <li style={{marginBottom: '0.8rem'}}><b>Curated Opportunities:</b> Access a handpicked selection of innovative startups across diverse sectors.</li>
            <li style={{marginBottom: '0.8rem'}}><b>Expert Insights:</b> Receive regular updates, market analysis, and due diligence support from our experienced team.</li>
            <li style={{marginBottom: '0.8rem'}}><b>Network Expansion:</b> Connect with other investors, founders, and industry leaders through exclusive events and forums.</li>
            <li style={{marginBottom: '0.8rem'}}><b>Impact Investing:</b> Support companies that are making a positive difference in society and the environment.</li>
          </ul>
        </section>
        <section style={{textAlign: 'center', marginTop: '2.5rem'}}>
          <h2 style={{color: '#0070d2'}}>Ready to Start Investing?</h2>
          <p style={{color: '#444', marginBottom: '1.2rem'}}>Create your investor account and discover the next generation of groundbreaking startups.</p>
          <a href="/register" style={{padding: '0.8rem 2.2rem', background: '#0070d2', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 500}}>Join as Investor</a>
        </section>
      </div>
    </>
  );
}