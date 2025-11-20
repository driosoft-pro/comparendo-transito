# Sistema de Comparendos – Backend API

Sistema backend modular para la gestión de usuarios, comparendos, automotores, personas, infracciones y quejas, basado en Node.js + Express + Supabase + MongoDB.

Incluye:

✔ Autenticación JWT
✔ Control de roles y permisos
✔ Soft Delete
✔ Modelos modulares por archivo
✔ Validación de datos
✔ Logs centralizados
✔ Manejo global de errores
✔ Scripts SQL
✔ Estructura limpia para escalar a microservicios
✔ Documentación y diagramas incluidos

**Comparendos de Tránsito**, desarrollado con:

- **Node.js + Express (JavaScript)**
- **Supabase (PostgreSQL en la nube)**
- **MongoDB (motor alterno)**
- **JWT (autenticación segura)**
- **Arquitectura modular y escalable**

---

## MER

![MER_COMPARENDO_TRNASITO.png](docs/img/MER_COMPARENDO_TRANSITO.png)

---

## Estructura del Proyecto

```
/api-comparendos-backend
│
├── docs/                                   # Documentación y diagramas del sistema
│   ├── EntidadesComparendoTransito.pdf
│   └── RequerimientosComparendoTrancito.pdf
│ 
│├── scripts/                                # Scripts útiles (BD / auditoría)
│   ├── comparendos_transito.sql             # Creacion inicial de las tablas de SQL
│   ├── comparendos_transito.yaml            
│   ├── insert.sql                           # Inserts de prueba para SQL 
│   ├── insertMongo.sql                      # Inserts de prueba para Mongo
│   ├── instrucciones_mongo.txt
│   ├── quejas.sql                           #Validaciones para la base de datos de Mongo
│   └── querys.sql
│
├── src/
│   ├── app.js                               # Configuración principal de Express
│
│   ├── config/                              # Configuración de proveedores externos
│   │   ├── supabase.js                      # Conexión PostgreSQL (Supabase)
│   │   ├── mongo.js                         # Conexión MongoDB
│   │   └── jwt.js                           # Helpers y firma/verificación JWT
│
│   ├── middleware/                          # Middlewares globales
│   │   └── auth.middleware.js               # Validación JWT y roles
│
│   ├── controllers/                         # Lógica de negocio de cada entidad
│   │   ├── auth.controller.js
│   │   ├── automotores.controller.js
│   │   ├── cargoPolicial.controller.js
│   │   ├── categoriaLicencia.controller.js
│   │   ├── comparendoInfracciones.controller.js
│   │   ├── comparendos.controller.js
│   │   ├── infracciones.controller.js
│   │   ├── licenciaCategoria.controller.js
│   │   ├── licencias.controller.js
│   │   ├── municipios.controller.js
│   │   ├── personas.controller.js
│   │   ├── policias.controller.js
│   │   ├── propiedades.controller.js
│   │   ├── quejas.controller.js
│   │   ├── secretarias.controller.js
│   │   └── usuarios.controller.js
│
│   ├── routes/                              # Definición de rutas REST (API)
│   │   ├── auth.routes.js
│   │   ├── automotores.routes.js
│   │   ├── cargosPoliciales.routes.js
│   │   ├── categoriasLicencia.routes.js
│   │   ├── comparendoInfracciones.routes.js
│   │   ├── comparendos.routes.js
│   │   ├── infracciones.routes.js
│   │   ├── licenciaCategoria.routes.js
│   │   ├── licencias.routes.js
│   │   ├── municipios.routes.js
│   │   ├── personas.routes.js
│   │   ├── policias.routes.js
│   │   ├── propiedades.routes.js
│   │   ├── quejas.routes.js
│   │   ├── secretarias.routes.js
│   │   ├── usuarios.routes.js
│   │   └── index.js                         # Agrupa todas las rutas del módulo API
│
│   ├── models/                              # Modelos de datos SQL y NoSQL
│   │   ├── baseModel.js                     # Base genérica Supabase
│   │   ├── baseModelNoSQL.model.js          # Base genérica MongoDB
│   │   ├── automotor.model.js
│   │   ├── cargoPolicial.model.js
│   │   ├── categoriaLicencia.model.js
│   │   ├── comparendo.model.js
│   │   ├── comparendoInfraccion.model.js
│   │   ├── infraccion.model.js
│   │   ├── licenciaCategoria.model.js
│   │   ├── licenciaConduccion.model.js
│   │   ├── municipio.model.js
│   │   ├── persona.model.js
│   │   ├── policiaTransito.model.js
│   │   ├── propiedadAutomotor.model.js
│   │   ├── queja.model.js
│   │   ├── secretariaTransito.model.js
│   │   ├── usuario.model.js
│   │   └── index.js                         # Export central de todos los modelos
│   │   └── server.js                        # Punto de entrada HTTP del servidor
│
│   ├── services/                            # Servicios reusables o integraciones
│   │   └── queja.service.js                 # Servicio avanzado para quejas
│
│   ├── utils/                               # Herramientas generales
│   │   ├── errorHandler.js                  # Middleware centralizado para errores
│   │   ├── logger.js                        # Logger estándar para auditoría
│   │   ├── password.js                      # Hash y validación de contraseñas
│   │   └── validators.js                    # Validadores y sanitización
│
├── test/                                    # Pruebas unitarias / integración
│
├── .env.example                              # Variables de entorno requeridas
├── .gitignore                                # Archivos ignorados por Git
├── package.json                              # Dependencias y scripts npm
└── README.md                                 # Documentación principal del backend
```

