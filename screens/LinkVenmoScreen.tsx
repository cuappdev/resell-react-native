import * as React from "react";
import { useState } from "react";

import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useApiClient } from "../api/ApiClientProvider";
import PurpleButton from "../components/PurpleButton";
import SkipButton from "../components/SkipButton";
import { fonts } from "../globalStyle/globalFont";
import { storeOnboarded } from "../utils/asychStorageFunctions";

export default function LinkVenmoScreen({ navigation, route }) {
  const { image, username, bio } = route.params;
  const [venmo, setVenmo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const api = useApiClient();

  const updateProfileOnBackend = async () => {
    const response = await api.post("/user/", {
      photoUrlBase64: image,
      username: username,
      venmoHandle: venmo,
      bio: bio,
    });
    if (response.error) {
      setError("Failed to update profile");
      return;
    } else {
      console.log(`update response: ${JSON.stringify(response)}`);
    }
    await storeOnboarded("true");
    setIsLoading(false);

    navigation.navigate("Root", {
      screen: "HomeTab",
      params: { showPanel: true },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={[fonts.body1, { marginTop: 24, color: "#707070" }]}>
          Your Venmo handle will only be visible to people interested in buying
          your listing.
        </Text>
        <View style={{ flexDirection: "column", width: "100%" }}>
          <Text style={styles.handle}>Venmo Handle</Text>
          <TextInput
            style={[
              fonts.body2,
              {
                paddingTop: 10,
                paddingBottom: 10,
                paddingHorizontal: 15,
                backgroundColor: "#F4F4F4",
                borderRadius: 10,
                marginBottom: 32,
                width: "100%",
                height: 40,
              },
            ]}
            placeholderTextColor={"#707070"}
            value={venmo}
            onChangeText={(text) => setVenmo(text)}
          />
        </View>

        <View style={styles.purpleButton}>
          <PurpleButton
            text={"Continue"}
            onPress={updateProfileOnBackend}
            enabled={venmo.length > 0}
          />
        </View>
        {isLoading && <ActivityIndicator size={"large"} color="#9E70F6" />}
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <View style={styles.skipButton}>
          <SkipButton
            text={"Skip"}
            onPress={() => {
              setVenmo("");
              updateProfileOnBackend();
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: "100%",
    paddingHorizontal: 24,
  },

  handle: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Rubik-Medium",
  },
  username_input: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
  },

  purpleButton: {
    position: "absolute",
    alignItems: "center",
    width: "100%",
    bottom: "10%",
  },
  skipButton: {
    position: "absolute",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    bottom: "2%",
  },
});
