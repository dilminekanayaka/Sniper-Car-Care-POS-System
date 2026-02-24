const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function testLogin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sniper_car_care',
    port: parseInt(process.env.DB_PORT) || 3306
  });

  try {
    // Check if users exist
    const [users] = await connection.query('SELECT id, name, email, role, password FROM users WHERE email = ?', ['admin@sniper.com']);
    
    if (users.length === 0) {
      console.log('❌ Admin user not found. Creating users...');
      
      // Create users
      const adminHash = await bcrypt.hash('admin123', 10);
      const staffHash = await bcrypt.hash('staff123', 10);
      
      await connection.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Admin User', 'admin@sniper.com', adminHash, 'admin']
      );
      
      await connection.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Staff User', 'staff@sniper.com', staffHash, 'staff']
      );
      
      console.log('✅ Users created successfully!');
    } else {
      console.log('✅ Admin user exists');
      
      // Test password
      const user = users[0];
      const isValid = await bcrypt.compare('admin123', user.password);
      
      if (isValid) {
        console.log('✅ Password is correct!');
        console.log(`User: ${user.name} (${user.role})`);
      } else {
        console.log('❌ Password is incorrect. Resetting...');
        
        // Reset password
        const newHash = await bcrypt.hash('admin123', 10);
        await connection.query('UPDATE users SET password = ? WHERE email = ?', [newHash, 'admin@sniper.com']);
        console.log('✅ Password reset successfully!');
      }
    }
    
    // Test login
    const [testUsers] = await connection.query('SELECT * FROM users WHERE email = ?', ['admin@sniper.com']);
    if (testUsers.length > 0) {
      const isValid = await bcrypt.compare('admin123', testUsers[0].password);
      if (isValid) {
        console.log('\n✅ Login test: SUCCESS');
        console.log('You can now login with:');
        console.log('   Email: admin@sniper.com');
        console.log('   Password: admin123');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await connection.end();
  }
}

testLogin();

