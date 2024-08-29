import React, { createContext, useState, useContext, useEffect } from 'react';
import { findUser, UserData } from '../data/UdummyData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    // For now, we'll just set loading to false
    setLoading(false);
  }, []);

  const login = (username: string, password: string) => {
    const foundUser = findUser(username, password);
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
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);