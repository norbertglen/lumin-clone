import { Cart } from "../types/cart";

export const calculateTotalItems = (items: [Cart]) => {
  return (items || []).reduce((acc, cur: Cart) => {
    return cur.quantity + acc;
  }, 0);
};

export const calculateTotalPrice = (items: [Cart]) => {
  return (items || []).reduce((acc, cur: Cart) => {
    return cur.quantity * cur.price + acc;
  }, 0);
};

export const formatCurrency = (value: number, currency: string) => {
    return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(value);
}
