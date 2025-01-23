import mongoose, { Schema, Document } from "mongoose";

// Interfaz para definir el tipo de datos de la categoría
export interface ICategory extends Document {
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Esquema de Mongoose
const CategorySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, "El nombre de la categoría es obligatorio"],
            trim: true,
            unique: true,
            maxlength: [50, "El nombre no puede exceder los 50 caracteres"],
        },
        description: {
            type: String,
            required: false,
            trim: true,
            maxlength: [200, "La descripción no puede exceder los 200 caracteres"],
        },
    },
    {
        timestamps: true, // Añade createdAt y updatedAt automáticamente
    }
);

// Exportar el modelo
export default mongoose.model<ICategory>("Category", CategorySchema);
