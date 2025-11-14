import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

let mongoURI = "";
if ((process.env.DB_ENV || "local").toLowerCase() === "remote") {
  mongoURI = process.env.MONGODB_REMOTE_URI; 
} else {
  mongoURI = process.env.MONGODB_LOCAL_URI;
}

export const connectionNoSQL = async () => {
  try {
    if (!mongoURI) {
      throw new Error(
        "Mongo URI no definido. Revisa MONGODB_LOCAL_URI/MONGODB_REMOTE_URI en .env",
      );
    }

    await mongoose.connect(mongoURI, {
      dbName: process.env.MONGODB_REMOTE_BD,
    });
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    throw new Error("Error al levantar la BD de MongoDB");
  }
};

export const closeMongo = async () => {
  try {
    await mongoose.connection.close();
    console.log("Conexión a MongoDB cerrada");
  } catch (error) {
    console.error("Error al cerrar MongoDB:", error.message);
  }
};
