// SignupScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../slice/services/userService";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const handleSignUp = () => {
    const user = { name, email, password };
    const data = signup(user);
    Alert.alert("User created successfully");
    navigation.navigate("SigninScreen");
    console.log("Data:", data);
  };

  const handleClear = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign up a new user</Text>
        <Text style={styles.text}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="times" size={15} color="black" />
              <Text style={styles.buttonText}>Clear</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSignUp} style={[styles.button]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="user-plus" size={15} color="black" />
              <Text style={styles.buttonText}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>
        {status === "failed" && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity
          onPress={() => navigation.navigate("SigninScreen")}
          style={styles.switchButton}
        >
          <Text style={styles.switchText}>
            Switch to: sign in with an existing user
          </Text>
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
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default SignupScreen;
