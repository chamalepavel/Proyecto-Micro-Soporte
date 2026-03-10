import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicket, updateTicket, addComment } from '../services/api';

function TicketDetail() {
  const [ticket, setTicket]               = useState(null);
  const [comentarios, setComentarios]     = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [cargando, setCargando]           = useState(true);
  const [enviando, setEnviando]           = useState(false);
  const [error, setError]                 = useState('');
  const [exito, setExito]                 = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  // Leemos el usuario del localStorage directamente
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const esAdminOSoporte = usuario?.role === 'admin' || usuario?.role === 'support';

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    getTicket(id)
      .then(data => {
        setTicket(data.ticket);
        setComentarios(data.comentarios);
      })
      .catch(err => {
        setError(err.response?.status === 404 ? 'Ticket no encontrado' : 'Error al cargar el ticket');
      })
      .finally(() => setCargando(false));
  }, [id, navigate]);

  // Cambiar el estado del ticket (solo admin/support)
  const cambiarEstado = async (nuevoEstado) => {
    try {
      const respuesta = await updateTicket(id, {
        status:      nuevoEstado,
        assigned_to: ticket.assigned_to,
        level:       ticket.level
      });
      setTicket(respuesta.ticket);
      setExito('Estado actualizado');
      setTimeout(() => setExito(''), 3000);
    } catch (err) {
      setError('Error al cambiar el estado');
    }
  };

  // Enviar un nuevo comentario
  const handleComentario = async (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    setEnviando(true);
    try {
      const respuesta = await addComment(id, nuevoComentario);
      // Agregamos el comentario al array sin recargar la página
      setComentarios([...comentarios, respuesta.comentario]);
      setNuevoComentario('');
    } catch (err) {
      setError('Error al agregar comentario');
    } finally {
      setEnviando(false);
    }
  };

  const colorStatus = (status) => {
    if (status === 'open')        return 'success';
    if (status === 'in_progress') return 'warning';
    if (status === 'closed')      return 'secondary';
    return 'light';
  };

  if (cargando) return <Container className="mt-5 text-center"><p>Cargando ticket...</p></Container>;
  if (!ticket)  return <Container className="mt-4"><Alert variant="danger">{error}</Alert><Button onClick={() => navigate('/tickets')}>← Volver</Button></Container>;

  return (
    <Container className="mt-4">
      <Button variant="outline-secondary" size="sm" className="mb-3" onClick={() => navigate('/tickets')}>
        ← Volver a Tickets
      </Button>

      {exito && <Alert variant="success">{exito}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Datos del ticket */}
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h4>{ticket.subject}</h4>
            <Badge bg={colorStatus(ticket.status)}>{ticket.status}</Badge>
          </div>

          <p className="text-muted">{ticket.description}</p>

          <Row>
            <Col md={3}><strong>Tipo:</strong> {ticket.type}</Col>
            <Col md={3}><strong>Impacto:</strong> {ticket.impact}</Col>
            <Col md={3}><strong>Nivel:</strong> L{ticket.level}</Col>
            <Col md={3}><strong>Fecha:</strong> {new Date(ticket.created_at).toLocaleDateString()}</Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}><strong>Producto:</strong> {ticket.product_name || '—'}</Col>
            <Col md={6}><strong>Asignado a:</strong> {ticket.assigned_to_name || 'Sin asignar'}</Col>
          </Row>

          {/* Botones de cambio de estado — solo para admin y support */}
          {esAdminOSoporte && (
            <div className="mt-3">
              <strong>Cambiar estado:</strong>
              <div className="d-flex gap-2 mt-1">
                <Button variant="outline-success" size="sm"
                  disabled={ticket.status === 'open'}
                  onClick={() => cambiarEstado('open')}>Abrir</Button>
                <Button variant="outline-warning" size="sm"
                  disabled={ticket.status === 'in_progress'}
                  onClick={() => cambiarEstado('in_progress')}>En Progreso</Button>
                <Button variant="outline-secondary" size="sm"
                  disabled={ticket.status === 'closed'}
                  onClick={() => cambiarEstado('closed')}>Cerrar</Button>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Comentarios */}
      <Card>
        <Card.Body>
          <Card.Title>Comentarios ({comentarios.length})</Card.Title>

          {comentarios.length === 0 ? (
            <p className="text-muted">No hay comentarios aún.</p>
          ) : (
            <div className="mb-4">
              {comentarios.map((c) => (
                <div key={c.comment_id} className="border-bottom pb-3 mb-3">
                  <div className="d-flex justify-content-between">
                    <strong>{c.full_name || 'Usuario'}</strong>
                    <small className="text-muted">{new Date(c.created_at).toLocaleString()}</small>
                  </div>
                  <p className="mb-0 mt-1">{c.content}</p>
                </div>
              ))}
            </div>
          )}

          <Form onSubmit={handleComentario}>
            <Form.Group className="mb-2">
              <Form.Label><strong>Agregar comentario</strong></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                placeholder="Escribe tu comentario..."
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" size="sm" disabled={enviando}>
              {enviando ? 'Enviando...' : 'Enviar Comentario'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TicketDetail;
