import * as React from 'react';
import { StyleSheet, Text, View, Image, Platform, TextInput, ScrollView } from 'react-native';
import PostHeader from '../components/PostHeader';
import { IconButton, Colors } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';


export default function PostScreen({ navigation }) {
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
      <View>
        <Appbar.Header style={styles.header}>
            <Appbar.Action icon="close" onPress={() => navigation.goBack()} />
            <Text>New Listing</Text>
            <Appbar.Action icon="pencil-plus" onPress={() => {}} />
        </Appbar.Header>
        <ScrollView> 
          <View style={styles.container}>
              <Text style={styles.titleText}>Photos</Text>
              <IconButton
              style={styles.addImageButton}
              icon="plus"
              color={Colors.black}
              animated= {true}
              size={30}
              onPress={pickImage}
          />
              
              {selectImage && <Image style={styles.chosenImage} source={{uri: image}}/>}

              <View style={styles.innerInputContainer}>
                <Text style={styles.titleText}>Title</Text>
                <View style={styles.editTextUnderline}>
                <TextInput
                    placeholderTextColor="#E1E1E1"
                    maxLength={30}
                    style={{ 
                    height: 30,               
                  }}
                    onChangeText={text => onTitleChange(text)}
                    value={valueTitle}
                  placeholder="enter a product name ... "
                  />
                </View>
              </View>

              <View style={styles.innerInputContainer}>
                <Text style={styles.titleText}>Pricing</Text>
                <View style={styles.editTextUnderline}>
                <TextInput
                    placeholderTextColor="#E1E1E1"
                    maxLength={30}
                    style={{ 
                    height: 30,               
                  }}
                    onChangeText={text => onPriceChange(text)}
                    value={valuePrice}
                  placeholder="enter a price ... "
                  />
                </View>
              </View>

              <View style={styles.innerInputContainer}>
                <Text style={styles.titleText}>Item Description</Text>
                <View style={styles.editTextBox}>
                <TextInput
                    placeholderTextColor="#E1E1E1"
                    style={{ 
                    height: '100%',               
                  }}
                    onChangeText={text => onDescChange(text)}
                    value={valueDesc}
                  placeholder="enter a description ... "
                  />
                </View>
              </View>

              {/* Tag outside because it needs to be center aligned */}
              <Text style={styles.titleText}>Tags</Text>
              <View style={styles.innerInputContainer}>
                <View style={styles.editTextUnderline}>
                <TextInput
                    placeholderTextColor="#E1E1E1"
                    maxLength={30}
                    style={{ 
                    height: 30,               
                  }}
                    onChangeText={text => onTagChange(text)}
                    value={valueTag}
                  placeholder="enter tags ... "
                  />
                </View>
              </View>

              <View style={styles.previewButton}>
                  <Text style={styles.previewButtonText}>Preview Listing</Text>
              </View>
          </View> 
        </ScrollView>    
      </View>
        
    );
}



const styles = StyleSheet.create({
    header: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'white',
    },
    
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    
    previewButton: {
      marginTop:'15%',
      width: '50%',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#ECECEC',
      padding: '3%',
      borderRadius: 25,
    },
    previewButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
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

    titleText: {
      fontSize: 17,
      fontWeight: 'bold',
      marginTop: '10%',
    },

    editTextUnderline:{
        borderBottomColor: '#E1E1E1',
        width: '100%',
        borderBottomWidth: 1,
        color: '#E1E1E1'
    },
    editTextBox:{
      marginTop:'5%',
      borderColor: '#E1E1E1',
      width: '100%',
      borderWidth: 1,
      borderRadius: 20,
      height: 150,
      color: '#E1E1E1'
  },

    innerInputContainer:{
      width:'80%',
      display:'flex',
      flexDirection:'column',
      alignItems: 'flex-start'
      
    },
  });