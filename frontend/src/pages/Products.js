import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/api';

function Products() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando]   = useState(true);
  const [error, setError]         = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    getProducts()
      .then(data => setProductos(data))
      .catch(() => setError('No se pudieron cargar los productos'))
      .finally(() => setCargando(false));
  }, [navigate]);

  if (cargando) return <Container className="mt-5 text-center"><p>Cargando...</p></Container>;

  return (
    <Container className="mt-4">
      <h4 className="mb-3">Productos</h4>

      {error && <p className="text-danger">{error}</p>}

      {productos.length === 0 ? (
        <p className="text-muted">No hay productos registrados.</p>
      ) : (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Empresa</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.product_id}>
                <td>{p.product_id}</td>
                <td><strong>{p.product_name}</strong></td>
                <td>{p.company_name || p.nit_customer}</td>
                <td>{p.description || '—'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Products;
