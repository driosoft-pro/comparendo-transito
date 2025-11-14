// Seleccionar base de datos (cámbiale el nombre a como la vayas a usar)
use comparendos_db;

// Crear colección QUEJAS con validación de esquema
db.createCollection("quejas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["fecha_radicacion", "texto_queja", "estado",
                 "id_persona_quejosa", "id_policia_denunciado"],
      properties: {
        fecha_radicacion: {
          bsonType: "date",
          description: "Fecha de radicación de la queja"
        },
        texto_queja: {
          bsonType: "string",
          description: "Descripción detallada de la queja"
        },
        estado: {
          bsonType: "string",
          description: "Estado de la queja (radicada, en trámite, resuelta, archivada)"
        },
        medio_radicacion: {
          bsonType: "string",
          description: "Medio por el cual se radicó la queja (web, presencial, telefónico)",
          minLength: 1
        },
        id_persona_quejosa: {
          bsonType: "string",
          description: "ID de la persona (id_persona en Supabase)"
        },
        id_policia_denunciado: {
          bsonType: "string",
          description: "ID del policía (id_policia en Supabase)"
        },
        id_comparendo: {
          bsonType: ["string", "null"],
          description: "ID del comparendo (id_comparendo en Supabase) o null si no aplica"
        },
        adjuntos: {
          bsonType: ["array"],
          description: "Lista de adjuntos opcionales",
          items: {
            bsonType: "object",
            properties: {
              tipo: { bsonType: "string" },    // imagen, audio, pdf, etc.
              url:  { bsonType: "string" }     // enlace al archivo
            }
          }
        },
        creado_en: {
          bsonType: "date",
          description: "Fecha de creación del documento en Mongo"
        },
        actualizado_en: {
          bsonType: "date",
          description: "Última fecha de actualización"
        }
      }
    }
  }
});

// Índices útiles
db.quejas.createIndex({ id_persona_quejosa: 1 });
db.quejas.createIndex({ id_policia_denunciado: 1 });
db.quejas.createIndex({ id_comparendo: 1 });
db.quejas.createIndex({ estado: 1 });
