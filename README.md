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

## 🗄️ Motores de Base de Datos

### 🔷 Supabase (SQL principal)
Usado para:
- Personas  
- Automotores  
- Comparendos  
- Infracciones  
- Propietarios  

### 🟣 MongoDB (motor alterno)
Usado para:
- Quejas ciudadanas  
- Auditoría de acciones  
- Datos no estructurados o históricos  

---

## 🚀 Instalación

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
---

## 📦 Scripts NPM

```
npm run dev      # Nodemon
npm start        # Producción
npm test         # Tests
```

---

## 🧪 Motor alterno: MongoDB

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
- **Proyecto académico para formación en desarrollo backend.**