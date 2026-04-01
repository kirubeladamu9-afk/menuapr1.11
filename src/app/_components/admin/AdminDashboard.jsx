'use client';

import React, { useState, useEffect } from 'react';
import CategoriesManager from './CategoriesManager';
import MenuItemsManager from './MenuItemsManager';
import { useLanguage } from "@common/LanguageContext";

const AdminDashboard = ({ sessionToken, onLogout }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbInitialized, setDbInitialized] = useState(false);
  const [initializing, setInitializing] = useState(false);

  useEffect(() => {
    const init = async () => {
      // Try to initialize database on first load
      try {
        await fetch('/api/admin/init-db', { method: 'POST' });
      } catch (e) {
        console.log('Init attempted');
      }
      fetchData();
    };
    init();
  }, []);

  const initializeDatabase = async () => {
    setInitializing(true);
    try {
      const response = await fetch('/api/admin/init-db', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setDbInitialized(true);
        fetchData();
      } else {
        alert('Database initialization failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error initializing database:', error);
      alert('Error initializing database: ' + error.message);
    }
    setInitializing(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [categoriesRes, itemsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/menu-items'),
      ]);

      const categoriesData = await categoriesRes.json();
      const itemsData = await itemsRes.json();

      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setMenuItems(Array.isArray(itemsData) ? itemsData : []);
      setDbInitialized(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setDbInitialized(false);
    }
    setLoading(false);
  };

  const handleCategoryAdded = () => {
    fetchData();
  };

  const handleItemAdded = () => {
    fetchData();
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>{t('admin.menuManagement')}</h1>
        <button onClick={onLogout} className="admin-btn admin-btn-secondary">
          {t('admin.logout')}
        </button>
      </div>

      {!dbInitialized && !loading && (
        <div className="admin-init-warning">
          <p>{t('admin.initializeDb')}</p>
          <button
            onClick={initializeDatabase}
            disabled={initializing}
            className="admin-btn admin-btn-primary"
          >
            {initializing ? t('admin.initializing') : t('admin.initializeDatabase')}
          </button>
        </div>
      )}

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          {t('admin.categories')}
        </button>
        <button
          className={`admin-tab ${activeTab === 'items' ? 'active' : ''}`}
          onClick={() => setActiveTab('items')}
        >
          {t('admin.menuItems')}
        </button>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="admin-loading">{t('common.loading')}</div>
        ) : !dbInitialized ? (
          <div className="admin-loading">{t('admin.please')}</div>
        ) : activeTab === 'categories' ? (
          <CategoriesManager
            categories={categories}
            onCategoryAdded={handleCategoryAdded}
          />
        ) : (
          <MenuItemsManager
            menuItems={menuItems}
            categories={categories}
            onItemAdded={handleItemAdded}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
