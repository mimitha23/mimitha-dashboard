import { axiosPublicQuery } from "services/axios";

export async function createProductStyleQuery(payload) {
  return await axiosPublicQuery.post("/moderate/product-style", payload);
}

export async function getAllProductStyleQuery() {
  return await axiosPublicQuery.post("/moderate/product-style");
}

export async function updateProductStyleQuery(payload) {
  return await axiosPublicQuery.post(
    `/moderate/product-style/${payload._id}`,
    payload
  );
}

export async function deleteProductStyleQuery(payload) {
  return await axiosPublicQuery.post(`/moderate/product-style/${payload._id}`);
}
