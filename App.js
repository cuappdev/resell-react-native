import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import ApiClientProvider from "./api/ApiClientProvider";
import useCachedResources from "./hooks/useCachedResources";
import SignIn from "./screens/SignIn";
import { store } from "./state_manage/reducers/store";

export default function App() {
  function handleDeepLink(event) {
    let data = Linking.parse(event.url);
    setPostID(data);
  }
  const [postID, setPostID] = useState(null);

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
            <SignIn />
          </Provider>
        </ApiClientProvider>
      </RootSiblingParent>
    );
  }
}
