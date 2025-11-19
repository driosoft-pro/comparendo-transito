import mongoose from "mongoose";

const QuejaModel = new mongoose.Schema(
  {
    fecha_radicacion: { type: Date, required: true },
    texto_queja: { type: String, required: true },
    estado: { type: String, required: true },
    medio_radicacion: { type: String, required: true },

    // IDs que vienen de Supabase (no son ObjectId de Mongo)
    id_comparendo: { type: Number, required: true },
    id_persona: { type: Number, required: true },

    respuesta: { type: String, default: null },
    fecha_respuesta: { type: Date, default: null },

    // Manejo de soft delete
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: true, // Crea createdAt y updatedAt automáticamente
    versionKey: false,
  }
);

// Opcional: índice para acelerar búsquedas por persona y comparendo
QuejaModel.index({ id_persona: 1 });
QuejaModel.index({ id_comparendo: 1 });

export const Queja = mongoose.model("Queja", QuejaModel);
