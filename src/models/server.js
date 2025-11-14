import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { connectionNoSQL, closeMongo } from "../config/mongo.js";   
import { verifySupabase } from "../config/supabase.js";            

// Cargar variables de entorno sin logs
dotenv.config({ quiet: true });

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;

    // Ruta raíz
    this.app.get("/", (req, res) => {
      res.json({
        message: "API de Comparendos - MultiDB (Supabase + Mongo)",
        status: "online",
        databases: {
          supabase: "PostgreSQL (Supabase)",
          mongodb: "Mongo Atlas",
        },
      });
    });

    // Middlewares primero
    this.middlewares();

    // Luego las conexiones a BD
    this.connectDatabases();

    // Finalmente las rutas
    this.routes();

    // Manejo de cierre graceful
    this.setupGracefulShutdown();
  }

  // Middlewares
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static("public")); // Directorio público si lo necesitas
  }

  // Conectar todas las bases de datos
  async connectDatabases() {
    await this.connectionSupabase();
    await this.connectionMongo();
  }

  // Conexión a Supabase
  async connectionSupabase() {
    try {
      await verifySupabase();
    } catch (error) {
      console.error("No se pudo verificar Supabase:", error.message);
    }
  }

  // Conexión a MongoDB (Mongoose)
  async connectionMongo() {
    try {
      await connectionNoSQL();
      console.log("✓ Conexión OK a MongoDB.");
      console.log(` * BD Mongo (REMOTE_BD): ${process.env.MONGODB_REMOTE_BD || "no definida"}`);
    } catch (error) {
      console.error("No se pudo conectar a MongoDB:", error.message);
    }
  }

  // Cargar rutas
  async routes() {
    try {
      const routes = (await import("./src/routes/index.js")).default; // ajusta según tu estructura
      this.app.use("/api", routes);
      console.log("✓ Rutas cargadas correctamente.");
    } catch (error) {
      console.error("Error al cargar rutas:", error.message);
    }
  }

  // Configurar cierre graceful del servidor
  setupGracefulShutdown() {
    process.on("SIGINT", async () => {
      console.log("\n Cerrando servidor...");

      try {
        // Cerrar conexión a Mongo
        await closeMongo?.();

        console.log("Servidor cerrado correctamente");
        process.exit(0);
      } catch (error) {
        console.error("Error al cerrar conexiones:", error);
        process.exit(1);
      }
    });
  }

  // Iniciar servidor
  listen() {
    this.app.listen(this.port, () => {
      console.log("\n" + "=".repeat(50));
      console.log(` Servidor corriendo en puerto ${this.port}`);
      console.log(` URL: http://localhost:${this.port}`);
      console.log(` Entorno DB_ENV: ${process.env.DB_ENV || "local"}`);
      console.log("=".repeat(50) + "\n");
    });
  }
}

export default Server;
