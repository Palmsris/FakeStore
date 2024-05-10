import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";

import SplashScreen from './components/screen/SplashScreen';
import CategoryScreen from './components/screen/CategoryScreen';
import ProductListScreen from './components/screen/ProductListScreen';
import ProductDetailScreen from './components/screen/ProductDetailScreen';


const Stack = createStackNavigator();

// export default function App() {
//   const [isSplashVisible, setIsSplashVisible] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsSplashVisible(false);
//     }, 2000);
//   }, []);

//   return (
//     <NavigationContainer>
//       { isSplashVisible ? (
//         <SplashScreen />
//       ) : (
        
//       )}
//     </NavigationContainer>
//   );
// }

function HomeScreen() {
  return (
    // <Stack.Navigator screenOptions={{ headerShown: false}}>
    <Stack.Navigator>
          <Stack.Screen name="Categories" component={CategoryScreen} />
          <Stack.Screen name="Products" component={ProductListScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        </Stack.Navigator>
  );
}

function CartScreen() {
  return (
    <View style={styles.container}>
      <Text>Cart Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
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
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
