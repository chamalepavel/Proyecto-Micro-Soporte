import React, { useEffect, useState } from 'react';
import { Container, Table, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/api';

function Users() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError]       = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    // Solo los admins pueden ver esta página
    if (usuario?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    getUsers()
      .then(data => setUsuarios(data))
      .catch(() => setError('No se pudieron cargar los usuarios'))
      .finally(() => setCargando(false));
  }, [navigate]);

  const colorRol = (role) => {
    if (role === 'admin')   return 'danger';
    if (role === 'support') return 'warning';
    return 'info';
  };

  if (cargando) return <Container className="mt-5 text-center"><p>Cargando...</p></Container>;

  return (
    <Container className="mt-4">
      <h4 className="mb-3">Usuarios del Sistema</h4>

      {error && <p className="text-danger">{error}</p>}

      {usuarios.length === 0 ? (
        <p className="text-muted">No hay usuarios registrados.</p>
      ) : (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Creado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.user_id}>
                <td>{u.user_id}</td>
                <td>{u.full_name}</td>
                <td>{u.email}</td>
                <td>
                  <Badge bg={colorRol(u.role)}>{u.role}</Badge>
                </td>
                <td>{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Users;
