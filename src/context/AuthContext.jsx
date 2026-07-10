import { useState } from 'react';
import { AuthContext } from './AuthContextBase';

function loadUser() {
  try {
    const raw = localStorage.getItem('session_user');
    if (raw) return JSON.parse(raw);
  } catch {
    localStorage.removeItem('session_user');
  }
  return null;
}

function saveUser(userData) {
  if (userData) {
    const { password, ...safe } = userData;
    localStorage.setItem('session_user', JSON.stringify(safe));
  } else {
    localStorage.removeItem('session_user');
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  const login = (userData) => {
    saveUser(userData);
    setUser(userData);
  };

  const logout = () => {
    saveUser(null);
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
