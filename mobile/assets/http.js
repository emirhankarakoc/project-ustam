import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCALHOST = "http://192.168.1.75:8080"; // Bilgisayarınızın IP adresi ve portu
export const APIURL = LOCALHOST;

// Function to get token from AsyncStorage or return null
const getToken = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    return userToken ? `Bearer ${userToken}` : null;
  } catch (error) {
    console.error("Error getting token from AsyncStorage:", error);
    return null;
  }
};

// Create axios instance
export let http = axios.create({
  baseURL: APIURL,
});

// Interceptor to conditionally add Authorization header if token is present
http.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const httpError = (error) => {
  let errorMessage = error.message;

  if (error.response) {
    errorMessage = error.response.data;
  }
  return errorMessage;
};
