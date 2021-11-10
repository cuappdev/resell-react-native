import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Google from 'expo-google-app-auth';

const handleGoogleSignIn = () => {

  const config = {iosClientId: `947198045768-2kkjna68er930llq0qlikh6dceeoijkm.apps.googleusercontent.com`, 
                  androidClientId: `947198045768-rv46c5qro1ghplqmjsf7p6e3l3afhj0o.apps.googleusercontent.com`,
                  scopes: ['profile', 'email']
                };

  Google
      .logInAsync(config)
      .then((result) => {
        const {type} = result;

        if (type == 'success'){
          console.log('Google SignIn', 'SUCCESS', result);
          
        }else{
          console.log('Google SignIn', 'SUCCESS', result);
        }
      })
  

}

export default function SignIn() {
    return (
        <View style={styles.container}>
            <Image width={200} height={200} source={require('../assets/images/signinlogo.png')}/>
            <View style={styles.signInButton}>
                <Text onPress={handleGoogleSignIn} style={styles.signInText}>Sign in with Google</Text>
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
  