# SISTEMA DE MICRO-SOPORTE L1/L2

## Descripción
Sistema de gestión de tickets de soporte técnico para empresas. Permite a las empresas registrar sus productos, crear tickets de soporte, gestionar usuarios y generar reportes en PDF.

## Estructura del Proyecto

```
soporte-micro/
├── backend/           # Servidor Node.js/Express
├── frontend/          # Aplicación React
├── database/          # Scripts SQL
├── docs/             # Documentación
├── package.json      # Dependencias raíz
└── README.md         # Este archivo
```

## Tecnologías Utilizadas

- **Backend**: Node.js + Express + PostgreSQL
- **Frontend**: React + Bootstrap + Axios
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT
- **PDF**: HTML + jsPDF

## Instalación y Configuración

### 1. Clonar el Proyecto
```bash
git clone <repositorio>
cd soporte-micro
```

### 2. Instalar Dependencias
```bash
npm run install:all
```

### 3. Configurar Base de Datos
1. Instalar PostgreSQL
2. Crear base de datos: `CREATE DATABASE soporte_micro;`
3. Ejecutar schema.sql: `\i database/schema.sql`

### 4. Variables de Entorno
Crear archivo `.env` en las carpetas `backend/` y `frontend/` con las variables necesarias.

## Scripts Disponibles

### Desde la raíz
```bash
npm run dev          # Inicia backend y frontend simultáneamente
npm run install:all  # Instala dependencias en todos los proyectos
npm run build        # Compila la aplicación React
npm run start        # Inicia solo el backend
```

### Backend
```bash
npm run dev          # Inicia servidor con nodemon
npm run start        # Inicia servidor en producción
```

### Frontend
```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Compila para producción
npm run preview      # Previsualiza la compilación
```

## Documentación

- [Bitácora del Proyecto](docs/bitacora.md)
- [Explicación del Código](docs/explicacion-codigo.md)
- [Flujo del Sistema](docs/flujo-sistema.md)

## Uso del Sistema

1. **Iniciar el Servidor**: `npm run dev`
2. **Acceder a la Aplicación**: http://localhost:3000
3. **Credenciales de Prueba**:
   - Admin: admin@microsoporte.com / admin123
   - Soporte: soporte@microsoporte.com / soporte123
   - Cliente: cliente@microsoporte.com / cliente123

## Contribución

1. Fork del proyecto
2. Crear feature branch
3. Commit de cambios
4. Push a la branch
5. Pull Request

## Licencia

MIT License - ver archivo LICENSE para detalles.

## Contacto

Equipo de Desarrollo
```

<task_progress>
- [x] Analyze project requirements
- [x] Create simplified plan
- [x] Get user approval
- [x] Create project structure
- [x] Create configuration files
- [x] Create database schema
- [x] Create documentation
- [x] Install dependencies
- [ ] Implement database
- [ ] Implement backend
- [ ] Implement frontend
- [ ] Implement authentication
- [ ] Implement business logic
- [ ] Implement PDF generation
- [ ] Test and verify
</task_progress>
</write_to_file>