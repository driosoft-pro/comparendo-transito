-- Script de creación de base de datos para PostgreSQL
-- Sistema de Comparendos de Tránsito
-- Fecha: 2025-11-17

-- Eliminar tablas si existen (en orden inverso por dependencias)
DROP TABLE IF EXISTS queja CASCADE;
DROP TABLE IF EXISTS comparendo_infraccion CASCADE;
DROP TABLE IF EXISTS comparendo CASCADE;
DROP TABLE IF EXISTS licencia_categoria CASCADE;
DROP TABLE IF EXISTS propiedad_automotor CASCADE;
DROP TABLE IF EXISTS personas CASCADE;
DROP TABLE IF EXISTS licencia_conduccion CASCADE;
DROP TABLE IF EXISTS automotor CASCADE;
DROP TABLE IF EXISTS policia_transito CASCADE;
DROP TABLE IF EXISTS secretaria_transito CASCADE;
DROP TABLE IF EXISTS municipio CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS infraccion CASCADE;
DROP TABLE IF EXISTS categoria_licencia CASCADE;
DROP TABLE IF EXISTS cargo_policial CASCADE;

-- =========================================================================
-- TABLAS SIN DEPENDENCIAS
-- =========================================================================

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

-- Tabla: usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    estado SMALLINT NOT NULL DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: municipio (ahora sin dependencias)
CREATE TABLE municipio (
    id_municipio SERIAL PRIMARY KEY,
    nombre_municipio VARCHAR(100) NOT NULL,
    departamento VARCHAR(100) NOT NULL,
    codigo_dane VARCHAR(20) NOT NULL UNIQUE,
    direccion_oficina_principal VARCHAR(150) NOT NULL
);

-- =========================================================================
-- TABLAS CON DEPENDENCIAS DE NIVEL 1
-- =========================================================================

-- Tabla: secretaria_transito (ahora depende de municipio)
CREATE TABLE secretaria_transito (
    id_secretaria SERIAL PRIMARY KEY,
    nombre_secretaria VARCHAR(100) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    id_municipio INTEGER NOT NULL,
    CONSTRAINT fk_secretaria_municipio FOREIGN KEY (id_municipio)
        REFERENCES municipio(id_municipio)
);

-- Índice único para relación 1:1 entre secretaría y municipio
CREATE UNIQUE INDEX idx_secretaria_municipio ON secretaria_transito(id_municipio);

-- Tabla: automotor (depende de municipio)
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

-- Tabla: licencia_conduccion (sin dependencias circulares)
CREATE TABLE licencia_conduccion (
    id_licencia SERIAL PRIMARY KEY,
    numero_licencia VARCHAR(20) NOT NULL UNIQUE,
    fecha_expedicion DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    organismo_transito_expedidor VARCHAR(100) NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVA'
);

-- =========================================================================
-- TABLAS CON DEPENDENCIAS DE NIVEL 2
-- =========================================================================

-- Tabla: personas (depende de municipio, licencia_conduccion, usuarios)
CREATE TABLE personas (
    id_persona SERIAL PRIMARY KEY,
    tipo_doc VARCHAR(5) NOT NULL,
    num_doc VARCHAR(20) NOT NULL,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50) NULL,
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50) NULL,
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

-- Actualizar licencia_conduccion con referencia a personas (relación bidireccional)
ALTER TABLE licencia_conduccion ADD COLUMN id_persona INTEGER;
ALTER TABLE licencia_conduccion ADD CONSTRAINT fk_licencia_persona
    FOREIGN KEY (id_persona) REFERENCES personas(id_persona);
CREATE UNIQUE INDEX idx_licencia_persona ON licencia_conduccion(id_persona);

-- Tabla: policia_transito (depende de usuarios, secretaria_transito, cargo_policial, personas)
CREATE TABLE policia_transito (
    id_policia SERIAL PRIMARY KEY,
    codigo_policia VARCHAR(20) NOT NULL UNIQUE,
    fecha_vinculacion DATE NOT NULL,
    salario NUMERIC(12,2) NOT NULL,
    id_secretaria_transito INTEGER NOT NULL,
    id_cargo_policial INTEGER NOT NULL,
    id_supervisor INTEGER,
    id_usuario INTEGER NOT NULL UNIQUE,
    id_persona INTEGER NOT NULL UNIQUE,
    CONSTRAINT fk_policia_secretaria FOREIGN KEY (id_secretaria_transito)
        REFERENCES secretaria_transito(id_secretaria),
    CONSTRAINT fk_policia_cargo FOREIGN KEY (id_cargo_policial)
        REFERENCES cargo_policial(id_cargo),
    CONSTRAINT fk_policia_supervisor FOREIGN KEY (id_supervisor)
        REFERENCES policia_transito(id_policia),
    CONSTRAINT fk_policia_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_policia_persona FOREIGN KEY (id_persona)
        REFERENCES personas(id_persona)
);

