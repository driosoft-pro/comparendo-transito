-- =========================================================================
-- CONSULTAS DE PRUEBA ÚTILES PARA EL API
-- =========================================================================

-- 1. Ver comparendos de Santiago de Cali con información completa
SELECT
    c.numero_comparendo,
    c.fecha_hora_registro,
    c.direccion_infraccion,
    c.estado,
    p.nombre || ' ' || p.apellidos AS conductor,
    p.num_doc AS documento,
    a.placa,
    a.marca || ' ' || a.linea_modelo AS vehiculo,
    pol.nombres || ' ' || pol.apellidos AS agente,
    m.nombre_municipio
FROM comparendo c
JOIN personas p ON c.id_persona = p.id_persona
JOIN automotor a ON c.id_automotor = a.id_automotor
JOIN policia_transito pol ON c.id_policia_transito = pol.id_policia
JOIN municipio m ON c.id_municipio = m.id_municipio
WHERE m.nombre_municipio = 'Santiago de Cali'
ORDER BY c.fecha_hora_registro DESC;

-- 2. Ver infracciones por comparendo con valores
SELECT
    c.numero_comparendo,
    c.fecha_hora_registro,
    i.codigo_infraccion,
    i.descripcion AS infraccion,
    ci.valor_calculado,
    i.puntos_descuento,
    p.nombre || ' ' || p.apellidos AS conductor
FROM comparendo c
JOIN comparendo_infraccion ci ON c.id_comparendo = ci.id_comparendo
JOIN infraccion i ON ci.id_infraccion = i.id_infraccion
JOIN personas p ON c.id_persona = p.id_persona
ORDER BY c.fecha_hora_registro DESC;

-- 3. Ver conductores con sus licencias y categorías
SELECT
    p.nombre || ' ' || p.apellidos AS conductor,
    p.num_doc AS documento,
    lc.numero_licencia,
    lc.estado AS estado_licencia,
    STRING_AGG(cl.codigo || '-' || cl.descripcion, ', ') AS categorias
FROM personas p
JOIN licencia_conduccion lc ON p.id_licencia_conduccion = lc.id_licencia
JOIN licencia_categoria lcat ON lc.id_licencia = lcat.id_licencia_conduccion
JOIN categoria_licencia cl ON lcat.id_categoria_licencia = cl.id_categoria
GROUP BY p.id_persona, p.nombre, p.apellidos, p.num_doc, lc.numero_licencia, lc.estado;

-- 4. Ver vehículos con sus propietarios
SELECT
    a.placa,
    a.marca || ' ' || a.linea_modelo AS vehiculo,
    a.modelo_ano,
    a.color,
    p.nombre || ' ' || p.apellidos AS propietario,
    p.telefono,
    m.nombre_municipio
FROM automotor a
JOIN propietario_automotor pa ON a.id_automotor = pa.id_automotor
JOIN personas p ON pa.id_persona = p.id_persona
JOIN municipio m ON a.id_municipio = m.id_municipio
WHERE pa.es_principal = 1;

-- 5. Ver quejas radicadas con información del comparendo
SELECT
    q.id_queja,
    q.fecha_radicacion,
    q.estado,
    q.medio_radicacion,
    q.texto_queja,
    c.numero_comparendo,
    p.nombre || ' ' || p.apellidos AS quejoso,
    pol.nombres || ' ' || pol.apellidos AS policia_denunciado
FROM queja q
LEFT JOIN comparendo c ON q.id_comparendo = c.id_comparendo
LEFT JOIN personas p ON q.id_persona = p.id_persona
LEFT JOIN policia_transito pol ON c.id_policia_transito = pol.id_policia
ORDER BY q.fecha_radicacion DESC;

-- 6. Estadísticas de comparendos por estado
SELECT
    estado,
    COUNT(*) AS cantidad,
    SUM(CASE WHEN fecha_hora_registro >= CURRENT_DATE - INTERVAL '7 days' THEN 1 ELSE 0 END) AS ultima_semana
FROM comparendo
GROUP BY estado
ORDER BY cantidad DESC;

-- 7. Top infracciones más comunes
SELECT
    i.codigo_infraccion,
    i.descripcion,
    i.tipo_infraccion,
    COUNT(*) AS veces_aplicada,
    SUM(ci.valor_calculado) AS valor_total
FROM infraccion i
JOIN comparendo_infraccion ci ON i.id_infraccion = ci.id_infraccion
GROUP BY i.id_infraccion, i.codigo_infraccion, i.descripcion, i.tipo_infraccion
ORDER BY veces_aplicada DESC;

-- 8. Ver agentes de policía activos en Cali
SELECT
    pol.codigo_policia,
    pol.nombres || ' ' || pol.apellidos AS agente,
    cp.nombre_cargo,
    cp.grado,
    st.nombre_secretaria,
    u.username,
    COUNT(c.id_comparendo) AS comparendos_impuestos
FROM policia_transito pol
JOIN cargo_policial cp ON pol.id_cargo_policial = cp.id_cargo
JOIN secretaria_transito st ON pol.id_secretaria_transito = st.id_secretaria
JOIN usuarios u ON pol.id_usuario = u.id_usuario
LEFT JOIN comparendo c ON pol.id_policia = c.id_policia_transito
WHERE u.estado = 1
GROUP BY pol.id_policia, pol.codigo_policia, pol.nombres, pol.apellidos,
         cp.nombre_cargo, cp.grado, st.nombre_secretaria, u.username
ORDER BY comparendos_impuestos DESC;

-- 9. Resumen financiero de comparendos
SELECT
    DATE_TRUNC('month', c.fecha_hora_registro) AS mes,
    COUNT(c.id_comparendo) AS total_comparendos,
    SUM(ci.valor_calculado) AS valor_total,
    COUNT(CASE WHEN c.estado = 'PAGADO' THEN 1 END) AS pagados,
    COUNT(CASE WHEN c.estado = 'PENDIENTE' THEN 1 END) AS pendientes,
    SUM(CASE WHEN c.estado = 'PAGADO' THEN ci.valor_calculado ELSE 0 END) AS recaudo
FROM comparendo c
JOIN comparendo_infraccion ci ON c.id_comparendo = ci.id_comparendo
GROUP BY DATE_TRUNC('month', c.fecha_hora_registro)
ORDER BY mes DESC;

-- 10. Conductores con múltiples comparendos
SELECT
    p.nombre || ' ' || p.apellidos AS conductor,
    p.num_doc,
    p.telefono,
    COUNT(c.id_comparendo) AS total_comparendos,
    SUM(ci.valor_calculado) AS deuda_total,
    STRING_AGG(DISTINCT c.estado, ', ') AS estados
FROM personas p
JOIN comparendo c ON p.id_persona = c.id_persona
JOIN comparendo_infraccion ci ON c.id_comparendo = ci.id_comparendo
GROUP BY p.id_persona, p.nombre, p.apellidos, p.num_doc, p.telefono
HAVING COUNT(c.id_comparendo) > 1
ORDER BY total_comparendos DESC;
