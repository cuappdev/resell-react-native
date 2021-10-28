import * as React from 'react';
import PlusIcon from '../assets/svg-icons/plus-circle.svg';
import SettingsIcon from '../assets/svg-icons/settings.svg';
import SearchIcon from '../assets/svg-icons/search.svg';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

/* Constants for in TSX inherited properties */
const pressedOpacity = 0.3;

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.upperContainer}>
            <TouchableOpacity activeOpacity={pressedOpacity}>
              <SettingsIcon />
            </TouchableOpacity>
            <View style={styles.profileTextContainer}>
                <View style={styles.profileBubble} />
            </View>
            <TouchableOpacity activeOpacity={pressedOpacity}>
              <SearchIcon />
            </TouchableOpacity>
        </View>
        <View style={styles.profileTextContainer}>
            <Text style={styles.profileNameText}>Sergio Pablo Diaz</Text>
            <Text style={styles.profileBioText}>Junior in the college of engineering. Selling meth, pot, and crack cocaine. This some more sample text to see whether or not the padding disappears.</Text>
        </View>
        <TouchableOpacity style={styles.plusButton}>
          <PlusIcon width={36} height={36} />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 18,
    paddingHorizontal: 18
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  profileNameText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    paddingTop: 12,
    paddingBottom: 9
  },
  profileBioText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    maxWidth: '93%',
    textAlign: 'center'
  },
  smallIcon: {
    height: 24,
    width: 24
  },
  plusButton: {
    position: 'absolute',
    right: 24,
    bottom: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.4
  },
  plusIcon: {
    height: 36,
    width: 36
  }
});
