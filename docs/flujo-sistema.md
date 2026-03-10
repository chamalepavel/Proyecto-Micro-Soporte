# FLUJO DEL SISTEMA - SISTEMA DE MICRO-SOPORTE L1/L2

## ÍNDICE
1. [Flujo General del Sistema](#flujo-general-del-sistema)
2. [Flujo de Autenticación](#flujo-de-autenticación)
3. [Flujo de Gestión de Tickets](#flujo-de-gestión-de-tickets)
4. [Flujo de Comentarios](#flujo-de-comentarios)
5. [Flujo de Generación de PDF](#flujo-de-generación-de-pdf)
6. [Flujo de Base de Datos](#flujo-de-base-de-datos)

---

## 1. FLUJO GENERAL DEL SISTEMA

### Diagrama de Flujo General

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Usuario Web   │    │   Servidor API   │    │   Base de Datos │
│ (Frontend)      │    │ (Backend)        │    │ (PostgreSQL)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │ 1. Petición HTTP      │                       │
         │ ─────────────────────▶│                       │
         │                       │ 2. Procesamiento      │
         │                       │ ─────────────────────▶│
         │                       │                       │ 3. Consulta SQL
         │                       │                       │ ─────────────────────▶│
         │                       │                       │                       │
         │                       │                       │ 4. Resultado SQL      │
         │                       │                       │ ◀─────────────────────│
         │                       │ 5. Respuesta JSON     │                       │
         │                       │ ◀─────────────────────│                       │
         │ 6. Renderizado UI     │                       │                       │
         │ ◀─────────────────────│                       │                       │
         │                       │                       │                       │
```

### Descripción del Flujo
1. **Usuario**: Interactúa con la interfaz web (React)
2. **Frontend**: Envía peticiones HTTP al backend
3. **Backend**: Procesa la petición y consulta la base de datos
4. **Base de Datos**: Ejecuta consultas SQL y devuelve resultados
5. **Backend**: Formatea los resultados y envía respuesta JSON
6. **Frontend**: Renderiza la interfaz con los datos recibidos

---

## 2. FLUJO DE AUTENTICACIÓN

### Diagrama de Flujo de Login

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Usuario Web   │    │   Servidor API   │    │   Base de Datos │
│ (Frontend)      │    │ (Backend)        │    │ (PostgreSQL)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │ 1. Formulario Login   │                       │
         │ ─────────────────────▶│                       │
         │                       │ 2. Validación        │
         │                       │ ─────────────────────▶│
         │                       │                       │ 3. Consulta Usuario
         │                       │                       │ ─────────────────────▶│
         │                       │                       │                       │
         │                       │                       │ 4. Verificar Credenciales
         │                       │                       │ ◀─────────────────────│
         │                       │ 5. Generar JWT        │                       │
         │                       │ ◀─────────────────────│                       │
         │ 6. Almacenar Token    │                       │                       │
         │ ◀─────────────────────│                       │                       │
         │                       │                       │                       │
         │ 7. Redirección        │                       │                       │
         │ ─────────────────────▶│                       │                       │
         │                       │                       │                       │
```

### Descripción del Flujo
1. **Usuario**: Ingresa email y contraseña en el formulario
2. **Frontend**: Envía datos al endpoint `/api/auth/login`
3. **Backend**: Valida los datos y consulta la base de datos
4. **Base de Datos**: Busca el usuario por email
5. **Backend**: Verifica contraseña y genera JWT (token)
6. **Frontend**: Almacena el token en localStorage
7. **Frontend**: Redirige al dashboard según el rol

---

## 3. FLUJO DE GESTIÓN DE TICKETS

### Diagrama de Flujo de Tickets

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Usuario Web   │    │   Servidor API   │    │   Base de Datos │
│ (Frontend)      │    │ (Backend)        │    │ (PostgreSQL)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │ 1. Crear Ticket       │                       │
         │ ─────────────────────▶│                       │
         │                       │ 2. Validación        │
         │                       │ ─────────────────────▶│
         │                       │                       │ 3. Insertar Ticket
         │                       │                       │ ─────────────────────▶│
         │                       │                       │                       │
         │                       │                       │ 4. Confirmación       │
         │                       │                       │ ◀─────────────────────│
         │                       │ 5. Respuesta Ticket   │                       │
         │                       │ ◀─────────────────────│                       │
         │ 6. Mostrar Ticket     │                       │                       │
         │ ◀─────────────────────│                       │                       │
         │                       │                       │                       │
```

### Descripción del Flujo
1. **Usuario**: Llena el formulario de creación de ticket
2. **Frontend**: Envía datos al endpoint `/api/tickets`
3. **Backend**: Valida los datos y crea el ticket
4. **Base de Datos**: Inserta el nuevo ticket en la tabla
5. **Backend**: Devuelve el ticket creado con su ID
6. **Frontend**: Muestra el ticket en la interfaz

---

## 4. FLUJO DE COMENTARIOS

### Diagrama de Flujo de Comentarios

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Usuario Web   │    │   Servidor API   │    │   Base de Datos │
│ (Frontend)      │    │ (Backend)        │    │ (PostgreSQL)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │ 1. Escribir Comentario│                       │
         │ ─────────────────────▶│                       │
         │                       │ 2. Validación        │
         │                       │ ─────────────────────▶│
         │                       │                       │ 3. Insertar Comentario
         │                       │                       │ ─────────────────────▶│
         │                       │                       │                       │
         │                       │                       │ 4. Actualizar Ticket │
         │                       │                       │ ◀─────────────────────│
         │                       │ 5. Respuesta Comentario│                       │
         │                       │ ◀─────────────────────│                       │
         │ 6. Mostrar Comentario │                       │                       │
         │ ◀─────────────────────│                       │                       │
         │                       │                       │                       │
```

### Descripción del Flujo
1. **Usuario**: Escribe un comentario en un ticket
2. **Frontend**: Envía el comentario al endpoint `/api/tickets/:id/comments`
3. **Backend**: Valida el comentario y lo inserta
4. **Base de Datos**: Inserta el comentario y actualiza el ticket
5. **Backend**: Devuelve el comentario creado
6. **Frontend**: Muestra el nuevo comentario en la interfaz

---

## 5. FLUJO DE GENERACIÓN DE PDF

### Diagrama de Flujo de PDF

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Usuario Web   │    │   Servidor API   │    │   Base de Datos │
│ (Frontend)      │    │ (Backend)        │    │ (PostgreSQL)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │ 1. Solicitar PDF      │                       │
         │ ─────────────────────▶│                       │
         │                       │ 2. Consultar Datos    │
         │                       │ ─────────────────────▶│
         │                       │                       │ 3. Obtener Datos
         │                       │                       │ ─────────────────────▶│
         │                       │                       │                       │
         │                       │                       │ 4. Formatear HTML    │
         │                       │                       │ ◀─────────────────────│
         │                       │ 5. Generar PDF        │                       │
         │                       │ ◀─────────────────────│                       │
         │ 6. Descargar PDF      │                       │                       │
         │ ◀─────────────────────│                       │                       │
         │                       │                       │                       │
```

### Descripción del Flujo
1. **Usuario**: Solicita generar reporte en PDF
2. **Frontend**: Envía petición al endpoint `/api/tickets/:id/pdf`
3. **Backend**: Consulta los datos del ticket y comentarios
4. **Base de Datos**: Devuelve los datos solicitados
5. **Backend**: Crea plantilla HTML y la convierte a PDF
6. **Frontend**: Inicia la descarga del archivo PDF

---

## 6. FLUJO DE BASE DE DATOS

### Diagrama de Flujo de Datos

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Usuario Web   │    │   Servidor API   │    │   Base de Datos │
│ (Frontend)      │    │ (Backend)        │    │ (PostgreSQL)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │ 1. Petición CRUD      │                       │
         │ ─────────────────────▶│                       │
         │                       │ 2. Validación        │
         │                       │ ─────────────────────▶│
         │                       │                       │ 3. Operación SQL
         │                       │                       │ ─────────────────────▶│
         │                       │                       │                       │
         │                       │                       │ 4. Resultado SQL     │
         │                       │                       │ ◀─────────────────────│
         │                       │ 5. Formatear Respuesta│                       │
         │                       │ ◀─────────────────────│                       │
         │ 6. Enviar JSON        │                       │                       │
         │ ◀─────────────────────│                       │                       │
         │                       │                       │                       │
```

### Descripción del Flujo
1. **Usuario**: Realiza una operación (crear, leer, actualizar, eliminar)
2. **Frontend**: Envía petición HTTP al backend
3. **Backend**: Valida los datos y prepara la consulta SQL
4. **Base de Datos**: Ejecuta la operación y devuelve resultados
5. **Backend**: Formatea los resultados en JSON
6. **Frontend**: Recibe y procesa la respuesta

---

## CASOS DE USO PRINCIPALES

### Caso 1: Cliente Crea Ticket
1. Cliente inicia sesión
2. Navega a "Crear Ticket"
3. Llena el formulario
4. Envía el ticket
5. Recibe confirmación
6. Puede ver el ticket creado

### Caso 2: Agente Soporte Atiende Ticket
1. Agente inicia sesión
2. Ve lista de tickets asignados
3. Selecciona un ticket
4. Agrega comentarios
5. Escala o cierra el ticket
6. Genera reporte PDF

### Caso 3: Administrador Gestiona Sistema
1. Administrador inicia sesión
2. Gestiona empresas y productos
3. Administra usuarios
4. Ve reportes generales
5. Configura el sistema

---

## INTERACCIÓN ENTRE COMPONENTES

### Frontend ↔ Backend
- **Peticiones HTTP**: GET, POST, PUT, DELETE
- **Formato**: JSON
- **Autenticación**: Headers con JWT
- **Errores**: Códigos HTTP (404, 401, 500)

### Backend ↔ Base de Datos
- **Conector**: pg (PostgreSQL)
- **Operaciones**: SELECT, INSERT, UPDATE, DELETE
- **Transacciones**: ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad)
- **Índices**: Optimización de consultas

### Frontend ↔ Base de Datos
- **No hay conexión directa**
- **Toda la comunicación pasa por el backend**
- **Seguridad**: El frontend nunca se conecta directamente a la base de datos

---

## SEGURIDAD DEL SISTEMA

### Autenticación
- **JWT**: Tokens seguros con tiempo de expiración
- **Roles**: Diferentes niveles de acceso
- **Validación**: Contraseñas encriptadas

### Autorización
- **Middleware**: Protege rutas según el rol
- **Permisos**: Acceso restringido a funcionalidades
- **Validación**: Datos verificados en el backend

### Protección de Datos
- **Encriptación**: Contraseñas con bcrypt
- **Validación**: Datos verificados antes de guardar
- **Índices**: Protección contra inyección SQL

---

## RENDIMIENTO Y OPTIMIZACIÓN

### Base de Datos
- **Índices**: Columnas más consultadas
- **Consultas**: Optimizadas con JOINs eficientes
- **Concurrencia**: Manejo de múltiples peticiones

### Backend
- **Cache**: Respuestas frecuentes
- **Rate Limiting**: Protección contra ataques
- **Middleware**: Procesamiento eficiente

### Frontend
- **Lazy Loading**: Carga diferida de componentes
- **Cache**: Datos frecuentemente usados
- **Optimización**: Código minificado

---

## MANTENIMIENTO Y MONITOREO

### Monitoreo
- **Logs**: Registro de actividades
- **Errores**: Detección y notificación
- **Métricas**: Desempeño del sistema

### Mantenimiento
- **Backups**: Copias de seguridad automáticas
- **Actualizaciones**: Seguridad y funcionalidades
- **Optimización**: Mejora continua del rendimiento

---

## CONCLUSIÓN DEL FLUJO DEL SISTEMA

El sistema sigue un flujo claro y seguro:
1. **Usuario** interactúa con la interfaz
2. **Frontend** envía peticiones al backend
3. **Backend** procesa y consulta la base de datos
4. **Base de Datos** ejecuta operaciones y devuelve resultados
5. **Backend** formatea y envía respuesta
6. **Frontend** renderiza la interfaz

Este flujo garantiza:
- ✅ **Seguridad**: Comunicación protegida
- ✅ **Escalabilidad**: Puede crecer con el negocio
- ✅ **Mantenibilidad**: Código organizado y documentado
- ✅ **Rendimiento**: Optimizado para múltiples usuarios

---

## PRÓXIMAS FASES

¿Estás listo para continuar con la implementación del sistema? En las próximas fases configuraremos:

1. **BLOQUE 2**: Conexión a PostgreSQL
2. **BLOQUE 3**: Servidor Express
3. **BLOQUE 4**: Aplicación React
4. **BLOQUE 5**: Sistema de autenticación

¿Procedemos con la implementación del sistema?