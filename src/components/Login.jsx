import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import HeroSection from './HeroSection';
import Header from './Header';

export default function Login() {
  const [userType, setUserType] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page the user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || 
    (userType === 'admin' ? '/adminDashboard' : 
     userType === 'startup' ? '/startupDashboard' : 
     userType === 'investor' ? '/investor/dashboard' : '/');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get ID token
      const idToken = await user.getIdToken();
      
      // Send token to backend to create session cookie
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ token: idToken }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create session');
      }
      
      // Store user role in localStorage
      localStorage.setItem('userRole', userType === 'startup' ? 'founder' : userType);
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userEmail', user.email);
      
      // Redirect to the page the user was trying to access, or to the appropriate dashboard
      navigate(from, { replace: true });
      
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <HeroSection
        title="Login"
        subtitle="Access your account to manage your ventures and investments"
      />
      <div style={{
        padding: '2rem',
        maxWidth: 400,
        margin: '2rem auto',
        textAlign: 'center',
        background: '#fff',
        color: '#222',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        border: '1.5px solid #e3eaf3',
      }}>
        <h1 style={{color: '#0070d2'}}>Login</h1>
        
        {error && (
          <div style={{
            color: '#d32f2f',
            backgroundColor: '#ffebee',
            padding: '0.5rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: '1.5rem'}}>
            <label style={{fontWeight: 500, marginRight: 10, color: '#222'}}>Login as:</label>
            <label style={{marginRight: 10, color: '#222'}}>
              <input
                type="radio"
                name="userType"
                value="startup"
                checked={userType === 'startup'}
                onChange={() => setUserType('startup')}
                style={{accentColor: '#0070d2'}}
              /> Startup
            </label>
            <label style={{marginRight: 10, color: '#222'}}>
              <input
                type="radio"
                name="userType"
                value="investor"
                checked={userType === 'investor'}
                onChange={() => setUserType('investor')}
                style={{accentColor: '#0070d2'}}
              /> Investor
            </label>
            <label style={{color: '#222'}}>
              <input
                type="radio"
                name="userType"
                value="admin"
                checked={userType === 'admin'}
                onChange={() => setUserType('admin')}
                style={{accentColor: '#0070d2'}}
              /> Admin
            </label>
          </div>
          <div style={{marginBottom: '1rem'}}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%', 
                padding: '0.7rem', 
                borderRadius: 6, 
                border: '1px solid #e3eaf3', 
                color: '#222', 
                background: '#f6f9fc'
              }} 
              required 
            />
          </div>
          <div style={{marginBottom: '1rem'}}>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%', 
                padding: '0.7rem', 
                borderRadius: 6, 
                border: '1px solid #e3eaf3', 
                color: '#222', 
                background: '#f6f9fc'
              }} 
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{
              padding: '0.7rem 2rem', 
              borderRadius: 6, 
              background: 'linear-gradient(90deg, #0070d2 60%, #43a047 100%)', 
              color: '#fff', 
              border: 'none', 
              fontWeight: 500, 
              fontSize: '1.08rem', 
              boxShadow: '0 2px 8px rgba(0,112,210,0.08)',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div style={{marginTop: '1.5rem', color: '#888', fontSize: '0.95rem'}}>
          Selected user type: <b style={{color: '#0070d2'}}>{userType.charAt(0).toUpperCase() + userType.slice(1)}</b>
        </div>
        <div style={{marginTop: '1.5rem'}}>
          Don't have an account? <Link to="/register" style={{color: '#0070d2', fontWeight: 500}}>Register here</Link>
        </div>
      </div>
    </>
  );
}
