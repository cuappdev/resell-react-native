import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PostHeader from '../components/PostHeader';
import { IconButton, Colors } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker'


export default function PostScreen() {

    return (
        <View>
            <PostHeader/>
            <View style={styles.container}>
                <Text>Hello World</Text>
            </View>
            <IconButton
                style={styles.addImageButton}
                icon="plus"
                color={Colors.black}
                animated= {true}
                size={30}
                onPress={() => console.log('hello')}
            />

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
  