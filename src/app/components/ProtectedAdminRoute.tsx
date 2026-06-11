import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from './ui/LoadingSpinner';

export function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // isAdmin should include super_admin as well
  if (!isAdmin || !user) return <Navigate to="/" replace />;

  return <>{children}</>;
}

