import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConversationsPage from './Pages/ConversationsPage';
import SettingsPage from './Pages/SettingsPage';
import FriendsPage from './Pages/FriendsPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import store from './store/store';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer style={styles.container}>
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Conversations') {
                iconName = 'ios-list';
              } else if (route.name === 'Settings') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else {
                iconName = 'people-circle-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            showLabel: false,
          })}>
            <Tab.Screen name="Conversations" component={ConversationsPage} />
            <Tab.Screen name="Friends" component={FriendsPage} />
            <Tab.Screen name="Settings" component={SettingsPage} />
          </ Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView >
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#336",
  },
  tabItem: {
    backgroundColor: "#F00"
  }
});
