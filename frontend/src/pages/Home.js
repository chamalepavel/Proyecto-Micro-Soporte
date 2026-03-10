import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Sistema de Micro-Soporte L1/L2
              </Card.Title>
              <Card.Text className="text-center mb-4">
                Bienvenido al sistema de gestión de tickets de soporte técnico.
              </Card.Text>
              <div className="text-center">
                <Link to="/login">
                  <Button variant="primary" size="lg">
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;