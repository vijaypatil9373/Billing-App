import React, {useState} from "react";
import {
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  
} from "react-native";

import {
  Text,
  Card,
  Searchbar,
  Button,
} from "react-native-paper";

import Toast from "react-native-toast-message";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { CartItem as BillingCartItem } from "../store/slices/billingSlice";
import ProductCard from "../components/ProductCard";
import CartItem from "../components/CartItem";
import SummaryCard from "../components/SummaryCard";


import { PRODUCTS } from "../constants/products";
import { Colors } from "../theme/color";

import { useNavigation } from "@react-navigation/native";
import { addInvoice } from "../store/slices/invoiceSlice";

import {
  addToCart,
  increaseQty,
  decreaseQty,
} from "../store/slices/billingSlice";

import { RootState } from "../store";

import {
  calculateGST,
  calculateSubtotal,
  calculateTotal,
} from "../utils/calculations";
import { SafeAreaView } from "react-native-safe-area-context";



export default function BillingScreen() {
 const dispatch = useDispatch();
const navigation = useNavigation<any>();

const [searchQuery, setSearchQuery] =
  useState("");

const filteredProducts =
  PRODUCTS.filter(product =>
    product.name
      .toLowerCase()
      .includes(
        searchQuery.toLowerCase()
      )
  );

  const cart = useSelector(
    (state: RootState) =>
      state.billing.items
  );

  const settings = useSelector(
    (state: RootState) =>
      state.settings
  );

  const subtotal =
    calculateSubtotal(cart);

  const gst =
    calculateGST(
      subtotal,
      settings.gstPercentage
    );

  const total =
    calculateTotal(
      subtotal,
      gst,
      0
    );

  const addProduct = (item: any) => {
    dispatch(
      addToCart({
        ...item,
        quantity: 1,
      })
    );

    Toast.show({
      type: "success",
      text1: `${item.name} Added`,
    });
  };

  return (
      <SafeAreaView
    style={{
      flex: 1,
      backgroundColor:
        Colors.background,
    }}>
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>
        Good Luck Cafe
      </Text>

      <Text style={styles.subHeading}>
        Manage Billing Efficiently
      </Text>

      <View style={styles.summaryRow}>
        <SummaryCard
          title="Sales"
          value={`₹${total}`}
        />

        <SummaryCard
          title="Items"
          value={`${cart.length}`}
        />
      </View>

     <Searchbar
         placeholder="Search Products"
         value={searchQuery}
         onChangeText={setSearchQuery}
         style={styles.search}
    />

      <Text style={styles.section}>
        Products
      </Text>

      <FlatList
        data={filteredProducts}
        scrollEnabled={false}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent:
            "space-between",
        }}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            onAdd={() =>
              addProduct(item)
            }
          />
        )}
      />

      <Card style={styles.cart}>
        <Card.Content>
          <Text style={styles.cartTitle}>
            Cart
          </Text>

       {
  cart.length === 0 ? (
    <Text
      style={{
        color: Colors.textSecondary,
      }}
    >
      No items added
    </Text>
  ) : (
    cart.map((item: BillingCartItem) => (
      <CartItem
        key={item.id}
        {...item}
        onIncrease={() =>
          dispatch(
            increaseQty(item.id)
          )
        }
        onDecrease={() =>
          dispatch(
            decreaseQty(item.id)
          )
        }
      />
    ))
  )
}
        </Card.Content>
      </Card>

      <Card style={styles.totalCard}>
        <Card.Content>
          <Text style={styles.totalText}>
            Subtotal ₹{subtotal}
          </Text>

          <Text style={styles.totalText}>
            GST ₹{gst}
          </Text>

          <Text style={styles.grandTotal}>
            Total ₹{total}
          </Text>
        </Card.Content>
      </Card>

     <Button
  mode="contained"
  buttonColor={Colors.primary}
  style={styles.button}
  onPress={() => {
    if (cart.length === 0) return;

    const invoice = {
      id: Date.now().toString(),
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toLocaleString(),
      items: cart,
      subtotal,
      gst,
      discount: 0,
      total,
    };

    dispatch(addInvoice(invoice));

    navigation.navigate(
      "Receipt",
      {
        invoice,
      }
    );
  }}
>
  Generate Invoice
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

  heading: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: "700",
    marginTop:10
  },

  subHeading: {
    color:
      Colors.textSecondary,
    marginTop: 5,
    marginBottom: 20,
  },

  summaryRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  search: {
    marginBottom: 20,
    borderRadius: 18,
  },

  section: {
    color: Colors.text,
    fontSize: 20,
    marginBottom: 12,
  },

  cart: {
    marginTop: 20,
    borderRadius: 24,
    backgroundColor:
      Colors.card,
  },

  cartTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "700",
  },

  totalCard: {
    marginTop: 20,
    borderRadius: 24,
    backgroundColor:
      Colors.card,
  },

  totalText: {
    color: Colors.text,
    marginTop: 5,
  },

  grandTotal: {
    color: Colors.success,
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },

  button: {
    marginTop: 20,
    borderRadius: 18,
    paddingVertical: 6,
    marginBottom: 40,
  },
});