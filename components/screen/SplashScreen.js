import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/splashscreen.png')}
                style={styles.image}
            />
        </View>
    );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2DCC9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 395, 
    height: 900,
  },
});


