const express = require('express');
const Comment = require('../models/Comment');
const { verificarToken, requerirRol } = require('../middleware/auth');

const router = express.Router();

router.delete('/:id', verificarToken, requerirRol(['admin']), async (req, res) => {
  try {
    const comentario = await Comment.delete(req.params.id);

    if (!comentario) {
      return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    res.json({ mensaje: 'Comentario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ error: 'Error al eliminar comentario' });
  }
});

module.exports = router;
