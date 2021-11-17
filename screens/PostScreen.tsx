import * as React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import PostHeader from '../components/PostHeader';
import { IconButton, Colors } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';


export default function PostScreen() {
    const [image, setImage] = useState(null);

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
        }
      };
      
    return (
        <View>
            <PostHeader/>
            <View style={styles.container}>
                <IconButton
                style={styles.addImageButton}
                icon="plus"
                color={Colors.black}
                animated= {true}
                size={30}
                onPress={pickImage}
            />
            </View>
            

        </View>
        
    );
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    addImageButton:{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    }
  });
  