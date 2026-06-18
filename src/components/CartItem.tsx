import React from "react";
import { View, StyleSheet } from "react-native";
import {
  IconButton,
  Text,
} from "react-native-paper";

import { Colors } from "../theme/color";

export default function CartItem({
  name,
  quantity,
  price,
  onIncrease,
  onDecrease,
}: any) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.price}>
          ₹{price}
        </Text>
      </View>

      <View style={styles.actions}>
        <IconButton
          icon="minus"
          iconColor="white"
          size={18}
          onPress={onDecrease}
        />

        <Text style={styles.qty}>
          {quantity}
        </Text>

        <IconButton
          icon="plus"
          iconColor="white"
          size={18}
          onPress={onIncrease}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardLight,
    padding: 10,
    borderRadius: 16,
    marginTop: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    color: Colors.text,
    fontWeight: "600",
  },

  price: {
    color: Colors.success,
    marginTop: 4,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
  },

  qty: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
});