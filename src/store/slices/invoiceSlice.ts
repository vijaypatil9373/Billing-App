import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Invoice } from "../../types/Invoice";

interface InvoiceState {
  invoices: Invoice[];
}

const initialState: InvoiceState = {
  invoices: [],
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,

  reducers: {
    addInvoice: (
      state,
      action: PayloadAction<Invoice>
    ) => {
      state.invoices.unshift(
        action.payload
      );
    },
  },
});

export const {
  addInvoice,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;