import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import {
  Card,
  Text,
  Button,
} from "react-native-paper";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import { Colors } from "../theme/color";

import {
  generateReceiptPDF,
} from "../utils/receiptGenerator";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReceiptPreviewScreen({
  route,
}: any) {
  const { invoice } = route.params;

  const exportPDF = async () => {
    const html = `
      <html>
      <body>
        <h1>${invoice.invoiceNumber}</h1>

        <p>${invoice.date}</p>

        <hr/>

        ${invoice.items
          .map(
            (item: any) => `
          <p>
            ${item.name}
            (${item.quantity})
            x ₹${item.price}
          </p>
        `
          )
          .join("")}

        <hr/>

        <h3>Subtotal ₹${invoice.subtotal}</h3>
        <h3>GST ₹${invoice.gst}</h3>
        <h2>Total ₹${invoice.total}</h2>

      </body>
      </html>
    `;

    const { uri } =
      await Print.printToFileAsync({
        html,
      });

    await Sharing.shareAsync(uri);
  };

  return (
    <SafeAreaView style={{
          flex: 1,
          backgroundColor:
            Colors.background,
        }}>
    <ScrollView
      style={styles.container}
    >
      <Card style={styles.card}>
        <Card.Content>

          <Text style={styles.store}>
            Premium POS Store
          </Text>

          <Text style={styles.invoice}>
            {invoice.invoiceNumber}
          </Text>

          <Text style={styles.date}>
            {invoice.date}
          </Text>

          <View style={styles.divider} />

          {invoice.items.map(
            (item: any) => (
              <View
                key={item.id}
                style={styles.row}
              >
                <Text
                  style={
                    styles.text
                  }
                >
                  {item.name}
                </Text>

                <Text
                  style={
                    styles.text
                  }
                >
                  {item.quantity} ×
                  ₹{item.price}
                </Text>
              </View>
            )
          )}

          <View style={styles.divider} />

          <Text style={styles.text}>
            Subtotal:
            ₹{invoice.subtotal}
          </Text>

          <Text style={styles.text}>
            GST:
            ₹{invoice.gst}
          </Text>

          <Text style={styles.total}>
            Total:
            ₹{invoice.total}
          </Text>

        </Card.Content>
      </Card>

      <Button
  mode="contained"
  onPress={() =>
    generateReceiptPDF(
      invoice
    )
  }
>
  Download Invoice
</Button>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
    padding: 16,
  },

  card: {
    borderRadius: 24,
    backgroundColor:
      Colors.card,
  },

  store: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },

  invoice: {
    color: Colors.primary,
    textAlign: "center",
    marginTop: 10,
  },

  date: {
    color:
      Colors.textSecondary,
    textAlign: "center",
  },

  divider: {
    height: 1,
    backgroundColor:
      Colors.border,
    marginVertical: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginVertical: 5,
  },

  text: {
    color: Colors.text,
  },

  total: {
    color: Colors.success,
    fontSize: 22,
    fontWeight: "700",
    marginTop: 12,
  },

  button: {
    marginTop: 20,
    borderRadius: 16,
  },
});