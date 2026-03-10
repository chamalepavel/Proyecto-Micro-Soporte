const express = require('express');
const authRoutes = require('./auth');
const ticketRoutes = require('./tickets');
const productRoutes = require('./products');
const customerRoutes = require('./customers');
const userRoutes = require('./users');
const commentRoutes = require('./comments');

const router = express.Router();

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de tickets
router.use('/tickets', ticketRoutes);

// Rutas de productos
router.use('/products', productRoutes);

// Rutas de clientes
router.use('/customers', customerRoutes);

// Rutas de usuarios
router.use('/users', userRoutes);

// Rutas de comentarios
router.use('/comments', commentRoutes);

module.exports = router;