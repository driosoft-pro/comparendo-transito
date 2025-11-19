db.createCollection("quejas", {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'fecha_radicacion',
        'texto_queja',
        'estado',
        'medio_radicacion',
        'id_comparendo',
        'id_persona'
      ],
      properties: {
        fecha_radicacion: {
          bsonType: 'date',
          description: 'Fecha de radicación'
        },
        texto_queja: {
          bsonType: 'string',
          minLength: 5,
          description: 'Descripción de la queja'
        },
        estado: {
          bsonType: 'string',
          'enum': [
            'RADICADA',
            'EN TRÁMITE',
            'RESUELTA',
            'ARCHIVADA'
          ],
          description: 'Estado de la queja'
        },
        medio_radicacion: {
          bsonType: 'string',
          'enum': [
            'WEB',
            'PRESENCIAL',
            'TELEFÓNICO'
          ],
          description: 'Medio de radicación'
        },
        respuesta: {
          bsonType: [
            'string',
            'null'
          ],
          description: 'Respuesta a la queja (si existe)'
        },
        fecha_respuesta: {
          bsonType: [
            'date',
            'null'
          ],
          description: 'Fecha de respuesta si ya fue atendida'
        },
        id_comparendo: {
          bsonType: [
            'int',
            'long'
          ],
          description: 'FK -> comparendo.id_comparendo (Postgres)'
        },
        id_persona: {
          bsonType: [
            'int',
            'long'
          ],
          description: 'FK -> personas.id_persona (Postgres)'
        },
        createdAt: {
          bsonType: [
            'date',
            'string'
          ],
          description: 'Fecha de creación generada por Mongoose'
        },
        updatedAt: {
          bsonType: [
            'date',
            'string'
          ],
          description: 'Fecha de actualización generada por Mongoose'
        },
        deleted_at: {
          bsonType: [
            'date',
            'null'
          ],
          description: 'Soft delete'
        }
      }
    }
  }
})
