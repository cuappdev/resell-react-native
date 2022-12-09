/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign, Feather } from "@expo/vector-icons";
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
  Platform,
  NativeModules,
  StatusBar,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

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
  OnboardStackParamList,
  ChatStackParamList,
} from "./types";
import LinkingConfiguration from "./LinkingConfiguration";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import Home from "../assets/svg-components/home";
import ClickedHome from "../assets/svg-components/home_clicked";
import BookMark from "../assets/svg-components/bookmark";
import ClickedBookMark from "../assets/svg-components/bookmark_clicked";
import ClickedChat from "../assets/svg-components/clicked_chat";
import Chat from "../assets/svg-components/chat";
import ClickedProfile from "../assets/svg-components/clicked_profile";
import Profile from "../assets/svg-components/profile";
const { StatusBarManager } = NativeModules;

import { bottomTabsHeight } from "../constants/Layout";

import LinkVenmoScreen from "../screens/LinkVenmoScreen";
import OnBoardScreen from "../screens/OnBoardScreen";
import ChatWindow from "../screens/ChatWindow";
import { NewPostImage } from "../screens/NewPostImage";
import { NewPostDetail } from "../screens/NewPostDetail";
import EditProfileScreen from "../screens/EditProfileScreen";
import Venmo from "../assets/svg-components/venmo";
import { useSelector } from "react-redux";
import RequestMatches from "../screens/RequestMatches";
import { fonts } from "../globalStyle/globalFont";
import { NewRequestScreen } from "../screens/NewRequest";

