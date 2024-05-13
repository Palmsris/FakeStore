import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import { Provider, useSelector } from 'react-redux';
import { store } from './components/slice/store';

import SplashScreen from './components/screen/SplashScreen';
import CategoryScreen from './components/screen/CategoryScreen';
import ProductListScreen from './components/screen/ProductListScreen';
import ProductDetailScreen from './components/screen/ProductDetailScreen';
import CartScreen from './components/screen/CartScreen';

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator>
          <Stack.Screen name="Categories" component={CategoryScreen} />
          <Stack.Screen name="Products" component={ProductListScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  const cartCount = useSelector((state) => state.cart.totalItems);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";

          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
            return (
              <View>
                <Ionicons name={iconName} size={size} color={"#8C8069"} />
              {cartCount > 0 ? 
                <View style={styles.counter}>
                  <Text style={{ color: "white", fontSize: 10 }}>{cartCount}</Text>
                </View>
                :
                null
          }
              </View>        
            );

          }
          return <Ionicons name={iconName} size={size} color={"#8C8069"} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
      { isSplashVisible ? (
        <SplashScreen />
      ) : (
        <MyTabs />
      )}
      </NavigationContainer>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    width: 15,
    height: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
