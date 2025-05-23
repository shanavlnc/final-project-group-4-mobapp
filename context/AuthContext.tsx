import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/types';

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // In a real app, these would come from a database
  const sampleUsers: User[] = [
    { id: '1', username: 'admin', password: 'admin123', role: 'admin' },
    { id: '2', username: 'user1', password: 'user123', role: 'user' },
  ];

  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    const foundUser = sampleUsers.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};