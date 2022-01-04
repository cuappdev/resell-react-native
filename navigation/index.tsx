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
import HomeScreen from "../screens/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import PostScreen from "../screens/PostScreen";
import Home from "../assets/svg-components/home";
import Header from "../assets/svg-components/header";
import ClickedHome from "../assets/svg-components/home_clicked";
import BookMark from "../assets/svg-components/bookmark";
import ClickedBookMark from "../assets/svg-components/bookmark_clicked";
import ClickedChat from "../assets/svg-components/clicked_chat";
import Chat from "../assets/svg-components/chat";
import ClickedProfile from "../assets/svg-components/clicked_profile";
import Profile from "../assets/svg-components/profile";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
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
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="NewPost" component={PostScreen} />
      </Stack.Group>
    </Stack.Navigator>
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
      })}
    >
      <BottomTab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"HomeTab">) => ({
          headerStyle: styles.headerNoShadow,
          headerLeft: () => (
            <Header style={{ marginLeft: 26, marginBottom: 12 }} />
          ),
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={pressedOpacity}
              style={{ marginRight: 20 }}
            >
              <HeaderIcon name="search" color="black" size={24} />
            </TouchableOpacity>
          ),
          title: "",
          tabBarShowLabel: false,
        })}
      />
      <BottomTab.Screen
        name="SavedTab"
        component={SavedScreen}
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
        component={ProfileScreen}
        options={({ navigation }: RootTabScreenProps<"ProfileTab">) => ({
          tabBarShowLabel: false,
          title: "",
          headerShown: false,
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
    height: 85,
    borderTopWidth: 0,
  },
  headerNoShadow: {
    shadowColor: "transparent",
    backgroundColor: "#F9F9F9",
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
function HeaderIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
  size: number;
}) {
  return <Feather size={props.size} {...props} />;
}
