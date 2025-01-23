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
exports.removeFromCart = exports.updateCartItem = exports.getCart = exports.addToCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
// Agregar producto al carrito
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, product, quantity } = req.body;
        // Validación básica
        if (!userId || !product || quantity === undefined) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }
        let cart = yield Cart_1.default.findOne({ userId });
        if (!cart) {
            cart = new Cart_1.default({
                userId,
                items: [],
                totalPrice: 0,
            });
        }
        const existingItem = cart.items.find(item => item.product.toString() === product);
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            cart.items.push({ product, quantity });
        }
        yield cart.populate("items.product"); // Llena los datos del producto
        cart.totalPrice = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
        yield cart.save();
        return res.status(200).json({ message: "Producto agregado al carrito.", cart });
    }
    catch (error) {
        console.error("Error al agregar al carrito:", error);
        return res.status(500).json({ message: "Error al agregar al carrito.", error });
    }
});
exports.addToCart = addToCart;
// Obtener el carrito
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const cart = yield Cart_1.default.findOne({ userId }).populate("items.product");
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado." });
        }
        return res.status(200).json({ cart });
    }
    catch (error) {
        console.error("Error al obtener el carrito:", error);
        return res.status(500).json({ message: "Error al obtener el carrito.", error });
    }
});
exports.getCart = getCart;
// Actualizar la cantidad de un producto
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, product, quantity } = req.body;
        if (!userId || !product || quantity === undefined) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }
        const cart = yield Cart_1.default.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado." });
        }
        const item = cart.items.find(item => item.product.toString() === product);
        if (!item) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito." });
        }
        item.quantity = quantity;
        yield cart.populate("items.product");
        cart.totalPrice = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
        yield cart.save();
        return res.status(200).json({ message: "Cantidad actualizada.", cart });
    }
    catch (error) {
        console.error("Error al actualizar el carrito:", error);
        return res.status(500).json({ message: "Error al actualizar el carrito.", error });
    }
});
exports.updateCartItem = updateCartItem;
// Eliminar un producto del carrito
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, product } = req.body;
        const cart = yield Cart_1.default.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado." });
        }
        cart.items = cart.items.filter(item => item.product.toString() !== product);
        yield cart.populate("items.product");
        cart.totalPrice = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
        yield cart.save();
        return res.status(200).json({ message: "Producto eliminado del carrito.", cart });
    }
    catch (error) {
        console.error("Error al eliminar del carrito:", error);
        return res.status(500).json({ message: "Error al eliminar del carrito.", error });
    }
});
exports.removeFromCart = removeFromCart;
