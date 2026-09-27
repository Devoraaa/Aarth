import React, { createContext, useContext, useEffect, useState } from "react";
import {
  type ShopifyCart,
  cartCreate,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
  getCart,
  getStoredCartId,
} from "../lib/shopify";

interface CartContextType {
  cart: ShopifyCart | null;
  isOpen: boolean;
  loading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Restore cart on mount
  useEffect(() => {
    const existingId = getStoredCartId();
    if (existingId) {
      getCart(existingId)
        .then((fetched) => {
          if (fetched) {
            setCart(fetched);
          }
        })
        .catch((err) => {
          console.warn("Could not fetch cart:", err);
        });
    }
  }, []);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = async (merchandiseId: string, quantity = 1) => {
    setLoading(true);
    try {
      if (!cart || !cart.id) {
        const newCart = await cartCreate([{ merchandiseId, quantity }]);
        setCart(newCart);
      } else {
        const updatedCart = await cartLinesAdd(cart.id, [
          { merchandiseId, quantity },
        ]);
        setCart(updatedCart);
      }
      setIsOpen(true);
    } catch (err) {
      console.error("Failed to add item to bag:", err);
      alert("Could not add item to bag. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (lineId: string, quantity: number) => {
    if (!cart?.id) return;
    setLoading(true);
    try {
      if (quantity <= 0) {
        await removeItem(lineId);
      } else {
        const updated = await cartLinesUpdate(cart.id, [{ id: lineId, quantity }]);
        setCart(updated);
      }
    } catch (err) {
      console.error("Failed to update item quantity:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cart?.id) return;
    setLoading(true);
    try {
      const updated = await cartLinesRemove(cart.id, [lineId]);
      setCart(updated);
    } catch (err) {
      console.error("Failed to remove item from bag:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        loading,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
