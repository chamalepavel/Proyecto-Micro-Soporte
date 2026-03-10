const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verificarToken } = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios' });
    }

    const usuarioExistente = await User.findByEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Ya existe una cuenta con ese email' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await User.create({
      full_name,
      email,
      password_hash,
      role: role || 'client'
    });

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        user_id:   nuevoUsuario.user_id,
        full_name: nuevoUsuario.full_name,
        email:     nuevoUsuario.email,
        role:      nuevoUsuario.role
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    const usuario = await User.findByEmail(email);

    if (!usuario) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const contrasenaCorrecta = await bcrypt.compare(password, usuario.password_hash);

    if (!contrasenaCorrecta) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign(
      {
        user_id: usuario.user_id,
        email:   usuario.email,
        role:    usuario.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        user_id:   usuario.user_id,
        full_name: usuario.full_name,
        email:     usuario.email,
        role:      usuario.role
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

router.get('/perfil', verificarToken, async (req, res) => {
  try {
    res.json({
      usuario: {
        user_id:    req.usuario.user_id,
        full_name:  req.usuario.full_name,
        email:      req.usuario.email,
        role:       req.usuario.role,
        created_at: req.usuario.created_at
      }
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
});

module.exports = router;
