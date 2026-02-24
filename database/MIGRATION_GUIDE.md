# Migration Guide: Add Source Column to Orders

## Error Explanation

You're seeing two errors:

1. **Error 1060: Duplicate column name 'source'**
   - The `source` column already exists in the `orders` table
   - This happens if you ran the migration before

2. **Error 1175: Safe update mode**
   - MySQL Workbench has "Safe Update Mode" enabled
   - Requires UPDATE statements to use a WHERE clause with a KEY column

## ✅ Solution: Use Fixed Migration Script

I've created a **safe migration script** that handles both issues:

### File: `database/migration_add_source_fixed.sql`

This script:
- ✅ Checks if column exists before adding it
- ✅ Uses proper WHERE clause with `id > 0` (KEY column)
- ✅ Won't fail if column already exists

---

## How to Run in MySQL Workbench

### Method 1: Use Fixed Migration (Recommended)

1. **Open MySQL Workbench**

2. **Connect to your database**

3. **Open the fixed migration file:**
   - File → Open SQL Script
   - Navigate to: `D:\Car Service\database\migration_add_source_fixed.sql`
   - Click "Open"

4. **Execute:**
   - Click ⚡ Execute button (or Ctrl+Shift+Enter)
   - Should complete without errors

### Method 2: Check if Column Already Exists

Run this query first to check:

```sql
USE sniper_car_care;

SELECT COLUMN_NAME, COLUMN_TYPE, COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'sniper_car_care' 
  AND TABLE_NAME = 'orders'
  AND COLUMN_NAME = 'source';
```

**If you see results:** Column already exists! ✅ No migration needed.

**If no results:** Run the fixed migration script.

---

## Alternative: Manual Check

If you want to verify manually:

1. **In MySQL Workbench:**
   - Left sidebar → `sniper_car_care` database
   - Expand → `Tables` → `orders`
   - Right-click → `Table Inspector` or `Alter Table`
   - Look for `source` column

2. **If column exists:**
   - ✅ Migration already applied
   - Just update existing NULL values (use fixed script)

3. **If column doesn't exist:**
   - Run the fixed migration script

---

## Safe Update Mode Fix (If Needed)

If you want to disable safe update mode (not recommended for production):

1. **In MySQL Workbench:**
   - Edit → Preferences → SQL Editor
   - Uncheck "Safe Updates"
   - Reconnect to server

⚠️ **Warning:** This allows unsafe UPDATE/DELETE operations. Only use for development!

---

## Verify Migration Success

After running the migration, verify:

```sql
-- Check column exists
DESCRIBE orders;

-- Check source column values
SELECT 
  source,
  COUNT(*) as count
FROM orders
GROUP BY source;
```

**Expected:**
- Column `source` exists
- All existing orders have `source = 'pos'`
- New orders from customer website will have `source = 'customer_website'`

---

## Quick Fix for Current Error

If column already exists, just update NULL values:

```sql
USE sniper_car_care;

-- This uses WHERE with KEY column (id) for safe mode
UPDATE orders 
SET source = 'pos' 
WHERE (source IS NULL OR source = '') AND id > 0;
```

---

## Summary

✅ **Use:** `database/migration_add_source_fixed.sql`  
❌ **Don't use:** Old migration script (will fail if column exists)

The fixed script is **safe** and **idempotent** - you can run it multiple times without errors.

