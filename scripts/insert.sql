-- =========================================================================
-- Script de Inserción de Datos de Prueba
-- Sistema de Comparendos de Tránsito - Santiago de Cali
-- =========================================================================

-- =========================================================================
-- 1. CARGO_POLICIAL (sin dependencias)
-- =========================================================================
INSERT INTO cargo_policial (nombre_cargo, descripcion, grado) VALUES
('Agente de Tránsito', 'Agente operativo en campo', 'Agente'),
('Patrullero de Tránsito', 'Patrullero con experiencia básica', 'Patrullero'),
('Cabo de Tránsito', 'Supervisor de grupo pequeño', 'Cabo'),
('Subintendente', 'Coordinador de zona', 'Subintendente'),
('Intendente', 'Jefe de operaciones zonales', 'Intendente'),
('Subcomisario', 'Subjefe de secretaría', 'Subcomisario'),
('Comisario', 'Jefe de secretaría de tránsito', 'Comisario'),
('Inspector Jefe', 'Inspector de campo con personal a cargo', 'Inspector Jefe'),
('Mayor de Tránsito', 'Comandante de operaciones', 'Mayor'),
('Teniente Coronel', 'Director regional de tránsito', 'Teniente Coronel');

-- =========================================================================
-- 2. CATEGORIA_LICENCIA (sin dependencias)
-- =========================================================================
INSERT INTO categoria_licencia (codigo, descripcion) VALUES
('A1', 'Motocicletas, motociclos y mototriciclos hasta 125 c.c.'),
('A2', 'Motocicletas, motociclos y mototriciclos superiores a 125 c.c.'),
('B1', 'Automóviles, motocarros, cuatrimotor, camperos y camionetas'),
('B2', 'Camiones rígidos, busetas y buses'),
('B3', 'Vehículos articulados y camiones con remolque'),
('C1', 'Automóviles y camperos de servicio público'),
('C2', 'Camiones, busetas y buses de servicio público'),
('C3', 'Vehículos articulados de servicio público'),
('A3', 'Licencia para instructores de conducción'),
('B4', 'Vehículos de emergencia y especiales');

-- =========================================================================
-- 3. INFRACCION (sin dependencias)
-- =========================================================================
INSERT INTO infraccion (codigo_infraccion, descripcion, tipo_infraccion, valor_base, puntos_descuento) VALUES
('C01', 'Exceso de velocidad hasta 20 km/h', 'Grave', 234000, 2),
('C02', 'Exceso de velocidad entre 20 y 40 km/h', 'Grave', 468000, 4),
('C03', 'Exceso de velocidad superior a 40 km/h', 'Muy Grave', 936000, 6),
('C04', 'No respetar semáforo en rojo', 'Grave', 468000, 4),
('C05', 'Conducir sin licencia', 'Muy Grave', 936000, 0),
('C06', 'Conducir en estado de embriaguez', 'Muy Grave', 1872000, 8),
('C07', 'No portar documento del vehículo', 'Leve', 234000, 0),
('C08', 'Estacionarse en lugar prohibido', 'Leve', 234000, 1),
('C09', 'No usar cinturón de seguridad', 'Grave', 234000, 2),
('C10', 'Usar celular mientras conduce', 'Grave', 468000, 3);

-- =========================================================================
-- 4. SECRETARIA_TRANSITO (sin dependencias)
-- =========================================================================
INSERT INTO secretaria_transito (nombre_secretaria, direccion, telefono, email) VALUES
('Secretaría de Movilidad de Cali', 'Calle 5 #32-50, Cali', '6023337700', 'contacto@movilidadcali.gov.co'),
('Departamento Administrativo de Tránsito', 'Carrera 4 #10-55, Cali', '6023334500', 'transito@cali.gov.co'),
('Secretaría de Transporte del Valle', 'Avenida 6N #25-80, Cali', '6023335000', 'transporte@valledelcauca.gov.co'),
('Centro de Movilidad Sur', 'Calle 25 #70-15, Cali', '6023336200', 'movilidadsur@cali.gov.co'),
('Centro de Movilidad Norte', 'Carrera 1 #70-50, Cali', '6023336300', 'movilidadnorte@cali.gov.co'),
('Oficina de Tránsito Oriente', 'Calle 44 #5A-30, Cali', '6023336400', 'oriente@movilidadcali.gov.co'),
('Oficina de Tránsito Occidente', 'Carrera 100 #11-50, Cali', '6023336500', 'occidente@movilidadcali.gov.co'),
('Centro Integrado de Movilidad', 'Avenida Simón Bolívar #35-20', '6023337800', 'cim@cali.gov.co'),
('Punto de Atención Ciudad Jardín', 'Calle 5D #38-95, Cali', '6023337900', 'ciudadjardin@movilidadcali.gov.co'),
('Punto de Atención Menga', 'Carrera 28 #1A-60, Cali', '6023338000', 'menga@movilidadcali.gov.co');

