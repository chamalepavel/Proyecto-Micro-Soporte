# EXPLICACIÓN DETALLADA DEL CÓDIGO - SISTEMA DE MICRO-SOPORTE L1/L2

## ÍNDICE
1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [package.json Raíz](#packagejson-raíz)
3. [package.json Backend](#packagejson-backend)
4. [package.json Frontend](#packagejson-frontend)
5. [database/schema.sql](#databaseschemasql)
6. [docs/bitacora.md](#docsbitacoramd)

---

## 1. ESTRUCTURA DEL PROYECTO

```
soporte-micro/
├── backend/           # Servidor Node.js
├── frontend/          # App React
├── database/          # Scripts SQL
├── docs/             # Documentación
├── package.json      # Dependencias raíz
└── README.md         # Instrucciones
```

### ¿Por qué esta estructura?
- **backend/**: Todo el código del servidor en un solo lugar (más simple para principiantes)
- **frontend/**: Interfaz de usuario React
- **database/**: Scripts SQL para la base de datos
- **docs/**: Documentación del proyecto
- **package.json raíz**: Dependencias compartidas y scripts

---

## 2. package.json RAÍZ

```json
{
  "name": "soporte-micro",
  "version": "1.0.0",
  "description": "Sistema de micro-soporte técnico L1/L2",
  "main": "index.js",
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm start",
    "install:all": "npm install && cd backend && npm install && cd ../frontend && npm install",
    "build": "cd frontend && npm run build",
    "start": "cd backend && npm start",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "soporte",
    "microservicios",
    "nodejs",
    "react",
    "postgresql"
  ],
  "author": "Equipo de Desarrollo",
  "license": "MIT",
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

### Explicación por Bloques

**Información del Proyecto**
- `name`: Nombre del proyecto
- `version`: Versión actual (1.0.0)
- `description`: Descripción del sistema
- `author`: Equipo de desarrollo
- `license`: Licencia MIT (libre uso)

**Scripts de Desarrollo**
- `dev`: Inicia backend y frontend simultáneamente
- `dev:backend`: Inicia solo el servidor
- `dev:frontend`: Inicia solo la interfaz
- `install:all`: Instala dependencias en todos los proyectos
- `build`: Compila la aplicación React
- `start`: Inicia el servidor en producción

**Dependencias de Desarrollo**
- `concurrently`: Permite ejecutar múltiples comandos simultáneamente

---

## 3. package.json BACKEND

```json
{
  "name": "soporte-backend",
  "version": "1.0.0",
  "description": "Backend del sistema de micro-soporte",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.3.1",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  },
  "keywords": [
    "nodejs",
    "express",
    "postgresql",
    "backend"
  ],
  "author": "Equipo de Desarrollo",
  "license": "MIT"
}
```

### Explicación por Bloques

**Información del Proyecto**
- `name`: Nombre específico del backend
- `main`: Punto de entrada del servidor (src/app.js)

**Scripts del Servidor**
- `start`: Inicia el servidor con Node.js
- `dev`: Inicia el servidor con nodemon (reinicia automáticamente)

**Dependencias Principales**
- `express`: Framework web para Node.js
- `pg`: Conector para PostgreSQL
- `bcryptjs`: Encriptación de contraseñas
- `jsonwebtoken`: Sistema de autenticación JWT
- `cors`: Permite peticiones de diferentes orígenes
- `helmet`: Seguridad HTTP
- `dotenv`: Variables de entorno
- `express-rate-limit`: Limita peticiones para prevenir ataques
- `express-validator`: Validación de datos

**Dependencias de Desarrollo**
- `nodemon`: Reinicia el servidor automáticamente al cambiar código

---

## 4. package.json FRONTEND

```json
{
  "name": "soporte-frontend",
  "version": "1.0.0",
  "description": "Frontend del sistema de micro-soporte",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "axios": "^1.6.2",
    "bootstrap": "^5.3.2",
    "react-bootstrap": "^2.9.1",
    "react-hook-form": "^7.45.4",
    "react-query": "^3.39.3",
    "react-hot-toast": "^2.4.1",
    "date-fns": "^2.30.0",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "react",
    "frontend",
    "javascript",
    "web"
  ],
  "author": "Equipo de Desarrollo",
  "license": "MIT"
}
```

### Explicación por Bloques

**Información del Proyecto**
- `private`: true (no se publica en npm)
- `name`: Nombre específico del frontend

**Dependencias Principales**
- `react`: Biblioteca principal para la interfaz
- `react-dom`: Conexión entre React y el DOM
- `react-router-dom`: Navegación entre páginas
- `axios`: Peticiones HTTP al backend
- `bootstrap` + `react-bootstrap`: Estilos y componentes UI
- `react-hook-form`: Manejo de formularios
- `react-query`: Estado y caché de datos
- `react-hot-toast`: Notificaciones al usuario
- `date-fns`: Manipulación de fechas
- `uuid`: Generación de identificadores únicos

**Dependencias de Desarrollo**
- `vite`: Servidor de desarrollo rápido
- `@vitejs/plugin-react`: Plugin para React en Vite
- `@types/*`: Tipos de TypeScript para autocompletado

---

## 5. database/schema.sql

```sql
-- Sistema de Micro-Soporte L1/L2
-- Base de datos PostgreSQL

-- Crear base de datos
CREATE DATABASE soporte_micro;

-- Conectarse a la base de datos
\c soporte_micro;

-- Tabla de empresas (customers)
CREATE TABLE customers (
    nit VARCHAR(20) PRIMARY KEY,
    company_name VARCHAR(200) NOT NULL,
    contact_email VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);

-- Tabla de productos
CREATE TABLE products (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nit_customer VARCHAR(20) REFERENCES customers(nit) ON DELETE CASCADE,
    product_name VARCHAR(200) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);

-- Tabla de usuarios
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    password_salt VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'support', 'client')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);

-- Tabla de tickets
CREATE TABLE tickets (
    ticket_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(product_id) ON DELETE CASCADE,
    assigned_user_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    subject VARCHAR(300) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL CHECK (type IN ('incident', 'request', 'question')),
    impact VARCHAR(50) NOT NULL CHECK (impact IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'closed')),
    current_level INTEGER DEFAULT 1 CHECK (current_level IN (1, 2)),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);

-- Tabla de comentarios
CREATE TABLE comments (
    comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID REFERENCES tickets(ticket_id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);

-- Crear extension para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insertar datos iniciales (semillas)
INSERT INTO customers (nit, company_name, contact_email) VALUES
('12345678', 'Empresa Demo S.A.', 'contacto@empresademo.com'),
('87654321', 'Tecnología XYZ', 'info@tecnologiaxyz.com');

INSERT INTO users (full_name, email, password_hash, password_salt, role) VALUES
('Administrador Principal', 'admin@microsoporte.com', 'admin123', 'salt123', 'admin'),
('Agente de Soporte', 'soporte@microsoporte.com', 'soporte123', 'salt123', 'support'),
('Cliente Demo', 'cliente@microsoporte.com', 'cliente123', 'salt123', 'client');

INSERT INTO products (nit_customer, product_name, description) VALUES
('12345678', 'Sistema de Facturación', 'Sistema de facturación electrónica'),
('12345678', 'CRM Online', 'Sistema de gestión de clientes'),
('87654321', 'Plataforma E-commerce', 'Plataforma de comercio electrónico');

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_products_nit_customer ON products(nit_customer);
CREATE INDEX idx_tickets_product_id ON tickets(product_id);
CREATE INDEX idx_tickets_assigned_user_id ON tickets(assigned_user_id);
CREATE INDEX idx_comments_ticket_id ON comments(ticket_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
```

### Explicación por Secciones

**1. Configuración Inicial**
- `CREATE DATABASE`: Crea la base de datos
- `\c soporte_micro`: Se conecta a la base de datos

**2. Tabla customers (Empresas)**
- `nit`: Identificación única (Primary Key)
- `company_name`: Nombre de la empresa (obligatorio)
- `contact_email`: Email de contacto
- `created_at/updated_at/deleted_at`: Trazabilidad y soft delete

**3. Tabla products (Productos)**
- `product_id`: Identificador único (UUID)
- `nit_customer`: Enlace con la empresa (Foreign Key)
- `product_name`: Nombre del producto (obligatorio)
- `description`: Descripción del producto
- `ON DELETE CASCADE`: Si se elimina la empresa, se eliminan sus productos

**4. Tabla users (Usuarios)**
- `user_id`: Identificador único (UUID)
- `full_name`: Nombre completo (obligatorio)
- `email`: Email de acceso (único)
- `password_hash/password_salt`: Seguridad de contraseñas
- `role`: Rol del usuario (admin, support, client)
- `CHECK (role IN (...))`: Valida que el rol sea uno de los permitidos

**5. Tabla tickets (Tickets)**
- `ticket_id`: Identificador único (UUID)
- `product_id`: Producto relacionado (Foreign Key)
- `assigned_user_id`: Usuario asignado para atender (Foreign Key)
- `subject`: Asunto del ticket (obligatorio)
- `description`: Descripción detallada
- `type`: Tipo de ticket (incidente, requerimiento, pregunta)
- `impact`: Impacto (bajo, medio, alto, crítico)
- `status`: Estado (abierto, en progreso, cerrado)
- `current_level`: Nivel de escalamiento (1 o 2)
- `ON DELETE SET NULL`: Si se elimina el producto/usuario, el ticket sigue existiendo

**6. Tabla comments (Comentarios)**
- `comment_id`: Identificador único (UUID)
- `ticket_id`: Ticket al que pertenece (Foreign Key)
- `user_id`: Usuario que escribió el comentario (Foreign Key)
- `content`: Contenido del comentario (obligatorio)

**7. Extension UUID**
- `CREATE EXTENSION "uuid-ossp"`: Permite generar UUID automáticamente

**8. Datos Iniciales (Semillas)**
- Inserta empresas, usuarios y productos de ejemplo
- Permite probar el sistema sin crear datos manualmente

**9. Índices de Rendimiento**
- `CREATE INDEX`: Mejora la velocidad de consultas
- Se crean índices en las columnas más consultadas

---

## 6. docs/bitacora.md (ESTE DOCUMENTO)

Este documento contiene:
- Análisis completo del proyecto
- Explicación del diagrama ER
- Plan de construcción detallado
- Seguimiento del progreso
- Errores comunes y soluciones

---

## CONCLUSIÓN

Hemos completado exitosamente la **configuración base** del proyecto. Hemos:

1. ✅ Creado la estructura de carpetas
2. ✅ Configurado los package.json
3. ✅ Creado el esquema de la base de datos
4. ✅ Documentado el análisis del proyecto
5. ✅ Preparado el entorno para el desarrollo

El proyecto está listo para continuar con el **BLOQUE 2: Base de Datos**, donde configuraremos la conexión a PostgreSQL y crearemos los modelos de datos.

---

## PRÓXIMA FASE: BLOQUE 2 - BASE DE DATOS

¿Estás listo para continuar con la configuración de la base de datos? En este bloque configuraremos:

1. Conexión a PostgreSQL
2. Variables de entorno
3. Modelos de datos
4. Migraciones

¿Procedemos con el siguiente bloque?