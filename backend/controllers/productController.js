const pool = require('../config/database');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  if (search) {
    query += ' AND (name LIKE ? OR description LIKE ?)';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm);
  }

  query += ' ORDER BY created_at DESC';

  const [products] = await pool.query(query, params);

  res.json({ products });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [products] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);

  if (products.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({ product: products[0] });
});

// @desc    Create product
// @route   POST /api/products
// @access  Private
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, stock, image_url, supplier_id } = req.body;

  if (!name || !category || !price || stock === undefined) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const [result] = await pool.query(
    'INSERT INTO products (name, description, category, price, stock, image_url, supplier_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, description || null, category, price, stock, image_url || null, supplier_id || null]
  );

  const [newProduct] = await pool.query('SELECT * FROM products WHERE id = ?', [result.insertId]);

  res.status(201).json({ message: 'Product created successfully', product: newProduct[0] });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, category, price, stock, image_url, supplier_id } = req.body;

  const [products] = await pool.query('SELECT id FROM products WHERE id = ?', [id]);
  if (products.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await pool.query(
    'UPDATE products SET name = ?, description = ?, category = ?, price = ?, stock = ?, image_url = ?, supplier_id = ? WHERE id = ?',
    [name, description, category, price, stock, image_url || null, supplier_id || null, id]
  );

  const [updated] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);

  res.json({ message: 'Product updated successfully', product: updated[0] });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [products] = await pool.query('SELECT id FROM products WHERE id = ?', [id]);
  if (products.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await pool.query('DELETE FROM products WHERE id = ?', [id]);

  res.json({ message: 'Product deleted successfully' });
});

// @desc    Update stock
// @route   PATCH /api/products/:id/stock
// @access  Private
const updateStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  if (stock === undefined) {
    return res.status(400).json({ message: 'Stock value is required' });
  }

  await pool.query('UPDATE products SET stock = ? WHERE id = ?', [stock, id]);

  const [updated] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);

  res.json({ message: 'Stock updated successfully', product: updated[0] });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock
};

