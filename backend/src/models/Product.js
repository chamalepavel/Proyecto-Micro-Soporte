const db = require('../db');

const Product = {
  getAll: async () => {
    const result = await db.query(
      `SELECT p.*, c.company_name
       FROM products p
       JOIN customers c ON p.nit_customer = c.nit
       ORDER BY p.product_name ASC`
    );
    return result.rows;
  },

  findById: async (id) => {
    const result = await db.query(
      `SELECT p.*, c.company_name
       FROM products p
       JOIN customers c ON p.nit_customer = c.nit
       WHERE p.product_id = $1`,
      [id]
    );
    return result.rows[0];
  },

  create: async ({ nit_customer, product_name, description }) => {
    const result = await db.query(
      'INSERT INTO products (nit_customer, product_name, description) VALUES ($1, $2, $3) RETURNING *',
      [nit_customer, product_name, description]
    );
    return result.rows[0];
  },

  update: async (id, { product_name, description }) => {
    const result = await db.query(
      'UPDATE products SET product_name = $1, description = $2 WHERE product_id = $3 RETURNING *',
      [product_name, description, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await db.query(
      'DELETE FROM products WHERE product_id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  },
};

module.exports = Product;
