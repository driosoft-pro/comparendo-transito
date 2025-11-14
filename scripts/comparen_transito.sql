-- Script de creación de base de datos para PostgreSQL
-- Sistema de Comparendos de Tránsito
-- Fecha: 2025-11-14

-- Eliminar tablas si existen (en orden inverso por dependencias)
DROP TABLE IF EXISTS comparendo_infraccion CASCADE;
DROP TABLE IF EXISTS comparendo CASCADE;
DROP TABLE IF EXISTS licencia_categoria CASCADE;
DROP TABLE IF EXISTS licencia_conduccion CASCADE;
DROP TABLE IF EXISTS propiedad_automotor CASCADE;
DROP TABLE IF EXISTS propietario_automotor CASCADE;
DROP TABLE IF EXISTS automotor CASCADE;
DROP TABLE IF EXISTS personas CASCADE;
DROP TABLE IF EXISTS policia_transito CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS municipio CASCADE;
DROP TABLE IF EXISTS secretaria_transito CASCADE;
DROP TABLE IF EXISTS infraccion CASCADE;
DROP TABLE IF EXISTS categoria_licencia CASCADE;
DROP TABLE IF EXISTS cargo_policial CASCADE;

-- Tabla: cargo_policial
CREATE TABLE cargo_policial (
    id_cargo SERIAL PRIMARY KEY,
    nombre_cargo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    grado VARCHAR(20) NOT NULL
);

-- Tabla: categoria_licencia
CREATE TABLE categoria_licencia (
    id_categoria SERIAL PRIMARY KEY,
    codigo VARCHAR(2) NOT NULL UNIQUE,
    descripcion VARCHAR(100) NOT NULL
);

-- Tabla: infraccion
CREATE TABLE infraccion (
    id_infraccion SERIAL PRIMARY KEY,
    codigo_infraccion VARCHAR(10) NOT NULL UNIQUE,
    descripcion VARCHAR(200) NOT NULL,
    tipo_infraccion VARCHAR(50) NOT NULL,
    valor_base NUMERIC(12,2) NOT NULL,
    puntos_descuento INTEGER
);

-- Tabla: secretaria_transito
CREATE TABLE secretaria_transito (
    id_secretaria SERIAL PRIMARY KEY,
    nombre_secretaria VARCHAR(100) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100)
);

-- Tabla: municipio
CREATE TABLE municipio (
    id_municipio SERIAL PRIMARY KEY,
    nombre_municipio VARCHAR(100) NOT NULL,
    departamento VARCHAR(100) NOT NULL,
    codigo_dane VARCHAR(20) NOT NULL UNIQUE,
    direccion_oficina_principal VARCHAR(150) NOT NULL,
    id_secretaria_transito INTEGER NOT NULL,
    CONSTRAINT fk_municipio_secretaria FOREIGN KEY (id_secretaria_transito)
        REFERENCES secretaria_transito(id_secretaria)
);

-- Agregar constraint de unicidad para id_secretaria_transito
CREATE UNIQUE INDEX idx_municipio_secretaria ON municipio(id_secretaria_transito);

-- Tabla: automotor
CREATE TABLE automotor (
    id_automotor SERIAL PRIMARY KEY,
    placa VARCHAR(6) NOT NULL UNIQUE,
    tipo_vehiculo VARCHAR(20) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    linea_modelo VARCHAR(50) NOT NULL,
    cilindraje VARCHAR(20) NOT NULL,
    modelo_ano INTEGER NOT NULL,
    color VARCHAR(50) NOT NULL,
    clase_servicio VARCHAR(50) NOT NULL,
    id_municipio INTEGER NOT NULL,
    CONSTRAINT fk_automotor_municipio FOREIGN KEY (id_municipio)
        REFERENCES municipio(id_municipio)
);

-- Tabla: usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    estado SMALLINT NOT NULL DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: policia_transito
CREATE TABLE policia_transito (
    id_policia SERIAL PRIMARY KEY,
    codigo_policia VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    genero VARCHAR(10) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    fecha_vinculacion DATE NOT NULL,
    salario NUMERIC(12,2) NOT NULL,
    id_secretaria_transito INTEGER NOT NULL,
    id_cargo_policial INTEGER NOT NULL,
    id_supervisor INTEGER,
    id_usuario INTEGER NOT NULL UNIQUE,
    CONSTRAINT fk_policia_secretaria FOREIGN KEY (id_secretaria_transito)
        REFERENCES secretaria_transito(id_secretaria),
    CONSTRAINT fk_policia_cargo FOREIGN KEY (id_cargo_policial)
        REFERENCES cargo_policial(id_cargo),
    CONSTRAINT fk_policia_supervisor FOREIGN KEY (id_supervisor)
        REFERENCES policia_transito(id_policia),
    CONSTRAINT fk_policia_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);

-- Tabla: licencia_conduccion
CREATE TABLE licencia_conduccion (
    id_licencia SERIAL PRIMARY KEY,
    numero_licencia VARCHAR(20) NOT NULL UNIQUE,
    fecha_expedicion DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    organismo_transito_expedidor VARCHAR(100) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVA'
);

-- Tabla: personas
CREATE TABLE personas (
    id_persona SERIAL PRIMARY KEY,
    tipo_doc VARCHAR(5) NOT NULL,
    num_doc VARCHAR(20) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(10) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    id_municipio INTEGER NOT NULL,
    id_licencia_conduccion INTEGER,
    id_usuario INTEGER,
    CONSTRAINT uk_persona_documento UNIQUE (tipo_doc, num_doc),
    CONSTRAINT fk_personas_municipio FOREIGN KEY (id_municipio)
        REFERENCES municipio(id_municipio),
    CONSTRAINT fk_personas_licencia FOREIGN KEY (id_licencia_conduccion)
        REFERENCES licencia_conduccion(id_licencia),
    CONSTRAINT fk_personas_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);

