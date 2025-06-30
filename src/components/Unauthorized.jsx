import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={{
      padding: '2rem',
      maxWidth: 600,
      margin: '4rem auto',
      textAlign: 'center',
      background: '#fff',
      color: '#222',
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      border: '1.5px solid #e3eaf3',
    }}>
      <h1 style={{ color: '#f44336', marginBottom: '1rem' }}>Access Denied</h1>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
        You don't have permission to access this page. Please contact an administrator if you believe this is an error.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link 
          to="/"
          style={{
            padding: '0.7rem 1.5rem',
            borderRadius: 6,
            background: '#f5f5f5',
            color: '#333',
            textDecoration: 'none',
            border: '1px solid #ddd',
            fontWeight: 500,
          }}
        >
          Go to Home
        </Link>
        <Link 
          to="/login"
          style={{
            padding: '0.7rem 1.5rem',
            borderRadius: 6,
            background: '#0070d2',
            color: '#fff',
            textDecoration: 'none',
            border: 'none',
            fontWeight: 500,
          }}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized; 