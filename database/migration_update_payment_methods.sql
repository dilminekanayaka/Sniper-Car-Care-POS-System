-- Migration to update payment methods in payments table
-- Run this to update your existing database

USE sniper_car_care;

-- Temporarily disable safe update mode
SET SQL_SAFE_UPDATES = 0;

-- Update the payments table to use new payment methods
ALTER TABLE payments 
MODIFY COLUMN method ENUM('card', 'cash', 'credit') DEFAULT 'cash';

-- Update any old payment methods to the new ones (if needed)
-- Convert apple_pay, samsung_pay, bank_transfer to card (since they're electronic payments)
UPDATE payments SET method = 'card' WHERE method IN ('apple_pay', 'samsung_pay', 'bank_transfer');

-- Re-enable safe update mode
SET SQL_SAFE_UPDATES = 1;

SELECT 'Payment methods migration completed successfully!' as message;