-- Actualizar tabla licencia_conduccion para referenciar personas
ALTER TABLE licencia_conduccion ADD COLUMN id_persona INTEGER;
ALTER TABLE licencia_conduccion ADD CONSTRAINT fk_licencia_persona 
    FOREIGN KEY (id_persona) REFERENCES personas(id_persona);
CREATE UNIQUE INDEX idx_licencia_persona ON licencia_conduccion(id_persona);

-- Tabla: licencia_categoria
CREATE TABLE licencia_categoria (
    id_licencia_conduccion INTEGER NOT NULL,
    id_categoria_licencia INTEGER NOT NULL,
    fecha_asignacion DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY (id_licencia_conduccion, id_categoria_licencia),
    CONSTRAINT fk_lic_cat_licencia FOREIGN KEY (id_licencia_conduccion)
        REFERENCES licencia_conduccion(id_licencia),
    CONSTRAINT fk_lic_cat_categoria FOREIGN KEY (id_categoria_licencia)
        REFERENCES categoria_licencia(id_categoria)
);

-- Tabla: propietario_automotor
CREATE TABLE propietario_automotor (
    id_propietario SERIAL PRIMARY KEY,
    id_persona INTEGER NOT NULL,
    id_automotor INTEGER NOT NULL,
    es_principal SMALLINT NOT NULL DEFAULT 0,
    fecha_registro DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_propietario_persona FOREIGN KEY (id_persona)
        REFERENCES personas(id_persona),
    CONSTRAINT fk_propietario_automotor FOREIGN KEY (id_automotor)
        REFERENCES automotor(id_automotor)
);

-- Tabla: propiedad_automotor
CREATE TABLE propiedad_automotor (
    id_propiedad SERIAL PRIMARY KEY,
    id_automotor INTEGER NOT NULL,
    id_persona INTEGER NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    es_propietario_principal SMALLINT NOT NULL DEFAULT 0,
    responsable_impuestos SMALLINT DEFAULT 0,
    CONSTRAINT fk_propiedad_automotor FOREIGN KEY (id_automotor)
        REFERENCES automotor(id_automotor),
    CONSTRAINT fk_propiedad_persona FOREIGN KEY (id_persona)
        REFERENCES personas(id_persona)
);

-- Tabla: comparendo
CREATE TABLE comparendo (
    id_comparendo SERIAL PRIMARY KEY,
    numero_comparendo VARCHAR(20) NOT NULL UNIQUE,
    fecha_hora_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    direccion_infraccion VARCHAR(150) NOT NULL,
    coordenadas_gps VARCHAR(100),
    observaciones TEXT,
    estado VARCHAR(50) NOT NULL DEFAULT 'PENDIENTE',
    id_municipio INTEGER NOT NULL,
    id_persona INTEGER,
    id_licencia_conduccion INTEGER,
    id_policia_transito INTEGER NOT NULL,
    id_automotor INTEGER NOT NULL,
    CONSTRAINT fk_comparendo_municipio FOREIGN KEY (id_municipio)
        REFERENCES municipio(id_municipio),
    CONSTRAINT fk_comparendo_persona FOREIGN KEY (id_persona)
        REFERENCES personas(id_persona),
    CONSTRAINT fk_comparendo_licencia FOREIGN KEY (id_licencia_conduccion)
        REFERENCES licencia_conduccion(id_licencia),
    CONSTRAINT fk_comparendo_policia FOREIGN KEY (id_policia_transito)
        REFERENCES policia_transito(id_policia),
    CONSTRAINT fk_comparendo_automotor FOREIGN KEY (id_automotor)
        REFERENCES automotor(id_automotor)
);

-- Tabla: comparendo_infraccion
CREATE TABLE comparendo_infraccion (
    id_comparendo INTEGER NOT NULL,
    id_infraccion INTEGER NOT NULL,
    valor_calculado NUMERIC(12,2) NOT NULL,
    observaciones VARCHAR(200),
    PRIMARY KEY (id_comparendo, id_infraccion),
    CONSTRAINT fk_comp_inf_comparendo FOREIGN KEY (id_comparendo)
        REFERENCES comparendo(id_comparendo),
    CONSTRAINT fk_comp_inf_infraccion FOREIGN KEY (id_infraccion)
        REFERENCES infraccion(id_infraccion)
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_comparendo_fecha ON comparendo(fecha_hora_registro);
CREATE INDEX idx_comparendo_estado ON comparendo(estado);
CREATE INDEX idx_comparendo_persona ON comparendo(id_persona);
CREATE INDEX idx_comparendo_policia ON comparendo(id_policia_transito);
CREATE INDEX idx_personas_documento ON personas(tipo_doc, num_doc);
CREATE INDEX idx_automotor_placa ON automotor(placa);
CREATE INDEX idx_licencia_estado ON licencia_conduccion(estado);

-- Comentarios en las tablas principales
COMMENT ON TABLE comparendo IS 'Registro de comparendos de tránsito';
COMMENT ON TABLE personas IS 'Información de personas (conductores y propietarios)';
COMMENT ON TABLE automotor IS 'Registro de vehículos automotores';
COMMENT ON TABLE infraccion IS 'Catálogo de infracciones de tránsito';
COMMENT ON TABLE policia_transito IS 'Agentes de policía de tránsito';

-- Script completado exitosamente


-- Oracle SQL Developer Data Modeler Summary Report: 
-- 
-- CREATE TABLE                            17
-- CREATE INDEX                             7
-- ALTER TABLE                             43
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- TSDP POLICY                              0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                  27
-- WARNINGS                                 0
