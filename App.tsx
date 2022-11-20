import * as Font from "expo-font";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import useCachedResources from "./hooks/useCachedResources";

import GlobalStore from "./state_manage/store";
import { RootSiblingParent } from "react-native-root-siblings";
import SignIn from "./screens/SignIn";

// When configured correctly, URLSchemes should contain your REVERSED_CLIENT_ID
export default function App() {
  Font.loadAsync({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-LightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Roboto-ThinItalic": require("./assets/fonts/Roboto-ThinItalic.ttf"),
  });
  Font.loadAsync({
    "Rubik-Black": require("./assets/fonts/rubik/Rubik-Black.ttf"),
    "Rubik-BlackItalic": require("./assets/fonts/rubik/Rubik-BlackItalic.ttf"),
    "Rubik-Bold": require("./assets/fonts/rubik/Rubik-Bold.ttf"),
    "Rubik-BoldItalic": require("./assets/fonts/rubik/Rubik-BoldItalic.ttf"),
    "Rubik-Italic": require("./assets/fonts/rubik/Rubik-Italic.ttf"),
    "Rubik-Light": require("./assets/fonts/rubik/Rubik-Light.ttf"),
    "Rubik-LightItalic": require("./assets/fonts/rubik/Rubik-LightItalic.ttf"),
    "Rubik-Medium": require("./assets/fonts/rubik/Rubik-Medium.ttf"),
    "Rubik-MediumItalic": require("./assets/fonts/rubik/Rubik-MediumItalic.ttf"),
    "Rubik-Regular": require("./assets/fonts/rubik/Rubik-Regular.ttf"),
  });
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={GlobalStore}>
        <SafeAreaProvider>
          <SignIn />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
