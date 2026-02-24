const pool = require('../config/database');
require('dotenv').config();

async function seedDefaultServices() {
  try {
    console.log('🚀 Starting to reset and seed default services...\n');

    // First, delete ALL existing services
    console.log('🗑️  Deleting all existing services...');
    await pool.query('DELETE FROM services');
    console.log('✅ All existing services deleted.\n');

    // Services for 4x4 vehicle category
    const services4x4 = [
      {
        customer_id: null,
        service_name: 'Full service',
        vehicle_type: '4x4',
        price: 20.00,
        description: 'Complete full service for 4x4 vehicle',
        status: 'in_progress'
      },
      {
        customer_id: null,
        service_name: 'Full Body wash with shampoo',
        vehicle_type: '4x4',
        price: 15.00,
        description: 'Full body wash with premium shampoo for 4x4 vehicle',
        status: 'in_progress'
      },
      {
        customer_id: null,
        service_name: 'Only water body wash',
        vehicle_type: '4x4',
        price: 10.00,
        description: 'Basic water body wash for 4x4 vehicle',
        status: 'in_progress'
      }
    ];

    // Services for Saloon vehicle category
    const servicesSaloon = [
      {
        customer_id: null,
        service_name: 'Full service',
        vehicle_type: 'Saloon',
        price: 15.00,
        description: 'Complete full service for saloon vehicle',
        status: 'in_progress'
      },
      {
        customer_id: null,
        service_name: 'Full Body wash with shampoo',
        vehicle_type: 'Saloon',
        price: 10.00,
        description: 'Full body wash with premium shampoo for saloon vehicle',
        status: 'in_progress'
      },
      {
        customer_id: null,
        service_name: 'Only water body wash',
        vehicle_type: 'Saloon',
        price: 5.00,
        description: 'Basic water body wash for saloon vehicle',
        status: 'in_progress'
      }
    ];

    const allServices = [...services4x4, ...servicesSaloon];

    // Insert all services
    console.log('➕ Adding default services...\n');
    for (const service of allServices) {
      await pool.query(
        'INSERT INTO services (customer_id, service_name, vehicle_type, price, description, status) VALUES (?, ?, ?, ?, ?, ?)',
        [service.customer_id, service.service_name, service.vehicle_type, service.price, service.description, service.status]
      );
      console.log(`✅ Added: ${service.service_name} (${service.vehicle_type}) - ${service.price} AED`);
    }

    console.log(`\n✨ Successfully reset and added ${allServices.length} default services!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding default services:', error);
    process.exit(1);
  }
}

seedDefaultServices();

