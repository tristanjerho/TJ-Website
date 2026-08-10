import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types/invitation';
import { subscribeToAuthChanges, loginWithGoogle, logoutUser, getGuestUser } from '../services/authService';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginGoogle: async () => {},
  logout: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(getGuestUser());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginGoogle = async () => {
    setLoading(true);
    try {
      const u = await loginWithGoogle();
      setUser(u);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await logoutUser();
    setUser(getGuestUser());
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
