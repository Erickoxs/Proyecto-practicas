"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductsByCategory = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product")); // Asegúrate de que la ruta sea correcta
// Crear un producto
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, description, category, stock, imageURL } = req.body;
        // Validación básica de los campos requeridos
        if (!name || !price || !category || stock === undefined) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }
        // Crear un nuevo producto
        const newProduct = new Product_1.default({
            name,
            price,
            description,
            category,
            stock,
            imageURL
        });
        // Guardar el producto en la base de datos
        yield newProduct.save();
        return res.status(201).json({
            message: "Producto creado con éxito.",
            product: newProduct,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el producto.", error });
    }
});
exports.createProduct = createProduct;
// Obtener todos los productos
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find().populate("category");
        return res.status(200).json({ products });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener los productos.", error });
    }
});
exports.getProducts = getProducts;
// Obtener un producto por su ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield Product_1.default.findById(id).populate("category");
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }
        return res.status(200).json({ product });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener el producto.", error });
    }
});
exports.getProductById = getProductById;
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    try {
        // Validar que el ID de la categoría fue proporcionado
        if (!categoryId) {
            return res.status(400).json({ message: "El ID de la categoría es obligatorio." });
        }
        // Buscar productos que pertenezcan a la categoría
        const products = yield Product_1.default.find({ category: categoryId }).populate("category");
        // Verificar si se encontraron productos
        if (products.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos para esta categoría." });
        }
        return res.status(200).json({ products });
    }
    catch (error) {
        console.error("Error al obtener los productos por categoría:", error);
        return res.status(500).json({ message: "Error al obtener los productos por categoría.", error });
    }
});
exports.getProductsByCategory = getProductsByCategory;
// Actualizar un producto
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, price, description, category, stock, imageURL } = req.body;
    try {
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(id, { name, price, description, category, stock, imageURL }, { new: true } // Retorna el documento actualizado
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }
        return res.status(200).json({
            message: "Producto actualizado con éxito.",
            product: updatedProduct,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el producto.", error });
    }
});
exports.updateProduct = updateProduct;
// Eliminar un producto
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedProduct = yield Product_1.default.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }
        return res.status(200).json({
            message: "Producto eliminado con éxito.",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al eliminar el producto.", error });
    }
});
exports.deleteProduct = deleteProduct;
