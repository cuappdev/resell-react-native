import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import ApiClientProvider from "./api/ApiClientProvider";
import useCachedResources from "./hooks/useCachedResources";
import SignIn from "./screens/SignIn";
import { store } from "./state_manage/reducers/store";
import { getDeviceFCMToken } from "./api/FirebaseNotificationManager";

export default function App() {
  function handleDeepLink(event) {
    let data = Linking.parse(event.url);
    setPostID(data);
  }
  const [postID, setPostID] = useState(null);

  useEffect(() => {
    getDeviceFCMToken();
  });

  useEffect(() => {
    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) setPostID(Linking.parse(initialURL));
    }
    const event = Linking.addEventListener("url", handleDeepLink);
    if (!postID) {
      getInitialURL();
    }
    return () => {
      event.remove();
    };
  });
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RootSiblingParent>
        <ApiClientProvider>
          <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SignIn />
            </GestureHandlerRootView>
          </Provider>
        </ApiClientProvider>
      </RootSiblingParent>
    );
  }
}
