const express = require('express');
const User = require('../models/User');
const { verificarToken, requerirRol } = require('../middleware/auth');

const router = express.Router();

router.get('/', verificarToken, requerirRol(['admin']), async (req, res) => {
  try {
    const usuarios = await User.getAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

router.get('/:id', verificarToken, requerirRol(['admin']), async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

router.put('/:id', verificarToken, requerirRol(['admin']), async (req, res) => {
  try {
    const { full_name, email, role } = req.body;

    const usuarioActualizado = await User.update(req.params.id, {
      full_name,
      email,
      role
    });

    if (!usuarioActualizado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      mensaje: 'Usuario actualizado exitosamente',
      usuario: usuarioActualizado
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

router.delete('/:id', verificarToken, requerirRol(['admin']), async (req, res) => {
  try {
    const usuario = await User.delete(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

module.exports = router;
