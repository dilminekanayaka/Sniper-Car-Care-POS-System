const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function seedUsers() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sniper_car_care',
    port: process.env.DB_PORT || 3306
  });

  try {
    // Hash passwords
    const adminHash = await bcrypt.hash('admin123', 10);
    const staffHash = await bcrypt.hash('staff123', 10);

    // Delete existing users (optional - comment out if you want to keep existing)
    // await connection.query('DELETE FROM users WHERE email IN (?, ?)', ['admin@sniper.com', 'staff@sniper.com']);

    // Insert users
    await connection.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE password = VALUES(password)',
      ['Admin User', 'admin@sniper.com', adminHash, 'admin']
    );

    await connection.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE password = VALUES(password)',
      ['Staff User', 'staff@sniper.com', staffHash, 'staff']
    );

    console.log('✅ Users seeded successfully!');
    console.log('Admin: admin@sniper.com / admin123');
    console.log('Staff: staff@sniper.com / staff123');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  } finally {
    await connection.end();
  }
}

seedUsers();

