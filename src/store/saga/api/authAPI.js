import { axiosPublicQuery, axiosPrivateQuery } from "services/axios";

export async function loginQuery(payload) {
  return axiosPublicQuery.post("/auth/staff/login", payload);
}

export async function logoutQuery() {
  return axiosPrivateQuery.post("/auth/staff/logout");
}
