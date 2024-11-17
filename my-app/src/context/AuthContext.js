import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
      console.log('Token encontrado:', token);

      if (!token) {
        setLoading(false);
        if (!router.pathname.startsWith('/login') && !router.pathname.startsWith('/register')) {
          router.push('/login');
        }
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/user/validate-token', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Respuesta de validación:', response);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Usuario autenticado:', data.user);
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          await logout();
        }
      } catch (error) {
        console.error('Error validating token:', error);
        await logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await fetch('http://localhost:3001/api/user/validate-token', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Respuesta de validación:', response);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Usuario autenticado:', data.user);
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        await logout();
      }
    } catch (error) {
      console.error('Error validating token:', error);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (token, userData) => {
    Cookies.set('token', token, { 
      expires: 1,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    setIsAuthenticated(true);
    setUser(userData);

    const redirectTo = router.query.from || '/';
    router.push(redirectTo);
  }, [router]);

  const logout = useCallback(async () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  }, [router]);

  useEffect(() => {
    if (isAuthenticated) {
      const token = Cookies.get('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expirationTime = payload.exp * 1000; 
          const timeUntilExpiration = expirationTime - Date.now();

          if (timeUntilExpiration > 0) {
            const timeoutId = setTimeout(logout, timeUntilExpiration);
            return () => clearTimeout(timeoutId);
          }
        } catch (error) {
          console.error('Error parsing token:', error);
          logout();
        }
      }
    }
  }, [isAuthenticated, logout]);

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;