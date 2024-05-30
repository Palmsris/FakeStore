export const login = async (credentials) => {
  console.log("Credentials", credentials);
  try {
    const { email, password } = credentials;
    const response = await fetch("http://127.0.0.1:3000/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    return data;
  }
};

export const signup = async (credentials) => {
  console.log("Credentials", credentials);
  try {
    const { name, email, password } = credentials;
    const response = await fetch("http://127.0.0.1:3000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    console.log("Data:", data);
    if (data.status === "OK") {
      return data;
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};

export const update = async (credentials) => {
  console.log("Credentials", credentials);
  try {
    const { name, password, token } = credentials;
    const response = await fetch("http://127.0.0.1:3000/users/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error);
  }
};
