import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { Colors } from "../theme/color";

interface Props {
  title: string;
  value: string;
}

export default function SummaryCard({
  title,
  value,
}: Props) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.value}>
          {value}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 24,
    backgroundColor: Colors.card,
  },

  title: {
    color: Colors.textSecondary,
    fontSize: 13,
  },

  value: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  },
});