/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import messaging from '@react-native-firebase/messaging';

import { RootStackParamList } from "./types";

const NAVIGATION_IDS = ['chat'];

function buildDeepLinkFromNotificationData(data): string | null {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId)
    return null;
  }
  if (navigationId === "chat") {
    return `${Linking.createURL("/")}chat`
  }
  console.warn('Missing postId')
  return null
}

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Root: {
        screens: {
          HomeTab: {
            screens: {
              HomeScreen: "home",
            },
          },
          SavedTab: {
            screens: {
              SavedScreen: "saved",
            },
          },
          ChatTab: {
            screens: {
              ChatScreen: "chat",
            },
          },
          ProfileTab: {
            screens: {
              ProfileScreen: "profile",
            },
          },
        },
      },
      Modal: "modal",
      NotFound: "*",
      ProductHome: "product/:id",
      ChatWindow: "ChatWindow",
      NewPostImage: "NewPostImage",
      NewPostDetail: "NewPostDetail",
      NewRequest: "NewRequest",
      ProfileOnboard: {
        screens: {
          Onboard: "Onboard",
          Venmo: "Venmo",
        },
      }, // allow product details to be opened with a link specifying the product id
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data)
      if (typeof url === 'string') {
        listener(url)
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};

export default linking;
