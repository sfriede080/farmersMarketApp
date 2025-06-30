import { useState, useEffect, useContext } from "react";
import {
  getPreorder,
  addPreorderItem,
  deletePreorderItem,
} from "../api/services/preorderService";
import { createContext } from "react";

export const CartContext = createContext();

export function CartProvider({ userId, children }) {
  const [cartItems, setCartItems] = useState([]);

  // Load cart on user login/sync
  useEffect(() => {
    const loadCart = async () => {
      if (userId) {
        const preorderData = await getPreorder(userId, "unplaced");
        setCartItems(preorderData.data);
      }
    };
    loadCart();
  }, [userId]);

  const addToCart = async (product, quantity = 1) => {
    //Update local state
    setCartItems((items) => {
      const exists = items.find((item) => item.product_FK === product.ID);
      if (exists) {
        return items.map((item) =>
          item.product_FK === product.ID
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...items,
          {
            Product: product,
            quantity,
          },
        ];
      }
    });

    // Sync to backend
    await addPreorderItem(userId, product.ID, quantity);
  };

  const subtractFromCart = async (product, quantity = 1) => {
    const cartItem = cartItems.find((item) => item.product_FK === product.ID);
    if (cartItem) {
      //figure out new quantity
      let updatedQuantity = Math.max(cartItem.quantity - quantity, 0);
      if (updatedQuantity == 0) {
        await removeFromCart(product.ID);
      } else {
        //Update local state
        setCartItems((items) => {
          return items.map((item) =>
            item.product_FK === product.ID
              ? { ...item, quantity: updatedQuantity }
              : item
          );
        });
        // Sync to backend
        await addPreorderItem(userId, product.ID, -1 * quantity);
      }
    }
  };

  const removeFromCart = async (productId) => {
    // Update local state
    setCartItems((items) =>
      items.filter((item) => item.product_FK !== productId)
    );

    // Sync to backend
    await deletePreorderItem(userId, productId);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, subtractFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
