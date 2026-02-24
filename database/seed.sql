-- Seed data for Sniper Car Care ANPR POS System

USE sniper_car_care;

-- Insert default admin user
-- NOTE: Passwords are bcrypt hashed. Use the /api/auth/register endpoint or run:
-- node backend/scripts/seedUsers.js
-- Default passwords: admin123 / staff123
-- 
-- To generate bcrypt hash manually in Node.js:
-- const bcrypt = require('bcryptjs');
-- const hash = await bcrypt.hash('admin123', 10);
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@sniper.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin'),
('Staff User', 'staff@sniper.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'staff');

-- Default passwords: admin123 / staff123
-- These are bcrypt hashes generated with salt rounds 10

-- Insert sample suppliers
INSERT INTO suppliers (name, contact_person, phone, email, address) VALUES
('Auto Parts Ltd', 'John Doe', '+92-300-1234567', 'contact@autoparts.com', 'Karachi, Pakistan'),
('Car Care Supplies', 'Jane Smith', '+92-300-7654321', 'info@carcare.com', 'Lahore, Pakistan'),
('Premium Accessories', 'Ahmed Khan', '+92-300-1112233', 'sales@premium.com', 'Islamabad, Pakistan');

-- Insert sample products
INSERT INTO products (name, description, category, price, stock, supplier_id) VALUES
-- Accessories
('Car Air Freshener', 'Premium vanilla scented air freshener with long-lasting fragrance', 'Accessories', 250.00, 50, 1),
('Phone Holder', 'Universal car phone mount with 360° rotation and secure grip', 'Accessories', 800.00, 30, 3),
('Car Charger', 'Fast charging USB-C car charger with dual ports and LED indicator', 'Accessories', 1200.00, 25, 3),
('Dash Cam', '1080p HD dash camera with night vision and loop recording', 'Accessories', 5000.00, 15, 2),
('Seat Covers', 'Premium leather seat covers with custom fit for all car models', 'Accessories', 3500.00, 20, 2),
('Steering Wheel Cover', 'Comfortable leather steering wheel cover with anti-slip design', 'Accessories', 1500.00, 35, 2),
('Car Floor Mats', 'All-weather rubber floor mats with deep channels for water and dirt', 'Accessories', 2800.00, 28, 3),
('Sun Shade', 'Foldable car sun shade with reflective coating to protect interior', 'Accessories', 900.00, 42, 1),
('Trunk Organizer', 'Collapsible trunk organizer with multiple compartments', 'Accessories', 1800.00, 22, 3),
('LED Interior Lights', 'RGB LED interior light strip with remote control and app support', 'Accessories', 3200.00, 18, 2),
('Car Perfume', 'Premium car perfume diffuser with multiple scent options', 'Accessories', 600.00, 55, 1),
('Cup Holder Expander', 'Universal cup holder expander for larger bottles and cups', 'Accessories', 500.00, 60, 3),
('Car Vacuum Cleaner', 'Portable 12V car vacuum cleaner with HEPA filter', 'Accessories', 4500.00, 12, 2),
('Bluetooth FM Transmitter', 'Wireless FM transmitter with USB charging and hands-free calling', 'Accessories', 2200.00, 25, 3),
('Car Phone Mount', 'Magnetic car phone mount with wireless charging capability', 'Accessories', 3500.00, 20, 2),

-- Services
('Full Service Package', 'Complete car service including oil change, filter replacement, and comprehensive inspection', 'Services', 5000.00, 0, NULL),
('Body Wash', 'Premium exterior car wash with wax application and tire shine', 'Services', 800.00, 0, NULL),
('Interior Cleaning', 'Deep interior cleaning, vacuuming, and leather conditioning', 'Services', 1500.00, 0, NULL),
('Engine Oil Change', 'High-quality synthetic engine oil replacement with filter', 'Services', 2000.00, 0, NULL),
('Tire Rotation', 'Professional tire rotation and balancing service', 'Services', 600.00, 0, NULL),
('AC Service', 'Complete AC system service including gas refill and filter cleaning', 'Services', 3000.00, 0, NULL),
('Engine Tune-Up', 'Complete engine tune-up with spark plug replacement and timing check', 'Services', 4000.00, 0, NULL),
('Brake Service', 'Complete brake service including pad replacement and fluid change', 'Services', 4500.00, 0, NULL),
('Wheel Alignment', 'Professional wheel alignment and balancing service', 'Services', 1200.00, 0, NULL),
('Paint Protection', 'Ceramic coating and paint protection film installation', 'Services', 15000.00, 0, NULL),
('Windshield Polish', 'Professional windshield polishing and water repellent treatment', 'Services', 1500.00, 0, NULL),
('Dent Removal', 'Paintless dent removal service for minor dents and scratches', 'Services', 2500.00, 0, NULL),

-- Spare Parts
('Brake Pads', 'Premium ceramic brake pads set for smooth and quiet braking', 'Spare Parts', 3500.00, 40, 1),
('Air Filter', 'High-quality paper air filter with extended service life', 'Spare Parts', 1200.00, 60, 1),
('Oil Filter', 'Premium synthetic oil filter with anti-drainback valve', 'Spare Parts', 800.00, 80, 1),
('Spark Plugs Set', 'Set of 4 iridium spark plugs for improved fuel efficiency', 'Spare Parts', 2500.00, 35, 1),
('Car Battery', '12V maintenance-free car battery with 2-year warranty', 'Spare Parts', 12000.00, 15, 2),
('Windscreen Wiper', 'Pair of premium silicone wiper blades with easy installation', 'Spare Parts', 1500.00, 50, 2),
('Headlight Bulb', 'LED headlight bulb with 6000K color temperature', 'Spare Parts', 2800.00, 30, 1),
('Timing Belt', 'High-strength timing belt with precise tooth profile', 'Spare Parts', 5500.00, 18, 1),
('Radiator Hose', 'Premium silicone radiator hose with heat resistance', 'Spare Parts', 3200.00, 25, 2),
('Fuel Filter', 'Premium fuel filter with high flow rate and durability', 'Spare Parts', 1800.00, 40, 1),
('Alternator', 'High-output alternator with voltage regulator', 'Spare Parts', 18000.00, 8, 2),
('Starter Motor', 'Rebuilt starter motor with solenoid and warranty', 'Spare Parts', 15000.00, 10, 2),
('Power Steering Pump', 'OEM quality power steering pump with seals', 'Spare Parts', 14000.00, 12, 1),
('Water Pump', 'High-efficiency water pump with ceramic seal', 'Spare Parts', 8500.00, 15, 2),
('Serpentine Belt', 'Premium serpentine belt with multiple grooves', 'Spare Parts', 4200.00, 28, 1);

-- Insert sample customers
INSERT INTO customers (name, phone, vehicle_plate, vehicle_type, province) VALUES
('Ahmed Ali', '+92-300-1111111', 'ABC1234', 'Saloon', 'Punjab'),
('Sara Khan', '+92-300-2222222', 'XYZ5678', 'Saloon', 'Sindh'),
('Mohammed Hassan', '+92-300-3333333', 'DEF9012', '4x4', 'KPK'),
('Fatima Ahmed', '+92-300-4444444', 'GHI3456', 'Saloon', 'Punjab'),
('Ali Raza', '+92-300-5555555', 'JKL7890', '4x4', 'Balochistan');

-- Initialize loyalty points for customers
INSERT INTO loyalty (customer_id, points) VALUES
(1, 50),
(2, 30),
(3, 100),
(4, 20),
(5, 75);

-- Insert sample services
INSERT INTO services (customer_id, service_name, vehicle_type, price, description, status) VALUES
(1, 'Full Service Package', 'Saloon', 5000.00, 'Complete service for saloon car', 'completed'),
(2, 'Body Wash', 'Saloon', 800.00, 'Exterior wash and wax', 'completed'),
(3, 'Full Service Package', '4x4', 5500.00, 'Complete service for 4x4 vehicle', 'in_progress'),
(4, 'Interior Cleaning', 'Saloon', 1500.00, 'Deep interior cleaning', 'pending'),
(5, 'Engine Oil Change', '4x4', 2200.00, 'Oil change for 4x4', 'completed');

-- Insert sample orders
INSERT INTO orders (customer_id, total, discount, status, payment_status) VALUES
(1, 5250.00, 250.00, 'completed', 'paid'),
(2, 800.00, 0.00, 'completed', 'paid'),
(3, 12000.00, 0.00, 'processing', 'partial'),
(4, 3500.00, 0.00, 'pending', 'pending'),
(5, 2200.00, 0.00, 'completed', 'paid');

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
-- Order 1
(1, 6, 1, 5000.00),  -- Full Service
(1, 11, 1, 250.00),  -- Air Freshener

-- Order 2
(2, 7, 1, 800.00),   -- Body Wash

-- Order 3
(3, 15, 1, 12000.00), -- Car Battery

-- Order 4
(4, 5, 1, 3500.00),  -- Seat Covers

-- Order 5
(5, 9, 1, 2200.00);  -- Engine Oil Change

-- Insert sample payments
INSERT INTO payments (order_id, amount, method, status, stripe_payment_id) VALUES
(1, 5000.00, 'card', 'completed', 'pi_mock_123456'),
(2, 800.00, 'cash', 'completed', NULL),
(3, 6000.00, 'credit', 'completed', 'pi_mock_789012'),
(5, 2200.00, 'card', 'completed', 'pi_mock_345678');

