'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLogin from '@components/admin/AdminLogin';
import AdminDashboard from '@components/admin/AdminDashboard';
import '@styles/admin.scss';

const AdminPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionToken, setSessionToken] = useState(null);

  useEffect(() => {
    // Check if user has valid session
    const token = localStorage.getItem('admin_session');
    if (token) {
      setSessionToken(token);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('admin_session', token);
    setSessionToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    setSessionToken(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-container">
      {!isAuthenticated ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <AdminDashboard sessionToken={sessionToken} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default AdminPage;
