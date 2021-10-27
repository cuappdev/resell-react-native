import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Image from '../assets/svg-icons/settings.svg';

export default function SignIn() {
    return (
        <View style={styles.container}>
            <Image width={230} height={230}/>
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
  