import mysql from 'mysql2/promise';

let connectionPool = null;

async function getConnection() {
  if (!connectionPool) {
    connectionPool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
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

export async function initializeDatabase() {
  const pool = await getConnection();
  const connection = await pool.getConnection();

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

    // Create default admin user if it doesn't exist
    try {
      await connection.execute(
        'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin123', 'admin@starbelly.com', 'admin']
      );
      console.log('Default admin user created');
    } catch (e) {
      // User might already exist, that's fine
      console.log('Admin user already exists');
    }

    console.log('Database initialized successfully');
  } finally {
    connection.release();
  }
}

export async function queryDatabase(sql, values = []) {
  const pool = await getConnection();
  const connection = await pool.getConnection();
  
  try {
    const [results] = await connection.execute(sql, values);
    return results;
  } finally {
    connection.release();
  }
}

export default getConnection;
