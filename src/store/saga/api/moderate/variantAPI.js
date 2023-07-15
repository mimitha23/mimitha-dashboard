import { axiosPrivateQuery, axiosFormDataQuery } from "services/axios";

export async function getExistingVariantTypesQuery() {
  return await axiosPrivateQuery.get("/moderate/variant/types");
}

export async function createVariantQuery(payload) {
  return await axiosFormDataQuery.post("/moderate/variant", payload);
}

export async function getAllVariantQuery() {
  return await axiosPrivateQuery.get("/moderate/variant");
}

export async function updateVariantQuery(payload) {
  return await axiosFormDataQuery.put(
    `/moderate/variant/${payload._id}`,
    payload
  );
}

export async function deleteVariantQuery(payload) {
  return await axiosPrivateQuery.delete(`/moderate/variant/${payload._id}`);
}
