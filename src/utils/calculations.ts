import { CartItem } from "../store/slices/billingSlice";

export const calculateSubtotal = (
  items: CartItem[]
) => {
  return items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );
};

export const calculateGST = (
  subtotal: number,
  gstPercentage: number
) => {
  return (subtotal * gstPercentage) / 100;
};

export const calculateTotal = (
  subtotal: number,
  gst: number,
  discount: number
) => {
  return subtotal + gst - discount;
};