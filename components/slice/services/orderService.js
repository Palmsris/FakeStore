export const checkOut = async ({ token, cartItems }) => {
  // console.log("CartItems at orderservice", cartItems);

  const items = Object.values(cartItems).map((item) => {
    // console.log(item, 'at orderservice map');
    return {
      prodID: item.id,
      price: item.price,
      quantity: item.quantity,
    };
  });

  // console.log("Items to checkout:", items);

  try {
    const response = await fetch("http://127.0.0.1:3000/orders/neworder", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items: items }),
    });
    // console.log("Response:", response);
    return await response.json();
  } catch (error) {
    console.log("Failed to save order:", error);
    throw error;
    return await response.json();
  }
};

export const getOrders = async (token) => {
  try {
    const response = await fetch("http://127.0.0.1:3000/orders/all", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log("Failed to get orders:", error);
  }
};

export const updateOrder = async (orderID, isPaid, isDelivered, token) => {
  console.log(
    "OrderID:",
    orderID,
    "isPaid:",
    isPaid,
    "isDelivered:",
    isDelivered,
    "token:",
    token
  );
  try {
    const response = await fetch("http://127.0.0.1:3000/orders/updateorder", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderID, isPaid, isDelivered }),
    });
    return await response.json();
  } catch (error) {
    console.log("Failed to update order:", error);
  }
};
