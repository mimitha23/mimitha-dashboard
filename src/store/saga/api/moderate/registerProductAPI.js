import { axiosPrivateQuery, axiosFormDataQuery } from "services/axios";

export async function getRegisterProductFormSuggestionsQuery() {
  return await axiosPrivateQuery.get(
    "/moderate/register-product/form-suggestions"
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
  return await axiosPrivateQuery.delete(
    `/moderate/register-product/${payload._id}`
  );
}

export async function getAllRegisteredProductsQuery() {
  return await axiosPrivateQuery.get("/moderate/register-product");
}
