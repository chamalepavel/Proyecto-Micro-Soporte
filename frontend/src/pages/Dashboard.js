import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getTickets } from '../services/api';

function Dashboard() {
  const [tickets, setTickets]   = useState([]);
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate();

  // Leemos el usuario directo del localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    getTickets()
      .then(data => setTickets(data))
      .catch(err => console.error('Error al cargar tickets:', err))
      .finally(() => setCargando(false));
  }, [navigate]);

  // Calculamos las estadísticas filtrando el array
  const total      = tickets.length;
  const abiertos   = tickets.filter(t => t.status === 'open').length;
  const enProgreso = tickets.filter(t => t.status === 'in_progress').length;
  const cerrados   = tickets.filter(t => t.status === 'closed').length;

  // Mostramos solo los últimos 5 tickets
  const recientes = tickets.slice(0, 5);

  const colorStatus = (status) => {
    if (status === 'open')        return 'success';
    if (status === 'in_progress') return 'warning';
    if (status === 'closed')      return 'secondary';
    return 'light';
  };

  if (cargando) return <Container className="mt-5 text-center"><p>Cargando...</p></Container>;

  return (
    <Container className="mt-4">
      <h2 className="mb-1">Bienvenido, {usuario?.full_name} 👋</h2>
      <p className="text-muted mb-4">Panel de control</p>

      {/* Tarjetas de estadísticas */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="text-center border-primary">
            <Card.Body>
              <h6 className="text-muted">Total</h6>
              <h2 className="text-primary">{total}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center border-success">
            <Card.Body>
              <h6 className="text-muted">Abiertos</h6>
              <h2 className="text-success">{abiertos}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center border-warning">
            <Card.Body>
              <h6 className="text-muted">En Progreso</h6>
              <h2 className="text-warning">{enProgreso}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="text-center border-secondary">
            <Card.Body>
              <h6 className="text-muted">Cerrados</h6>
              <h2 className="text-secondary">{cerrados}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tickets recientes */}
      <Card>
        <Card.Body>
          <Card.Title>Últimos tickets</Card.Title>
          {recientes.length === 0 ? (
            <p className="text-muted">No hay tickets aún.</p>
          ) : (
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Asunto</th>
                  <th>Estado</th>
                  <th>Impacto</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recientes.map((ticket) => (
                  <tr
                    key={ticket.ticket_id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/tickets/${ticket.ticket_id}`)}
                  >
                    <td>{ticket.ticket_id}</td>
                    <td>{ticket.subject}</td>
                    <td>
                      <Badge bg={colorStatus(ticket.status)}>{ticket.status}</Badge>
                    </td>
                    <td>{ticket.impact}</td>
                    <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Dashboard;
