import { axiosPrivateQuery } from "services/axios";

export async function createNavRouteQuery(payload) {
  return await axiosPrivateQuery.post("/app/navigation/routes", payload);
}

export async function updateNavRouteQuery(payload) {
  return await axiosPrivateQuery.put(
    `app/navigation/routes/${payload._id}`,
    payload
  );
}

export async function deleteNavRouteQuery(payload) {
  return await axiosPrivateQuery.delete(`app/navigation/routes/${payload._id}`);
}

export async function getAllNavRouteQuery() {
  return await axiosPrivateQuery.get("/app/navigation/routes");
}
