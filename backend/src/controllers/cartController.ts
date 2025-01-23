import { Request, Response } from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";

// Agregar producto al carrito
export const addToCart = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, product, quantity } = req.body;

        // Validación básica
        if (!userId || !product || quantity === undefined) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [],
                totalPrice: 0,
            });
        }

        const existingItem = cart.items.find(item => item.product.toString() === product);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product, quantity });
        }

        await cart.populate("items.product"); // Llena los datos del producto
        cart.totalPrice = cart.items.reduce(
            (total, item) => total + (item.product as any).price * item.quantity,
            0
        );

        await cart.save();

        return res.status(200).json({ message: "Producto agregado al carrito.", cart });
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        return res.status(500).json({ message: "Error al agregar al carrito.", error });
    }
};

// Obtener el carrito
export const getCart = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId }).populate("items.product");

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado." });
        }

        return res.status(200).json({ cart });
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        return res.status(500).json({ message: "Error al obtener el carrito.", error });
    }
};

// Actualizar la cantidad de un producto
export const updateCartItem = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, product, quantity } = req.body;

        if (!userId || !product || quantity === undefined) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado." });
        }

        const item = cart.items.find(item => item.product.toString() === product);

        if (!item) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito." });
        }

        item.quantity = quantity;

        await cart.populate("items.product");
        cart.totalPrice = cart.items.reduce(
            (total, item) => total + (item.product as any).price * item.quantity,
            0
        );

        await cart.save();

        return res.status(200).json({ message: "Cantidad actualizada.", cart });
    } catch (error) {
        console.error("Error al actualizar el carrito:", error);
        return res.status(500).json({ message: "Error al actualizar el carrito.", error });
    }
};

// Eliminar un producto del carrito
export const removeFromCart = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, product } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado." });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== product);

        await cart.populate("items.product");
        cart.totalPrice = cart.items.reduce(
            (total, item) => total + (item.product as any).price * item.quantity,
            0
        );

        await cart.save();

        return res.status(200).json({ message: "Producto eliminado del carrito.", cart });
    } catch (error) {
        console.error("Error al eliminar del carrito:", error);
        return res.status(500).json({ message: "Error al eliminar del carrito.", error });
    }
};
