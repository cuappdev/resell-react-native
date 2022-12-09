/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "./types";

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
};

export default linking;
