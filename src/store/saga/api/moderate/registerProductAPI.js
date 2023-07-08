import { axiosPublicQuery, axiosFormDataQuery } from "services/axios";

export async function getRegisterProductFormSugestionsQuery() {
  return await axiosPublicQuery.get(
    "/moderate/register-product/form-sugestions"
  );
}

export async function registerProductQuery(payload) {
  return await axiosFormDataQuery.post("/moderate/register-product", payload);
}

export async function updateRegisteredProductQuery(payload) {
  return await axiosFormDataQuery.put(
    `/moderate/register-product/${payload._id}`,
    payload
  );
}

export async function deleteRegisteredProductQuery(payload) {
  return await axiosPublicQuery.delete(
    `/moderate/register-product/${payload._id}`
  );
}

export async function getAllRegisteredProductsQuery() {
  return await axiosPublicQuery.get("/moderate/register-product");
}
