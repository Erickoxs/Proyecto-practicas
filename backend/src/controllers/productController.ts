import { Request, Response } from "express";
import Product from "../models/Product"; // Asegúrate de que la ruta sea correcta

// Crear un producto
export const createProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, price, description, category, stock, imageURL } = req.body;

        // Validación básica de los campos requeridos
        if (!name || !price || !category || stock === undefined) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // Crear un nuevo producto
        const newProduct = new Product({
            name,
            price,
            description,
            category,
            stock,
            imageURL
        });

        // Guardar el producto en la base de datos
        await newProduct.save();

        return res.status(201).json({
            message: "Producto creado con éxito.",
            product: newProduct,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el producto.", error });
    }
};

// Obtener todos los productos
export const getProducts = async (req: Request, res: Response):  Promise<any> => {
    try {
        const products = await Product.find().populate("category");

        return res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener los productos.", error });
    }
};

// Obtener un producto por su ID
export const getProductById = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    
    try {
        const product = await Product.findById(id).populate("category");

        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        return res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener el producto.", error });
    }
};

export const getProductsByCategory = async (req: Request, res: Response): Promise<any> => {
    const { categoryId } = req.params;

    try {
        // Validar que el ID de la categoría fue proporcionado
        if (!categoryId) {
            return res.status(400).json({ message: "El ID de la categoría es obligatorio." });
        }

        // Buscar productos que pertenezcan a la categoría
        const products = await Product.find({ category: categoryId }).populate("category");

        // Verificar si se encontraron productos
        if (products.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos para esta categoría." });
        }

        return res.status(200).json({ products });
    } catch (error) {
        console.error("Error al obtener los productos por categoría:", error);
        return res.status(500).json({ message: "Error al obtener los productos por categoría.", error });
    }
};

// Actualizar un producto
export const updateProduct = async (req: Request, res: Response):  Promise<any> => {
    const { id } = req.params;
    const { name, price, description, category, stock, imageURL } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, description, category, stock, imageURL },
            { new: true } // Retorna el documento actualizado
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        return res.status(200).json({
            message: "Producto actualizado con éxito.",
            product: updatedProduct,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el producto.", error });
    }
};

// Eliminar un producto
export const deleteProduct = async (req: Request, res: Response):  Promise<any> => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        return res.status(200).json({
            message: "Producto eliminado con éxito.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al eliminar el producto.", error });
    }
};
