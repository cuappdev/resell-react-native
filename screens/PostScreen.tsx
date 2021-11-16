import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PostHeader from '../components/PostHeader';


export default function PostScreen() {
    return (
        <View>
            <PostHeader/>
            <View style={styles.container}>
                <Text>Hello World</Text>
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

    signInButton: {
        width: 230,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ECECEC',
        padding: '3%',
        borderRadius: 25,
        marginTop: 100
    },

    signInText: {
        fontSize: 22,
    }
  });
  