-- =========================================================================
-- 5. MUNICIPIO (depende de secretaria_transito)
-- =========================================================================
INSERT INTO municipio (nombre_municipio, departamento, codigo_dane, direccion_oficina_principal, id_secretaria_transito) VALUES
('Santiago de Cali', 'Valle del Cauca', '76001', 'Calle 5 #32-50, Cali', 1),
('Yumbo', 'Valle del Cauca', '76892', 'Carrera 3 #8-45, Yumbo', 2),
('Palmira', 'Valle del Cauca', '76520', 'Calle 30 #29-39, Palmira', 3),
('Jamundí', 'Valle del Cauca', '76364', 'Carrera 4 #5-20, Jamundí', 4),
('Candelaria', 'Valle del Cauca', '76126', 'Calle 7 #4-10, Candelaria', 5),
('Florida', 'Valle del Cauca', '76275', 'Carrera 5 #6-30, Florida', 6),
('Pradera', 'Valle del Cauca', '76563', 'Calle 4 #5-15, Pradera', 7),
('Buenaventura', 'Valle del Cauca', '76109', 'Calle 2 #3A-25, Buenaventura', 8),
('Tuluá', 'Valle del Cauca', '76834', 'Carrera 26 #25-40, Tuluá', 9),
('Buga', 'Valle del Cauca', '76111', 'Calle 4 #13-45, Buga', 10);

-- =========================================================================
-- 6. USUARIOS (sin dependencias)
-- =========================================================================
INSERT INTO usuarios (username, contrasena, rol, estado) VALUES
-- Administrador (contraseña: Admin123!)
('admin.cali', '$2b$10$WrOITdkPUB2bXZWOt/uXOeemDzvy22vgoslTVY1hI./5Wdw.tbNDC', 'administrador', 1),

-- Policías de Tránsito (contraseña: Policia123!)
('policia.rodriguez', '$2b$10$zE7sG4L8TVNmA5xVLLCdPO1drP.FePQmpIQ8WSz.B0fKt3ajS3vBi', 'policia_transito', 1),
('policia.martinez', '$2b$10$zE7sG4L8TVNmA5xVLLCdPO1drP.FePQmpIQ8WSz.B0fKt3ajS3vBi', 'policia_transito', 1),
('policia.gomez', '$2b$10$zE7sG4L8TVNmA5xVLLCdPO1drP.FePQmpIQ8WSz.B0fKt3ajS3vBi', 'policia_transito', 1),
('policia.castro', '$2b$10$zE7sG4L8TVNmA5xVLLCdPO1drP.FePQmpIQ8WSz.B0fKt3ajS3vBi', 'policia_transito', 1),
('policia.torres.p', '$2b$10$zE7sG4L8TVNmA5xVLLCdPO1drP.FePQmpIQ8WSz.B0fKt3ajS3vBi', 'policia_transito', 1),
('policia.munoz', '$2b$10$zE7sG4L8TVNmA5xVLLCdPO1drP.FePQmpIQ8WSz.B0fKt3ajS3vBi', 'policia_transito', 1),
('policia.valencia', '$2b$10$zE7sG4L8TVNmA5xVLLCdPO1drP.FePQmpIQ8WSz.B0fKt3ajS3vBi', 'policia_transito', 1),
('policia.herrera', '$2b$10$zE7sG4L8TVNmA5xVLLCdPO1drP.FePQmpIQ8WSz.B0fKt3ajS3vBi', 'policia_transito', 1),
('policia.morales', '$2b$10$zE7sG4L8TVNmA5xVLLCdPO1drP.FePQmpIQ8WSz.B0fKt3ajS3vBi', 'policia_transito', 1),

