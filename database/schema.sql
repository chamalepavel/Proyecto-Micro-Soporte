-- SISTEMA DE MICRO-SOPORTE
-- Base de datos PostgreSQL
-- Tablas con SERIAL (auto incremento), sin UUID, sin soft delete

-- TABLA: customers
-- Empresas que usan el sistema de soporte
CREATE TABLE IF NOT EXISTS customers (
    nit           VARCHAR(20)  PRIMARY KEY,
    company_name  VARCHAR(200) NOT NULL,
    contact_email VARCHAR(100),
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- TABLA: products
-- Productos de cada empresa
CREATE TABLE IF NOT EXISTS products (
    product_id   SERIAL       PRIMARY KEY,
    nit_customer VARCHAR(20)  REFERENCES customers(nit) ON DELETE CASCADE,
    product_name VARCHAR(200) NOT NULL,
    description  TEXT,
    created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- TABLA: users
-- Usuarios del sistema (admin, soporte, cliente)
CREATE TABLE IF NOT EXISTS users (
    user_id       SERIAL       PRIMARY KEY,
    full_name     VARCHAR(200) NOT NULL,
    email         VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role          VARCHAR(20)  NOT NULL DEFAULT 'client'
                  CHECK (role IN ('admin', 'support', 'client')),
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- TABLA: tickets
-- Solicitudes de soporte
CREATE TABLE IF NOT EXISTS tickets (
    ticket_id    SERIAL       PRIMARY KEY,
    product_id   INTEGER      REFERENCES products(product_id) ON DELETE CASCADE,
    created_by   INTEGER      REFERENCES users(user_id) ON DELETE SET NULL,
    assigned_to  INTEGER      REFERENCES users(user_id) ON DELETE SET NULL,
    subject      VARCHAR(300) NOT NULL,
    description  TEXT,
    type         VARCHAR(20)  NOT NULL DEFAULT 'incident'
                 CHECK (type IN ('incident', 'request', 'question')),
    impact       VARCHAR(20)  NOT NULL DEFAULT 'medium'
                 CHECK (impact IN ('low', 'medium', 'high', 'critical')),
    status       VARCHAR(20)  NOT NULL DEFAULT 'open'
                 CHECK (status IN ('open', 'in_progress', 'closed')),
    level        INTEGER      NOT NULL DEFAULT 1
                 CHECK (level IN (1, 2)),
    created_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- TABLA: comments
-- Comentarios dentro de cada ticket
CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL    PRIMARY KEY,
    ticket_id  INTEGER   REFERENCES tickets(ticket_id) ON DELETE CASCADE,
    user_id    INTEGER   REFERENCES users(user_id) ON DELETE SET NULL,
    content    TEXT      NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DATOS DE PRUEBA

INSERT INTO customers (nit, company_name, contact_email) VALUES
    ('12345678', 'Empresa Demo S.A.',  'contacto@empresademo.com'),
    ('87654321', 'Tecnologia XYZ',     'info@tecnologiaxyz.com')
ON CONFLICT (nit) DO NOTHING;

-- Contrasena para todos: admin123
-- Hash bcrypt generado con bcrypt.hash('admin123', 10)
INSERT INTO users (full_name, email, password_hash, role) VALUES
    ('Administrador', 'admin@microsoporte.com',   '$2a$10$mI.eqQLl9/Bl.Z4jvOJFaeK2U2JXLGQSg/mL1LcmGDqYqDbNQK4di', 'admin'),
    ('Agente Soporte', 'soporte@microsoporte.com', '$2a$10$mI.eqQLl9/Bl.Z4jvOJFaeK2U2JXLGQSg/mL1LcmGDqYqDbNQK4di', 'support'),
    ('Cliente Demo',   'cliente@microsoporte.com', '$2a$10$mI.eqQLl9/Bl.Z4jvOJFaeK2U2JXLGQSg/mL1LcmGDqYqDbNQK4di', 'client')
ON CONFLICT (email) DO NOTHING;

INSERT INTO products (nit_customer, product_name, description) VALUES
    ('12345678', 'Sistema de Facturacion', 'Sistema de facturacion electronica'),
    ('12345678', 'CRM Online',             'Sistema de gestion de clientes'),
    ('87654321', 'Plataforma E-commerce',  'Plataforma de comercio electronico');

-- Credenciales de prueba:
--   admin@microsoporte.com   / admin123
--   soporte@microsoporte.com / admin123
--   cliente@microsoporte.com / admin123
