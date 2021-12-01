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
          console.log('Google SignIn', 'FAILURE', result);
        }
      })
  

}

export default function SignIn() {
    return (
      <View style={styles.container}>
        <Image style={styles.gradient0} width={'100%'} height={'70%'} source={require('../assets/images/signinbackgroundhue.png')} />
        <View style={styles.innerContainer}>
            <Image width={100} height={100} source={require('../assets/images/signinlogoblurry.png')}/>
            <View style={styles.signInButton}>
                <Text onPress={handleGoogleSignIn} style={styles.signInText}>Sign in with Google</Text>
            </View>
            
        </View>
        
      </View>

        
    );
}


const styles = StyleSheet.create({
    container:{
      position: 'relative',
      height: '100%',
      width: '100%'
    },

    innerContainer: {
        marginTop: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    signInButton: {
        width: 230,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: '3%',
        borderRadius: 25,
        marginTop:'80%',
        shadowOffset:{  width: 3,  height: 3,  },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
  },

    signInText: {
        fontSize: 19,
        fontWeight: 'bold',
    },

    gradient0:{
        position:'absolute',
        bottom: '-10%',
        left: 0,
    }
  });
  