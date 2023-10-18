// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Check if there's a token in localStorage
    const storedToken = localStorage.getItem('token');
    const storedProfile = JSON.parse(localStorage.getItem('profile'));

    if (storedToken && storedProfile) {
      setIsLoggedIn(true);
      setProfile(storedProfile);
    }
  }, []);

  const handleLogin = (token, userData) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
    localStorage.setItem('profile', JSON.stringify(userData));
    setProfile(userData);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, profile, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
