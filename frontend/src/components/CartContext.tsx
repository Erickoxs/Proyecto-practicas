import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Product {
  _id: string; // id es de tipo string
  name: string;
  price: number;
  imageURL?: string;
  category: string;
  quantity: number;
}

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void; // Cambiar el tipo de id a string
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializa el carrito con los datos de localStorage o un array vacío
  const [cart, setCart] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Guarda el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (_id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== _id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