---

## Autenticación JWT

La API utiliza **JWT (JSON Web Token)** para autenticar usuarios.

El flujo es:

1. El usuario hace login → `/api/auth/login`
2. El backend valida credenciales en Supabase
3. Se genera un **token JWT firmado**
4. Todas las rutas protegidas requieren en el header:

```
Authorization: Bearer <tu_token>
```

## LIBRERIAS USADAS

- Express
- CORS
- Morgan
- Dotenv
- Helmet
- Jsonwebtoken
- Supabase
- Mongoose
- Bcryptjs
- Winston
- Nodemon
- Jest
- Supertest

---

## Motores de Base de Datos

### Supabase (SQL principal)

Usado para:

- Personas
- Automotores
- Comparendos
- Infracciones
- Propietarios

### MongoDB (motor alterno)

Usado para:

- Quejas ciudadanas

---

## Instalación

### 1. Clonar repositorio

```
git clone https://github.com/driosoft-pro/comparendo-transito-backend.git
```

```
cd comparendo-transito
```

### 2. Instalar dependencias

```
npm install
```

### 3. Crear archivo `.env`

Basado en `.env.example`:

```
# API ENV EXAMPLE
PORT=8080
NODE_ENV=development

# Entorno de BD
DB_ENV=remote   # o local

# Supabase LOCAL
SUPABASE_LOCAL_URL=http://localhost:54321
SUPABASE_LOCAL_KEY=local-dev-key
SUPABASE_LOCAL_SCHEMA=public

# Supabase REMOTO
SUPABASE_REMOTE_URL=https://xxxxx.supabase.co
SUPABASE_REMOTE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2d2hqZ2FqbmdxenN3ZHpxenNuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzA2Mjc4MCwiZXhwIjoyMDc4NjM4NzgwfQ.Vpd4xWXFVRXqfNTuqWgV2wNGr8JPP7ooudO9vFk3mMo
SUPABASE_REMOTE_SCHEMA=public

# JWT
JWT_SECRET=Ll4v3Sup3rS3cr3t4N0L4DR10S0FTPR02025@10
JWT_EXPIRES_IN=2h

# Local Mongo
MONGODB_LOCAL_URI=mongodb://localhost:27017/mi_basedatos

# Remoto Mongo
MONGODB_REMOTE_URI=mongodb+srv://usuario:password@cluster.mongodb.net/mi_basedatos
```

