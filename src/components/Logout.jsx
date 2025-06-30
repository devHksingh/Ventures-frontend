import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

export default function Logout({ onLogout }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setLoading(true);
    try {
      // Sign out from Firebase
      await signOut(auth);
      
      // Clear session cookie from server
      await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include', // Important for cookies
      });
      
      // Clear local storage
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      
      // Redirect to login page after logout
      navigate('/login');
      
      // If onLogout prop exists, call it
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: 6,
        background: '#f44336',
        color: '#fff',
        border: 'none',
        fontWeight: 500,
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1
      }}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
} 