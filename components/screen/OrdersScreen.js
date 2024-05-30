import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { fetchOrders } from "../slice/orderSlice";
import { getOrders, updateOrder } from "../slice/services/orderService";
import { FlatList } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { fetchProducts } from "../slice/productSlice";
import { Alert } from "react-native";

const OrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const orders = useSelector((state) => state.order.orders);
  const products = useSelector((state) => state.product.products);
  const [forceRefresh, setForceRefresh] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && !token) {
      Alert.alert("You need to login to get to this screen.");
      navigation.navigate("SigninScreen");
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const newOrders = orders.filter(
    (order) => order.is_paid === 0 && order.is_delivered === 0
  );
  const paidOrders = orders.filter(
    (order) => order.is_paid === 1 && order.is_delivered === 0
  );
  const deliveredOrders = orders.filter(
    (order) => order.is_paid === 1 && order.is_delivered === 1
  );

  useEffect(() => {
    if (isFocused) {
      getOrders(token).then((order) => {
        if (order && order.status === "OK") dispatch(fetchOrders(order));
      });
    }
  }, [isFocused, forceRefresh]);

  // useEffect(() => {
  //   if (token) {
  //     const order = getOrders(token);
  //     if (order && order.status === "OK") dispatch(fetchOrders(order));
  //   }
  // }, [token, forceRefresh, isFocused, orders]);

  const [expandedSections, setExpandedSections] = useState([
    false,
    false,
    false,
  ]);

  const toggleExpanded = (index) => {
    const newExpandedSections = [...expandedSections];
    newExpandedSections[index] = !newExpandedSections[index];
    setExpandedSections(newExpandedSections);
  };

  const renderItemDetail = (item) => {
    if (!products) {
      return null;
    }
    const itemDetails = products.find(
      (product) => product.id === item.item.prodID
    );

    return (
      <View key={item.id}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: itemDetails.image }} style={styles.image} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{itemDetails.title}</Text>
            <Text style={styles.itemPrice}>Price: ${item.item.price}</Text>
            <Text style={styles.itemPrice}>Quantity: {item.item.quantity}</Text>
          </View>
        </View>
      </View>
    );
  };

  const handlePay = async (orderID, isPay, isDeliver, token) => {
    const payAction = await updateOrder(orderID, isPay, isDeliver, token);
    if (payAction && payAction.status === "OK") {
      console.log("Order paid");
      setForceRefresh((prev) => !prev);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>My Orders</Text>
        </View>

        <TouchableOpacity
          style={[styles.ordersBox, expandedSections[0] && styles.expandedBox]}
          onPress={() => toggleExpanded(0)}
        >
          <Text style={styles.title}>New Orders:</Text>
          <FontAwesome
            name={expandedSections[0] ? "caret-up" : "caret-down"}
            size={20}
            color="black"
            marginRight={10}
          />
        </TouchableOpacity>
        {expandedSections[0] && (
          <FlatList
            data={newOrders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <>
                <View style={styles.contentOrder}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.text}>
                      Order ID: {item.id} Total Quantity: {item.item_numbers}{" "}
                      Total Price: ${(item.total_price / 100).toFixed(2)}
                    </Text>
                  </View>
                  <FlatList
                    data={JSON.parse(item.order_items)}
                    keyExtractor={(productItem) =>
                      productItem.prodID.toString()
                    }
                    renderItem={renderItemDetail}
                  />
                  <TouchableOpacity
                    onPress={() => handlePay(item.id, 1, 0, token)}
                    style={styles.button}
                  >
                    <FontAwesome name="money" size={15} color="black" />
                    <Text style={styles.buttonText}>Pay</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          />
        )}

        <TouchableOpacity
          style={[styles.ordersBox, expandedSections[1] && styles.expandedBox]}
          onPress={() => toggleExpanded(1)}
        >
          <Text style={styles.title}>Paid Orders:</Text>
          <FontAwesome
            name={expandedSections[1] ? "caret-up" : "caret-down"}
            size={20}
            color="black"
            marginRight={10}
          />
        </TouchableOpacity>
        {expandedSections[1] && (
          <FlatList
            data={paidOrders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <>
                <View style={styles.contentOrder}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.text}>
                      Order ID: {item.id} Total Quantity: {item.item_numbers}{" "}
                      Total Price: ${(item.total_price / 100).toFixed(2)}
                    </Text>
                  </View>
                  <FlatList
                    data={JSON.parse(item.order_items)}
                    keyExtractor={(productItem) =>
                      productItem.prodID.toString()
                    }
                    renderItem={renderItemDetail}
                  />
                  <TouchableOpacity
                    onPress={() => handlePay(item.id, 1, 1, token)}
                    style={styles.button}
                  >
                    <FontAwesome name="truck" size={15} color="black" />
                    <Text style={styles.buttonText}>Received</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          />
        )}
        <TouchableOpacity
          style={[styles.ordersBox, expandedSections[2] && styles.expandedBox]}
          onPress={() => toggleExpanded(2)}
        >
          <Text style={styles.title}>Delivered Orders:</Text>
          <FontAwesome
            name={expandedSections[2] ? "caret-up" : "caret-down"}
            size={20}
            color="black"
            marginRight={10}
          />
        </TouchableOpacity>
        {expandedSections[2] && (
          <FlatList
            data={deliveredOrders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <>
                <View style={styles.contentOrder}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.text}>
                      Order ID: {item.id} Total Quantity: {item.item_numbers}{" "}
                      Total Price: ${(item.total_price / 100).toFixed(2)}
                    </Text>
                  </View>
                  <FlatList
                    data={JSON.parse(item.order_items)}
                    keyExtractor={(productItem) =>
                      productItem.prodID.toString()
                    }
                    renderItem={renderItemDetail}
                  />
                </View>
              </>
            )}
          />
        )}
      </View>
    </GestureHandlerRootView>
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
  ordersBox: {
    backgroundColor: "#D9C39A",
    margin: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  expandedBox: {
    height: 30,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F2DCC9",
    borderColor: "black",
    borderWidth: 1,
    margin: 7,
    borderRadius: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9C39A",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "flex-end",
  },
  buttonText: {
    fontSize: 15,
    marginLeft: 5,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F2DCC9",
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
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  contentOrder: {
    backgroundColor: "#F2DCC9",
    height: "auto",
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
});

export default OrdersScreen;
