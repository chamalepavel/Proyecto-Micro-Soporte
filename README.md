# Proyecto Micro-Soporte

Sistema de Help Desk básico para gestión de tickets de soporte técnico.

---

## Tecnologías

- **Backend**: Node.js + Express
- **Frontend**: React + Bootstrap
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT
- **Contenedor BD**: Docker

---

## Estructura del proyecto

```
soporte-micro/
├── backend/
│   └── src/
│       ├── models/        # Consultas a la base de datos
│       ├── routes/        # Endpoints de la API
│       ├── middleware/    # Verificación de token JWT
│       ├── db.js          # Conexión a PostgreSQL
│       └── app.js         # Servidor Express
├── frontend/
│   └── src/
│       ├── pages/         # Vistas de la aplicación
│       ├── components/    # Navbar
│       ├── services/      # Llamadas a la API
│       ├── utils/         # Funciones de autenticación
│       └── App.js         # Rutas del frontend
├── database/
│   └── schema.sql         # Esquema y datos de prueba
└── docs/                  # Documentación del proyecto
```

---

## Uso del sistema

### Requisitos previos

- Node.js instalado
- Docker instalado (para la base de datos)

### 1. Iniciar la base de datos

```bash
docker run --name soporte-micro-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
docker exec -i soporte-micro-db psql -U postgres -c "CREATE DATABASE soporte_micro;"
docker exec -i soporte-micro-db psql -U postgres -d soporte_micro < database/schema.sql
```

### 2. Iniciar el backend

```bash
cd backend
npm install
npm start
```

### 3. Iniciar el frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Acceder al sistema

Abrir el navegador en: `http://localhost:3000`

### Cuentas de prueba

| Email | Contraseña | Rol |
|---|---|---|
| admin@microsoporte.com | admin123 | Administrador |
| soporte@microsoporte.com | admin123 | Soporte |
| cliente@microsoporte.com | admin123 | Cliente |
