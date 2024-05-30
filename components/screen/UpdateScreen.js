import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../slice/services/userService";

const UpdateScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const handleUpdate = async () => {
    const user = { name, password, token };
    const data = await update(user);
    // console.log("UpdateData:", data);
    if (data.status === "OK") {
      navigation.goBack();
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User Profile</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.text}>New Username:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.text}>New Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.ControlButton}>
          <TouchableOpacity onPress={handleUpdate} style={[styles.button]}>
            <FontAwesome name="check" size={15} color="black" />
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel} style={[styles.button]}>
            <FontAwesome name="times" size={15} color="black" />
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2DCC9",
    padding: 10,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    paddingVertical: 10,
    height: "12%",
    justifyContent: "flex-end",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "#D9C39A",
    padding: 13,
    borderRadius: 10,
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 20,
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
    marginTop: 15,
    marginLeft: 40,
    marginRight: 40,
  },
});

export default UpdateScreen;
