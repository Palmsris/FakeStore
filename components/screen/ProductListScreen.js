import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { Image, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { fetchProducts } from "../slice/productSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProductList({ navigation, route, onPress }) {
  const { categoryName, categoryTitle } = route.params;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  console.log("products", products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.category
        .replace(/[']/g, "")
        .replace(/(?<=\s+)[a-z]/gi, (char) => char.toUpperCase())
        .replace(/\s/g, "")
        .toLowerCase() === categoryName
  );

  const renderProductItem = ({ item }) => (
    <Pressable
      key={item.id.toString()}
      style={styles.button}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <View style={styles.itemContainer}>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.image} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>Price: ${item.price}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#592B1B" />
      ) : (
        <>
          <View style={styles.ScreenContainer}>
            <Text style={styles.ScreenText}>{categoryTitle.toUpperCase()}</Text>
          </View>
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <View style={styles.ControlButton}>
            <Pressable
              onPress={() => navigation.navigate("Categories")}
              style={styles.button}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="arrow-left" size={15} color="black" />
                <Text style={styles.buttonText}>Back</Text>
              </View>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ScreenContainer: {
    alignItems: "center",
    paddingVertical: 10,
    height: "12%",
    justifyContent: "flex-end",
  },
  ScreenText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#F2DCC9",
    padding: 10,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#D9C39A",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
    flexShrink: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    maxWidth: 290,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ControlButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: "bold",
  },
});
