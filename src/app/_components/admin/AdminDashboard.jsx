'use client';

import React, { useState, useEffect } from 'react';
import CategoriesManager from './CategoriesManager';
import MenuItemsManager from './MenuItemsManager';

const AdminDashboard = ({ sessionToken, onLogout }) => {
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
        <h1>Menu Management</h1>
        <button onClick={onLogout} className="admin-btn admin-btn-secondary">
          Logout
        </button>
      </div>

      {!dbInitialized && !loading && (
        <div className="admin-init-warning">
          <p>Database tables need to be initialized. Click the button below to set up your database.</p>
          <button
            onClick={initializeDatabase}
            disabled={initializing}
            className="admin-btn admin-btn-primary"
          >
            {initializing ? 'Initializing...' : 'Initialize Database'}
          </button>
        </div>
      )}

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button
          className={`admin-tab ${activeTab === 'items' ? 'active' : ''}`}
          onClick={() => setActiveTab('items')}
        >
          Menu Items
        </button>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="admin-loading">Loading...</div>
        ) : !dbInitialized ? (
          <div className="admin-loading">Please initialize the database first.</div>
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
