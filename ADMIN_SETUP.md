# Admin Panel Setup Guide

## Overview
The admin panel provides a complete CRUD interface for managing your restaurant menu, including categories and individual menu items.

## Features
- ✅ User authentication with password protection
- ✅ Manage menu categories (Create, Read, Update, Delete)
- ✅ Manage menu items with full details (image, price, description, rating, etc.)
- ✅ MySQL database integration for persistent storage
- ✅ Responsive design for desktop and mobile

## Access the Admin Panel

### URL
Navigate to: `http://localhost:3000/admin` (or your domain)

### Default Login
- **Password**: `admin123` (Change this via `ADMIN_PASSWORD` environment variable)

## First-Time Setup

### 1. Initialize the Database
Before using the admin panel, you need to initialize the database tables. Run:

```bash
curl -X POST http://localhost:3000/api/admin/init-db \
  -H "x-admin-secret: admin123" \
  -H "Content-Type: application/json"
```

Or use the admin initialization flow in your browser.

### 2. Change Default Password
Update the `ADMIN_PASSWORD` environment variable in your `.env` file:

```
ADMIN_PASSWORD=your_secure_password_here
```

Then restart the development server.

### 3. Add Menu Categories
1. Go to the admin panel
2. Click the "Categories" tab
3. Click "Add Category"
4. Fill in:
   - **Category Name**: e.g., "Starters", "Main Dishes"
   - **Slug**: e.g., "starters", "main-dishes"
   - **Description**: Optional category description

### 4. Add Menu Items
1. Go to the admin panel
2. Click the "Menu Items" tab
3. Click "Add Item"
4. Fill in:
   - **Category**: Select from created categories
   - **Dish Name**: Name of the dish
   - **Price**: Item price
   - **Currency**: Currency symbol (default: $)
   - **Image URL**: Path to dish image (e.g., `/img/menu/1.jpg`)
   - **Description**: Ingredients and dish details
   - **Badge**: Optional HTML badge (e.g., Vegan, Hot)
   - **Rating**: Star rating (1-5)

## Environment Variables

```env
# MySQL Configuration
MYSQL_HOST=localhost          # MySQL server host
MYSQL_USER=root              # MySQL username
MYSQL_PASSWORD=password      # MySQL password
MYSQL_DATABASE=starbelly     # Database name

# Admin Configuration
ADMIN_PASSWORD=admin123      # Admin panel password
```

## API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Menu Items
- `GET /api/menu-items` - Get all menu items
- `POST /api/menu-items` - Create a new item
- `PUT /api/menu-items/:id` - Update an item
- `DELETE /api/menu-items/:id` - Delete an item

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/init-db` - Initialize database

## Database Schema

### categories table
- `id` - Primary key
- `name` - Category name
- `slug` - URL-friendly name
- `description` - Category description
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### menu_items table
- `id` - Primary key
- `category_id` - Foreign key to categories
- `title` - Dish name
- `price` - Item price
- `currency` - Currency symbol
- `image` - Image URL
- `text` - Description/ingredients
- `badge` - HTML badge
- `rating` - Star rating (1-5)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Syncing with QR Menu

The QR Code Menu page (`/qr-menu`) automatically reads data from the MySQL database instead of static JSON files. Updates made in the admin panel are instantly reflected on the QR menu.

### Navigation Links
The main navigation menu links directly to the QR menu with specific categories:
- Starters → `/qr-menu?category=0`
- Main Dishes → `/qr-menu?category=1`
- Drinks → `/qr-menu?category=2`
- Desserts → `/qr-menu?category=3`

## Security Recommendations

1. **Change Default Password**: Always change the default admin password in production
2. **Use HTTPS**: Deploy with HTTPS to protect password transmission
3. **Strong Passwords**: Use strong, unique passwords for the admin panel
4. **Database Security**: Ensure your MySQL database is properly secured
5. **API Authentication**: Consider adding JWT tokens for API endpoints in production

## Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check environment variables are set correctly
- Ensure database exists: `CREATE DATABASE starbelly;`

### Login Issues
- Check `ADMIN_PASSWORD` environment variable
- Default password is `admin123`
- Try clearing browser cache/cookies

### Images Not Showing
- Verify image paths are correct (e.g., `/img/menu/1.jpg`)
- Ensure images exist in the public folder
- Check relative vs absolute paths

## Migration from JSON to Database

If you need to migrate existing JSON data to MySQL:

1. Export your current menu data
2. Use the admin panel to manually recreate categories and items
3. Or create a migration script to batch import data

## Support

For issues or questions about the admin panel, check the API endpoints and database logs for more details.
