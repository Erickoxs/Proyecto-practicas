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
exports.deleteCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const Category_1 = __importDefault(require("../models/Category")); // Asegúrate de que la ruta sea correcta
// Obtener todas las categorías
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find(); // Obtener todas las categorías
        return res.status(200).json({ categories });
    }
    catch (error) {
        console.error("Error al obtener categorías:", error);
        return res.status(500).json({ message: "Error al obtener las categorías.", error });
    }
});
exports.getCategories = getCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const category = yield Category_1.default.findById(id); // Buscar la categoría por ID
        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada." });
        }
        return res.status(200).json({ category });
    }
    catch (error) {
        console.error("Error al obtener categoría:", error);
        return res.status(500).json({ message: "Error al obtener la categoría.", error });
    }
});
exports.getCategoryById = getCategoryById;
// Crear una nueva categoría
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        // Validación básica
        if (!name) {
            return res.status(400).json({ message: "El nombre de la categoría es obligatorio." });
        }
        // Verificar si ya existe una categoría con el mismo nombre
        const existingCategory = yield Category_1.default.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Ya existe una categoría con este nombre." });
        }
        // Crear y guardar la nueva categoría
        const newCategory = new Category_1.default({
            name,
            description,
        });
        yield newCategory.save();
        return res.status(201).json({
            message: "Categoría creada con éxito.",
            category: newCategory,
        });
    }
    catch (error) {
        console.error("Error al crear categoría:", error);
        return res.status(500).json({ message: "Error al crear la categoría.", error });
    }
});
exports.createCategory = createCategory;
// Eliminar una categoría por su ID
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedCategory = yield Category_1.default.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada." });
        }
        return res.status(200).json({
            message: "Categoría eliminada con éxito.",
        });
    }
    catch (error) {
        console.error("Error al eliminar categoría:", error);
        return res.status(500).json({ message: "Error al eliminar la categoría.", error });
    }
});
exports.deleteCategory = deleteCategory;