-- Ciudadanos (contraseña: Ciudadano123!)
('ciudadano.perez', '$2b$10$2UoHF7xy/3faHkmnl25n7O3NpmRfxE50HMskE0Epo2ujmtNYoL7HO', 'ciudadano', 1),
('ciudadano.lopez', '$2b$10$2UoHF7xy/3faHkmnl25n7O3NpmRfxE50HMskE0Epo2ujmtNYoL7HO', 'ciudadano', 1),
('ciudadano.sanchez', '$2b$10$2UoHF7xy/3faHkmnl25n7O3NpmRfxE50HMskE0Epo2ujmtNYoL7HO', 'ciudadano', 1),

-- Personal Administrativo
('supervisor.ramirez', '$2b$10$kU4k1cRYNngwfI6XQbQjsuKgQEarfXZINNiqup5R9jCC.1uqbZvsm', 'supervisor', 1),
('operador.castro', '$2b$10$9m.y2cVn58IJn4Bnv0F/a.OKlLTkBgb/eMU/w3ospDL18AbUyQHA6', 'operador', 1),
('auditor.torres', '$2b$10$IWRffB3zDUgixbI1Fjbg2.5n/z4igsBszUNiJ4ZbyA6/eP.fkvEPK', 'auditor', 1);

-- =========================================================================
-- 7. POLICIA_TRANSITO (depende de usuarios, secretaria_transito, cargo_policial)
-- =========================================================================
INSERT INTO policia_transito (codigo_policia, nombres, apellidos, genero, fecha_nacimiento, fecha_vinculacion, salario, id_secretaria_transito, id_cargo_policial, id_supervisor, id_usuario) VALUES
('PT-001', 'Carlos Alberto', 'Rodríguez Méndez', 'Masculino', '1985-03-15', '2010-01-10', 3500000, 1, 5, NULL, 2),
('PT-002', 'María Fernanda', 'Martínez López', 'Femenino', '1990-07-22', '2015-03-15', 2800000, 1, 3, 1, 3),
('PT-003', 'Juan Pablo', 'Gómez Vargas', 'Masculino', '1988-11-05', '2012-06-20', 3000000, 1, 4, 1, 4),
('PT-004', 'Ana Lucía', 'Ramírez Soto', 'Femenino', '1992-05-18', '2016-08-10', 2600000, 1, 2, 3, 7),
('PT-005', 'Diego Fernando', 'Castro Jiménez', 'Masculino', '1987-09-30', '2011-04-05', 3200000, 2, 4, 1, 11),
('PT-006', 'Sandra Milena', 'Torres Pérez', 'Femenino', '1991-02-14', '2017-01-12', 2700000, 2, 2, 5, 12),
('PT-007', 'Andrés Felipe', 'Muñoz Díaz', 'Masculino', '1989-12-08', '2013-09-18', 2900000, 3, 3, 1, 13),
('PT-008', 'Carolina', 'Valencia Ríos', 'Femenino', '1993-06-25', '2018-02-22', 2500000, 3, 1, 7, 14),
('PT-009', 'Luis Eduardo', 'Herrera Cardona', 'Masculino', '1986-04-12', '2010-11-30', 3400000, 4, 5, NULL, 15),
('PT-010', 'Patricia', 'Morales Aguilar', 'Femenino', '1994-08-19', '2019-05-15', 2400000, 4, 1, 9, 16);

