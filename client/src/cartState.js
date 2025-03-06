import React, { createContext, useContext, useState } from "react";

// Create the Cart Context
// Context API is used to share cart state globally across components
export const CartContext = createContext();

// Cart Provider Component - Manages state of cart items
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom Hook for Using Cart State
export const useCart = () => useContext(CartContext);
