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
  NewPostImage: undefined;
  NewPostDetail: undefined;
  NewRequest: undefined;
  ProductHome: undefined;
  ProfileOnboard: NavigatorScreenParams<OnboardStackParamList> | undefined;
  ChatWindow: undefined;
};
export type HomeStackParamList = {
  Home: { showPanel: boolean };
  SearchHome: undefined;
};

export type SavedStackParamList = {
  Saved: undefined;
  ProductSaved: undefined;
};
export type ChatStackParamList = {
  Chat: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  ProductProfile: undefined;
  Settings: undefined;
  NotificationPreferences: undefined;
  RequestMatches: undefined;
  SendFeedback: undefined;
  EditProfile: undefined;
};

export type OnboardStackParamList = {
  Onboard: undefined;
  Venmo: undefined;
};

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