export default function Navigation({
  colorScheme,
  onboard,
}: {
  colorScheme: ColorSchemeName;
  onboard: boolean;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator onboard={onboard} />
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

const ChatStack = createNativeStackNavigator<ChatStackParamList>();

const SavedStack = createNativeStackNavigator<SavedStackParamList>();

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const OnboardStack = createNativeStackNavigator<OnboardStackParamList>();
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;
StatusBar.setHidden(false);
StatusBar.setBarStyle("dark-content");
if (Platform.OS === "android") {
  StatusBar.setTranslucent(false);
  StatusBar.setBackgroundColor("#ffffff");
}
function RootNavigator({ onboard }) {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
      initialRouteName="ProfileOnboard"
    >
      {!onboard && (
        <Stack.Screen
          name="ProfileOnboard"
          component={OnboardNavigator}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Group>
        <Stack.Screen
          name="NewPostImage"
          options={({ navigation }) => ({
            headerShadowVisible: false,
            headerStyle: styles.headerNoShadow,
            headerBackVisible: false,
            headerTitleAlign: "center",
            header: () => {
              return (
                <View
                  style={{
                    height: 70,
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: Platform.OS === "ios" ? 35 : 0,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={pressedOpacity}
                    style={{
                      position: "absolute",
                      right: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      height: 50,
                      width: 50,
                    }}
                    onPress={() => navigation.goBack()}
                  >
                    <AntDesign
                      name="close"
                      size={24}
                      color="black"
                      style={{ marginStart: 18 }}
                    />
                  </TouchableOpacity>
                  <Text style={fonts.pageHeading3}>New Listing</Text>
                </View>
              );
            },
          })}
          component={NewPostImage}
        />
        <Stack.Screen
          name="NewPostDetail"
          options={({ navigation }) => ({
            headerShadowVisible: false,
            headerStyle: styles.headerNoShadow,
            headerBackVisible: false,
            headerTitleAlign: "center",
            header: () => {
              return (
                <View
                  style={{
                    height: 70,
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: Platform.OS === "ios" ? 35 : 0,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={pressedOpacity}
                    style={{
                      position: "absolute",
                      left: 24,
                      alignItems: "center",
                      justifyContent: "center",
                      width: 50,
                      height: 50,
                    }}
                    onPress={() => navigation.goBack()}
                  >
                    <AntDesign name="left" size={24} color="black" />
                  </TouchableOpacity>
                  <Text style={fonts.pageHeading3}>New Listing</Text>
                  <TouchableOpacity
                    activeOpacity={pressedOpacity}
                    style={{
                      position: "absolute",
                      right: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      width: 50,
                      height: 50,
                    }}
                    onPress={() => navigation.navigate("Root")}
                  >
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              );
            },
          })}
          component={NewPostDetail}
        />

        <Stack.Screen
          name="NewRequest"
          options={({ navigation }) => ({
            headerShadowVisible: false,
            headerStyle: styles.headerNoShadow,
            headerBackVisible: false,
            headerTitleAlign: "center",
            header: () => {
              return (
                <View
                  style={{
                    height: 70,
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: Platform.OS === "ios" ? 35 : 0,
                  }}
                >
                  <Text style={fonts.pageHeading3}>Request Details</Text>
                  <TouchableOpacity
                    activeOpacity={pressedOpacity}
                    style={{
                      position: "absolute",
                      right: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      width: 50,
                      height: 50,
                    }}
                    onPress={() => navigation.navigate("Root")}
                  >
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              );
            },
          })}
          component={NewRequestScreen}
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
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "card" }}>
        <Stack.Screen
          name="ChatWindow"
          options={{
            headerShown: false,
            headerTitle: "",
            headerTransparent: true,
          }}
          component={ChatWindow}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function HomeNavigator({ route, navigation }) {
  var showPanel = false;
  if (route.params !== undefined) {
    showPanel = route.params.showPanel;
  }

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ showPanel: showPanel }}
      />

      <HomeStack.Screen
        name="SearchHome"
        component={SearchScreen}
        options={{
          headerShown: false,
          headerTitle: "",
          headerTransparent: true,
        }}
      />
    </HomeStack.Navigator>
  );
}
function ChatNavigator({ navigation }) {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ChatStack.Screen name="Chat" component={ChatScreen} />
    </ChatStack.Navigator>
  );
}

function ProfileNavigator({ navigation }) {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <ProfileStack.Screen
        options={{
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        name="RequestMatches"
        options={({ navigation, route }) => ({
          headerShadowVisible: false,
          headerStyle: styles.headerNoShadow,
          headerBackVisible: false,
          headerTitleAlign: "center",

          header: () => {
            return (
              <View
                style={{
                  height: 70,
                  backgroundColor: "#ffffff",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: Platform.OS === "ios" ? 35 : 0,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 24,
                    marginBottom: 24,
                  }}
                >
                  <Text
                    style={[
                      fonts.pageHeading2,
                      { width: 170, height: 52, marginTop: 8 },
                    ]}
                  >
                    {(route.params as any).title + " Request Matches"}
                  </Text>

                  <TouchableOpacity
                    style={{
                      width: 50,
                      alignItems: "center",
                      height: 50,
                      justifyContent: "center",
                    }}
                    onPress={() => navigation.goBack()}
                  >
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
        })}
        component={RequestMatches}
      />

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
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          headerShown: false,
        }}
        component={EditProfileScreen}
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

function OnboardNavigator({ navigation }) {
  return (
    <OnboardStack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <OnboardStack.Screen
        name="Onboard"
        component={OnBoardScreen}
        options={{
          headerShadowVisible: false,
          headerStyle: styles.headerNoShadow,
          headerBackVisible: false,
          headerTitleAlign: "center",
          header: () => {
            return (
              <View
                style={{
                  height: 70,
                  backgroundColor: "#ffffff",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: Platform.OS === "ios" ? 35 : 0,
                }}
              >
                <Text style={fonts.pageHeading3}>Set up your profile</Text>
              </View>
            );
          },
        }}
      />
      <OnboardStack.Screen
        name="Venmo"
        component={LinkVenmoScreen}
        options={{
          headerShadowVisible: false,
          headerStyle: styles.headerNoShadow,
          headerBackVisible: false,
          headerTitleAlign: "center",
          header: () => {
            return (
              <View
                style={{
                  height: 70,
                  backgroundColor: "#ffffff",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: Platform.OS === "ios" ? 35 : 0,
                }}
              >
                <TouchableOpacity
                  activeOpacity={pressedOpacity}
                  style={{
                    position: "absolute",
                    left: 24,
                    alignItems: "center",
                    justifyContent: "center",
                    width: 50,
                    height: 50,
                  }}
                  onPress={() => navigation.goBack()}
                >
                  <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={fonts.pageHeading3}>Link your </Text>

                  <Venmo style={{ marginTop: 3 }} />
                </View>
              </View>
            );
          },
        }}
      />
    </OnboardStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export function BottomTabNavigator({ route }) {
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
          headerLeft: () => (
            <Text
              style={[
                fonts.pageHeading1,
                { marginStart: 24, marginTop: 8, marginEnd: -24 },
              ]}
            >
              Saved
            </Text>
          ),
        })}
      />
      <BottomTab.Screen
        name="ChatTab"
        component={ChatNavigator}
        options={({ navigation }: RootTabScreenProps<"ChatTab">) => ({
          headerStyle: styles.headerNoShadow,
          tabBarShowLabel: false,
          title: "",

          headerLeft: () => (
            <Text
              style={[
                fonts.pageHeading1,
                { marginStart: 24, marginTop: 8, marginEnd: -24 },
              ]}
            >
              Messages
            </Text>
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
    height: Platform.OS === "ios" ? bottomTabsHeight : bottomTabsHeight - 20,
    borderTopWidth: 0,
    shadowColor: "gray",
    shadowRadius: 10,
    backgroundColor: "#ffffff",
    shadowOpacity: 0.3,
    elevation: 10, // android
  },
  headerNoShadow: {
    shadowColor: "transparent",
    backgroundColor: "#FFFFFF",
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0,
  },
  noHeader: {
    height: 0,
  },
});
export function HeaderIcon(props: {
  name: React.ComponentProps<typeof Feather>["name"];
  color: string;
  size: number;
}) {
  return <Feather {...props} />;
}
