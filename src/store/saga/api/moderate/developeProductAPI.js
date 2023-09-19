import {
  axiosPrivateQuery,
  axiosFormDataQuery,
  axiosPublicQuery,
} from "services/axios";

export async function attachDevelopedProductQuery(payload) {
  return await axiosFormDataQuery.post(
    `/moderate/develope-product/${payload.registeredProductId}/products`,
    payload.data
  );
}

export async function updateDevelopedProductQuery(payload) {
  return await axiosFormDataQuery.put(
    `/moderate/develope-product/${payload.data.product}/products/${payload.updatingDevelopedProductId}`,
    payload.data
  );
}

export async function getDevelopedProductQuery(payload) {
  return await axiosPublicQuery.get(
    `/moderate/develope-product/${payload.registeredProductId}/products/${payload.productId}`
  );
}

export async function copyDevelopedProductConfigQuery(payload) {
  return await axiosPrivateQuery.get(
    `/moderate/develope-product/${payload.registeredProductId}/products/copy?${payload.params}`
  );
}

export async function getAllDevelopedProductsQuery({ registeredProductId }) {
  return await axiosPrivateQuery.get(
    `/moderate/develope-product/${registeredProductId}/products`
  );
}

export async function deleteDevelopedProductQuery({
  registeredProductId,
  developedProductId,
}) {
  return await axiosPrivateQuery.delete(
    `/moderate/develope-product/${registeredProductId}/products/${developedProductId}`
  );
}

export async function getDevelopeProductFormSuggestionsQuery() {
  return await axiosPrivateQuery.get("/moderate/develope-product/suggestions");
}
