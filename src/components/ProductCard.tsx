import React from "react";
import { StyleSheet } from "react-native";

import {
  Card,
  Text,
  Button,
} from "react-native-paper";

import { Colors } from "../theme/color";

export default function ProductCard({
  name,
  price,
  onAdd,
}: any) {
  return (
    <Card style={styles.card}>
      <Card.Content>

        <Text
          variant="titleMedium"
          style={styles.name}
        >
          {name}
        </Text>

        <Text
          variant="headlineSmall"
          style={styles.price}
        >
          ₹{price}
        </Text>

      </Card.Content>

      <Card.Actions>
        <Button
          mode="contained"
          buttonColor={
            Colors.primary
          }
          onPress={onAdd}
        >
          Add
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles =
  StyleSheet.create({
    card: {
      width: "48%",

      backgroundColor:
        Colors.card,

      borderRadius: 24,

      marginBottom: 16,
    },

    name: {
      color: Colors.text,
    },

    price: {
      color: Colors.success,

      marginTop: 8,
    },
  });