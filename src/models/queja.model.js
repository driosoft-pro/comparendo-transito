import mongoose from 'mongoose';

const adjuntoSchema = new mongoose.Schema(
  {
    tipo: { type: String }, // imagen, audio, pdf, etc.
    url: { type: String },
  },
  { _id: false },
);

const quejaSchema = new mongoose.Schema(
  {
    fecha_radicacion: {
      type: Date,
      required: true,
      default: Date.now,
    },
    texto_queja: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
      enum: ['radicada', 'en_tramite', 'resuelta', 'archivada'],
      default: 'radicada',
    },
    medio_radicacion: {
      type: String,
      default: 'web',
    },
    // IDs referenciando registros en Supabase
    id_persona_quejosa: {
      type: String,
      required: true, // id_persona en Supabase
    },
    id_policia_denunciado: {
      type: String,
      required: true, // id_policia en Supabase
    },
    id_comparendo: {
      type: String, // id_comparendo en Supabase
      default: null,
    },
    adjuntos: [adjuntoSchema],
    creado_en: {
      type: Date,
      default: Date.now,
    },
    actualizado_en: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'quejas',
  },
);

quejaSchema.pre('save', function (next) {
  this.actualizado_en = new Date();
  next();
});

export const Queja = mongoose.models.Queja || mongoose.model('Queja', quejaSchema);
