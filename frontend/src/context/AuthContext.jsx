// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    role: null,
  });

  const login = async (email, password) => {
    // Mock login logic
    try {
      // Replace this with an actual API call when backend is ready
      if (email === 'student@example.com' && password === 'password') {
        setUser({
          isAuthenticated: true,
          role: 'student',
        });
        sessionStorage.setItem('userRole', 'student');
        return { success: true };
      } else if (email === 'instructor@example.com' && password === 'password') {
        setUser({
          isAuthenticated: true,
          role: 'instructor',
        });
        sessionStorage.setItem('userRole', 'instructor');
        return { success: true };
      } else {
        return { success: false, message: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred.' };
    }
  };

  const logout = () => {
    setUser({
      isAuthenticated: false,
      role: null,
    });
    sessionStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};