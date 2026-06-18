import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface BillingState {
  items: CartItem[];
  discount: number;
}

const initialState: BillingState = {
  items: [],
  discount: 0,
};

const billingSlice = createSlice({
  name: "billing",
  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    increaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        i => i.id === action.payload
      );

      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        i => i.id === action.payload
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          i => i.id !== action.payload
        );
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    },

    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },

    clearCart: state => {
      state.items = [];
      state.discount = 0;
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeItem,
  setDiscount,
  clearCart,
} = billingSlice.actions;

export default billingSlice.reducer;