-- Índice para mejorar rendimiento
CREATE INDEX idx_policia_persona ON policia_transito(id_persona);

-- Tabla: licencia_categoria (depende de licencia_conduccion y categoria_licencia)
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

-- Tabla: propiedad_automotor (depende de automotor y personas)
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

-- =========================================================================
-- TABLAS CON DEPENDENCIAS DE NIVEL 3
-- =========================================================================

-- Tabla: comparendo (depende de múltiples tablas)
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

-- =========================================================================
-- TABLAS CON DEPENDENCIAS DE NIVEL 4
-- =========================================================================

-- Tabla: comparendo_infraccion (depende de comparendo e infraccion)
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

-- Tabla: queja (depende de comparendo y personas)
CREATE TABLE queja (
    id_queja SERIAL PRIMARY KEY,
    fecha_radicacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    texto_queja TEXT NOT NULL,
    estado VARCHAR(50) NOT NULL DEFAULT 'RADICADA',
    medio_radicacion VARCHAR(50) NOT NULL,
    respuesta TEXT,
    fecha_respuesta TIMESTAMP,
    id_comparendo INTEGER NOT NULL,
    id_persona INTEGER NOT NULL,
    CONSTRAINT fk_queja_comparendo FOREIGN KEY (id_comparendo)
        REFERENCES comparendo(id_comparendo),
    CONSTRAINT fk_queja_persona FOREIGN KEY (id_persona)
        REFERENCES personas(id_persona)
);

-- =========================================================================
-- CAMPO DE AUDITORÍA
-- =========================================================================

ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE personas ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE automotor ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE policia_transito ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE licencia_conduccion ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE comparendo ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE queja ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE cargo_policial ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE categoria_licencia ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE infraccion ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE secretaria_transito ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE municipio ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE licencia_categoria ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE propiedad_automotor ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;
ALTER TABLE comparendo_infraccion ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL;

-- =========================================================================
-- ÍNDICES PARA MEJORAR RENDIMIENTO
-- =========================================================================

CREATE INDEX idx_comparendo_fecha ON comparendo(fecha_hora_registro);
CREATE INDEX idx_comparendo_estado ON comparendo(estado);
CREATE INDEX idx_comparendo_persona ON comparendo(id_persona);
CREATE INDEX idx_comparendo_policia ON comparendo(id_policia_transito);
CREATE INDEX idx_personas_documento ON personas(tipo_doc, num_doc);
CREATE INDEX idx_automotor_placa ON automotor(placa);
CREATE INDEX idx_licencia_estado ON licencia_conduccion(estado);
CREATE INDEX idx_queja_estado ON queja(estado);
CREATE INDEX idx_queja_comparendo ON queja(id_comparendo);
CREATE INDEX idx_secretaria_municipio_lookup ON secretaria_transito(id_municipio);

-- =========================================================================
-- VISTAS ÚTILES
-- =========================================================================

-- Vista para obtener información completa de policías
CREATE OR REPLACE VIEW v_policia_completo AS
SELECT
    pt.id_policia,
    pt.codigo_policia,
    pt.fecha_vinculacion,
    pt.salario,
    -- Datos de la persona vinculada
    p.primer_nombre,
    p.segundo_nombre,
    p.primer_apellido,
    p.segundo_apellido,
    CONCAT_WS(' ', p.primer_nombre, p.segundo_nombre, p.primer_apellido, p.segundo_apellido) as nombre_completo,
    p.fecha_nacimiento,
    p.genero,
    p.tipo_doc,
    p.num_doc,
    p.direccion,
    p.telefono,
    p.email,
    -- Relaciones
    pt.id_secretaria_transito,
    st.nombre_secretaria,
    st.id_municipio as municipio_secretaria_id,
    mst.nombre_municipio as municipio_secretaria,
    mst.departamento as departamento_secretaria,
    pt.id_cargo_policial,
    cp.nombre_cargo,
    cp.grado,
    pt.id_supervisor,
    pt.id_usuario,
    pt.id_persona,
    -- Municipio de residencia del policía
    p.id_municipio as municipio_residencia_id,
    mp.nombre_municipio as municipio_residencia,
    mp.departamento as departamento_residencia
