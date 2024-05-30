import React, { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../slice/cartSlice";
import { checkOut } from "../slice/services/orderService";
import { saveCart } from "../slice/services/cartService";
import { OrdersScreen } from "./OrdersScreen";

function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const token = useSelector((state) => state.user.token);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && !token) {
      Alert.alert("You need to login to get to this screen.");
      navigation.navigate("SigninScreen");
    }
  }, [isFocused]);

  useEffect(() => {
    if (cartItems.cartItems !== null) {
      saveCart(token, cartItems.cartItems);
    }
  }, [cartItems]);

  const handleCheckout = async () => {
    const response = await checkOut({
      token: token,
      cartItems: Object.values(cartItems.cartItems),
    });
    if (response.status === "OK") {
      dispatch(clearCart());
      navigation.navigate("OrdersScreen");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Shopping Cart</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalItems}>
          Items: {cartItems.totalItems} Total Price: $
          {cartItems !== null ? cartItems.totalAmount.toFixed(2) : 0}
        </Text>
      </View>
      {Object.values(cartItems.cartItems).length > 0 ? (
        <>
          <FlatList
            data={Object.values(cartItems.cartItems)}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemPrice}>
                    Price: ${item.price.toFixed(2)}
                  </Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => dispatch(decreaseQuantity(item.id))}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>
                      quantity: {item.quantity}
                    </Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => dispatch(increaseQuantity(item.id))}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
          <View style={styles.ControlButton}>
            <TouchableOpacity onPress={handleCheckout} style={styles.button}>
              <FontAwesome name="arrow-right" size={15} color="black" />
              <Text style={styles.buttonText}>Check Out</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.emptyText}>Your shopping cart is empty.</Text>
      )}
    </View>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

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
  totalContainer: {
    justifyContent: "center",
    backgroundColor: "#D9C39A",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  totalItems: {
    fontSize: 15,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    elevation: 3,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 13,
    color: "black",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginLeft: 75,
  },
  quantityButton: {
    backgroundColor: "#8C8069",
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 14,
    color: "white",
  },
  quantityText: {
    fontSize: 13,
    marginHorizontal: 10,
  },
  removeButton: {
    backgroundColor: "#B33A3A",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  ControlButton: {
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#D9C39A",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});
