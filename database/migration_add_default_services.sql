-- Migration: Add default services for Saloon and 4x4 vehicle categories
-- Services page default services

USE sniper_car_care;

-- Insert services for 4x4 vehicle category
INSERT INTO services (customer_id, service_name, vehicle_type, price, description, status) VALUES
(NULL, 'Full service', '4x4', 20.00, 'Complete full service for 4x4 vehicle', 'in_progress'),
(NULL, 'Full Body wash with shampoo', '4x4', 15.00, 'Full body wash with premium shampoo for 4x4 vehicle', 'in_progress'),
(NULL, 'Only water body wash', '4x4', 10.00, 'Basic water body wash for 4x4 vehicle', 'in_progress');

-- Insert services for Saloon vehicle category
INSERT INTO services (customer_id, service_name, vehicle_type, price, description, status) VALUES
(NULL, 'Full service', 'Saloon', 15.00, 'Complete full service for saloon vehicle', 'in_progress'),
(NULL, 'Full Body wash with shampoo', 'Saloon', 10.00, 'Full body wash with premium shampoo for saloon vehicle', 'in_progress'),
(NULL, 'Only water body wash', 'Saloon', 5.00, 'Basic water body wash for saloon vehicle', 'in_progress');

