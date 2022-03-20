import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import BackButton from '../assets/svg-components/back_button';
import { menuBarTop } from '../constants/Layout';
import Logout from '../assets/svg-components/logout';
import Edit from '../assets/svg-components/edit';
import Notifications from '../assets/svg-components/notifications';
import Feedback from '../assets/svg-components/feedback';
import { HeaderIcon } from '../navigation';
import { Feather } from '@expo/vector-icons';

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
    marginLeft: 20,
  },
  itemChevron: {
    marginLeft: 'auto',
    marginRight: 0,
  },
  list: {
    marginTop: menuBarTop + 30,
  }
});

export default function SettingsScreen({navigation}) {
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
          Settings
        </Text>
      </View>
      <FlatList
        scrollEnabled={false}
        style={styles.list}
        data={[
          {icon: Edit, text: 'Edit Profile'},
          {icon: Notifications, text: 'Notificaton Preferences', onPress: () => navigation.navigate('NotificationPreferences')},
          {icon: Feedback, text: 'Send Feedback', onPress: () => navigation.navigate('SendFeedback')},
          {icon: Logout, text: 'Log Out'},
        ]}
        renderItem={({item}) => 
          <TouchableOpacity
            onPress={item.onPress ? item.onPress : () => {}}
            style={styles.item}
          >
            <item.icon/>
            <Text style={styles.itemText}>{item.text}</Text>
            <Feather name="chevron-right" size={22} color="black" style={styles.itemChevron}/>
          </TouchableOpacity> 
      }
      />
    </View>
  )
}

