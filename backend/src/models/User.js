const db = require('../db');

const User = {
  getAll: async () => {
    const result = await db.query(
      'SELECT user_id, full_name, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    return result.rows;
  },

  findById: async (id) => {
    const result = await db.query(
      'SELECT user_id, full_name, email, role, created_at FROM users WHERE user_id = $1',
      [id]
    );
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  create: async ({ full_name, email, password_hash, role }) => {
    const result = await db.query(
      'INSERT INTO users (full_name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING user_id, full_name, email, role, created_at',
      [full_name, email, password_hash, role]
    );
    return result.rows[0];
  },

  update: async (id, { full_name, email, role }) => {
    const result = await db.query(
      'UPDATE users SET full_name = $1, email = $2, role = $3 WHERE user_id = $4 RETURNING user_id, full_name, email, role, created_at',
      [full_name, email, role, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await db.query(
      'DELETE FROM users WHERE user_id = $1 RETURNING user_id, full_name, email',
      [id]
    );
    return result.rows[0];
  },
};

module.exports = User;
