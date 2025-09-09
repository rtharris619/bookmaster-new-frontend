'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  login: async () => false,
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const authService = new AuthService();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const loggedIn = authService.loggedIn();
        setIsLoggedIn(loggedIn);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [authService]);

  const login = async (email: string, password: string) => {
    try {
      const success = await authService.login(email, password);
      if (success) {
        setIsLoggedIn(true);
      }
      return success;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
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