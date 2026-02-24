-- Migration: Add source column to orders table
-- Safe version that checks if column exists first

USE sniper_car_care;

-- Check if source column exists, if not add it
SET @col_exists = (
  SELECT COUNT(*) 
  FROM INFORMATION_SCHEMA.COLUMNS 
  WHERE TABLE_SCHEMA = 'sniper_car_care' 
    AND TABLE_NAME = 'orders' 
    AND COLUMN_NAME = 'source'
);

-- Add column only if it doesn't exist
SET @sql = IF(@col_exists = 0,
  'ALTER TABLE orders ADD COLUMN source VARCHAR(50) DEFAULT ''pos'' AFTER payment_status',
  'SELECT ''Column source already exists'' AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Update existing orders to set source = 'pos' (using WHERE with KEY column for safe mode)
UPDATE orders 
SET source = 'pos' 
WHERE (source IS NULL OR source = '') AND id > 0;

-- Verify the column exists and has data
SELECT 
  COUNT(*) as total_orders,
  COUNT(CASE WHEN source = 'pos' THEN 1 END) as pos_orders,
  COUNT(CASE WHEN source = 'customer_website' THEN 1 END) as website_orders,
  COUNT(CASE WHEN source IS NULL OR source = '' THEN 1 END) as null_source
FROM orders;

