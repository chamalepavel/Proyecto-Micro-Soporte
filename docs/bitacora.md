# BITÁCORA DEL PROYECTO - SISTEMA DE MICRO-SOPORTE L1/L2

## ÍNDICE
1. [Análisis del Proyecto](#análisis-del-proyecto)
2. [Diagrama ER Explicado](#diagrama-er-explicado)
3. [Plan de Construcción](#plan-de-construcción)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Configuración Inicial](#configuración-inicial)
6. [Bloque por Bloque](#bloque-por-bloque)
7. [Documentación Externa](#documentación-externa)

---

## 1. ANÁLISIS DEL PROYECTO

### ¿Qué es este sistema?
Este es un **Help Desk básico** para empresas que necesitan soporte técnico. Las empresas pueden registrar sus productos, los usuarios pueden crear tickets de soporte, y el equipo de soporte puede gestionar, escalar y cerrar esos tickets.

### Objetivo Principal
Crear una plataforma web donde:
- Las empresas (customers) registren sus productos
- Los usuarios creen y sigan tickets de soporte
- El equipo de soporte gestione eficientemente los tickets
- Se generen reportes en PDF

### Módulos Principales
1. Gestión de empresas/clientes
2. Gestión de productos por cliente
3. Gestión de usuarios del sistema
4. Gestión de tickets de soporte
5. Sistema de comentarios en tickets
6. Generación de reportes en PDF
7. Autenticación y roles

### Tecnología Utilizada
- **Backend**: Node.js + Express (servidor web)
- **Frontend**: React (interfaz de usuario)
- **Base de datos**: PostgreSQL (base de datos relacional)
- **Autenticación**: JWT (JSON Web Tokens)
- **PDF**: HTML + librería jsPDF

---

## 2. DIAGRAMA ER EXPLICADO

### Tablas Principales

#### customers (Empresas)
- **nit**: Identificación única (como DUI o NIT)
- **company_name**: Nombre de la empresa
- **contact_email**: Email de contacto
- **created_at/updated_at/deleted_at**: Trazabilidad

#### products (Productos)
- **product_id**: Identificador único (UUID)
- **nit_customer**: Enlace con la empresa que lo posee
- **product_name**: Nombre del producto
- **description**: Descripción del producto

#### users (Usuarios)
- **user_id**: Identificador único
- **full_name**: Nombre completo
- **email**: Email de acceso
- **password_hash/password_salt**: Seguridad de contraseñas
- **role**: Rol del usuario (admin, support, client)

#### tickets (Tickets)
- **ticket_id**: Identificador único
- **product_id**: Producto relacionado
- **assigned_user_id**: Usuario asignado para atender
- **subject**: Asunto del ticket
- **description**: Descripción detallada
- **type**: Tipo de ticket (incidente, requerimiento, etc.)
- **impact**: Impacto (bajo, medio, alto, crítico)
- **status**: Estado (abierto, en progreso, cerrado)
- **current_level**: Nivel de escalamiento (1 o 2)

#### comments (Comentarios)
- **comment_id**: Identificador único
- **ticket_id**: Ticket al que pertenece
- **user_id**: Usuario que escribió el comentario
- **content**: Contenido del comentario

### Relaciones Explicadas con Ejemplos

**1. Empresa → Productos (1:N)**
- Una empresa puede tener muchos productos
- Ejemplo: "Google" puede tener "Google Workspace" y "Google Cloud"

**2. Producto → Tickets (1:N)**
- Un producto puede tener muchos tickets
- Ejemplo: "Google Workspace" puede tener tickets sobre login, facturación, etc.

**3. Ticket → Comentarios (1:N)**
- Un ticket puede tener muchos comentarios
- Ejemplo: Un ticket sobre "error de login" puede tener 3 comentarios de seguimiento

**4. Usuario → Tickets Asignados (1:N)**
- Un agente de soporte puede tener muchos tickets asignados
- Ejemplo: El agente "Juan" puede tener 5 tickets abiertos

**5. Usuario → Comentarios (1:N)**
- Un usuario puede escribir muchos comentarios
- Ejemplo: El cliente "María" puede comentar en varios tickets

### Dependencias
- **products** depende de **customers** (no puede existir un producto sin una empresa)
- **tickets** depende de **products** y **users** (no puede existir un ticket sin un producto y un usuario)
- **comments** depende de **tickets** y **users** (no puede existir un comentario sin un ticket y un usuario)

---

## 3. PLAN DE CONSTRUCCIÓN

### Orden Correcto para Construir el Sistema

**BLOQUE 1: Configuración Base**
- Crear estructura de carpetas
- Configurar package.json
- Crear archivos de configuración

**BLOQUE 2: Base de Datos**
- Crear esquema SQL
- Configurar conexión a PostgreSQL
- Crear migraciones

**BLOQUE 3: Backend API**
- Crear servidor Express
- Configurar rutas
- Crear controladores
- Configurar middleware

**BLOQUE 4: Frontend**
- Crear aplicación React
- Configurar rutas
- Crear componentes
- Configurar servicios API

**BLOQUE 5: Autenticación**
- Crear sistema de login
- Configurar JWT
- Proteger rutas
- Crear middleware de autenticación

**BLOQUE 6: Funcionalidades CRUD**
- Crear, leer, actualizar, eliminar
- Validaciones
- Manejo de errores
- Respuestas API

**BLOQUE 7: Lógica de Negocio**
- Escalado de tickets
- Cierre de tickets
- Notificaciones
- Flujo de trabajo

**BLOQUE 8: Generación de PDF**
- Crear plantillas HTML
- Configurar librería PDF
- Generar reportes
- Descarga de archivos

**BLOQUE 9: Pruebas y Mejoras**
- Probar funcionalidades
- Corregir errores
- Optimizar rendimiento
- Documentación final

---

## 4. ESTRUCTURA DEL PROYECTO

```
soporte-micro/
├── backend/           # Servidor Node.js
│   ├── src/
│   │   ├── controllers/    # Manejo de peticiones
│   │   ├── models/         # Modelos de datos
│   │   ├── routes/         # Rutas de la API
│   │   ├── middleware/     # Autenticación, validación
│   │   ├── services/       # Lógica de negocio
│   │   ├── config/         # Configuración
│   │   ├── utils/          # Utilidades
│   │   └── app.js          # Servidor principal
│   ├── package.json
│   └── .env
├── frontend/          # App React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/         # Páginas de la app
│   │   ├── services/      # Servicios API
│   │   ├── hooks/         # Hooks personalizados
│   │   ├── utils/         # Utilidades
│   │   ├── App.js         # Componente principal
│   │   └── index.js       # Punto de entrada
│   ├── package.json
│   └── .env
├── database/          # Scripts SQL
│   ├── migrations/    # Migraciones
│   ├── seeds/        # Datos iniciales
│   └── schema.sql    # Esquema de la base de datos
├── docs/             # Documentación
│   ├── bitacora.md   # Este documento
│   ├── explicacion-codigo.md  # Explicación detallada
│   └── flujo-sistema.md  # Flujo del sistema
├── package.json      # Dependencias raíz
└── README.md         # Instrucciones
```

---

## 5. CONFIGURACIÓN INICIAL

### Archivos Creados

**1. package.json (raíz)**
- Dependencias compartidas
- Scripts de desarrollo
- Configuración de proyectos

**2. backend/package.json**
- Dependencias Node.js
- Scripts del servidor
- Configuración Express

**3. frontend/package.json**
- Dependencias React
- Scripts del cliente
- Configuración Vite

**4. database/schema.sql**
- Estructura de la base de datos
- Tablas y relaciones
- Datos iniciales
- Índices de rendimiento

**5. docs/bitacora.md**
- Análisis del proyecto
- Explicación del diagrama ER
- Plan de construcción
- Documentación externa

---

## 6. BLOQUE POR BLOQUE

### BLOQUE 1: Configuración Base (COMPLETADO)
- ✅ Estructura de carpetas creada
- ✅ package.json raíz configurado
- ✅ package.json backend configurado
- ✅ package.json frontend configurado
- ✅ schema.sql creado
- ✅ bitácora.md creado

### BLOQUE 2: Base de Datos (PRÓXIMO)
- Crear conexión a PostgreSQL
- Configurar variables de entorno
- Crear modelos de datos
- Configurar migraciones

### BLOQUE 3: Backend API
- Crear servidor Express
- Configurar rutas API
- Crear controladores
- Configurar middleware

### BLOQUE 4: Frontend
- Crear aplicación React
- Configurar rutas
- Crear componentes
- Configurar servicios API

### BLOQUE 5: Autenticación
- Crear sistema de login
- Configurar JWT
- Proteger rutas
- Crear middleware de autenticación

### BLOQUE 6: Funcionalidades CRUD
- Crear, leer, actualizar, eliminar
- Validaciones
- Manejo de errores
- Respuestas API

### BLOQUE 7: Lógica de Negocio
- Escalado de tickets
- Cierre de tickets
- Notificaciones
- Flujo de trabajo

### BLOQUE 8: Generación de PDF
- Crear plantillas HTML
- Configurar librería PDF
- Generar reportes
- Descarga de archivos

### BLOQUE 9: Pruebas y Mejoras
- Probar funcionalidades
- Corregir errores
- Optimizar rendimiento
- Documentación final

---

## 7. DOCUMENTACIÓN EXTERNA

### docs/bitacora.md (ESTE DOCUMENTO)
- Análisis completo del proyecto
- Explicación del diagrama ER
- Plan de construcción detallado
- Seguimiento del progreso

### docs/explicacion-codigo.md (PRÓXIMO)
- Explicación detallada de cada archivo
- Lógica detrás de cada decisión
- Cómo se conecta cada parte
- Errores comunes y soluciones

### docs/flujo-sistema.md (PRÓXIMO)
- Cómo funciona el sistema completo
- Flujo de datos
- Interacción entre componentes
- Casos de uso

---

## ESTADO ACTUAL DEL PROYECTO

### ✅ COMPLETADO
- Análisis del proyecto
- Plan de construcción
- Estructura de carpetas
- Configuración inicial
- Base de datos (schema.sql)
- Documentación principal

### 🔄 EN PROCESO
- Configuración de base de datos
- Conexión a PostgreSQL
- Variables de entorno

### 📋 PRÓXIMOS PASOS
1. Configurar base de datos (BLOQUE 2)
2. Crear conexión a PostgreSQL
3. Configurar variables de entorno
4. Crear modelos de datos

---

## ¿CÓMO PROBAR EL PROYECTO?

### Para Iniciar el Desarrollo
1. **Instalar dependencias**: `npm run install:all`
2. **Iniciar en modo desarrollo**: `npm run dev`
3. **Iniciar solo backend**: `cd backend && npm run dev`
4. **Iniciar solo frontend**: `cd frontend && npm run dev`

### Para Probar la Base de Datos
1. **Instalar PostgreSQL**
2. **Crear base de datos**: `CREATE DATABASE soporte_micro;`
3. **Ejecutar schema.sql**: `\i database/schema.sql`
4. **Verificar tablas**: `\dt`

### Para Verificar la Configuración
1. **Verificar package.json**: `cat package.json`
2. **Verificar estructura**: `tree soporte-micro`
3. **Verificar scripts**: `npm run`

---

## ERRORES COMUNES Y SOLUCIONES

### Error 1: "No se puede crear directorio"
**Solución**: Usar `mkdir -p` para crear directorios anidados

### Error 2: "Dependencias no encontradas"
**Solución**: Ejecutar `npm install` en cada carpeta

### Error 3: "Base de datos no conectada"
**Solución**: Verificar variables de entorno y conexión PostgreSQL

### Error 4: "Puerto ya en uso"
**Solución**: Cambiar número de puerto en configuración

---

## CONCLUSIÓN DEL BLOQUE 1

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