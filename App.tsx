import React from 'react';
import SignIn from "./screens/SignIn";
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Font from "expo-font";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import * as Google from 'expo-google-app-auth';

export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [signedIn, setSignIn] = useState(false);

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
            setSignIn(true);           
          }else{
            console.log('Google SignIn', 'FAILURE', result);
          }
        })  
  }

  Font.loadAsync({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-BlackItalic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-BoldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-LightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-MediumItalic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Roboto-ThinItalic": require("./assets/fonts/Roboto-ThinItalic.ttf")
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
       {!signedIn && 
       <View style={styles.containerSignIn}>
          <Image style={styles.gradient0} width={'100%'} height={'70%'} source={require('./assets/images/signinbackgroundhue.png')} />
          <View style={styles.innerContainer}>
              <Image width={100} height={100} source={require('./assets/images/signinlogoblurry.png')}/>
              <View style={styles.signInButton}>
                  <Text onPress={handleGoogleSignIn} style={styles.signInText}>Sign in with Google</Text>
              </View>
              
          </View>
          
        </View>
        }
       {signedIn && 
            <Navigation colorScheme={colorScheme} />
      }
      </SafeAreaProvider>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerSignIn:{
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