import { Router } from "express";
import {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart,
} from "../controllers/cartController";

const router = Router();

router.post("/cart", addToCart); // Agregar producto al carrito
router.get("/cart/:userId", getCart); // Obtener el carrito de un usuario
router.put("/cart", updateCartItem); // Actualizar la cantidad de un producto
router.delete("/cart/item", removeFromCart); // Eliminar un producto del carrito


export default router;
