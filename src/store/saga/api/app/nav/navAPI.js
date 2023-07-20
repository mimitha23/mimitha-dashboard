import { axiosPublicQuery } from "services/axios";

export async function getNav() {
  return await axiosPublicQuery.get("/app/navigation/client");
}
