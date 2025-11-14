use COMPARENDOS_TRANSITO

db.createCollection("quejas", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'fecha_radicacion',
        'texto_queja',
        'estado',
        'id_persona_quejosa',
        'id_policia_denunciado'
      ],
      properties: {
        fecha_radicacion: { bsonType: 'date' },
        texto_queja: { bsonType: 'string', minLength: 5 },
        estado: {
          bsonType: 'string',
          enum: ['radicada', 'en trámite', 'resuelta', 'archivada']
        },
        medio_radicacion: {
          bsonType: 'string',
          enum: ['web', 'presencial', 'telefónico']
        },
        id_persona_quejosa: { bsonType: 'string' },
        id_policia_denunciado: { bsonType: 'string' },
        id_comparendo: { bsonType: ['string', 'null'] },
        adjuntos: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: ['tipo', 'url'],
            properties: {
              tipo: { bsonType: 'string' },
              url: { bsonType: 'string' }
            }
          }
        },
        creado_en: { bsonType: 'date' },
        actualizado_en: { bsonType: 'date' }
      }
    }
  }
})

// Índices útiles

db.quejas.createIndex({ id_persona_quejosa: 1 });
db.quejas.createIndex({ id_policia_denunciado: 1 });
db.quejas.createIndex({ id_comparendo: 1 });
db.quejas.createIndex({ estado: 1 });
db.quejas.createIndex({ fecha_radicacion: -1 });
