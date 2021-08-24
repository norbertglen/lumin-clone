import { createContext } from "react";
import { CartContextType } from './types/cart'

export const CartContext = createContext<Partial<CartContextType>>({});