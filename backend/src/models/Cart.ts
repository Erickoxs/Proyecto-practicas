import { Schema, model, Types, Document } from "mongoose";
import { IProduct } from "./Product";

export interface ICartItem {
    product: Types.ObjectId | IProduct; // Puede ser un ObjectId o el producto completo
    quantity: number;
}

export interface ICart {
    userId: string;
    items: ICartItem[];
    totalPrice: number;
}

const cartItemSchema = new Schema<ICartItem>({
    product: { type: Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new Schema<ICart>(
    {
        userId: { type: String, required: true },
        items: [cartItemSchema],
        totalPrice: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
