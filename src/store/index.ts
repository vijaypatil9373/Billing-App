import { configureStore } from "@reduxjs/toolkit";

import billingReducer from "./slices/billingSlice";
import settingsReducer from "./slices/settingsSlice";
import invoiceReducer from "./slices/invoiceSlice";

export const store = configureStore({
  reducer: {
    billing: billingReducer,
    settings: settingsReducer,
    invoice: invoiceReducer,
  },
});

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch =
  typeof store.dispatch;