// Style imports
import * as React from 'react';
import { Feather } from '@expo/vector-icons';
import { pressedOpacity } from '../constants/Values';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';

// State imports
import { setBio, setName } from '../state_manage/actions/actions';
import { RootState } from '../state_manage/reducers';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch()

  const changeName = (name: string) => dispatch(setName(name))
  const changeBio = (bio: string) => dispatch(setBio(bio))

  const name = useSelector((state: RootState) => {
    return state.profile.name
  })

  const bio = useSelector((state: RootState) => {
    return state.profile.bio
  })

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <TouchableOpacity activeOpacity={pressedOpacity}>
          <ProfileScreenIcon name="search" color="black" size={24} />
        </TouchableOpacity>
        <View style={styles.profileTextContainer}>
          <View style={styles.profileBubble} />
        </View>
        <TouchableOpacity activeOpacity={pressedOpacity}>
          <ProfileScreenIcon name="settings" color="black" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileTextContainer}>
        <Text style={styles.profileNameText}>{name}</Text>
        <Text style={styles.profileBioText}>{bio}</Text>
      </View>
      <TouchableOpacity style={styles.plusButton} onPress={() => navigation.navigate('NewPost')}>
        <ProfileScreenIcon name="plus" color="black" size={36} />
      </TouchableOpacity>
    </View>
  );
}

function ProfileScreenIcon(props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
  size: number;
}) {
  return <Feather size={props.size} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 18
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
  }
});
