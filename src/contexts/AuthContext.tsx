'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/api/axios';
import { AUTH } from '@/api/endpoint';

interface AuthContextType {
  user: any | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   const savedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  //   if (savedToken) {
  //     setToken(savedToken);
 
  //   }
  // }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post(AUTH.SUPERAMIN_LOGIN, { email, password });
      const { token, user } = response.data.data;
console.log("response",response)
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);

      router.push('/dashboard'); 
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    router.push('/auth/signin'); 
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
