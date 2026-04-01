'use client';

import React, { useState } from 'react';
import { useLanguage } from "@common/LanguageContext";

const CategoriesManager = ({ categories, onCategoryAdded }) => {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: '', slug: '', description: '' });
    setEditingId(null);
    setShowForm(false);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/categories/${editingId}` : '/api/categories';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(editingId ? 'Category updated!' : 'Category created!');
        resetForm();
        setTimeout(() => {
          onCategoryAdded();
          setMessage('');
        }, 500);
      } else {
        const data = await response.json();
        setMessage(data.error || 'Error saving category');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setMessage('Category deleted!');
        setTimeout(() => {
          onCategoryAdded();
          setMessage('');
        }, 500);
      }
    } catch (error) {
      setMessage('Error deleting category');
    }
  };

  const handleEdit = (category) => {
    setFormData(category);
    setEditingId(category.id);
    setShowForm(true);
  };

  return (
    <div className="admin-manager">
      <div className="admin-manager-header">
        <h2>{t('admin.categories')}</h2>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="admin-btn admin-btn-primary"
        >
          {showForm ? t('admin.cancel') : t('admin.addCategory')}
        </button>
      </div>

      {message && <div className={`admin-message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-group">
            <label htmlFor="name">{t('admin.categoryName')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Starters"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="slug">{t('admin.slug')}</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              placeholder="e.g., starters"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="description">{t('admin.description')}</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder={t('admin.categoryDescription')}
              rows="3"
            />
          </div>

          <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">
            {loading ? t('admin.saving') : editingId ? t('admin.update') : t('admin.create')}
          </button>
        </form>
      )}

      <div className="admin-list">
        {categories.length === 0 ? (
          <p>{t('admin.noCategoriesYet')}</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('admin.name')}</th>
                <th>{t('admin.slug')}</th>
                <th>{t('admin.description')}</th>
                <th>{t('admin.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td>{category.description || '-'}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(category)}
                      className="admin-btn admin-btn-small"
                    >
                      {t('admin.edit')}
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="admin-btn admin-btn-small admin-btn-danger"
                    >
                      {t('admin.delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CategoriesManager;
