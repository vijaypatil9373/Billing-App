import React from "react";

import { Provider } from "react-redux";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  SafeAreaProvider,
} from "react-native-safe-area-context";

import {
  PaperProvider,
} from "react-native-paper";

import Toast from "react-native-toast-message";

import AppNavigator from "./src/navigation/AppNavigator";

import { store } from "./src/store";

import { DarkTheme } from "./src/theme/theme";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={DarkTheme}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>

          <Toast />
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}