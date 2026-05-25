import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../services/apiClient';
import { toast } from 'sonner';

export interface User {
  id: number;
  name: string;
  email: string;
  phone_number?: string;
  role: 'user' | 'admin';
  is_admin?: boolean;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        apiClient.setToken(token);
        try {
          const response = await apiClient.getUser();
          setUser(response.user);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          apiClient.clearToken();
          localStorage.removeItem('authToken');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiClient.login(email, password);
      
      if (response.token && response.user) {
        apiClient.setToken(response.token);
        localStorage.setItem('authToken', response.token);
        setUser(response.user);
        toast.success('Login successful');
      }
    } catch (error: any) {
      const message = error.message || 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    setLoading(true);
    try {
      const response = await apiClient.register(name, email, password, phone);
      
      if (response.token && response.user) {
        apiClient.setToken(response.token);
        localStorage.setItem('authToken', response.token);
        setUser(response.user);
        toast.success('Registration successful');
      }
    } catch (error: any) {
      const message = error.message || 'Registration failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await apiClient.logout();
      setUser(null);
      localStorage.removeItem('authToken');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      setUser(null);
      apiClient.clearToken();
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await apiClient.getUser();
      setUser(response.user);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setUser(null);
      apiClient.clearToken();
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin' || user?.is_admin === true,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
