# Documentación del Sistema - Micro-Soporte

---

## Índice
1. [Análisis del Proyecto](#1-análisis-del-proyecto)
2. [Base de Datos](#2-base-de-datos)
3. [Backend](#3-backend)
4. [Frontend](#4-frontend)
5. [Flujo del Sistema](#5-flujo-del-sistema)

---

## 1. Análisis del Proyecto

### ¿Qué es este sistema?
Help Desk básico para empresas que necesitan soporte técnico. Las empresas registran sus productos, los usuarios crean tickets de soporte, y el equipo de soporte gestiona y cierra esos tickets.

### Módulos
1. Gestión de empresas (customers)
2. Gestión de productos por cliente
3. Gestión de usuarios con roles
4. Gestión de tickets de soporte
5. Sistema de comentarios en tickets
6. Autenticación con JWT

### Roles del sistema
| Rol | Permisos |
|---|---|
| admin | Acceso total al sistema |
| support | Crear/actualizar tickets y comentarios, ver clientes y productos |
| client | Solo crear y ver sus propios tickets |

### Plan de construcción
1. Base de datos (schema.sql + Docker)
2. Conexión a PostgreSQL (db.js)
3. Modelos (User, Customer, Product, Ticket, Comment)
4. Middleware de autenticación (JWT)
5. Rutas del API (auth, tickets, products, customers, users, comments)
6. Frontend React (páginas, servicios, componentes)

---

## 2. Base de Datos

### Tablas y columnas principales

**customers** — Empresas cliente
- `nit` — Clave primaria (identificación de la empresa)
- `company_name` — Nombre de la empresa
- `contact_email` — Email de contacto
- `created_at` — Fecha de creación

**products** — Productos de cada empresa
- `product_id` — ID autoincremental
- `nit_customer` — Llave foránea a customers
- `product_name` — Nombre del producto
- `description` — Descripción

**users** — Usuarios del sistema
- `user_id` — ID autoincremental
- `full_name` — Nombre completo
- `email` — Email único de acceso
- `password_hash` — Contraseña encriptada con bcrypt
- `role` — Rol: admin, support o client

**tickets** — Tickets de soporte (tabla central)
- `ticket_id` — ID autoincremental
- `product_id` — Producto afectado (opcional)
- `created_by` — Usuario que creó el ticket
- `assigned_to` — Agente asignado (opcional)
- `subject` — Asunto del ticket
- `description` — Descripción del problema
- `type` — Tipo: incident, request, question
- `impact` — Severidad: low, medium, high, critical
- `status` — Estado: open, in_progress, closed
- `level` — Nivel de escalamiento: 1 (L1) o 2 (L2)

**comments** — Comentarios en tickets
- `comment_id` — ID autoincremental
- `ticket_id` — Ticket al que pertenece
- `user_id` — Usuario que escribió el comentario
- `content` — Texto del comentario

### Relaciones
- customers (1) → products (muchos): una empresa tiene muchos productos
- products (1) → tickets (muchos): un producto puede tener muchos tickets
- tickets (1) → comments (muchos): un ticket puede tener muchos comentarios
- users (1) → tickets (muchos): un agente puede tener muchos tickets asignados

### Conceptos SQL importantes

**Placeholders `$1, $2...`**
Previenen inyección SQL. Los valores reales se pasan como array separado.
```sql
SELECT * FROM users WHERE email = $1   -- consulta
['usuario@email.com']                  -- valores
```

**RETURNING**
Después de INSERT/UPDATE/DELETE, devuelve el registro afectado sin hacer otra consulta.
```sql
INSERT INTO tickets (...) VALUES (...) RETURNING *
```

**ON DELETE CASCADE**
Si se elimina la empresa, sus productos también se eliminan automáticamente.

**ON DELETE SET NULL**
Si se elimina un usuario, el ticket sigue existiendo con `assigned_to = null`.

---

## 3. Backend

### db.js — Conexión a PostgreSQL
Crea un "pool" de conexiones reutilizables. Un pool mantiene conexiones abiertas para evitar el costo de abrir una nueva conexión en cada petición.

### Modelos (models/)
Cada modelo representa una tabla y contiene los métodos CRUD.
En vez de escribir SQL directamente en las rutas, se llama a métodos del modelo.

**Métodos comunes en cada modelo:**
- `getAll()` — obtener todos los registros
- `findById(id)` — buscar por ID
- `create(datos)` — insertar nuevo registro
- `update(id, datos)` — actualizar registro
- `delete(id)` — eliminar registro

**Ticket** tiene métodos adicionales:
- `getByUser(user_id)` — tickets de un usuario específico

### Middleware de autenticación (middleware/auth.js)

**¿Qué es un middleware?**
Función que se ejecuta entre que llega la petición y que la ruta la procesa.
```
Petición → verificarToken → ruta → respuesta
```

**verificarToken**
1. Lee el header `Authorization: Bearer TOKEN`
2. Si no hay token → responde 401
3. Verifica el token con `jwt.verify()`
4. Guarda el usuario en `req.usuario`
5. Llama a `next()` para continuar

**requerirRol(['admin', 'support'])**
Verifica que `req.usuario.role` esté en la lista de roles permitidos.
- 401 = no autenticado (sin token)
- 403 = autenticado pero sin permiso

### Rutas (routes/)

**Verbos HTTP usados:**
| Verbo | Uso |
|---|---|
| GET | Leer datos |
| POST | Crear recurso |
| PUT | Actualizar recurso |
| DELETE | Eliminar recurso |

**Endpoints principales:**

`/api/auth`
- `POST /login` — iniciar sesión, retorna JWT
- `POST /register` — registrar nuevo usuario

`/api/tickets`
- `GET /` — listar tickets (clientes solo ven los suyos)
- `GET /:id` — detalle de ticket con comentarios
- `POST /` — crear ticket
- `PUT /:id` — actualizar ticket (admin, support)
- `DELETE /:id` — eliminar ticket (admin)
- `POST /:id/comentarios` — agregar comentario

`/api/products`
- `GET /` — listar productos
- `POST /` — crear producto (admin, support)
- `DELETE /:id` — eliminar producto (admin)

`/api/customers`
- `GET /` — listar empresas
- `POST /` — crear empresa (admin, support)

`/api/users`
- `GET /` — listar usuarios (admin)
- `PUT /:id` — actualizar usuario (admin)
- `DELETE /:id` — eliminar usuario (admin)

### app.js — Servidor Express
Punto de entrada del backend. Configura:
- `cors` — permite peticiones del frontend
- `express.json()` — parsea el cuerpo JSON de las peticiones
- `app.use('/api', routes)` — monta todas las rutas

---

## 4. Frontend

### Conceptos React

**useState** — manejo de estado local
```js
const [tickets, setTickets] = useState([]);
setTickets(data); // actualiza y re-renderiza
```

**useEffect** — ejecutar código al cargar el componente
```js
useEffect(() => {
  // se ejecuta una vez al montar el componente
  cargarTickets();
}, []);
```

**useNavigate** — navegar entre páginas
```js
const navigate = useNavigate();
navigate('/dashboard');
```

**useParams** — leer parámetros de la URL
```js
const { id } = useParams(); // /tickets/5 → id = "5"
```

### Archivos del frontend

**services/api.js**
Funciones que hacen las peticiones HTTP al backend. Usa axios con el token JWT en el header. Cada función corresponde a un endpoint del backend.

**utils/auth.js**
Funciones de utilidad para autenticación:
- `getToken()` — lee el JWT del localStorage
- `getUsuario()` — lee y parsea el usuario del localStorage
- `estaAutenticado()` — retorna true si hay token
- `cerrarSesion()` — limpia localStorage y redirige a /login

**hooks/useAuth.js**
Hook personalizado que encapsula la lógica de autenticación para usarla en componentes React.

**components/Navbar.js**
Barra de navegación. Se oculta si no hay sesión activa. Muestra el nombre y rol del usuario con un badge de color.

**pages/Login.js**
Formulario de login. Al enviar, llama a `login()` de api.js, guarda el token en localStorage y redirige al dashboard.

**pages/Dashboard.js**
Panel principal. Muestra 4 tarjetas con estadísticas (total, abiertos, en progreso, cerrados) calculadas desde el array de tickets, y una tabla con los últimos 5 tickets.

**pages/Tickets.js**
Lista todos los tickets. Los clientes solo ven los suyos (el backend filtra automáticamente según el token). Cada fila es clickeable y navega al detalle.

**pages/CreateTicket.js**
Formulario para crear ticket. Carga los productos disponibles al montar. Al crear exitosamente, redirige al detalle del nuevo ticket.

**pages/TicketDetail.js**
Detalle completo de un ticket. Permite cambiar el estado (admin/support) y agregar comentarios. Los cambios se aplican al estado local sin recargar la página.

**pages/Products.js**
Lista todos los productos con el nombre de la empresa a la que pertenecen (JOIN en el backend).

**pages/Users.js**
Lista de usuarios (solo accesible para admins). Verifica el rol en el useEffect y redirige si no es admin.

---

## 5. Flujo del Sistema

### Flujo general
```
Usuario → Frontend (React) → Backend (Express) → Base de Datos (PostgreSQL)
                           ←                   ←
```
1. El usuario interactúa con la interfaz React
2. El frontend envía una petición HTTP al backend con el token JWT
3. El backend verifica el token y procesa la petición
4. El backend consulta la base de datos con SQL
5. La base de datos retorna los resultados
6. El backend envía respuesta JSON al frontend
7. El frontend actualiza la interfaz con los datos

### Flujo de login
1. Usuario ingresa email y contraseña
2. Frontend envía `POST /api/auth/login`
3. Backend busca el usuario por email
4. Backend compara la contraseña con `bcrypt.compare()`
5. Si coincide, genera un JWT con `jwt.sign()`
6. Frontend guarda el token en localStorage
7. Frontend redirige al dashboard

### Flujo de creación de ticket
1. Usuario llena el formulario
2. Frontend envía `POST /api/tickets` con el token en el header
3. Middleware verifica el token y agrega `req.usuario`
4. Backend crea el ticket con `Ticket.create()`
5. Base de datos inserta el registro y retorna el ticket creado
6. Frontend redirige al detalle del nuevo ticket

### Flujo de comentarios
1. Usuario escribe un comentario en el detalle del ticket
2. Frontend envía `POST /api/tickets/:id/comentarios`
3. Backend crea el comentario con `Comment.create()`
4. Frontend agrega el comentario al array local sin recargar la página

### Códigos de respuesta HTTP
| Código | Significado |
|---|---|
| 200 | OK — petición exitosa |
| 201 | Created — recurso creado |
| 400 | Bad Request — datos incorrectos |
| 401 | Unauthorized — sin token o token inválido |
| 403 | Forbidden — sin permiso para este recurso |
| 404 | Not Found — recurso no encontrado |
| 500 | Server Error — error interno del servidor |
