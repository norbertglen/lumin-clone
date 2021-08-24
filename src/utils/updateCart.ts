import storage from "../utils/storage";
import { Product as ProductModel } from "../types/product";
import { Cart, CartAction } from "../types/cart";

const updateCart = (item: ProductModel, action: CartAction) => {
  const cart = storage.get("user-cart") || [];
  const existingItem = cart.find((i: ProductModel) => i.id && i.id === item.id);
  if (!existingItem) {
    if (["SUBTRACT", "REMOVE"].includes(action.type)) {
      return;
    }
    if (action.type === "ADD") {
      cart.push({
        ...item,
        quantity: 1,
      });
      storage.set("user-cart", cart);
    }
  } else {
    if (action.type === 'REMOVE') {
      storage.set("user-cart", cart.filter((i: Cart) => i.id !== item.id));
      return
    }
    const updatedCart = cart.map((cartItem: Cart) => {
      if (cartItem.id === item.id) {
        let updatedItem = {
          ...cartItem,
          quantity:
            action.type === "ADD"
              ? cartItem.quantity + 1
              : cartItem.quantity - 1,
        };
        return updatedItem;
      }
      return cartItem;
    }).filter((c: Cart) => c.quantity !== 0);
    storage.set("user-cart", updatedCart);
  }
};

export default updateCart;
