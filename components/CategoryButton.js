// create a touchable opacity button for each category

import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function CategoryButton({
  category,
  onPress,
  categoryName,
  navigation,
}) {
  const handlePress = () => {
    onPress(categoryName);
  };

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>{category}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D9C39A",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    marginTop: 10,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    width: 350,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
