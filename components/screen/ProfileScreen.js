import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, updateUser } from "../slice/userSlice";
import SigninScreen from "./SigninScreen";
import { update } from "../slice/services/userService";
import { clearCart } from "../slice/cartSlice";

const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user.user);
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const [newName, setNewName] = useState(name);

  const [password, setPassword] = useState("");
  const token = useSelector((state) => state.user.token);
  // const { status, error } = useSelector((state) => state.user);

  const [modalVisible, setModalVisible] = useState(false);

  const handleUpdate = async () => {
    const user = { name: newName, password, token };
    const data = await update(user);
    if (data.status === "OK") {
      setModalVisible(false);
      dispatch(updateUser(data));
      Alert.alert("Username and password updated successfully");
    } else {
      Alert.alert("All fields are required");
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          onPress: () => {
            dispatch(logoutUser());
            dispatch(clearCart());
            navigation.navigate("SigninScreen");
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User Profile</Text>
      </View>
      <Text style={styles.text}>
        Username: {user ? name : ""}
        {/* Username: {user ? user.email.split("@")[0] : ""} */}
      </Text>
      <Text style={styles.text}>Email: {user ? user.email : ""}</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.formContainer}>
          <Text style={styles.text}>New Username:</Text>
          <TextInput
            style={styles.input}
            value={newName}
            onChangeText={setNewName}
          />
          <Text style={styles.text}>New Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.popControlButton}>
            <TouchableOpacity onPress={handleUpdate} style={[styles.popbutton]}>
              <FontAwesome name="check" size={15} color="black" />
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={[styles.popbutton]}
            >
              <FontAwesome name="times" size={15} color="black" />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.ControlButton}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.button]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="refresh" size={15} color="black" />
            <Text style={styles.buttonText}>Update</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut} style={[styles.button]}>
          <FontAwesome name="sign-out" size={15} color="black" />
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2DCC9",
    padding: 10,
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
  text: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9C39A",
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: "bold",
  },
  ControlButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: 230,
    marginTop: 20,
    marginLeft: 70,
  },
  formContainer: {
    backgroundColor: "#D9C39A",
    padding: 13,
    borderRadius: 10,
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 200,
    alignItems: "center",
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "80%",
  },
  popControlButton: {
    flexDirection: "row",
    marginTop: 15,
  },
  popbutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8C8069",
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});

export default ProfileScreen;
