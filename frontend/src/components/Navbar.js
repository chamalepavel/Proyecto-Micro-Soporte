import React from 'react';
import { Navbar as BSNavbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { estaAutenticado, getUsuario, cerrarSesion } from '../utils/auth';

function Navbar() {
  const usuario     = getUsuario();
  const autenticado = estaAutenticado();

  if (!autenticado) return null;

  const handleLogout = () => {
    cerrarSesion();
  };

  const colorRol = (role) => {
    if (role === 'admin')   return 'danger';
    if (role === 'support') return 'warning';
    return 'info';
  };

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" className="mb-0">
      <Container>
        <BSNavbar.Brand as={Link} to="/dashboard">
          🔧 Micro-Soporte
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="navbar-nav" />

        <BSNavbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/tickets">Tickets</Nav.Link>
            <Nav.Link as={Link} to="/products">Productos</Nav.Link>
            {usuario?.role === 'admin' && (
              <Nav.Link as={Link} to="/users">Usuarios</Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-center gap-2">
            <span className="text-white-50 me-1">
              {usuario?.full_name}
            </span>
            <Badge bg={colorRol(usuario?.role)}>
              {usuario?.role}
            </Badge>
            <Button
              variant="outline-light"
              size="sm"
              onClick={handleLogout}
              className="ms-2"
            >
              Cerrar Sesión
            </Button>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
