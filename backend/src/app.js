// Servidor principal - Sistema de Micro-Soporte
const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');

dotenv.config();

const routes = require('./routes');

const app  = express();
const PORT = process.env.PORT || 3001;

// Permitir peticiones del frontend
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));

// Parsear JSON en las peticiones
app.use(express.json());

// Todas las rutas de la API
app.use('/api', routes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Micro-Soporte funcionando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

module.exports = app;
