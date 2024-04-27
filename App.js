import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useState, useEffect } from 'react';

import SplashScreen from './components/screen/SplashScreen';
import CategoryScreen from './components/screen/CategoryScreen';
import ProductListScreen from './components/screen/ProductListScreen';
import ProductDetailScreen from './components/screen/ProductDetailScreen';


const Stack = createStackNavigator();

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      { isSplashVisible ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Categories" component={CategoryScreen} />
          <Stack.Screen name="Products" component={ProductListScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
