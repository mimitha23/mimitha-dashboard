import { axiosPublicQuery } from "services/axios";

export async function createVariantQuery(payload) {
  return await axiosPublicQuery.post("/moderate/variant", payload);
}

export async function getAllVariantQuery() {
  return await axiosPublicQuery.post("/moderate/variant");
}

export async function updateVariantQuery(payload) {
  return await axiosPublicQuery.post(
    `/moderate/variant/${payload._id}`,
    payload
  );
}

export async function deleteVariantQuery(payload) {
  return await axiosPublicQuery.post(`/moderate/variant/${payload._id}`);
}
