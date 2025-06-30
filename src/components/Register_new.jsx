import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import HeroSection from './HeroSection';
import Header from './Header.jsx';

export default function Register() {
  const [userType, setUserType] = useState('admin');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password should be at least 6 characters');
    }

    // Map userType to role
    const role = userType === 'startup' ? 'founder' : userType;

    setLoading(true);
    try {
      // Register with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with display name
      await updateProfile(user, { displayName });
      
      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName,
        email,
        role,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isActive: true,
      });

      // Store user role in localStorage
      localStorage.setItem('userRole', role);
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userEmail', user.email);

      // Redirect based on role
      if (role === 'admin') {
        navigate('/adminDashboard');
      } else if (role === 'founder') {
        navigate('/startupDashboard');
      } else if (role === 'investor') {
        navigate('/investor/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <HeroSection
        title="Register"
        subtitle="Create your account to join the Ventures community"
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
        <h1 style={{color: '#0070d2'}}>Register</h1>
        
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
            <label style={{fontWeight: 500, marginRight: 10, color: '#222'}}>Register as:</label>
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
              type="text" 
              placeholder="Display Name" 
              value={displayName} 
              onChange={e => setDisplayName(e.target.value)} 
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
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
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
              onChange={e => setPassword(e.target.value)} 
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
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div style={{marginTop: '1.5rem', color: '#888', fontSize: '0.95rem'}}>
          Selected user type: <b style={{color: '#0070d2'}}>{userType.charAt(0).toUpperCase() + userType.slice(1)}</b>
        </div>
        <div style={{marginTop: '1.5rem'}}>
          Already have an account? <Link to="/login" style={{color: '#0070d2', fontWeight: 500}}>Login here</Link>
        </div>
      </div>
    </>
  );
}
