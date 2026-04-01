'use client';

import React, { useState } from 'react';
import { useLanguage } from "@common/LanguageContext";

const AdminLogin = ({ onLogin }) => {
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      onLogin(data.sessionToken);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-box">
        <h1>{t('admin.adminPanel')}</h1>
        <p>{t('admin.enterCredentials')}</p>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="username">{t('admin.username')}</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('admin.enterUsername')}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">{t('admin.password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('admin.enterPassword')}
              required
            />
          </div>

          {error && <div className="admin-error">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn-primary"
          >
            {loading ? t('admin.loggingIn') : t('admin.login')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
