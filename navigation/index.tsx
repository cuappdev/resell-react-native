/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { pressedOpacity } from "../constants/Values";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  StyleSheet,
  ColorSchemeName,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import NotificationPreferencesScreen from "../screens/NotificationPreferencesScreen";
import HomeScreen from "../screens/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SendFeedbackScreen from "../screens/SendFeedbackScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SearchScreen from "../screens/SearchScreen";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  HomeStackParamList,
  SavedStackParamList,
  ProfileStackParamList,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import PostScreen from "../screens/PostScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import Home from "../assets/svg-components/home";
import ClickedHome from "../assets/svg-components/home_clicked";
import BookMark from "../assets/svg-components/bookmark";
import ClickedBookMark from "../assets/svg-components/bookmark_clicked";
import ClickedChat from "../assets/svg-components/clicked_chat";
import Chat from "../assets/svg-components/chat";
import ClickedProfile from "../assets/svg-components/clicked_profile";
import Profile from "../assets/svg-components/profile";

import { bottomTabsHeight } from "../constants/Layout";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * A stack navigator for handling all screens displayed under home tab.
 */

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const SavedStack = createNativeStackNavigator<SavedStackParamList>();

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
          name="ProductHome"
          component={ProductDetailsScreen}
          options={{
            headerShown: false,
            headerTitle: "",
            headerTransparent: true,
          }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="NewPost" component={PostScreen} />
        
      </Stack.Group>
    </Stack.Navigator>
  );
}

function HomeNavigator({ navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />

      <HomeStack.Screen
        name="SearchHome"
        component={SearchScreen}
        options={{
          headerShown: false,
          headerTitle: "",
          headerTransparent: true,
          animation: "none",
        }}
      />
    </HomeStack.Navigator>
  );
}

function ProfileNavigator({ navigation }) {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="NotificationPreferences"
        component={NotificationPreferencesScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="SendFeedback"
        component={SendFeedbackScreen}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
}

// TODO: Write Navigator for other tabs. E.g., complete the saved navigator so that clicking item on saved page will open it up on the same tab
function SavedNavigator() {
  return (
    <SavedStack.Navigator>
      <SavedStack.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          headerShown: false,
        }}
      />
    </SavedStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "HomeTab") {
            return focused ? <ClickedHome /> : <Home />;
          }
          if (route.name === "SavedTab") {
            return focused ? <ClickedBookMark /> : <BookMark />;
          }
          if (route.name === "ChatTab") {
            return focused ? <ClickedChat /> : <Chat />;
          }
          if (route.name === "ProfileTab") {
            return focused ? <ClickedProfile /> : <Profile />;
          }
        },

        tabBarIconStyle: { justifyContent: "center" },
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: styles.BottomTab,
        tabBarHideOnKeyboard: true,
      })}
    >
      <BottomTab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={({ navigation }: RootTabScreenProps<"HomeTab">) => ({
          headerStyle: styles.noHeader,
          headerShown: false,
          tabBarShowLabel: false,
        })}
      />
      <BottomTab.Screen
        name="SavedTab"
        component={SavedNavigator}
        options={({ navigation }: RootTabScreenProps<"SavedTab">) => ({
          title: "",
          tabBarShowLabel: false,
          headerStyle: styles.headerNoShadow,
          headerLeft: () => <Text style={styles.savedHeader}>Saved</Text>,
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={pressedOpacity}
              style={{ marginRight: 20 }}
            >
              <HeaderIcon name="search" color="black" size={24} />
            </TouchableOpacity>
          ),
        })}
      />
      <BottomTab.Screen
        name="ChatTab"
        component={ChatScreen}
        options={({ navigation }: RootTabScreenProps<"ChatTab">) => ({
          headerStyle: styles.headerNoShadow,
          tabBarShowLabel: false,
          title: "",
          headerTitle: () => (
            <View>
              <Text style={styles.chatHeader}>Blue Pants</Text>
              <Text style={styles.chatSubheader}>shop by lia</Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={pressedOpacity}
              style={{ marginRight: 20 }}
            >
              <Feather
                name="chevron-left"
                size={28}
                color="#B2B2B2"
                style={{ marginStart: 18 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <BottomTab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={({ navigation }: RootTabScreenProps<"ProfileTab">) => ({
          headerStyle: styles.noHeader,
          headerShown: false,
          tabBarShowLabel: false,
        })}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  BottomTab: {
    position: "absolute",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: bottomTabsHeight,
    borderTopWidth: 0,
    shadowOffset: { width: 0, height: -10 },
    shadowColor: "gray",
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 5, // android
  },
  headerNoShadow: {
    shadowColor: "transparent",
    backgroundColor: "#F9F9F9",
  },
  noHeader: {
    height: 0,
  },
  savedHeader: {
    fontFamily: "Rubik-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 32,
    lineHeight: 38,
    marginStart: 24,
    marginTop: 8,
  },
  chatHeader: {
    fontFamily: "Rubik-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 24,
    color: "#000000",
    textAlign: "center",
  },
  chatSubheader: {
    fontFamily: "Rubik-Medium",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    color: "#787878",
    textAlign: "center",
  },
});
export function HeaderIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
  size: number;
}) {
  return <Feather size={props.size} {...props} />;
}
