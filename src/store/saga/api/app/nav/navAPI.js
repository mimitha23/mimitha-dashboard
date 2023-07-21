import { axiosPublicQuery, axiosPrivateQuery } from "services/axios";

export async function getNav() {
  return await axiosPublicQuery.get("/app/navigation/client");
}

export async function saveNav(payload) {
  return await axiosPrivateQuery.put("/app/navigation/client", payload);
}
