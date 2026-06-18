export interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  image?: string;
}

export interface CartProduct extends Product {
  quantity: number;
}