import {
  Pressable,
  Text,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addToCart } from "../slice/cartSlice";
import { useDispatch } from "react-redux";

function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

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
          <View style={styles.ScreenContainer}>
            <Text style={styles.ScreenText}>Product Details</Text>
          </View>
          {/* <ScrollView> */}
          <View style={styles.container}>
            <Image source={{ uri: product.image }} style={[styles.image]} />
            <Text style={styles.TitleText}>{product.title}</Text>
            <View style={styles.rateContainer}>
              <Text style={styles.rateText}>
                Rate: {product.rating.rate} Sold: {product.rating.count} Price:
                ${product.price}
              </Text>
            </View>
            <View style={styles.ControlButton}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[styles.button]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="arrow-left" size={15} color="black" />
                  <Text style={styles.buttonText}>Back</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleAddToCart}
                style={[styles.button]}
              >
                <FontAwesome name="shopping-cart" size={15} color="black" />
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.descriptionText}>Description:</Text>
            <ScrollView>
              <View style={styles.descriptionContainer}>
                <Text style={styles.text}>{product.description}</Text>
              </View>
            </ScrollView>
          </View>
          {/* </ScrollView> */}
        </>
      )}
    </View>
  );
}

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = {
  addToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2DCC9",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
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
  TitleText: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
  },
  image: {
    width: 350,
    height: 250,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 5,
  },
  rateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#D9C39A",
    width: 340,
    marginTop: 20,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
  },
  rateText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8C8069",
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: "bold",
  },
  ControlButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 230,
    marginTop: 20,
  },
  descriptionContainer: {
    backgroundColor: "#D9C39A",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: 350,
  },
  descriptionText: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 20,
    marginRight: 240,
  },
  text: {
    fontSize: 15,
  },
});
