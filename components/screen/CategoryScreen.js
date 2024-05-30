import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import CategoryButton from "../CategoryButton";
import { fetchCategories } from "../slice/categorySlice";

export default function CategoryScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  console.log(categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#592B1B" />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>Product Categories</Text>
          </View>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CategoryButton
                key={item.id}
                category={item.title}
                onPress={() =>
                  navigation.navigate("Products", {
                    categoryName: item.id,
                    categoryTitle: item.title,
                  })
                }
              />
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2DCC9",
    alignItems: "center",
    justifyContent: "center",
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
});
