/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  NewPost: undefined;
  ProductHome: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  SearchHome: undefined;
};

export type SavedStackParamList = {
  Saved: undefined;
  ProductSaved: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  ProductProfile: undefined;
  Settings: undefined;
  NotificationPreferences: undefined;
<<<<<<< HEAD
  SendFeedback: undefined;
}
=======
};
>>>>>>> ce408512b41f98c113927c1fa103523356cecd32

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  HomeTab: undefined;
  SavedTab: undefined;
  ChatTab: undefined;
  ProfileTab: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
