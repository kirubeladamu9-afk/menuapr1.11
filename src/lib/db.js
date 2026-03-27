import mysql from 'mysql2/promise';
import { hashPassword } from './password.js';

let connectionPool = null;
let initPromise = null;

async function createPool() {
  if (!connectionPool) {
    connectionPool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'starbelly',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return connectionPool;
}

async function getConnection() {
  const pool = await createPool();
  return pool.getConnection();
}

export async function initializeDatabase() {
  // Prevent multiple concurrent initialization attempts
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const connection = await getConnection();

    try {
      // Create users table
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          email VARCHAR(255),
          role VARCHAR(50) DEFAULT 'admin',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Create categories table
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS categories (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Create menu_items table
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS menu_items (
          id INT AUTO_INCREMENT PRIMARY KEY,
          category_id INT NOT NULL,
          title VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          currency VARCHAR(10) DEFAULT '$',
          image VARCHAR(500),
          text TEXT,
          badge VARCHAR(500),
          rating INT DEFAULT 5,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
        )
      `);

      // Check if admin user exists
      const [existingUsers] = await connection.execute(
        'SELECT COUNT(*) as count FROM users WHERE username = ?',
        ['admin']
      );

      // Create default admin user if it doesn't exist
      if (existingUsers[0].count === 0) {
        const hashedPassword = await hashPassword('admin123');
        await connection.execute(
          'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)',
          ['admin', hashedPassword, 'admin@starbelly.com', 'admin']
        );
        console.log('✓ Default admin user created with encrypted password');
      }

      console.log('✓ Database initialized successfully');
      return true;
    } catch (error) {
      console.error('✗ Database initialization error:', error.message);
      throw error;
    } finally {
      connection.release();
    }
  })();

  return initPromise;
}

export async function queryDatabase(sql, values = []) {
  // Ensure database is initialized
  try {
    await initializeDatabase();
  } catch (e) {
    console.log('Initialization already attempted');
  }

  const connection = await getConnection();
  
  try {
    const [results] = await connection.execute(sql, values);
    return results;
  } finally {
    connection.release();
  }
}

export default createPool;
