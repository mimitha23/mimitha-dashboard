import { axiosPublicQuery } from "services/axios";

export async function createColorQuery(payload) {
  return await axiosPublicQuery.post("/moderate/color", payload);
}

export async function getAllColorQuery() {
  return await axiosPublicQuery.post("/moderate/color");
}

export async function updateColorQuery(payload) {
  return await axiosPublicQuery.post(`/moderate/color/${payload._id}`, payload);
}

export async function deleteColorQuery(payload) {
  return await axiosPublicQuery.post(`/moderate/color/${payload._id}`);
}