-- =========================================================================
-- 8. LICENCIA_CONDUCCION (sin dependencias inicialmente)
-- =========================================================================
INSERT INTO licencia_conduccion (numero_licencia, fecha_expedicion, fecha_vencimiento, organismo_transito_expedidor, estado) VALUES
('76001234567890', '2020-01-15', '2030-01-15', 'Secretaría de Movilidad de Cali', 'ACTIVA'),
('76001234567891', '2019-06-20', '2029-06-20', 'Secretaría de Movilidad de Cali', 'ACTIVA'),
('76001234567892', '2021-03-10', '2031-03-10', 'Secretaría de Movilidad de Cali', 'ACTIVA'),
('76001234567893', '2018-09-05', '2028-09-05', 'Secretaría de Movilidad de Cali', 'ACTIVA'),
('76001234567894', '2022-02-28', '2032-02-28', 'Secretaría de Movilidad de Cali', 'ACTIVA'),
('76001234567895', '2017-11-12', '2027-11-12', 'Secretaría de Movilidad de Cali', 'SUSPENDIDA'),
('76001234567896', '2023-05-18', '2033-05-18', 'Secretaría de Movilidad de Cali', 'ACTIVA'),
('76001234567897', '2020-08-22', '2030-08-22', 'Departamento Administrativo de Tránsito', 'ACTIVA'),
('76001234567898', '2019-12-30', '2029-12-30', 'Departamento Administrativo de Tránsito', 'ACTIVA'),
('76001234567899', '2021-07-15', '2031-07-15', 'Secretaría de Movilidad de Cali', 'ACTIVA');

-- =========================================================================
-- 9. PERSONAS (depende de municipio, licencia_conduccion, usuarios)
-- =========================================================================
INSERT INTO personas (tipo_doc, num_doc, primer_nombre, segundo_nombre, primer_apellidos, segundo_apellidos, fecha_nacimiento, genero, direccion, telefono, email, id_municipio, id_licencia_conduccion, id_usuario) VALUES
('CC', '1144567890', 'Jorge', 'Luis', 'Pérez', 'González', '1985-05-20', 'Masculino', 'Calle 15 #100-45, Cali', '3201234567', 'jorge.perez@email.com', 1, 1, 5),
('CC', '1144567891', 'Diana', 'Carolina', 'López', 'Ramírez', '1992-08-15', 'Femenino', 'Carrera 70 #25-30, Cali', '3209876543', 'diana.lopez@email.com', 1, 2, 6),
('CC', '1144567892', 'Roberto', 'Carlos', 'Sánchez', 'Medina', '1988-03-10', 'Masculino', 'Calle 44 #3A-15, Cali', '3156789012', 'roberto.sanchez@email.com', 1, 3, 10),
('CC', '1144567893', 'Liliana', 'García', 'Torres', '1990-11-25', 'Femenino', 'Carrera 100 #18-50, Cali', '3187654321', 'liliana.garcia@email.com', 1, 4, NULL),
('CC', '1144567894', 'Mauricio', 'Hernández', 'Ríos', '1987-07-08', 'Masculino', 'Calle 5 #50-20, Cali', '3209871234', 'mauricio.hernandez@email.com', 1, 5, NULL),
('CC', '1144567895', 'Andrea', 'Velásquez', 'Muñoz', '1995-02-14', 'Femenino', 'Carrera 1 #60-10, Cali', '3145678901', 'andrea.velasquez@email.com', 1, 6, NULL),
('CC', '1144567896', 'Fernando', 'Patiño', 'Cardona', '1983-09-30', 'Masculino', 'Calle 70 #2B-45, Cali', '3198765432', 'fernando.patino@email.com', 1, 7, NULL),
('CC', '1144567897', 'Claudia', 'Patricia', 'Montoya', 'Silva', '1991-04-18', 'Femenino', 'Carrera 39 #5-80, Cali', '3123456789', 'claudia.montoya@email.com', 1, 8, NULL),
('CC', '1144567898', 'Javier', 'Andrés', 'Ospina', 'Vargas', '1986-12-05', 'Masculino', 'Calle 26 #35-15, Cali', '3176543210', 'javier.ospina@email.com', 1, 9, NULL),
('CC', '1144567899', 'María', 'José', 'Cárdenas', 'Ruiz', '1993-06-22', 'Femenino', 'Carrera 8 #40-25, Cali', '3189012345', 'maria.cardenas@email.com', 1, 10, NULL);

