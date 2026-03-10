const db = require('../db');

const Ticket = {
  getAll: async () => {
    const result = await db.query(
      `SELECT t.*,
              p.product_name,
              u1.full_name AS created_by_name,
              u2.full_name AS assigned_to_name
       FROM tickets t
       LEFT JOIN products p  ON t.product_id  = p.product_id
       LEFT JOIN users u1    ON t.created_by   = u1.user_id
       LEFT JOIN users u2    ON t.assigned_to  = u2.user_id
       ORDER BY t.created_at DESC`
    );
    return result.rows;
  },

  findById: async (id) => {
    const result = await db.query(
      `SELECT t.*,
              p.product_name,
              u1.full_name AS created_by_name,
              u2.full_name AS assigned_to_name
       FROM tickets t
       LEFT JOIN products p  ON t.product_id  = p.product_id
       LEFT JOIN users u1    ON t.created_by   = u1.user_id
       LEFT JOIN users u2    ON t.assigned_to  = u2.user_id
       WHERE t.ticket_id = $1`,
      [id]
    );
    return result.rows[0];
  },

  getByUser: async (user_id) => {
    const result = await db.query(
      `SELECT t.*,
              p.product_name,
              u1.full_name AS created_by_name,
              u2.full_name AS assigned_to_name
       FROM tickets t
       LEFT JOIN products p  ON t.product_id  = p.product_id
       LEFT JOIN users u1    ON t.created_by   = u1.user_id
       LEFT JOIN users u2    ON t.assigned_to  = u2.user_id
       WHERE t.created_by = $1
       ORDER BY t.created_at DESC`,
      [user_id]
    );
    return result.rows;
  },

  create: async ({ product_id, created_by, subject, description, type, impact }) => {
    const result = await db.query(
      `INSERT INTO tickets (product_id, created_by, subject, description, type, impact)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [product_id, created_by, subject, description, type, impact]
    );
    return result.rows[0];
  },

  update: async (id, { status, assigned_to, level }) => {
    const result = await db.query(
      `UPDATE tickets
       SET status = $1, assigned_to = $2, level = $3
       WHERE ticket_id = $4
       RETURNING *`,
      [status, assigned_to, level, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await db.query(
      'DELETE FROM tickets WHERE ticket_id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  },
};

module.exports = Ticket;
