import React from 'react';
import Header from './Header.jsx';

export default function Startups() {
  return (
    <>
      <Header />
      <div style={{padding: '2rem', maxWidth: 800, margin: '2rem auto'}}>
        <section style={{textAlign: 'center', marginBottom: '2.5rem'}}>
          <h1 style={{color: '#0070d2', fontSize: '2.8rem', fontWeight: 700, marginBottom: 12}}>For Startups</h1>
          <p style={{fontSize: '1.25rem', color: '#444', maxWidth: 600, margin: '1rem auto'}}>
            Are you building something extraordinary? Ventures partners with ambitious founders to accelerate growth, provide expert guidance, and open doors to a global network of investors and mentors.
          </p>
        </section>
        <section style={{marginBottom: '2.5rem'}}>
          <h2 style={{color: '#1a237e', fontSize: '1.3rem', marginBottom: '1rem'}}>Why Join Ventures?</h2>
          <ul style={{listStyle: 'none', padding: 0, fontSize: '1.05rem', color: '#333'}}>
            <li style={{marginBottom: '0.8rem'}}><b>Growth Capital:</b> Secure the funding you need to scale your business and reach new markets.</li>
            <li style={{marginBottom: '0.8rem'}}><b>Mentorship:</b> Work with experienced entrepreneurs, investors, and industry experts.</li>
            <li style={{marginBottom: '0.8rem'}}><b>Community:</b> Join a vibrant network of founders, partners, and innovators.</li>
            <li style={{marginBottom: '0.8rem'}}><b>Visibility:</b> Get featured in our portfolio and connect with potential customers and collaborators.</li>
          </ul>
        </section>
        <section style={{textAlign: 'center', marginTop: '2.5rem'}}>
          <h2 style={{color: '#0070d2'}}>Ready to Accelerate Your Startup?</h2>
          <p style={{color: '#444', marginBottom: '1.2rem'}}>Apply now to join our portfolio and take your vision to the next level.</p>
          <a href="/register" style={{padding: '0.8rem 2.2rem', background: '#0070d2', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 500}}>Apply as Startup</a>
        </section>
      </div>
    </>
  );
} 