import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: Omit<User, 'id'>) => {
    try {
      setIsLoading(true);
      
      // Check if user already exists
      const existingUser = await firestore()
        .collection('users')
        .where('email', '==', userData.email)
        .get();

      if (!existingUser.empty) {
        throw new Error('User with this email already exists');
      }

      // Create new user
      const docRef = await firestore().collection('users').add({
        ...userData,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      const newUser: User = {
        id: docRef.id,
        ...userData,
      };

      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const userQuery = await firestore()
        .collection('users')
        .where('email', '==', email)
        .where('password', '==', password)
        .get();

      if (userQuery.empty) {
        throw new Error('Invalid email or password');
      }

      const userData = userQuery.docs[0].data() as User;
      const user: User = {
        // id: userQuery.docs[0].id,
        ...userData,
      };

      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 