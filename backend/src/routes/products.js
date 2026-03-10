const express = require('express');
const Product = require('../models/Product');
const { verificarToken, requerirRol } = require('../middleware/auth');

const router = express.Router();

router.get('/', verificarToken, async (req, res) => {
  try {
    const productos = await Product.getAll();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

router.get('/:id', verificarToken, async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

router.post('/', verificarToken, requerirRol(['admin', 'support']), async (req, res) => {
  try {
    const { nit_customer, product_name, description } = req.body;

    if (!nit_customer || !product_name) {
      return res.status(400).json({ error: 'El NIT de la empresa y el nombre del producto son obligatorios' });
    }

    const nuevoProducto = await Product.create({
      nit_customer,
      product_name,
      description: description || null
    });

    res.status(201).json({
      mensaje: 'Producto creado exitosamente',
      producto: nuevoProducto
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

router.put('/:id', verificarToken, requerirRol(['admin', 'support']), async (req, res) => {
  try {
    const { product_name, description } = req.body;

    const productoActualizado = await Product.update(req.params.id, {
      product_name,
      description
    });

    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({
      mensaje: 'Producto actualizado exitosamente',
      producto: productoActualizado
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

router.delete('/:id', verificarToken, requerirRol(['admin']), async (req, res) => {
  try {
    const producto = await Product.delete(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;
