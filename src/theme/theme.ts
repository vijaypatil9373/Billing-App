import {
  MD3DarkTheme,
} from "react-native-paper";

import { Colors } from "./color";

export const DarkTheme = {
  ...MD3DarkTheme,

  colors: {
    ...MD3DarkTheme.colors,

    primary: Colors.primary,

    background:
      Colors.background,

    surface:
      Colors.card,
  },
};