
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, UserRole } from '../types';
import { mockAuth } from '../services/mockApi';
import useLocalStorage from '../hooks/useLocalStorage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (userData: Omit<User, 'id'>) => Promise<User>;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);
  
  const login = useCallback(async (email: string, password: string): Promise<User> => {
    const loggedInUser = await mockAuth.login(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  }, [setUser]);

  const signup = useCallback(async (userData: Omit<User, 'id'>): Promise<User> => {
    const newUser = await mockAuth.signup(userData);
    setUser(newUser);
    return newUser;
  }, [setUser]);

  const logout = useCallback(() => {
    mockAuth.logout();
    setUser(null);
  }, [setUser]);

  const updateUser = useCallback((updatedData: Partial<User>) => {
    if (user) {
      const newUserData = { ...user, ...updatedData };
      setUser(newUserData);
      // In a real app, this would also call an API
    }
  }, [user, setUser]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
