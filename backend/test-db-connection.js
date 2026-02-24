const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  console.log('Configuration:');
  console.log(`  Host: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`  User: ${process.env.DB_USER || 'root'}`);
  console.log(`  Password: ${process.env.DB_PASSWORD ? '***' : '(empty)'}`);
  console.log(`  Database: ${process.env.DB_NAME || 'sniper_car_care'}`);
  console.log(`  Port: ${process.env.DB_PORT || 3306}\n`);

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'sniper_car_care',
      port: process.env.DB_PORT || 3306
    });
    
    console.log('✅ Database connection successful!');
    const [rows] = await connection.query('SELECT DATABASE() as db');
    console.log(`✅ Connected to database: ${rows[0].db}`);
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n🔧 Trying to connect without password...');
      
      // Try without password
      try {
        const connection2 = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          port: 3306
        });
        console.log('✅ Connection works with EMPTY password!');
        console.log('\n💡 SOLUTION: Update backend/.env file:');
        console.log('   Change: DB_PASSWORD=your_password');
        console.log('   To:     DB_PASSWORD=');
        await connection2.end();
      } catch (error2) {
        console.log('\n❌ Still failed. Possible issues:');
        console.log('   1. MySQL root password is set and you need to use it');
        console.log('   2. MySQL service is not running');
        console.log('   3. MySQL is not installed correctly');
        console.log('\n💡 Next steps:');
        console.log('   1. Check MySQL service: Get-Service | Where-Object {$_.Name -like "*mysql*"}');
        console.log('   2. Try connecting manually: mysql -u root -p');
        console.log('   3. Reset MySQL password (see DATABASE_CONNECTION_FIX.md)');
      }
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n❌ Cannot connect to MySQL server');
      console.log('💡 Make sure MySQL service is running:');
      console.log('   - Open Services (services.msc)');
      console.log('   - Find "MySQL80" or "MySQL"');
      console.log('   - Right-click → Start');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('\n❌ Database does not exist');
      console.log('💡 Create database:');
      console.log('   mysql -u root -p -e "CREATE DATABASE sniper_car_care;"');
    } else {
      console.log('\n❌ Error code:', error.code);
      console.log('💡 Check DATABASE_CONNECTION_FIX.md for detailed solutions');
    }
    
    process.exit(1);
  }
}

testConnection();

