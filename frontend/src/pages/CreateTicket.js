import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProducts, createTicket } from '../services/api';

function CreateTicket() {
  const [subject, setSubject]         = useState('');
  const [description, setDescription] = useState('');
  const [type, setType]               = useState('incident');
  const [impact, setImpact]           = useState('medium');
  const [productId, setProductId]     = useState('');
  const [productos, setProductos]     = useState([]);
  const [cargando, setCargando]       = useState(false);
  const [error, setError]             = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    // Cargamos los productos para el select
    getProducts()
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      const respuesta = await createTicket({
        subject,
        description,
        type,
        impact,
        product_id: productId || null
      });

      navigate(`/tickets/${respuesta.ticket.ticket_id}`);

    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear el ticket');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body className="p-4">
              <Button variant="outline-secondary" size="sm" className="mb-3"
                onClick={() => navigate('/tickets')}>
                ← Volver
              </Button>

              <Card.Title className="mb-4">Crear Nuevo Ticket</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Asunto *</Form.Label>
                  <Form.Control
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Describe brevemente el problema"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Descripción *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Detalla el problema lo más posible..."
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tipo</Form.Label>
                      <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="incident">Incidente</option>
                        <option value="request">Requerimiento</option>
                        <option value="question">Pregunta</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Impacto</Form.Label>
                      <Form.Select value={impact} onChange={(e) => setImpact(e.target.value)}>
                        <option value="low">Bajo</option>
                        <option value="medium">Medio</option>
                        <option value="high">Alto</option>
                        <option value="critical">Crítico</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Producto</Form.Label>
                      <Form.Select value={productId} onChange={(e) => setProductId(e.target.value)}>
                        <option value="">Sin producto</option>
                        {productos.map((p) => (
                          <option key={p.product_id} value={p.product_id}>
                            {p.product_name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" variant="primary" className="w-100" disabled={cargando}>
                  {cargando ? 'Creando...' : 'Crear Ticket'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateTicket;
