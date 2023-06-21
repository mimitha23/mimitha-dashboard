import axios from "axios";

export const axiosPublicQuery = axios.create({
  withCredentials: true,
  baseURL: "",
});

export const axiosPrivateQuery = axios.create({
  withCredentials: true,
  baseURL: "",
});
