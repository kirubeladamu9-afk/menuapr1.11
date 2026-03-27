'use client';

import React, { useState } from 'react';

const CategoriesManager = ({ categories, onCategoryAdded }) => {
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
        <h2>Categories</h2>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="admin-btn admin-btn-primary"
        >
          {showForm ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {message && <div className={`admin-message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-group">
            <label htmlFor="name">Category Name *</label>
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
            <label htmlFor="slug">Slug *</label>
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
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Category description"
              rows="3"
            />
          </div>

          <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">
            {loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <div className="admin-list">
        {categories.length === 0 ? (
          <p>No categories yet. Create one to get started!</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Description</th>
                <th>Actions</th>
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
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="admin-btn admin-btn-small admin-btn-danger"
                    >
                      Delete
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