### 4. Ejecutar servidor

Modo desarrollo:

```
npm run dev
```

Modo producción:

```
npm start
```

---

## Datos

---

### PERMISOS POR ROL

| Rol           | Comparendos                   | Usuario   | Quejas              | Reportes            | Auditorías |
| ------------- | ----------------------------- | --------- | ------------------- | ------------------- | ---------- |
| Administrador | Todo                          | Todo      | Todo                | Todo                | Todo       |
| Policía       | Crear, Ver propios            | -         | Ver propias         | Ver                 | -          |
| Supervisor    | Ver todos, Actualizar, Anular | Ver todos | Ver todas, Resolver | Generar, Ver        | Ver        |
| Operador      | Ver todos, Actualizar         | -         | ver todas, Resolver | Ver                 | -          |
| Auditor       | Ver todos                     | Ver todos | Ver todas, Resolver | Generar, Financiero | Ver todas  |
| Ciudadano     | Ver propios                   | -         | Crear, Ver propias  | -                   | -          |

---

### LISTADO DE USUARIOS

#### Administrador

| Usuario    | Contraseña | Rol           | ID  |
| ---------- | ---------- | ------------- | --- |
| admin.cali | Admin123!  | administrador | 1   |

#### Policías de Tránsito

| Usuario           | Contraseña  | Rol              | ID  |
| ----------------- | ----------- | ---------------- | --- |
| policia.rodriguez | Policia123! | policia_transito | 2   |
| policia.martinez  | Policia123! | policia_transito | 3   |
| policia.gomez     | Policia123! | policia_transito | 4   |
| policia.castro    | Policia123! | policia_transito | 11  |
| policia.torres.p  | Policia123! | policia_transito | 12  |
| policia.munoz     | Policia123! | policia_transito | 13  |
| policia.herrera   | Policia123! | policia_transito | 14  |
| policia.morales   | Policia123! | policia_transito | 16  |

#### Ciudadanos

| Usuario           | Contraseña    | Rol       | ID  |
| ----------------- | ------------- | --------- | --- |
| ciudadano.perez   | Ciudadano123! | ciudadano | 5   |
| ciudadano.lopez   | Ciudadano123! | ciudadano | 6   |
| ciudadano.sanchez | Ciudadano123! | ciudadano | 10  |

#### Personal Administrativo

| Usuario            | Contraseña     | Rol        | ID  |
| ------------------ | -------------- | ---------- | --- |
| supervisor.ramirez | Supervisor123! | supervisor | 7   |
| operador.castro    | Operador123!   | operador   | 8   |
| auditor.torres     | Auditor123!    | auditor    | 9   |

#### Resumen de contraseñas por rol

| Rol                 | Contraseña     | Cantidad de usuarios |
| ------------------- | -------------- | -------------------- |
| Administrador       | Admin123!      | 1                    |
| Policía de Tránsito | Policia123!    | 9                    |
| Ciudadano           | Ciudadano123!  | 3                    |
| Supervisor          | Supervisor123! | 1                    |
| Operador            | Operador123!   | 1                    |
| Auditor             | Auditor123!    | 1                    |

---

## LOGIN JWT - Supabase

| Método | Endpoint           | Descripción                         |
| ------ | ------------------ | ----------------------------------- |
| POST   | `/api/auth/login`  | Login de usuario                    |
| GET    | `/api/auth/login`  | Información del usuario autenticado |
| POST   | `/api/auth/logout` | Logout de usuario                   |

## ENDPOINTS PRINCIPALES

| Método | Endpoint           | Descripción         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/auth/login`  | Login de usuario    |
| POST   | `/api/usuarios`    | Crear usuario       |
| GET    | `/api/comparendos` | Listar comparendos  |
| POST   | `/api/comparendos` | Crear comparendo    |
| GET    | `/api/perfiles`    | Listar perfiles     |
| GET    | `/api/vehiculos`   | Listar vehiculos`   |
| POST   | `/api/quejas`      | Crear queja (Mongo) |
| POST   | `/api/auth/login`  | Login de usuario    |

