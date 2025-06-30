import React from 'react';

import Header from './Header.jsx';
import HeroSection from './HeroSection';

export default function Contact() {
  return (
    <>
      <Header />
      <HeroSection
        title="Contact Us"
        subtitle="Get in touch with our team"
      />
      <div style={{padding: '2rem', maxWidth: 500, margin: '2rem auto', textAlign: 'center'}}>
        <form>
          <div style={{marginBottom: '1rem'}}>
            <input type="text" placeholder="Name" style={{width: '100%', padding: '0.7rem', borderRadius: 6, border: '1px solid #ccc'}} required />
          </div>
          <div style={{marginBottom: '1rem'}}>
            <input type="email" placeholder="Email" style={{width: '100%', padding: '0.7rem', borderRadius: 6, border: '1px solid #ccc'}} required />
          </div>
          <div style={{marginBottom: '1rem'}}>
            <textarea placeholder="Message" rows={4} style={{width: '100%', padding: '0.7rem', borderRadius: 6, border: '1px solid #ccc'}} required />
          </div>
          <button type="submit" style={{padding: '0.7rem 2rem', borderRadius: 6, background: '#0070d2', color: '#fff', border: 'none', fontWeight: 500}}>Send</button>
        </form>
      </div>
    </>
  );
}
