-- Migration: Add source column to orders table
-- Run this if you already have the database created

USE sniper_car_care;

-- Add source column if it doesn't exist
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'pos' AFTER payment_status;

-- Update existing orders
UPDATE orders SET source = 'pos' WHERE source IS NULL OR source = '';

