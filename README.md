# 🚦 Sistema de Comparendos – Backend API  
Backend oficial del proyecto académico basado en **Comparendos de Tránsito**, desarrollado con:

- **Node.js + Express (JavaScript)**
- **Supabase (PostgreSQL en la nube)**
- **MongoDB (motor alterno)**
- **JWT (autenticación segura)**
- **Arquitectura modular y escalable**

---

## MER

![MER_COMPARENDO_TRNASITO.png](docs/img/MER_COMPARENDO_TRANSITO.png)

![MER_FULL.png](docs/img/MER_FULL.png)

---

## 📁 Estructura del Proyecto

```
/api-comparendos-backend
│
├── docs                           # Documentación y diagramas
│   └── db
│       ├── EntidadesComparendoTransito.pdf  
│       └── RequerimientosComparendoTrancito.pdf
├── scripts                        # Scripts útiles
│   └── db
│       ├── quejas.sql  
│       ├── auditoria.sql
│       └── supabase.sql    
├── src
│   ├── config
│   │   ├── supabase.js            # Conexión a Supabase
│   │   ├── mongo.js               # Conexión a MongoDB
│   │   └── jwt.js                 # Configuración JWT
│   │
│   ├── middleware
│   │   └── auth.middleware.js     # Validación JWT
│   │
│   ├── controllers                # Lógica de cada entidad
│   │   ├── usuarios.controller.js
│   │   ├── comparendos.controller.js
│   │   ├── personas.controller.js
│   │   ├── automotores.controller.js
│   │   ├── infracciones.controller.js
│   │   └── quejas.controller.js
│   │
│   ├── routes                     # Rutas REST
│   │   ├── index.js
│   │   ├── usuarios.routes.js
│   │   ├── comparendos.routes.js
│   │   ├── personas.routes.js
│   │   ├── automotores.routes.js
│   │   ├── infracciones.routes.js
│   │   └── quejas.routes.js
│   │
│   ├── models                     # Modelos (Supabase, Mongo)
│   │   ├── server.js
│   │   ├── usuario.model.js
│   │   ├── comparendo.model.js
│   │   ├── infraccion.model.js
│   │   ├── persona.model.js
│   │   ├── automotor.model.js
│   │   └── queja.model.js
│   │
│   ├── utils
│   │   ├── logger.js              # Logger centralizado
│   │   └── errorHandler.js        # Manejo global de errores
│   │
│   └── app.js                     # Configuración express
│    
├── test                           # Pruebas unitarias e integración
│   └── db
│       ├── quejas.sql  
│       ├── auditoria.sql
│       └── supabase.sql                 
│
├── .env.example                   # Variables necesarias
├── .gitignore                     # Ignorar archivos sensibles
├── package.json
└── README.md
```

---

## 🔐 Autenticación JWT

La API utiliza **JWT (JSON Web Token)** para autenticar usuarios.  

El flujo es:

1. El usuario hace login → `/api/auth/login`
2. El backend valida credenciales en Supabase
3. Se genera un **token JWT firmado**
4. Todas las rutas protegidas requieren en el header:

```
Authorization: Bearer <tu_token>
```

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
- Auditoría de acciones  
- Datos no estructurados o históricos  

---

## Instalación

### 1. Clonar repositorio
```
git clone git@github.com:driosoft-pro/comparendo-transito.git
cd comparendo-transito
```

### 2. Instalar dependencias
```
npm install
```

### 3. Crear archivo `.env`
Basado en `.env.example`:

