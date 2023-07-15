import { axiosPrivateQuery } from "services/axios";

export async function createTextureQuery(payload) {
  return await axiosPrivateQuery.post("/moderate/texture", payload);
}

export async function getAllTextureQuery() {
  return await axiosPrivateQuery.get("/moderate/texture");
}

export async function updateTextureQuery(payload) {
  return await axiosPrivateQuery.put(
    `/moderate/texture/${payload._id}`,
    payload
  );
}

export async function deleteTextureQuery(payload) {
  return await axiosPrivateQuery.delete(`/moderate/texture/${payload._id}`);
}
