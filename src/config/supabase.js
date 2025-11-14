import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const env = (process.env.DB_ENV || "local").toLowerCase();

let supabaseUrl = "";
let supabaseKey = "";
let supabaseSchema = "";

// Selección de credenciales según entorno
if (env === "remote") {
  supabaseUrl = process.env.SUPABASE_REMOTE_URL;
  supabaseKey = process.env.SUPABASE_REMOTE_KEY; // ideal: service_role
  supabaseSchema = process.env.SUPABASE_REMOTE_SCHEMA || "public";
} else {
  // local: puede ser supabase local (CLI) o Postgres/docker propio
  supabaseUrl = process.env.SUPABASE_LOCAL_URL;
  supabaseKey = process.env.SUPABASE_LOCAL_KEY;
  supabaseSchema = process.env.SUPABASE_LOCAL_SCHEMA || "public";
}

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Supabase URL o KEY no definidas.");
  console.error(
    "Revisa variables SUPABASE_REMOTE_URL/SUPABASE_REMOTE_KEY o SUPABASE_LOCAL_URL/SUPABASE_LOCAL_KEY en .env",
  );
  throw new Error("Error al configurar Supabase");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: supabaseSchema,
  },
});

export const verifySupabase = async () => {
  try {
    // simple ping contra una tabla, ajusta el nombre si quieres
    const { error } = await supabase
      .from("persona")
      .select("id_persona", { head: true, count: "exact" })
      .limit(1);

    if (error) {
      throw error;
    }

    console.log("✓ Conexión OK a Supabase.");
    console.log(` * Entorno: ${env}`);
    console.log(` * URL: ${supabaseUrl}`);
    console.log(` * Esquema: ${supabaseSchema}`);
  } catch (err) {
    console.error("✗ No se pudo conectar a Supabase:", err.message);
    throw new Error("Error al levantar la BD de Supabase");
  }
};

export const getSupabaseEnv = () => env;
