"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
// Ruta para crear un producto
router.post("/products", productController_1.createProduct);
// Ruta para obtener todos los productos
router.get("/products", productController_1.getProducts);
// Ruta para obtener un producto por su ID
router.get("/products/:id", productController_1.getProductById);
router.get("/products/category/:categoryId", productController_1.getProductsByCategory);
// Ruta para actualizar un producto
router.put("/products/:id", productController_1.updateProduct);
// Ruta para eliminar un producto
router.delete("/products/:id", productController_1.deleteProduct);
exports.default = router;