---

## CRUD USUARIOS

| Método | Endpoint            | Descripción               |
| ------ | ------------------- | ------------------------- |
| GET    | `/api/usuarios`     | Listar usuarios           |
| GET    | `/api/usuarios/:id` | Obtener usuario por ID    |
| PUT    | `/api/usuarios/:id` | Actualizar usuario por ID |
| DELETE | `/api/usuarios/:id` | Eliminar usuario por ID   |

## CRUD PERSONAS

| Método | Endpoint            | Descripción              |
| ------ | ------------------- | ------------------------ |
| GET    | `/api/perfiles`     | Listar perfiles          |
| GET    | `/api/perfiles/:id` | Obtener perfil por ID    |
| PUT    | `/api/perfiles/:id` | Actualizar perfil por ID |
| DELETE | `/api/perfiles/:id` | Eliminar perfil por ID   |

## CRUD POLICIAS

| Método | Endpoint            | Descripción               |
| ------ | ------------------- | ------------------------- |
| GET    | `/api/policias`     | Listar policias           |
| GET    | `/api/policias/:id` | Obtener policia por ID    |
| PUT    | `/api/policias/:id` | Actualizar policia por ID |
| DELETE | `/api/policias/:id` | Eliminar policia por ID   |

## CRUD AUTOMOTORES

| Método | Endpoint             | Descripción                |
| ------ | -------------------- | -------------------------- |
| GET    | `/api/vehiculos`     | Listar vehiculos           |
| GET    | `/api/vehiculos/:id` | Obtener vehiculo por ID    |
| PUT    | `/api/vehiculos/:id` | Actualizar vehiculo por ID |
| DELETE | `/api/vehiculos/:id` | Eliminar vehiculo por ID   |

## CRUD SECRETARIAS

| Método | Endpoint               | Descripción                  |
| ------ | ---------------------- | ---------------------------- |
| GET    | `/api/secretarias`     | Listar secretarias           |
| GET    | `/api/secretarias/:id` | Obtener secretaria por ID    |
| PUT    | `/api/secretarias/:id` | Actualizar secretaria por ID |
| DELETE | `/api/secretarias/:id` | Eliminar secretaria por ID   |

## CRUD MUNICIPIOS

| Método | Endpoint              | Descripción                 |
| ------ | --------------------- | --------------------------- |
| GET    | `/api/municipios`     | Listar municipios           |
| GET    | `/api/municipios/:id` | Obtener municipio por ID    |
| PUT    | `/api/municipios/:id` | Actualizar municipio por ID |
| DELETE | `/api/municipios/:id` | Eliminar municipio por ID   |

## CRUD LICENCIAS

| Método | Endpoint             | Descripción                |
| ------ | -------------------- | -------------------------- |
| GET    | `/api/licencias`     | Listar licencias           |
| GET    | `/api/licencias/:id` | Obtener licencia por ID    |
| PUT    | `/api/licencias/:id` | Actualizar licencia por ID |
| DELETE | `/api/licencias/:id` | Eliminar licencia por ID   |

## CRUD LICENCIAS CATEGORIAS

| Método | Endpoint                       | Descripción                          |
| ------ | ------------------------------ | ------------------------------------ |
| GET    | `/api/licencia-categorias`     | Listar licencia-categorias           |
| GET    | `/api/licencia-categorias/:id` | Obtener licencia-categoria por ID    |
| PUT    | `/api/licencia-categorias/:id` | Actualizar licencia-categoria por ID |
| DELETE | `/api/licencia-categorias/:id` | Eliminar licencia-categoria por ID   |

## CRUD CATEGORIAS LICENCIAS

| Método | Endpoint                       | Descripción                          |
| ------ | ------------------------------ | ------------------------------------ |
| GET    | `/api/categorias-licencia`     | Listar categorias-licencia           |
| GET    | `/api/categorias-licencia/:id` | Obtener categoria-licencia por ID    |
| PUT    | `/api/categorias-licencia/:id` | Actualizar categoria-licencia por ID |
| DELETE | `/api/categorias-licencia/:id` | Eliminar categoria-licencia por ID   |

