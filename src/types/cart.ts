import { Product } from './product'
export type Cart = {
  id: number;
  title: string;
  quantity: number;
  price: number;
  image_url: string;
};

export type CartAction = {
  type: string;
};

export type CartContextType = {
  currency: string
  handleCurrencyUpdate: (currency: string) => void
  handleUpdateCart: (item: Product, action: CartAction) => void
  reloadCart: () => void
}
