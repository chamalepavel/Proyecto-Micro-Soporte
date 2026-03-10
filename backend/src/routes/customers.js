const express = require('express');
const Customer = require('../models/Customer');
const { verificarToken, requerirRol } = require('../middleware/auth');

const router = express.Router();

router.get('/', verificarToken, async (req, res) => {
  try {
    const empresas = await Customer.getAll();
    res.json(empresas);
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    res.status(500).json({ error: 'Error al obtener empresas' });
  }
});

router.get('/:nit', verificarToken, async (req, res) => {
  try {
    const empresa = await Customer.findByNit(req.params.nit);

    if (!empresa) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }

    res.json(empresa);
  } catch (error) {
    console.error('Error al obtener empresa:', error);
    res.status(500).json({ error: 'Error al obtener empresa' });
  }
});

router.post('/', verificarToken, requerirRol(['admin', 'support']), async (req, res) => {
  try {
    const { nit, company_name, contact_email } = req.body;

    if (!nit || !company_name) {
      return res.status(400).json({ error: 'El NIT y el nombre de la empresa son obligatorios' });
    }

    const nuevaEmpresa = await Customer.create({
      nit,
      company_name,
      contact_email: contact_email || null
    });

    res.status(201).json({
      mensaje: 'Empresa creada exitosamente',
      empresa: nuevaEmpresa
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Ya existe una empresa con ese NIT' });
    }
    console.error('Error al crear empresa:', error);
    res.status(500).json({ error: 'Error al crear empresa' });
  }
});

router.put('/:nit', verificarToken, requerirRol(['admin', 'support']), async (req, res) => {
  try {
    const { company_name, contact_email } = req.body;

    const empresaActualizada = await Customer.update(req.params.nit, {
      company_name,
      contact_email
    });

    if (!empresaActualizada) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }

    res.json({
      mensaje: 'Empresa actualizada exitosamente',
      empresa: empresaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar empresa:', error);
    res.status(500).json({ error: 'Error al actualizar empresa' });
  }
});

router.delete('/:nit', verificarToken, requerirRol(['admin']), async (req, res) => {
  try {
    const empresa = await Customer.delete(req.params.nit);

    if (!empresa) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }

    res.json({ mensaje: 'Empresa eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar empresa:', error);
    res.status(500).json({ error: 'Error al eliminar empresa' });
  }
});

module.exports = router;
