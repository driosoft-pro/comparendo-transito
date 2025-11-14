-- =========================================================
-- 1. TABLAS BÁSICAS
-- =========================================================

-- MUNICIPIO
CREATE TABLE IF NOT EXISTS municipio (
    id_municipio       SERIAL PRIMARY KEY,
    nombre_municipio   VARCHAR(150) NOT NULL,
    departamento       VARCHAR(100) NOT NULL,
    codigo_dane        VARCHAR(20) UNIQUE,
    direccion_oficina_principal VARCHAR(255)
);

-- SECRETARIA_TRANSITO
CREATE TABLE IF NOT EXISTS secretaria_transito (
    id_secretaria  SERIAL PRIMARY KEY,
    nombre_secretaria VARCHAR(150) NOT NULL,
    direccion      VARCHAR(255),
    telefono       VARCHAR(50),
    email          VARCHAR(150),
    id_municipio   INT NOT NULL REFERENCES municipio(id_municipio)
);

-- CARGO_POLICIAL
CREATE TABLE IF NOT EXISTS cargo_policial (
    id_cargo      SERIAL PRIMARY KEY,
    nombre_cargo  VARCHAR(100) NOT NULL,
    descripcion   TEXT,
    grado         VARCHAR(50)
);

-- =========================================================
-- 2. POLICÍAS Y PERSONAS
-- =========================================================

-- POLICIA_TRANSITO
CREATE TABLE IF NOT EXISTS policia_transito (
    id_policia       SERIAL PRIMARY KEY,  -- código del policía
    nombres          VARCHAR(100) NOT NULL,
    apellidos        VARCHAR(100) NOT NULL,
    genero           VARCHAR(20),
    fecha_nacimiento DATE,
    fecha_vinculacion DATE,
    salario          NUMERIC(15,2),
    id_cargo         INT NOT NULL REFERENCES cargo_policial(id_cargo),
    id_secretaria    INT NOT NULL REFERENCES secretaria_transito(id_secretaria),
    id_policia_jefe  INT,
    CONSTRAINT fk_policia_jefe FOREIGN KEY (id_policia_jefe)
        REFERENCES policia_transito(id_policia)
);

-- PERSONA
CREATE TABLE IF NOT EXISTS persona (
    id_persona              SERIAL PRIMARY KEY,
    tipo_doc                VARCHAR(10) NOT NULL,
    num_doc                 VARCHAR(30) NOT NULL UNIQUE,
    nombres                 VARCHAR(100) NOT NULL,
    apellidos               VARCHAR(100) NOT NULL,
    fecha_nacimiento        DATE,
    genero                  VARCHAR(20),
    direccion               VARCHAR(255),
    telefono                VARCHAR(50),
    email                   VARCHAR(150),
    id_municipio_residencia INT REFERENCES municipio(id_municipio)
);

-- =========================================================
-- 3. AUTOMOTORES Y PROPIEDAD
-- =========================================================

-- AUTOMOTOR
CREATE TABLE IF NOT EXISTS automotor (
    placa                VARCHAR(20) PRIMARY KEY,
    tipo_vehiculo        VARCHAR(50) NOT NULL,  -- auto, moto, bus, etc.
    marca                VARCHAR(100),
    linea_modelo         VARCHAR(100),
    modelo_anio          INT,
    color                VARCHAR(50),
    cilindraje           INT,
    clase_servicio       VARCHAR(50),           -- particular, público, etc.
    id_municipio_registro INT REFERENCES municipio(id_municipio)
);

-- PROPIEDAD_AUTOMOTOR
CREATE TABLE IF NOT EXISTS propiedad_automotor (
    id_propiedad             SERIAL PRIMARY KEY,
    id_persona               INT NOT NULL REFERENCES persona(id_persona),
    placa                    VARCHAR(20) NOT NULL REFERENCES automotor(placa),
    fecha_inicio             DATE NOT NULL,
    fecha_fin                DATE,
    es_propietario_principal BOOLEAN DEFAULT FALSE,
    responsable_impuestos    BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_propiedad_persona
    ON propiedad_automotor(id_persona);

CREATE INDEX IF NOT EXISTS idx_propiedad_placa
    ON propiedad_automotor(placa);

-- =========================================================
-- 4. INFRACCIONES
-- =========================================================

-- INFRACCION
CREATE TABLE IF NOT EXISTS infraccion (
    id_infraccion    SERIAL PRIMARY KEY,
    codigo_infraccion VARCHAR(20) NOT NULL UNIQUE,
    descripcion      TEXT NOT NULL,
    tipo_infraccion  VARCHAR(50),
    valor_base       NUMERIC(15,2),
    puntos_descuento INT
);

-- =========================================================
-- 5. COMPARENDO Y RELACIÓN CON INFRACCIONES
-- =========================================================

-- COMPARENDO
CREATE TABLE IF NOT EXISTS comparendo (
    id_comparendo       SERIAL PRIMARY KEY,
    numero_comparendo   VARCHAR(50) UNIQUE, -- opcional único nacional
    fecha_hora_registro TIMESTAMP NOT NULL DEFAULT NOW(),
    direccion_infraccion VARCHAR(255),
    coordenadas_gps      VARCHAR(100),
    observaciones        TEXT,
    estado               VARCHAR(30) DEFAULT 'pendiente', -- pendiente, pagado, anulado, etc.
    placa                VARCHAR(20) NOT NULL REFERENCES automotor(placa),
    id_infractor         INT NOT NULL REFERENCES persona(id_persona),
    id_licencia          INT,  -- si luego decides manejar licencias, puedes crear la tabla
    id_municipio         INT NOT NULL REFERENCES municipio(id_municipio),
    id_policia           INT NOT NULL REFERENCES policia_transito(id_policia)
);

CREATE INDEX IF NOT EXISTS idx_comparendo_placa
    ON comparendo(placa);

CREATE INDEX IF NOT EXISTS idx_comparendo_infractor
    ON comparendo(id_infractor);

CREATE INDEX IF NOT EXISTS idx_comparendo_municipio
    ON comparendo(id_municipio);

-- COMPARENDO_INFRACCION (N:M)
CREATE TABLE IF NOT EXISTS comparendo_infraccion (
    id_comparendo   INT NOT NULL REFERENCES comparendo(id_comparendo) ON DELETE CASCADE,
    id_infraccion   INT NOT NULL REFERENCES infraccion(id_infraccion),
    valor_calculado NUMERIC(15,2),
    observaciones   TEXT,
    PRIMARY KEY (id_comparendo, id_infraccion)
);

-- =========================================================
-- 6. USUARIOS DEL SISTEMA (PARA JWT)
-- =========================================================

CREATE TABLE IF NOT EXISTS usuario_sistema (
    id_usuario     SERIAL PRIMARY KEY,
    username       VARCHAR(50) NOT NULL UNIQUE,
    password       TEXT NOT NULL,
    rol            VARCHAR(30) NOT NULL,  -- admin, policia, ciudadano, etc.
    id_policia     INT REFERENCES policia_transito(id_policia),
    id_persona     INT REFERENCES persona(id_persona),
    activo         BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_usuario_sistema_username
    ON usuario_sistema(username);
