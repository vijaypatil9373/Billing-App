import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  storeName: string;
  storeAddress: string;
  phoneNumber: string;

  gstEnabled: boolean;
  gstPercentage: number;

  currencySymbol: string;

  footerMessage: string;
  autoPrint: boolean;
}

const initialState: SettingsState = {
  storeName: "Premium POS Store",
  storeAddress: "Mumbai, India",
  phoneNumber: "+91 9999999999",

  gstEnabled: true,
  gstPercentage: 5,

  currencySymbol: "₹",

  footerMessage: "Thank You For Visiting ❤️",
  autoPrint: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    updateSettings: (
      state,
      action: PayloadAction<Partial<SettingsState>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateSettings } =
  settingsSlice.actions;

export default settingsSlice.reducer;