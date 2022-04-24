import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Platform, Image } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import BackButton from '../assets/svg-components/back_button';
import { menuBarTop } from '../constants/Layout';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';

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
    fontFamily: 'Rubik-Medium',
    fontSize: 18,
  },
  headerButton: {
    position: 'absolute',
    top: menuBarTop,
    right: 20,
  },
  buttonText: {
    color: '#9E70F6',
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
  },
  feedbackInstructions: {
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    marginTop: menuBarTop + 50,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  feedbackText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    height: 190,
    padding: 10,
  },
  sectionTitle: {
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 20,
  },
  addImageButton:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  chosenImage:{
    width: 300,
    height: 200,
    borderRadius: 20,
  },
  imageUploadWrapper: {
    paddingTop: 10,
    alignItems: 'center',
  }
});

export default function NotificationPreferencesScreen({navigation}) {
  const [image, setImage] = useState(null);

  const [valueTitle, onTitleChange] = React.useState('');
  const [valuePrice, onPriceChange] = React.useState('');
  const [valueDesc, onDescChange] = React.useState('');
  const [selectImage, setSelectImage] = React.useState(false);
  const [valueTag, onTagChange] = React.useState('');

  useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [5, 2],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setSelectImage(true);
    }
  };

  return (
      <View style={styles.container}>
          <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
          >
              <BackButton color="black" />
          </TouchableOpacity>
          <View style={styles.title}>
              <Text style={styles.titleText}>Send Feedback</Text>
          </View>
          <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerButton}
          >
              <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <Text style={styles.feedbackInstructions}>
              Thanks for using Resell! We appreciate any feedback to improve
              your experience.
          </Text>
          <TextInput multiline={true} style={styles.feedbackText} />
          <Text style={styles.sectionTitle}>Image Upload</Text>
          <View style={styles.imageUploadWrapper}>
            {!selectImage && (
              <IconButton
                  style={styles.addImageButton}
                  icon="plus"
                  color={Colors.black}
                  animated={true}
                  size={30}
                  onPress={pickImage}
              />)}
              {selectImage && (
                  <TouchableOpacity
                    onPress={pickImage}>
                      <Image
                          style={styles.chosenImage}
                          source={{ uri: image }}
                      />
                  </TouchableOpacity>
              )}
          </View>
      </View>
  );
}
