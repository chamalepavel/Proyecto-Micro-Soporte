import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Badge, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getTickets } from '../services/api';

function Tickets() {
  const [tickets, setTickets]   = useState([]);
  const [filtro, setFiltro]     = useState('todos');
  const [cargando, setCargando] = useState(true);
  const [error, setError]       = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      navigate('/login');
      return;
    }

    getTickets()
      .then(data => setTickets(data))
      .catch(() => setError('No se pudieron cargar los tickets'))
      .finally(() => setCargando(false));
  }, [navigate]);

  // Filtro simple: filtra el array en memoria según el estado seleccionado
  const ticketsFiltrados = filtro === 'todos'
    ? tickets
    : tickets.filter(t => t.status === filtro);

  const colorStatus = (status) => {
    if (status === 'open')        return 'success';
    if (status === 'in_progress') return 'warning';
    if (status === 'closed')      return 'secondary';
    return 'light';
  };

  const colorImpacto = (impact) => {
    if (impact === 'critical') return 'danger';
    if (impact === 'high')     return 'warning';
    if (impact === 'medium')   return 'info';
    return 'light';
  };

  if (cargando) return <Container className="mt-5 text-center"><p>Cargando tickets...</p></Container>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Tickets de Soporte</h4>
        <Button variant="primary" onClick={() => navigate('/tickets/create')}>
          + Crear Ticket
        </Button>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {/* Filtro por estado */}
      <Form.Select
        className="mb-3"
        style={{ maxWidth: '200px' }}
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      >
        <option value="todos">Todos</option>
        <option value="open">Abiertos</option>
        <option value="in_progress">En progreso</option>
        <option value="closed">Cerrados</option>
      </Form.Select>

      {ticketsFiltrados.length === 0 ? (
        <p className="text-muted">No hay tickets que mostrar.</p>
      ) : (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Asunto</th>
              <th>Estado</th>
              <th>Impacto</th>
              <th>Tipo</th>
              <th>Producto</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ticketsFiltrados.map((ticket) => (
              <tr key={ticket.ticket_id}>
                <td>{ticket.ticket_id}</td>
                <td>{ticket.subject}</td>
                <td>
                  <Badge bg={colorStatus(ticket.status)}>{ticket.status}</Badge>
                </td>
                <td>
                  <Badge bg={colorImpacto(ticket.impact)}>{ticket.impact}</Badge>
                </td>
                <td>{ticket.type}</td>
                <td>{ticket.product_name || '—'}</td>
                <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate(`/tickets/${ticket.ticket_id}`)}
                  >
                    Ver
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Tickets;