-- =========================================================================
-- 10. Actualizar relación inversa de licencias con personas
-- =========================================================================
UPDATE licencia_conduccion SET id_persona = 1 WHERE id_licencia = 1;
UPDATE licencia_conduccion SET id_persona = 2 WHERE id_licencia = 2;
UPDATE licencia_conduccion SET id_persona = 3 WHERE id_licencia = 3;
UPDATE licencia_conduccion SET id_persona = 4 WHERE id_licencia = 4;
UPDATE licencia_conduccion SET id_persona = 5 WHERE id_licencia = 5;
UPDATE licencia_conduccion SET id_persona = 6 WHERE id_licencia = 6;
UPDATE licencia_conduccion SET id_persona = 7 WHERE id_licencia = 7;
UPDATE licencia_conduccion SET id_persona = 8 WHERE id_licencia = 8;
UPDATE licencia_conduccion SET id_persona = 9 WHERE id_licencia = 9;
UPDATE licencia_conduccion SET id_persona = 10 WHERE id_licencia = 10;

-- =========================================================================
-- 11. LICENCIA_CATEGORIA (depende de licencia_conduccion y categoria_licencia)
-- =========================================================================
INSERT INTO licencia_categoria (id_licencia_conduccion, id_categoria_licencia) VALUES
(1, 3), (1, 1),
(2, 3), (2, 2),
(3, 3),
(4, 3), (4, 1),
(5, 4), (5, 3),
(6, 3),
(7, 3), (7, 2),
(8, 6), (8, 3),
(9, 4), (9, 3),
(10, 3), (10, 1);

-- =========================================================================
-- 12. AUTOMOTOR (depende de municipio)
-- =========================================================================
INSERT INTO automotor (placa, tipo_vehiculo, marca, linea_modelo, cilindraje, modelo_ano, color, clase_servicio, id_municipio) VALUES
('ABC123', 'Automóvil', 'Chevrolet', 'Spark GT', '1200', 2020, 'Blanco', 'Particular', 1),
('DEF456', 'Automóvil', 'Renault', 'Logan', '1600', 2019, 'Gris', 'Particular', 1),
('GHI789', 'Camioneta', 'Toyota', 'Hilux', '2400', 2021, 'Negro', 'Particular', 1),
('JKL012', 'Motocicleta', 'Yamaha', 'FZ16', '150', 2022, 'Azul', 'Particular', 1),
('MNO345', 'Automóvil', 'Mazda', 'Mazda 3', '2000', 2018, 'Rojo', 'Particular', 1),
('PQR678', 'Camioneta', 'Chevrolet', 'Dmax', '3000', 2020, 'Blanco', 'Particular', 1),
('STU901', 'Motocicleta', 'Honda', 'CB190R', '184', 2023, 'Negro', 'Particular', 1),
('VWX234', 'Automóvil', 'Hyundai', 'Accent', '1400', 2019, 'Plata', 'Particular', 1),
('YZA567', 'Automóvil', 'Kia', 'Picanto', '1000', 2021, 'Amarillo', 'Particular', 1),
('BCD890', 'Camioneta', 'Nissan', 'Frontier', '2500', 2020, 'Gris', 'Particular', 1);

-- =========================================================================
-- 13. PROPIETARIO_AUTOMOTOR (depende de personas y automotor)
-- =========================================================================
INSERT INTO propietario_automotor (id_persona, id_automotor, es_principal) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1),
(9, 9, 1),
(10, 10, 1);

-- =========================================================================
-- 14. PROPIEDAD_AUTOMOTOR (depende de automotor y personas)
-- =========================================================================
INSERT INTO propiedad_automotor (id_automotor, id_persona, fecha_inicio, fecha_fin, es_propietario_principal, responsable_impuestos) VALUES
(1, 1, '2020-05-15', NULL, 1, 1),
(2, 2, '2019-08-20', NULL, 1, 1),
(3, 3, '2021-02-10', NULL, 1, 1),
(4, 4, '2022-03-25', NULL, 1, 1),
(5, 5, '2018-11-05', NULL, 1, 1),
(6, 6, '2020-07-18', NULL, 1, 1),
(7, 7, '2023-01-12', NULL, 1, 1),
(8, 8, '2019-09-30', NULL, 1, 1),
(9, 9, '2021-06-15', NULL, 1, 1),
(10, 10, '2020-12-20', NULL, 1, 1);

