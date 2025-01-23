"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartItemSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
});
const cartSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, required: true, default: 0 },
}, { timestamps: true });
const Cart = (0, mongoose_1.model)("Cart", cartSchema);
exports.default = Cart;
