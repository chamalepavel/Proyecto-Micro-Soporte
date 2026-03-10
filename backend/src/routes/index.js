const express = require('express');
const authRoutes     = require('./auth');
const ticketRoutes   = require('./tickets');
const productRoutes  = require('./products');
const customerRoutes = require('./customers');
const userRoutes     = require('./users');
const commentRoutes  = require('./comments');

const router = express.Router();

router.use('/auth',      authRoutes);
router.use('/tickets',   ticketRoutes);
router.use('/products',  productRoutes);
router.use('/customers', customerRoutes);
router.use('/users',     userRoutes);
router.use('/comments',  commentRoutes);

module.exports = router;