-- =========================================================================
-- 15. COMPARENDO (depende de municipio, personas, licencia_conduccion, policia_transito, automotor)
-- =========================================================================
INSERT INTO comparendo (numero_comparendo, fecha_hora_registro, direccion_infraccion, coordenadas_gps, observaciones, estado, id_municipio, id_persona, id_licencia_conduccion, id_policia_transito, id_automotor) VALUES
('COMP-2025-001', '2025-11-01 08:30:00', 'Calle 5 con Carrera 50, Cali', '3.4372,-76.5225', 'Conductor excedió velocidad permitida en zona escolar', 'PENDIENTE', 1, 1, 1, 1, 1),
('COMP-2025-002', '2025-11-02 14:15:00', 'Avenida 6N con Calle 26, Cali', '3.4516,-76.5319', 'No respetó semáforo en rojo', 'PENDIENTE', 1, 2, 2, 2, 2),
('COMP-2025-003', '2025-11-03 10:45:00', 'Carrera 100 con Calle 15, Cali', '3.3782,-76.5362', 'Estacionado en zona prohibida', 'PAGADO', 1, 3, 3, 3, 3),
('COMP-2025-004', '2025-11-04 16:20:00', 'Calle 70 con Carrera 1, Cali', '3.4829,-76.5015', 'Conductor no portaba licencia de conducción', 'IMPUGNADO', 1, 4, 4, 4, 4),
('COMP-2025-005', '2025-11-05 09:00:00', 'Autopista Sur KM 3, Cali', '3.3956,-76.5195', 'Exceso de velocidad en autopista', 'PENDIENTE', 1, 5, 5, 1, 5),
('COMP-2025-006', '2025-11-06 12:30:00', 'Carrera 15 con Calle 100, Cali', '3.4701,-76.5342', 'Uso de celular mientras conducía', 'PENDIENTE', 1, 6, 6, 2, 6),
('COMP-2025-007', '2025-11-07 15:50:00', 'Calle 44 con Carrera 8, Cali', '3.4423,-76.5234', 'No usaba cinturón de seguridad', 'ANULADO', 1, 7, 7, 3, 7),
('COMP-2025-008', '2025-11-08 11:10:00', 'Avenida Simón Bolívar con 5, Cali', '3.4387,-76.5267', 'Vehículo sin documentos al día', 'PENDIENTE', 1, 8, 8, 4, 8),
('COMP-2025-009', '2025-11-09 07:40:00', 'Calle 5 con Carrera 70, Cali', '3.4359,-76.5398', 'Exceso de velocidad moderado', 'PAGADO', 1, 9, 9, 1, 9),
('COMP-2025-010', '2025-11-10 13:25:00', 'Carrera 1 con Calle 25, Cali', '3.4195,-76.5123', 'Múltiples infracciones detectadas', 'PENDIENTE', 1, 10, 10, 2, 10);

-- =========================================================================
-- 16. COMPARENDO_INFRACCION (depende de comparendo e infraccion)
-- =========================================================================
INSERT INTO comparendo_infraccion (id_comparendo, id_infraccion, valor_calculado, observaciones) VALUES
(1, 1, 234000, 'Exceso de velocidad 15 km/h sobre límite'),
(2, 4, 468000, 'Semáforo en rojo cruce peligroso'),
(3, 8, 234000, 'Zona de carga y descarga'),
(4, 5, 936000, 'Licencia dejada en casa, no cancelada'),
(5, 2, 468000, 'Velocidad 30 km/h sobre límite'),
(6, 10, 468000, 'Conversación telefónica sin manos libres'),
(7, 9, 234000, 'Cinturón no utilizado por conductor'),
(8, 7, 234000, 'SOAT vencido hace 2 meses'),
(9, 1, 234000, 'Velocidad 10 km/h sobre límite'),
(10, 4, 468000, 'Semáforo en rojo'),
(10, 10, 468000, 'Uso de celular simultáneo');

