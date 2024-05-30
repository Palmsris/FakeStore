export const getCart = async (token) => {
  const url = `http://127.0.0.1:3000/cart`;
  try {
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log("Failed to fetch cart from api:", error);
  }
};

export const saveCart = async (token, cart) => {
  console.log("Saving cart:", cart);
  try {
    const response = await fetch("http://127.0.0.1:3000/cart", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items: Object.values(cart) }),
    });
    return await response.json();
  } catch (error) {
    console.log("Failed to save cart:", error);
  }
};
