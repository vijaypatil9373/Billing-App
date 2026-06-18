import React from "react";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import MaterialCommunityIcons
from "@expo/vector-icons/MaterialCommunityIcons";

import BillingScreen
from "../screens/BillingScreen";

import BillingHistoryScreen
from "../screens/BillingHistoryScreen";

import SettingsScreen
from "../screens/SettingsScreen";

import ReceiptPreviewScreen
from "../screens/ReceiptPreviewScreen";

import { Colors }
from "../theme/color";

const Tab =
  createBottomTabNavigator();

const Stack =
  createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor:
            Colors.card,

          borderTopWidth: 0,

          height: 70,

          paddingBottom: 8,
        },

        tabBarActiveTintColor:
          Colors.primary,

        tabBarInactiveTintColor:
          Colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="BillingTab"
        component={BillingScreen}
        options={{
          title: "Billing",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <MaterialCommunityIcons
              name="cart"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="HistoryTab"
        component={
          BillingHistoryScreen
        }
        options={{
          title: "History",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <MaterialCommunityIcons
              name="history"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          title: "Settings",

          tabBarIcon: ({
            color,
            size,
          }) => (
            <MaterialCommunityIcons
              name="cog"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
      />

      <Stack.Screen
        name="Receipt"
        component={
          ReceiptPreviewScreen
        }
      />
    </Stack.Navigator>
  );
}