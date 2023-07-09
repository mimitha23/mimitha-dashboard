import { axiosPublicQuery, axiosFormDataQuery } from "services/axios";

export async function attachDevelopedProductQuery(payload) {
  return await axiosFormDataQuery.post("/moderate/develope-product", payload);
}

export async function updateDevelopedProductQuery(payload) {
  return await axiosFormDataQuery.put(
    `/develope-product/${payload._id}`,
    payload
  );
}

export async function getAllDevelopedProductsQuery() {
  return await axiosPublicQuery.get("/moderate/develope-product");
}

export async function deleteDevelopedProductQuery(payload) {
  return await axiosPublicQuery.delete(
    `/moderate/develope-product/${payload._id}`
  );
}

export async function getDevelopeProductFormSugestionsQuery() {
  return await axiosPublicQuery.get("/moderate/develope-product/suggestions");
}
