import axios from "axios";

const LOCALHOST = "http://localhost:8080";
export const APIURL = LOCALHOST;

export const MECHANIC_ICON =
  "http://res.cloudinary.com/dhoj5fmxr/image/upload/v1720876201/fnka2afsx52vo2pq1104.png";

export const USER_ICON =
  "http://res.cloudinary.com/dhoj5fmxr/image/upload/v1720876251/djrw8bqfmwsxx43g61ui.png";

const token = localStorage.getItem("ustamjwttoken");

export const http = axios.create({
  baseURL: APIURL,
  data: {},
  headers: token ? { Authorization: "Bearer " + token } : {},
});

export const httpError = (error) => {
  let errorMessage = error.message;

  if (error.response) {
    errorMessage = error.response.data;
  }
  return errorMessage;
};
