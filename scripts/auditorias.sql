use comparendos_db;

db.createCollection("auditorias", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["fecha", "accion", "endpoint", "metodo", "usuario"],
      properties: {
        fecha: {
          bsonType: "date",
          description: "Fecha y hora del evento"
        },
        accion: {
          bsonType: "string",
          description: "Descripción corta de la acción (CREAR_COMPARENDO, LOGIN, REGISTRAR_QUEJA, etc.)"
        },
        endpoint: {
          bsonType: "string",
          description: "Endpoint de la API que se invocó"
        },
        metodo: {
          bsonType: "string",
          description: "Método HTTP (GET, POST, PUT, DELETE)"
        },
        usuario: {
          bsonType: "object",
          description: "Información básica del usuario que ejecutó la acción",
          properties: {
            id_usuario: { bsonType: "string" },   // id_usuario_sistema en Supabase
            username:  { bsonType: "string" },
            rol:       { bsonType: "string" }
          }
        },
        ip: {
          bsonType: "string",
          description: "Dirección IP desde la que se hizo la petición"
        },
        datos_entrada: {
          bsonType: ["object", "null"],
          description: "Body o query que llegó al endpoint"
        },
        datos_salida: {
          bsonType: ["object", "null"],
          description: "Respuesta importante (sin datos sensibles)"
        },
        exito: {
          bsonType: "bool",
          description: "Indica si la operación fue exitosa"
        },
        mensaje_error: {
          bsonType: ["string", "null"],
          description: "Mensaje de error si exito = false"
        }
      }
    }
  }
});

// Índices para consultas rápidas
db.auditorias.createIndex({ fecha: -1 });
db.auditorias.createIndex({ "usuario.id_usuario": 1 });
db.auditorias.createIndex({ accion: 1 });
db.auditorias.createIndex({ endpoint: 1, metodo: 1 });
