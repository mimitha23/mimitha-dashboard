import { axiosPrivateQuery } from "services/axios";

export async function createProductStyleQuery(payload) {
  return await axiosPrivateQuery.post("/moderate/product-style", payload);
}

export async function getAllProductStyleQuery() {
  return await axiosPrivateQuery.get("/moderate/product-style");
}

export async function updateProductStyleQuery(payload) {
  return await axiosPrivateQuery.put(
    `/moderate/product-style/${payload._id}`,
    payload
  );
}

export async function deleteProductStyleQuery(payload) {
  return await axiosPrivateQuery.delete(
    `/moderate/product-style/${payload._id}`
  );
}
