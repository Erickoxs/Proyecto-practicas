import { Router } from "express";
import { createProduct, getProducts, getProductById, getProductsByCategory, updateProduct, deleteProduct } from "../controllers/productController";

const router = Router();

// Ruta para crear un producto
router.post("/products", createProduct);

// Ruta para obtener todos los productos
router.get("/products", getProducts);

// Ruta para obtener un producto por su ID
router.get("/products/:id", getProductById);

router.get("/products/category/:categoryId", getProductsByCategory)

// Ruta para actualizar un producto
router.put("/products/:id", updateProduct);

// Ruta para eliminar un producto
router.delete("/products/:id", deleteProduct);

export default router;



