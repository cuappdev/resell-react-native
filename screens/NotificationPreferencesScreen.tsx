import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Switch } from 'react-native';
import BackButton from '../assets/svg-components/back_button';
import { menuBarTop } from '../constants/Layout';

import { setPauseAllNotifications, setChatNotifications, setNewListings } from '../state_manage/actions/settingsScreenActions';
import { useDispatch, useSelector } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: menuBarTop,
    left: 20,
    zIndex: 1,
    width: 20,
    height: 30,
  },
  title: {
    position: 'absolute',
    top: menuBarTop,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
  },
  item: {
    marginTop: 40,
    marginLeft: 48,
    marginRight: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    marginLeft: 0,
  },
  itemSwitch: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  list: {
    marginTop: menuBarTop + 30,
  }
});

export default function NotificationPreferencesScreen({navigation}) {
  const dispatch = useDispatch();

  const setIsAllNotificationsPaused = (pauseAllNotifications: boolean) => dispatch(setPauseAllNotifications(pauseAllNotifications));

  const setIsChatNotificationsOn = (chatNotifications: boolean) => dispatch(setChatNotifications(chatNotifications));

  const setIsNewListingsOn = (newListings: boolean) => dispatch(setNewListings(newListings));

  const isAllNotificationsPaused = useSelector((state: any) => {
    return state.settings.pauseAllNotifications;
  });

  const isChatNotificationsOn = useSelector((state: any) => {
    return state.settings.chatNotifications;
  });

  const isNewListingsOn = useSelector((state: any) => {
    return state.settings.newListings;
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <BackButton color="black"/>
      </TouchableOpacity>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          Notification Preferences
        </Text>
      </View>
      <FlatList
        scrollEnabled={false}
        style={styles.list}
        data={[
          {text: 'Pause All Notifications', state: isAllNotificationsPaused, setState: (value) => setIsAllNotificationsPaused(value)},
          {text: 'Chat Notifications', state: isChatNotificationsOn, setState: (value) => setIsChatNotificationsOn(value)},
          {text: 'New Listings', state: isNewListingsOn, setState: (value) => setIsNewListingsOn(value)},
        ]}
        renderItem={({item}) => 
          <TouchableOpacity
            onPress={() => {}}
            style={styles.item}
          >
            <Text style={styles.itemText}>{item.text}</Text>
            <Switch
              trackColor={{ false: "#FFFFFF", true: "#9E70F6" }}
              thumbColor={item.state ? "#FFFFFF" : "#BEBEBE"}
              ios_backgroundColor="#FFFFFF"
              onValueChange={(value) => item.setState(value)}
              value={item.state}
              style={styles.itemSwitch}
            />
          </TouchableOpacity> 
      }
      />
    </View>
  )
}
