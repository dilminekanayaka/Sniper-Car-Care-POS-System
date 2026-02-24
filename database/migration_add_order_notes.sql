-- Add notes column to orders table for customer service booking requests

USE sniper_car_care;

-- Add notes column if it doesn't exist
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT NULL AFTER source;

-- Display message
SELECT 'Migration completed: Added notes column to orders table' AS status;


