-- =========================================================================
-- 17. QUEJA (depende de comparendo y personas)
-- =========================================================================
INSERT INTO queja (fecha_radicacion, texto_queja, estado, medio_radicacion, id_comparendo, id_persona) VALUES
('2025-11-05 16:00:00', 'El agente fue grosero y no explicó correctamente la infracción', 'RADICADA', 'web', 1, 1),
('2025-11-06 10:30:00', 'Trato inadecuado durante el procedimiento del comparendo', 'EN_TRAMITE', 'presencial', 2, 2),
('2025-11-07 14:20:00', 'El policía solicitó dinero para no imponer el comparendo', 'EN_INVESTIGACION', 'web', 4, 4),
('2025-11-08 09:15:00', 'No me entregó copia del comparendo y fue descortés', 'RADICADA', 'telefonico', 6, 6),
('2025-11-09 11:45:00', 'Procedimiento realizado de forma incorrecta', 'RESUELTA', 'web', 3, 3),
('2025-11-10 15:30:00', 'Agente no identificó correctamente la infracción', 'RADICADA', 'mobile', 8, 8),
('2025-11-11 08:50:00', 'El comparendo fue impuesto sin justificación válida', 'ARCHIVADA', 'web', 7, 7),
('2025-11-12 12:10:00', 'Solicito revisión del procedimiento por irregularidades', 'RADICADA', 'presencial', 5, 5),
('2025-11-13 16:40:00', 'Comportamiento inapropiado del agente de tránsito', 'EN_TRAMITE', 'web', 10, 10),
('2025-11-14 10:00:00', 'No se respetó el debido proceso durante la imposición', 'RADICADA', 'correo', 9, 9);

-- =========================================================================
-- VERIFICACIÓN DE DATOS
-- =========================================================================

SELECT 'cargo_policial' AS tabla, COUNT(*) AS registros FROM cargo_policial
UNION ALL
SELECT 'categoria_licencia', COUNT(*) FROM categoria_licencia
UNION ALL
SELECT 'infraccion', COUNT(*) FROM infraccion
UNION ALL
SELECT 'secretaria_transito', COUNT(*) FROM secretaria_transito
UNION ALL
SELECT 'municipio', COUNT(*) FROM municipio
UNION ALL
SELECT 'usuarios', COUNT(*) FROM usuarios
UNION ALL
SELECT 'policia_transito', COUNT(*) FROM policia_transito
UNION ALL
SELECT 'licencia_conduccion', COUNT(*) FROM licencia_conduccion
UNION ALL
SELECT 'personas', COUNT(*) FROM personas
UNION ALL
SELECT 'licencia_categoria', COUNT(*) FROM licencia_categoria
UNION ALL
SELECT 'automotor', COUNT(*) FROM automotor
UNION ALL
SELECT 'propietario_automotor', COUNT(*) FROM propietario_automotor
UNION ALL
SELECT 'propiedad_automotor', COUNT(*) FROM propiedad_automotor
UNION ALL
SELECT 'comparendo', COUNT(*) FROM comparendo
UNION ALL
SELECT 'comparendo_infraccion', COUNT(*) FROM comparendo_infraccion
UNION ALL
SELECT 'queja', COUNT(*) FROM queja
ORDER BY tabla;


-- =========================================================================
-- SCRIPT COMPLETADO EXITOSAMENTE
-- =========================================================================

SELECT '
========================================
✓ DATOS DE PRUEBA INSERTADOS EXITOSAMENTE
========================================
Base de datos: PostgreSQL
Municipio principal: Santiago de Cali
Total de tablas con datos: 16

Resumen de registros:
- 10 Cargos policiales
- 10 Categorías de licencia
- 10 Infracciones
- 10 Secretarías de tránsito
- 10 Municipios (centrado en Cali)
- 10 Usuarios del sistema
- 10 Policías de tránsito
- 10 Licencias de conducción
- 10 Personas/Conductores
- 10+ Categorías por licencia
- 10 Vehículos automotores
- 10 Propietarios de vehículos
- 10 Registros de propiedad
- 10 Comparendos de tránsito
- 11 Infracciones en comparendos
- 10 Quejas ciudadanas

Datos listos para pruebas de API
Municipio: Santiago de Cali, Valle del Cauca
========================================
' AS mensaje;
