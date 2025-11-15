db.createCollection("auditorias", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["fecha", "accion", "endpoint", "metodo", "usuario"],
      properties: {
        fecha: { bsonType: "date" },
        accion: { bsonType: "string" },
        endpoint: { bsonType: "string" },
        metodo: { bsonType: "string" },
        usuario: {
          bsonType: "object",
          properties: {
            id_usuario: { bsonType: "string" },
            username: { bsonType: "string" },
            rol: { bsonType: "string" }
          }
        },
        ip: { bsonType: "string" },
        datos_entrada: { bsonType: ["object", "null"] },
        datos_salida: { bsonType: ["object", "null"] },
        exito: { bsonType: "bool" },
        mensaje_error: { bsonType: ["string", "null"] }
      }
    }
  }
})
