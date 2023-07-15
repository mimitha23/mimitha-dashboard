import { axiosPrivateQuery } from "services/axios";

export async function createColorQuery(payload) {
  return await axiosPrivateQuery.post("/moderate/color", payload);
}

export async function getAllColorQuery() {
  return await axiosPrivateQuery.get("/moderate/color");
}

export async function updateColorQuery(payload) {
  return await axiosPrivateQuery.put(`/moderate/color/${payload._id}`, payload);
}

export async function deleteColorQuery(payload) {
  return await axiosPrivateQuery.delete(`/moderate/color/${payload._id}`);
}
