import { axiosPublicQuery } from "services/axios";

export async function createTextureQuery(payload) {
  return await axiosPublicQuery.post("/moderate/texture", payload);
}

export async function getAllTextureQuery() {
  return await axiosPublicQuery.get("/moderate/texture");
}

export async function updateTextureQuery(payload) {
  return await axiosPublicQuery.put(
    `/moderate/texture/${payload._id}`,
    payload
  );
}

export async function deleteTextureQuery(payload) {
  return await axiosPublicQuery.delete(`/moderate/texture/${payload._id}`);
}
