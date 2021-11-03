import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function SignIn() {
    return (
        <View style={styles.container}>
            <Image width={200} height={200} source={require('../assets/images/signinlogo.png')}/>
            <View style={styles.signInButton}>
                <Text style={styles.signInText}>Sign in with Google</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20% 0% 0% 0%'
    },

    signInButton: {
        width: 230,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ECECEC',
        padding: '5%',
        borderRadius: 25,
        marginTop: 100
    },

    signInText: {
        fontSize: 22,
    }
  });
  