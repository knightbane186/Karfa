import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  username: string;
  accountType: 'normal' | 'business';
  // Add other user properties as needed
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking user login status:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    // Implement your login logic here
    // For now, we'll just simulate a successful login
    const mockUser: User = {
      id: '1',
      username,
      accountType: 'normal',
    };
    await AsyncStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const register = async (userData: Partial<User>) => {
    // Implement your registration logic here
    // For now, we'll just simulate a successful registration
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      accountType: userData.accountType || 'normal',
    } as User;
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return { user, loading, login, register, logout };
};