const express = require('express');
const Ticket  = require('../models/Ticket');
const Comment = require('../models/Comment');
const { verificarToken, requerirRol } = require('../middleware/auth');

const router = express.Router();

router.get('/', verificarToken, async (req, res) => {
  try {
    let tickets;
    if (req.usuario.role === 'client') {
      tickets = await Ticket.getByUser(req.usuario.user_id);
    } else {
      tickets = await Ticket.getAll();
    }
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tickets' });
  }
});

router.get('/:id', verificarToken, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket no encontrado' });

    const comentarios = await Comment.getByTicket(req.params.id);
    res.json({ ticket, comentarios });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ticket' });
  }
});

router.post('/', verificarToken, async (req, res) => {
  try {
    const { subject, description, type, impact, product_id } = req.body;

    if (!subject || !description) {
      return res.status(400).json({ error: 'El asunto y la descripción son obligatorios' });
    }

    const nuevoTicket = await Ticket.create({
      product_id:  product_id || null,
      created_by:  req.usuario.user_id,
      subject,
      description,
      type:   type   || 'incident',
      impact: impact || 'medium'
    });

    res.status(201).json({ mensaje: 'Ticket creado exitosamente', ticket: nuevoTicket });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear ticket' });
  }
});

router.put('/:id', verificarToken, requerirRol(['admin', 'support']), async (req, res) => {
  try {
    const { status, assigned_to, level } = req.body;

    const ticketActualizado = await Ticket.update(req.params.id, {
      status:      status      || 'open',
      assigned_to: assigned_to || null,
      level:       level       || 1
    });

    if (!ticketActualizado) return res.status(404).json({ error: 'Ticket no encontrado' });

    res.json({ mensaje: 'Ticket actualizado exitosamente', ticket: ticketActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar ticket' });
  }
});

router.delete('/:id', verificarToken, requerirRol(['admin']), async (req, res) => {
  try {
    const ticket = await Ticket.delete(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket no encontrado' });

    res.json({ mensaje: 'Ticket eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar ticket' });
  }
});

router.post('/:id/comentarios', verificarToken, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'El comentario no puede estar vacío' });
    }

    const comentario = await Comment.create({
      ticket_id: req.params.id,
      user_id:   req.usuario.user_id,
      content:   content.trim()
    });

    res.status(201).json({ mensaje: 'Comentario agregado', comentario });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar comentario' });
  }
});

module.exports = router;
