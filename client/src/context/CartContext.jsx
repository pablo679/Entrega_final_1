import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [lastAdded, setLastAdded] = useState(null);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const updated = prev.map((item) => item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item);
        setLastAdded({ name: product.name, quantity: quantity + (existing?.quantity || 0) });
        return updated;
      }
      const next = [...prev, { id: product.id, name: product.name, price: product.price, quantity }];
      setLastAdded({ name: product.name, quantity });
      return next;
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setItems([]);
  const clearLastAdded = () => setLastAdded(null);

  const total = useMemo(() => items.reduce((acc, item) => acc + item.price * item.quantity, 0), [items]);
  const itemCount = useMemo(() => items.reduce((acc, item) => acc + item.quantity, 0), [items]);

  const value = {
    items,
    total,
    itemCount,
    addToCart,
    removeFromCart,
    clearCart,
    lastAdded,
    clearLastAdded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
