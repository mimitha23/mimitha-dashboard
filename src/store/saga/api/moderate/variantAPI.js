import { axiosPublicQuery, axiosFormDataQuery } from "services/axios";

export async function getExistingVariantTypesQuery() {
  return await axiosPublicQuery.get("/moderate/variant/types");
}

export async function createVariantQuery(payload) {
  return await axiosFormDataQuery.post("/moderate/variant", payload);
}

export async function getAllVariantQuery() {
  return await axiosPublicQuery.get("/moderate/variant");
}

export async function updateVariantQuery(payload) {
  return await axiosPublicQuery.put(
    `/moderate/variant/${payload._id}`,
    payload
  );
}

export async function deleteVariantQuery(payload) {
  return await axiosPublicQuery.delete(`/moderate/variant/${payload._id}`);
}
