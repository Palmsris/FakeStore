import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Provider, useDispatch, useSelector } from "react-redux";

import { store } from "./components/slice/store";
import { loadUser, loginUser } from "./components/slice/userSlice";

import SplashScreen from "./components/screen/SplashScreen";
import CategoryScreen from "./components/screen/CategoryScreen";
import ProductListScreen from "./components/screen/ProductListScreen";
import ProductDetailScreen from "./components/screen/ProductDetailScreen";
import CartScreen from "./components/screen/CartScreen";
import OrdersScreen from "./components/screen/OrdersScreen";
import ProfileScreen from "./components/screen/ProfileScreen";
import UpdateScreen from "./components/screen/UpdateScreen";
import SigninScreen from "./components/screen/SigninScreen";
import SignupScreen from "./components/screen/SignupScreen";

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SigninScreen" component={SigninScreen} />
      <Stack.Screen name="Categories" component={CategoryScreen} />
      <Stack.Screen name="Products" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="UpdateScreen" component={UpdateScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  const cartCount = useSelector((state) => state.cart.totalItems);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const navigation = useNavigation();

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
                {cartCount > 0 ? (
                  <View style={styles.counter}>
                    <Text style={{ color: "white", fontSize: 10 }}>
                      {cartCount}
                    </Text>
                  </View>
                ) : null}
              </View>
            );
          } else if (route.name === "My Orders") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "User Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={"#8C8069"} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="My Orders" component={OrdersScreen} />
      {/* <Tab.Screen name="User Profile" component={UserProfileStack} /> */}
      {token ? (
        <Tab.Screen name="User Profile" component={ProfileScreen} />
      ) : (
        <Tab.Screen name="User Profile" component={SigninScreen} />
      )}
    </Tab.Navigator>
  );
}

function MainApp() {
  const dispatch = useDispatch();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 1000);
  }, [dispatch]);

  return (
    <NavigationContainer>
      {isSplashVisible ? <SplashScreen /> : <MyTabs />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  counter: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 15,
    height: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
