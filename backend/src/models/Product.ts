import mongoose, { Schema, Document } from "mongoose";

// Interfaz para definir el tipo de datos del producto
export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  category: mongoose.Types.ObjectId; // Relación con otra colección
  stock: number;
  imageURL?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Esquema de Mongoose
const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      trim: true,
      maxlength: [100, "El nombre no puede exceder los 100 caracteres"],
    },
    price: {
      type: Number,
      required: [true, "El precio del producto es obligatorio"],
      min: [0, "El precio debe ser mayor o igual a 0"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "La descripción no puede exceder los 500 caracteres"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "La categoría del producto es obligatoria"],
    },
    stock: {
      type: Number,
      required: [true, "El stock del producto es obligatorio"],
      min: [0, "El stock no puede ser negativo"],
      default: 0,
    },
    imageURL: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Añade createdAt y updatedAt automáticamente
    versionKey: false, // Elimina el campo __v
  }
);

// Exportar el modelo
export default mongoose.model<IProduct>("Product", ProductSchema);