```
PORT=8080
JWT_SECRET=tu_clave_segura

SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=xxxx
SUPABASE_SERVICE_ROLE_KEY=xxxx

MONGODB_URI=mongodb+srv://...
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
### Listado de Usuarios
#### Administrador
| Usuario     | Contraseña        | Rol               |ID  |
|-------------|-------------------|-------------------|----|
| admin.cali  | Admin123!         | administrador     |1   |

#### Policías de Tránsito
| Usuario          | Contraseña   | Rol               |ID  |
|------------------|--------------|-------------------|----|
| policia.rodriguez| Policia123!  | policia_transito  |2   |
| policia.martinez | Policia123!  | policia_transito  |3   |
| policia.gomez    | Policia123!  | policia_transito  |4   |
| policia.castro   | Policia123!  | policia_transito  |11  |
| policia.torres.p | Policia123!  | policia_transito  |12  |
| policia.munoz    | Policia123!  | policia_transito  |13  |
| policia.herrera  | Policia123!  | policia_transito  |14  |
| policia.morales  | Policia123!  | policia_transito  |16  |

#### Ciudadanos
| Usuario          | Contraseña    | Rol              |ID  |
|------------------|-------------- |------------------|----|
| ciudadano.perez  | Ciudadano123! | ciudadano        |5   |
| ciudadano.lopez  | Ciudadano123! | ciudadano        |6   |
| ciudadano.sanchez| Ciudadano123! | ciudadano        |10  |

#### Personal Administrativo
| Usuario            | Contraseña      | Rol          |ID  |
|--------------------|-----------------|--------------|----|
| supervisor.ramirez | Supervisor123!  | supervisor   |7   |
| operador.castro    | Operador123!    | operador     |8   |
| auditor.torres     | Auditor123!     | auditor      |9   |

#### Resumen de contraseñas por rol
| Rol                 | Contraseña      |  Cantidad de usuarios  |
|---------------------|-----------------|------------------------|
| Administrador       | Admin123!       |             1          |
| Policía de Tránsito | Policia123!     |             9          |
| Ciudadano           | Ciudadano123!   |             3          |
| Supervisor          | Supervisor123!  |             1          |
| Operador            | Operador123!    |             1          |
| Auditor             | Auditor123!     |             1          |



---

## 📚 Endpoints principales

| Método | Endpoint           | Descripción         |
|--------|--------------------|---------------------|
| POST   | `/api/auth/login`  | Login de usuario    |
| POST   | `/api/usuarios`    | Crear usuario       |
| GET    | `/api/comparendos` | Listar comparendos  |
| POST   | `/api/comparendos` | Crear comparendo    |
| GET    | `/api/personas`    | Listar personas     |
| GET    | `/api/automotores` | Listar automotores  |
| POST   | `/api/quejas`      | Crear queja (Mongo) |
| POST   | `/api/auth/login` | Login de usuario   |

## LOGIN JWT - Supabase
| Método | Endpoint          | Descripción                           |
|--------|-------------------|---------------------------------------|
| POST   | `/api/auth/login` | Login de usuario                      |
| GET    | `/api/auth/login` | Información del usuario autenticado   |

## CRUD USUARIOS
| Método | Endpoint            | Descripción               |
|--------|---------------------|---------------------------|
| GET    | `/api/usuarios`     | Listar usuarios           |
| GET    | `/api/usuarios/:id` | Obtener usuario por ID    |
| PUT    | `/api/usuarios/:id` | Actualizar usuario por ID |
| DELETE | `/api/usuarios/:id` | Eliminar usuario por ID   |  

---

## 📦 Scripts NPM


```bash
npm init -y
```

```bash
npm install express cors morgan dotenv helmet jsonwebtoken @supabase/supabase-js mongoose bcryptjs
winston && npm install -D nodemon jest
```

# comandos disponibles:
#### Desarrollo (con nodemon - recarga automática)
```bash
npm run dev
```

#### Producción (sin nodemon)
```bash
npm start
```

#### Tests (ejecutar una vez)
```bash
npm test
```

#### Tests en modo watch (ejecuta automáticamente al guardar)
```bash
npm run test:watch
```

#### Tests con cobertura de código
```bash
npm run test:coverage
```

# Comandos adicionales útiles:

#### Motor alterno: MongoDB
##### Ver todas las dependencias instaladas
```bash
npm list --depth=0
```

#### Actualizar dependencias
```bash
npm update
```

#### Verificar dependencias vulnerables
```bash
npm audit
```

#### Limpiar caché de npm
```bash
npm cache clean --force
```

#### Reinstalar todo desde cero
```bash
rm -rf node_modules package-lock.json
npm install
```

### 1. Clonar o iniciar proyecto
```bash
cd tu-proyecto
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Copiar variables de entorno
```bash
cp .env.example .env
```

### 4. Editar .env con tus credenciales
```bash
nano .env
```

#### 5. Ejecutar en desarrollo
```bash
npm run dev
```

Justificación:
- Excelente para almacenar documentos de quejas (texto largo, adjuntos, historial)
- Permite auditorías JSON flexibles
- Complementa al SQL estructurado de Supabase

---

## 🛠️ TODO

- Validación de categorías de licencia
- Endpoints para múltiples infracciones por comparendo
- Sincronización entre Mongo ↔ Supabase
- Swagger

---

## 📄 Licencia
MIT – Libre para uso académico.

---

## 👨‍💻 Autor
- **Deyton Riasco Ortiz** — driosoftpro@gmail.com
- **Samuel Izquierdo Bonilla** — samuelizquierdo98@gmail.com

  **Año:** 2025