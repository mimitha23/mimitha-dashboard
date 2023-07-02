import { axiosPublicQuery } from "services/axios";

export async function createProductTypeQuery(payload) {
  return await axiosPublicQuery.post("/moderate/product-type", payload);
}

export async function getAllProductTypeQuery() {
  return await axiosPublicQuery.get("/moderate/product-type");
}

export async function updateProductTypeQuery(payload) {
  return await axiosPublicQuery.put(
    `/moderate/product-type/${payload._id}`,
    payload
  );
}

export async function deleteProductTypeQuery(payload) {
  return await axiosPublicQuery.delete(`/moderate/product-type/${payload._id}`);
}
