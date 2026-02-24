-- Quick check: Does source column exist?
USE sniper_car_care;

SELECT 
    COLUMN_NAME, 
    COLUMN_TYPE, 
    COLUMN_DEFAULT,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'sniper_car_care' 
  AND TABLE_NAME = 'orders'
  AND COLUMN_NAME = 'source';

-- If you see results above, column EXISTS ✅
-- If no results, column does NOT exist ❌

