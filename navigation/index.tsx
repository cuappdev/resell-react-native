/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable, View } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { LinearGradient } from "expo-linear-gradient";
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
      initialRouteName="TabOne"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "TabOne") {
            return focused ? <ClickedHome /> : <Home />;
          }
          if (route.name === "TabTwo") {
            return focused ? <ClickedBookMark /> : <BookMark />;
          }
          if (route.name === "TabThree") {
            return focused ? <ClickedChat /> : <Chat />;
          }
          if (route.name === "TabFour") {
            return focused ? <ClickedProfile /> : <Profile />;
          }
        },
        tabBarIconStyle: { justifyContent: "center" },
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          position: "absolute",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          height: 85,
          borderTopWidth: 0,
        },
      })}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          // tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerStatusBarHeight: 60,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: "#F9F9F9",
          },
          headerLeft: () => (
            <Header style={{ marginLeft: 26, marginBottom: 12 }} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            ></Pressable>
          ),
          title: "",
          tabBarShowLabel: false,
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "",
          tabBarShowLabel: false,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabTwoScreen}
        options={{
          tabBarShowLabel: false,
          title: "",
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={TabTwoScreen}
        options={{
          tabBarShowLabel: false,
          title: "",
        }}
      />
    </BottomTab.Navigator>
  );
}
