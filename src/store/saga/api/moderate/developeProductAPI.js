import { axiosPublicQuery, axiosFormDataQuery } from "services/axios";

export async function attachDevelopedProductQuery(payload) {
  return await axiosFormDataQuery.post(
    `/moderate/develope-product/${payload.product}/products`,
    payload
  );
}

export async function getDevelopedProductQuery(payload) {
  return await axiosFormDataQuery.get(
    `/moderate/develope-product/${payload.registeredProductId}/products/${payload.productId}`
  );
}

export async function copyDevelopedProductConfigQuery(payload) {
  return await axiosFormDataQuery.get(
    `/moderate/develope-product/${payload.registeredProductId}/products/copy?${payload.params}`
  );
}

export async function updateDevelopedProductQuery(payload) {
  return await axiosFormDataQuery.put(
    `/moderate/develope-product/${payload.product}/products/${payload._id}`,
    payload
  );
}

export async function getAllDevelopedProductsQuery({ registeredProductId }) {
  return await axiosPublicQuery.get(
    `/moderate/develope-product/${registeredProductId}/products`
  );
}

export async function deleteDevelopedProductQuery({
  registeredProductId,
  developedProductId,
}) {
  return await axiosPublicQuery.delete(
    `/moderate/develope-product/${registeredProductId}/products/${developedProductId}`
  );
}

export async function getDevelopeProductFormSugestionsQuery() {
  return await axiosPublicQuery.get("/moderate/develope-product/suggestions");
}
