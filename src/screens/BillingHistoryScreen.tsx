import React from "react";

import {
  FlatList,
  StyleSheet,
} from "react-native";

import {
  Card,
  Text,
} from "react-native-paper";

import {
  useSelector,
} from "react-redux";

import { RootState }
from "../store";

import { Colors }
from "../theme/color";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BillingHistoryScreen() {

  const invoices =
    useSelector(
      (state: RootState) =>
        state.invoice.invoices
    );

  return (
    <SafeAreaView  style={{
          flex: 1,
          backgroundColor:
            Colors.background,
        }}> 
      <FlatList
      style={styles.container}
      data={invoices}
      keyExtractor={item =>
        item.id
      }
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Content>

            <Text style={styles.id}>
              {item.invoiceNumber}
            </Text>

            <Text style={styles.total}>
              ₹{item.total}
            </Text>

            <Text style={styles.date}>
              {item.date}
            </Text>

          </Card.Content>
        </Card>
      )}
      ListEmptyComponent={() => (
        <Text style={styles.empty}>
          No Invoices Yet
        </Text>
      )}
    
    />
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
    marginBottom: 12,
    borderRadius: 20,
    backgroundColor:
      Colors.card,
  },

  id: {
    color: Colors.primary,
    fontWeight: "700",
  },

  total: {
    color: Colors.success,
    fontSize: 18,
    marginTop: 8,
  },

  date: {
    color:
      Colors.textSecondary,
    marginTop: 6,
  },

  empty: {
    color:
      Colors.textSecondary,
    textAlign: "center",
    marginTop: 60,
  },
});