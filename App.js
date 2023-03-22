import SignIn from "./screens/SignIn";
import useCachedResources from "./hooks/useCachedResources";
import { store } from "./state_manage/reducers/store";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import { RootSiblingParent } from "react-native-root-siblings";

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
        <Provider store={store}>
          <SignIn />
        </Provider>
      </RootSiblingParent>
    );
  }
}
