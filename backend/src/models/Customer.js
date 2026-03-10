const db = require('../db');

const Customer = {
  getAll: async () => {
    const result = await db.query(
      'SELECT * FROM customers ORDER BY company_name ASC'
    );
    return result.rows;
  },

  findByNit: async (nit) => {
    const result = await db.query(
      'SELECT * FROM customers WHERE nit = $1',
      [nit]
    );
    return result.rows[0];
  },

  create: async ({ nit, company_name, contact_email }) => {
    const result = await db.query(
      'INSERT INTO customers (nit, company_name, contact_email) VALUES ($1, $2, $3) RETURNING *',
      [nit, company_name, contact_email]
    );
    return result.rows[0];
  },

  update: async (nit, { company_name, contact_email }) => {
    const result = await db.query(
      'UPDATE customers SET company_name = $1, contact_email = $2 WHERE nit = $3 RETURNING *',
      [company_name, contact_email, nit]
    );
    return result.rows[0];
  },

  delete: async (nit) => {
    const result = await db.query(
      'DELETE FROM customers WHERE nit = $1 RETURNING *',
      [nit]
    );
    return result.rows[0];
  },
};

module.exports = Customer;
