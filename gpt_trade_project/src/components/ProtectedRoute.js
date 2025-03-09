import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/config';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First try to get the session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setAuthenticated(false);
          setLoading(false);
          return;
        }
        
        // If we have a session, we're authenticated
        if (sessionData?.session) {
          setAuthenticated(true);
          setLoading(false);
          return;
        }
        
        // If no session, try to get the user as a fallback
        try {
          const { data: { user }, error } = await supabase.auth.getUser();
          
          if (error) {
            console.error('Auth error:', error);
            setAuthenticated(false);
          } else {
            setAuthenticated(!!user);
          }
        } catch (userError) {
          console.error('User fetch error:', userError);
          setAuthenticated(false);
        }
      } catch (error) {
        console.error('Protected route error:', error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setAuthenticated(false);
        navigate('/signin');
      }
    });

    return () => {
      // Clean up subscription
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return authenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
