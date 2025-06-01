import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
            toast.success(`Increased quantity of "${product.title}"`);
            return prev.map(item =>
                item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            } else {
            toast.success(`Added "${product.title}" to cart`);
            return [...prev, { ...product, quantity: 1 }];
            }
        });
    };
    const increaseQty = (id) => {
        setCartItems(prev =>
            prev.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCartItems(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0) 
        );
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };
    return (
        <CartContext.Provider value={{ cartItems, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart }}>
        {children}
        </CartContext.Provider>
    );
};
