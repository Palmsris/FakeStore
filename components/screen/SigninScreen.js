import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slice/userSlice";
import { login } from "../slice/services/userService";
import { getCart } from "../slice/services/cartService";
import { fillCart } from "../slice/cartSlice";
import { getOrders } from "../slice/services/orderService";
import { fetchOrders } from "../slice/orderSlice";
import { fetchProducts } from "../slice/productSlice";
import { useIsFocused } from "@react-navigation/native";
import CategoryScreen from "./CategoryScreen";

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isFocused = useIsFocused();

  const handleSignIn = async () => {
    const credentials = { email, password };
    const data = await login(credentials);
    // navigate to categories

    if (data.status === "OK") {
      dispatch(loginUser(data));
    } else {
      alert("Invalid email or password");
    }
  };

  const restoreCart = async (token) => {
    const cart = await getCart(token);
    console.log(cart.items, "at restoreCart");

    dispatch(fillCart(cart.items));
    const orders = await getOrders(token);
    dispatch(fetchOrders(orders));
    dispatch(fetchProducts());
  };

  useEffect(() => {
    if (token) {
      // console.log("Token:", token);
      restoreCart(token);
    }
  }, [token]);

  if (token) {
    return <CategoryScreen navigation={navigation} />;
  }

  const handleClear = () => {
    setEmail("");
    setPassword("");
  };

  // console.log(cartItems, 'at SigninScreen')

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign in with email and password</Text>
        <Text style={styles.text}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.text}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.ControlButton}>
          <TouchableOpacity onPress={handleClear} style={[styles.button]}>
            <FontAwesome name="times" size={15} color="black" />
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignIn} style={[styles.button]}>
            <FontAwesome name="sign-in" size={15} color="black" />
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignupScreen")}
          style={styles.switchButton}
        >
          <Text style={styles.switchText}>Switch to: Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2DCC9",
  },
  formContainer: {
    backgroundColor: "#D9C39A",
    padding: 13,
    borderRadius: 10,
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8C8069",
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
  },
  ControlButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  switchButton: {
    marginTop: 20,
    alignItems: "center",
  },
  switchText: {
    color: "grey",
    fontWeight: "bold",
  },
});

export default SigninScreen;
