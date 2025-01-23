import { Request, Response } from "express";
import Category from "../models/Category"; // Asegúrate de que la ruta sea correcta

// Obtener todas las categorías
export const getCategories = async (req: Request, res: Response): Promise<any> => {
    try {
        const categories = await Category.find(); // Obtener todas las categorías
        return res.status(200).json({ categories });
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        return res.status(500).json({ message: "Error al obtener las categorías.", error });
    }
};

export const getCategoryById = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id); // Buscar la categoría por ID

        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada." });
        }

        return res.status(200).json({ category });
    } catch (error) {
        console.error("Error al obtener categoría:", error);
        return res.status(500).json({ message: "Error al obtener la categoría.", error });
    }
};

// Crear una nueva categoría
export const createCategory = async (req: Request, res: Response): Promise<any>  => {
    try {
        const { name, description } = req.body;

        // Validación básica
        if (!name) {
            return res.status(400).json({ message: "El nombre de la categoría es obligatorio." });
        }

        // Verificar si ya existe una categoría con el mismo nombre
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Ya existe una categoría con este nombre." });
        }

        // Crear y guardar la nueva categoría
        const newCategory = new Category({
            name,
            description,
        });

        await newCategory.save();

        return res.status(201).json({
            message: "Categoría creada con éxito.",
            category: newCategory,
        });
    } catch (error) {
        console.error("Error al crear categoría:", error);
        return res.status(500).json({ message: "Error al crear la categoría.", error });
    }
};

// Eliminar una categoría por su ID
export const deleteCategory = async (req: Request, res: Response): Promise<any>  => {
    const { id } = req.params;

    try {
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada." });
        }

        return res.status(200).json({
            message: "Categoría eliminada con éxito.",
        });
    } catch (error) {
        console.error("Error al eliminar categoría:", error);
        return res.status(500).json({ message: "Error al eliminar la categoría.", error });
    }
};
