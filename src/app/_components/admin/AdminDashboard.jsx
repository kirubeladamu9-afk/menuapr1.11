'use client';

import React, { useState, useEffect } from 'react';
import CategoriesManager from './CategoriesManager';
import MenuItemsManager from './MenuItemsManager';

const AdminDashboard = ({ sessionToken, onLogout }) => {
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

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
    } catch (error) {
      console.error('Error fetching data:', error);
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
