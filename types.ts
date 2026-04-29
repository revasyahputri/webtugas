
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  size: string[];
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Tops' | 'Bottoms' | 'Dresses' | 'Accessories' | 'Sale';