FROM policia_transito pt
INNER JOIN personas p ON pt.id_persona = p.id_persona
LEFT JOIN secretaria_transito st ON pt.id_secretaria_transito = st.id_secretaria
LEFT JOIN municipio mst ON st.id_municipio = mst.id_municipio
LEFT JOIN cargo_policial cp ON pt.id_cargo_policial = cp.id_cargo
LEFT JOIN municipio mp ON p.id_municipio = mp.id_municipio
WHERE pt.deleted_at IS NULL AND p.deleted_at IS NULL;

-- Vista para secretarías con su municipio
CREATE OR REPLACE VIEW v_secretaria_completa AS
SELECT
    st.id_secretaria,
    st.nombre_secretaria,
    st.direccion,
    st.telefono,
    st.email,
    st.id_municipio,
    m.nombre_municipio,
    m.departamento,
    m.codigo_dane,
    m.direccion_oficina_principal
FROM secretaria_transito st
INNER JOIN municipio m ON st.id_municipio = m.id_municipio
WHERE st.deleted_at IS NULL AND m.deleted_at IS NULL;

-- =========================================================================
-- COMENTARIOS EN TABLAS PRINCIPALES
-- =========================================================================

COMMENT ON TABLE cargo_policial IS 'Catálogo de cargos policiales disponibles';
COMMENT ON TABLE categoria_licencia IS 'Categorías de licencias de conducción';
COMMENT ON TABLE infraccion IS 'Catálogo de infracciones de tránsito';
COMMENT ON TABLE municipio IS 'Municipios del país';
COMMENT ON TABLE secretaria_transito IS 'Secretarías de tránsito ubicadas en municipios';
COMMENT ON TABLE usuarios IS 'Usuarios del sistema (policías, ciudadanos, administrador, supervisor, operador, auditor)';
COMMENT ON TABLE policia_transito IS 'Agentes de policía de tránsito - vinculados con personas';
COMMENT ON TABLE licencia_conduccion IS 'Licencias de conducción expedidas';
COMMENT ON TABLE personas IS 'Información de personas (conductores, propietarios y policías)';
COMMENT ON TABLE licencia_categoria IS 'Relación de categorías por licencia';
COMMENT ON TABLE automotor IS 'Registro de vehículos automotores';
COMMENT ON TABLE propiedad_automotor IS 'Historial de propiedad de vehículos';
COMMENT ON TABLE comparendo IS 'Registro de comparendos de tránsito';
COMMENT ON TABLE comparendo_infraccion IS 'Infracciones por comparendo';
COMMENT ON TABLE queja IS 'Quejas ciudadanas sobre comparendos';

COMMENT ON COLUMN policia_transito.id_persona IS 'Vincula al policía con personas - trae nombre, apellido, fecha_nacimiento';
COMMENT ON COLUMN secretaria_transito.id_municipio IS 'Municipio donde está ubicada la secretaría de tránsito';

-- =========================================================================
-- SCRIPT COMPLETADO EXITOSAMENTE
-- =========================================================================

SELECT '
========================================
BASE DE DATOS CREADA EXITOSAMENTE
========================================
Sistema: Comparendos de Tránsito
DBMS: PostgreSQL
Fecha: 2025-11-17
Versión: 2.1

CAMBIOS APLICADOS:
✓ policia_transito vinculada con personas
✓ id_persona agregado (obligatorio y único)
✓ Eliminados: nombres, apellidos, genero, fecha_nacimiento
✓ Tabla propietario_automotor ELIMINADA
✓ RELACIÓN CORREGIDA: secretaria_transito ahora tiene id_municipio
✓ Vista v_policia_completo creada
✓ Vista v_secretaria_completa creada

RELACIÓN CORRECTA:
  Municipio (1) <---- (1) Secretaría de Tránsito

Total de tablas creadas: 15
- Tablas de catálogo: 3
- Tablas de configuración: 2
- Tablas de entidades: 5
- Tablas de relaciones: 3
- Tablas transaccionales: 2

Estado: LISTO PARA INSERTS
========================================
' AS mensaje;
