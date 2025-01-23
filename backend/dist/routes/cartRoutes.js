"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = require("../controllers/cartController");
const router = (0, express_1.Router)();
router.post("/cart", cartController_1.addToCart); // Agregar producto al carrito
router.get("/cart/:userId", cartController_1.getCart); // Obtener el carrito de un usuario
router.put("/cart", cartController_1.updateCartItem); // Actualizar la cantidad de un producto
router.delete("/cart/item", cartController_1.removeFromCart); // Eliminar un producto del carrito
exports.default = router;
