import { axiosPrivateQuery } from "services/axios";

export async function createProductTypeQuery(payload) {
  return await axiosPrivateQuery.post("/moderate/product-type", payload);
}

export async function getAllProductTypeQuery() {
  return await axiosPrivateQuery.get("/moderate/product-type");
}

export async function updateProductTypeQuery(payload) {
  return await axiosPrivateQuery.put(
    `/moderate/product-type/${payload._id}`,
    payload
  );
}

export async function deleteProductTypeQuery(payload) {
  return await axiosPrivateQuery.delete(
    `/moderate/product-type/${payload._id}`
  );
}
