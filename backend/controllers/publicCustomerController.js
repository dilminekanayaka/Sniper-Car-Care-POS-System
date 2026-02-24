const pool = require('../config/database');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get customer by vehicle plate (public)
// @route   GET /api/public/customer/by-plate
// @access  Public
const getCustomerByPlate = asyncHandler(async (req, res) => {
  const { plate } = req.query;

  if (!plate) {
    return res.status(400).json({ message: 'Vehicle plate is required' });
  }

  const [customers] = await pool.query(
    'SELECT * FROM customers WHERE vehicle_plate = ?',
    [plate]
  );

  if (customers.length === 0) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  res.json({ customer: customers[0] });
});

// @desc    Get customer by ID (public)
// @route   GET /api/public/customer/by-id
// @access  Public
const getCustomerById = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Customer ID is required' });
  }

  const [customers] = await pool.query(
    'SELECT * FROM customers WHERE id = ?',
    [id]
  );

  if (customers.length === 0) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  res.json({ customer: customers[0] });
});

module.exports = {
  getCustomerByPlate,
  getCustomerById
};

