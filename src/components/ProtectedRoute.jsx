import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// Component to protect routes that require authentication
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);  const [hasRequiredRole, setHasRequiredRole] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check session with backend
        const sessionResponse = await fetch('http://localhost:5000/session', {
          credentials: 'include',
        });
        
        if (sessionResponse.ok) {
          setAuthenticated(true);
          
          // If a specific role is required, check user's role
          if (requiredRole) {
            const currentUser = auth.currentUser;
            if (currentUser) {
              const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                setHasRequiredRole(userData.role === requiredRole);
              }
            }
          } else {
            // No specific role required
            setHasRequiredRole(true);
          }
        } else {
          // Session check failed, check Firebase auth state as fallback
          const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
              setAuthenticated(true);
              
              // If a specific role is required, check user's role
              if (requiredRole) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                  const userData = userDoc.data();
                  setHasRequiredRole(userData.role === requiredRole);
                }
              } else {
                // No specific role required
                setHasRequiredRole(true);
              }
            }
            setLoading(false);
          });
          
          return () => unsubscribe();
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [auth, requiredRole]);
  
  if (loading) {
    // You could render a loading spinner here
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      Loading...
    </div>;
  }
  
  if (!authenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (requiredRole && !hasRequiredRole) {
    // Redirect to unauthorized page if user doesn't have the required role
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  
  // If authenticated and has required role (or no role required), render the children
  return children;
};

export default ProtectedRoute; 