## CRUD PROPIEDADES

| Método | Endpoint               | Descripción                 |
| ------ | ---------------------- | --------------------------- |
| GET    | `/api/propiedades`     | Listar propiedades          |
| GET    | `/api/propiedades/:id` | Obtener municipio por ID    |
| PUT    | `/api/propiedades/:id` | Actualizar propiedad por ID |
| DELETE | `/api/propiedades/:id` | Eliminar propiedad por ID   |

## CRUD COMPARENDOS

| Método | Endpoint               | Descripción                  |
| ------ | ---------------------- | ---------------------------- |
| GET    | `/api/comparendos`     | Listar comparendos           |
| GET    | `/api/comparendos/:id` | Obtener comparendo por ID    |
| PUT    | `/api/comparendos/:id` | Actualizar comparendo por ID |
| DELETE | `/api/comparendos/:id` | Eliminar comparendo por ID   |

## CRUD COMPARENDOS INFRACCIONES

| Método | Endpoint               | Descripción                  |
| ------ | ---------------------- | ---------------------------- |
| GET    | `/api/comparendos`     | Listar comparendos           |
| GET    | `/api/comparendos/:id` | Obtener comparendo por ID    |
| PUT    | `/api/comparendos/:id` | Actualizar comparendo por ID |
| DELETE | `/api/comparendos/:id` | Eliminar comparendo por ID   |

## CRUD INFRACCIONES

| Método | Endpoint                           | Descripción                             |
| ------ | ---------------------------------- | --------------------------------------- |
| GET    | `/api/comparendo-infracciones`     | Listar comparendo-infracciones          |
| GET    | `/api/comparendo-infracciones/:id` | Obtener comparendo-infraccion por ID    |
| PUT    | `/api/comparendo-infracciones/:id` | Actualizar comparendo-infraccion por ID |
| DELETE | `/api/comparendo-infracciones/:id` | Eliminar comparendo-infraccion por ID   |

## CRUD QUEJAS

| Método | Endpoint          | Descripción             |
| ------ | ----------------- | ----------------------- |
| GET    | `/api/quejas`     | Listar quejas           |
| GET    | `/api/quejas/:id` | Obtener queja por ID    |
| PUT    | `/api/quejas/:id` | Actualizar queja por ID |
| DELETE | `/api/quejas/:id` | Eliminar queja por ID   |

---

## COMANDOS DISPONIBLES

#### Desarrollo (con nodemon - recarga automática)

```
npm run dev
```

#### Producción (sin nodemon)

```
npm start
```

#### Tests (ejecutar una vez)

```
npm test
```

#### Tests en modo watch (ejecuta automáticamente al guardar)

```
npm run test:watch
```

#### Tests con cobertura de código

```
npm run test:coverage
```

# Comandos adicionales útiles:

#### Motor alterno: MongoDB

##### Ver todas las dependencias instaladas

```
npm list --depth=0
```

#### Actualizar dependencias

```
npm update
```

#### Verificar dependencias vulnerables

```
npm audit
```

#### Limpiar caché de npm

```
npm cache clean --force
```

#### Reinstalar todo desde cero

```
rm -rf node_modules package-lock.json
npm install
```

Justificación uso de MongoDB:

- Excelente para almacenar documentos de quejas (texto largo, adjuntos, historial)
- Complementa al SQL estructurado de Supabase

---

## TODO

- Validación de categorías de licencia
- Endpoints para múltiples infracciones por comparendo
- Sincronización entre Mongo ↔ Supabase
- Swagger

---

## Licencia

MIT – Libre para uso académico.

---

## Autor

- **Deyton Riasco Ortiz** — driosoftpro@gmail.com
- **Samuel Izquierdo Bonilla** — samuelizquierdo98@gmail.com

  **Año:** 2025
