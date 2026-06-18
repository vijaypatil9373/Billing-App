import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  Card,
  Text,
  TextInput,
  Switch,
  Button,
} from "react-native-paper";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { RootState } from "../store";
import { updateSettings } from "../store/slices/settingsSlice";
import { Colors } from "../theme/color";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const dispatch = useDispatch();

  const settings = useSelector(
    (state: RootState) => state.settings
  );

  const [storeName, setStoreName] = useState(
    settings.storeName
  );

  const [storeAddress, setStoreAddress] =
    useState(settings.storeAddress);

  const [phoneNumber, setPhoneNumber] =
    useState(settings.phoneNumber);

  const [gstEnabled, setGstEnabled] =
    useState(settings.gstEnabled);

  const [gstPercentage, setGstPercentage] =
    useState(
      settings.gstPercentage.toString()
    );

  const [footerMessage, setFooterMessage] =
    useState(settings.footerMessage);

  const saveSettings = () => {
    dispatch(
      updateSettings({
        storeName,
        storeAddress,
        phoneNumber,
        gstEnabled,
        gstPercentage:
          Number(gstPercentage),
        footerMessage,
      })
    );
  };

  return (
     <SafeAreaView style={{
              flex: 1,
              backgroundColor:
                Colors.background,
            }}>
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        Settings
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Store Name"
            value= "Good Luck cafe"
            onChangeText={setStoreName}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Store Address"
            value= "Pune, Maharashtra"
            onChangeText={setStoreAddress}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Phone Number"
            value= "9373111208"
            onChangeText={setPhoneNumber}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="GST %"
            value={gstPercentage}
            onChangeText={setGstPercentage}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Footer Message"
            value="Thanks!! Visit Again."
            onChangeText={
              setFooterMessage
            }
            mode="outlined"
            style={styles.input}
          />

          <Switch
            value={gstEnabled}
            onValueChange={
              setGstEnabled
            }
          />

          <Text
            style={{
              color: Colors.text,
              marginTop: 8,
            }}
          >
            GST Enabled
          </Text>

          <Button
            mode="contained"
            style={styles.button}
            onPress={saveSettings}
          >
            Save Settings
          </Button>
        </Card.Content>
      </Card>
      
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

  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    borderRadius: 24,
    backgroundColor: Colors.card,
  },

  input: {
    marginBottom: 14,
  },

  button: {
    marginTop: 20,
    borderRadius: 16,
  },
});