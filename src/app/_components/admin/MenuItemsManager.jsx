'use client';

import React, { useState } from 'react';

const MenuItemsManager = ({ menuItems, categories, onItemAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    category_id: '',
    title: '',
    price: '',
    currency: '$',
    image: '',
    text: '',
    badge: '',
    rating: 5,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      category_id: '',
      title: '',
      price: '',
      currency: '$',
      image: '',
      text: '',
      badge: '',
      rating: 5,
    });
    setEditingId(null);
    setShowForm(false);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/menu-items/${editingId}` : '/api/menu-items';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          category_id: parseInt(formData.category_id),
          price: parseFloat(formData.price),
          rating: parseInt(formData.rating),
        }),
      });

      if (response.ok) {
        setMessage(editingId ? 'Item updated!' : 'Item created!');
        resetForm();
        setTimeout(() => {
          onItemAdded();
          setMessage('');
        }, 500);
      } else {
        const data = await response.json();
        setMessage(data.error || 'Error saving item');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/menu-items/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setMessage('Item deleted!');
        setTimeout(() => {
          onItemAdded();
          setMessage('');
        }, 500);
      }
    } catch (error) {
      setMessage('Error deleting item');
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  return (
    <div className="admin-manager">
      <div className="admin-manager-header">
        <h2>Menu Items</h2>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="admin-btn admin-btn-primary"
        >
          {showForm ? 'Cancel' : 'Add Item'}
        </button>
      </div>

      {message && <div className={`admin-message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-group">
            <label htmlFor="category_id">Category *</label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-form-group">
            <label htmlFor="title">Dish Name *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Grilled Salmon"
              required
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="currency">Currency</label>
              <input
                type="text"
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                maxLength="3"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                min="1"
                max="5"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="e.g., /img/menu/1.jpg"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="text">Description</label>
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Dish ingredients and description"
              rows="3"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="badge">Badge (HTML)</label>
            <input
              type="text"
              id="badge"
              name="badge"
              value={formData.badge}
              onChange={handleInputChange}
              placeholder="e.g., &lt;div class='sb-badge sb-vegan'&gt;Vegan&lt;/div&gt;"
            />
          </div>

          <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">
            {loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <div className="admin-list">
        {menuItems.length === 0 ? (
          <p>No menu items yet. Create one to get started!</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.category_name}</td>
                  <td>
                    {item.currency}
                    {item.price}
                  </td>
                  <td>⭐ {item.rating}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(item)}
                      className="admin-btn admin-btn-small"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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

export default MenuItemsManager;
