/**
 * AuthContext
 * Authentication context provider that manages user authentication state and operations.
 * Handles user sign-in, sign-out, and registration functionality with persistent storage.
 * 
 * Features:
 * - User authentication (sign in/out)
 * - User registration
 * - Session persistence using AsyncStorage
 * - Admin/User role management
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * User interface defining the structure of user data
 * Includes basic user information and role (admin/regular user)
 */
interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

/**
 * AuthContext interface defining all available authentication operations
 * and state management functions
 */
export interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

/**
 * Default context values
 * Provides type-safe default implementations for the context
 */
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  signIn: async () => {},
  signOut: async () => {},
  register: async () => false,
});

/**
 * AuthProvider Component
 * 
 * Main authentication provider that manages:
 * 1. User session state
 * 2. Authentication operations
 * 3. User registration
 * 4. Session persistence
 */
const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load User Operation
   * Retrieves stored user session from AsyncStorage
   * Used for session persistence across app restarts
   */
  const loadUser = useCallback(async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (err) {
      setError('Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadUser(); }, [loadUser]);

  /**
   * Sign In Operation
   * Authenticates user and establishes a session
   * Handles both regular user and admin authentication
   * @param email - User's email address
   * @param password - User's password
   */
  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Demo authentication - replace with real API call
      const isAdmin = email.endsWith('@shelter.com');
      const isValid = password === 'demo123'; // Never do this in production!
      
      if (isValid) {
        const userData: User = { 
          id: Date.now().toString(),
          email,
          name: email.split('@')[0],
          isAdmin
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Registration Operation
   * Creates a new user account
   * Always creates regular user accounts (non-admin)
   */
  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const userData: User = {
        id: Date.now().toString(),
        email,
        name,
        isAdmin: false
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (err) {
      setError('Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign Out Operation
   * Ends the user session and clears stored data
   */
  const signOut = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (err) {
      setError('Logout failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, signIn, signOut, register }}>
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