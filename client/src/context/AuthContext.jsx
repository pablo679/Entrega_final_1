import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'hj_auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
        setToken(parsed.token);
      } catch (error) {
        console.error('Error leyendo sesión guardada:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const persistSession = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: userData, token: tokenValue }));
  };

  const login = (userData, tokenValue) => {
    persistSession(userData, tokenValue);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
