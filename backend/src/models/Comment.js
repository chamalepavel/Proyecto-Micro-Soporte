const db = require('../db');

const Comment = {
  getByTicket: async (ticket_id) => {
    const result = await db.query(
      `SELECT c.*, u.full_name, u.role
       FROM comments c
       LEFT JOIN users u ON c.user_id = u.user_id
       WHERE c.ticket_id = $1
       ORDER BY c.created_at ASC`,
      [ticket_id]
    );
    return result.rows;
  },

  create: async ({ ticket_id, user_id, content }) => {
    const result = await db.query(
      'INSERT INTO comments (ticket_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
      [ticket_id, user_id, content]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await db.query(
      'DELETE FROM comments WHERE comment_id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  },
};

module.exports = Comment;
