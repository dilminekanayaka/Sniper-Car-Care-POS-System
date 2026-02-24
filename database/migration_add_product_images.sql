-- Migration to add image_url column to products table

USE sniper_car_care;

-- Add image_url column to products table
ALTER TABLE products 
ADD COLUMN image_url VARCHAR(500) AFTER stock;

SELECT 'Product images column added successfully!' as message;

