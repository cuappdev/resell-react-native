import * as React from 'react';
import Icon from '../assets/svg-icons/settings.svg';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.upperContainer}>
            <View style={styles.profileBubbleContainer}>
              <View style={styles.profileBubble} />
            </View>
            <View style={styles.profileTextContainer}>
                <Text style={styles.profileNameText}>ravina</Text>
                <Text style={styles.profileBioText}>selling cool stuff!</Text>
            </View>
            <View>
                <Icon width={26} height={26} />
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 18,
    paddingHorizontal: 24
  },
  upperContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  profileBubbleContainer: {
    flexGrow: 1
  },
  profileBubble: {
    width: 89,
    height: 89,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
  },
  profileTextContainer: {
    flexGrow: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  profileNameText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 23,
    paddingBottom: 5
  },
  profileBioText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 17
  }
});
