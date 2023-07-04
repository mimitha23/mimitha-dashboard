import { axiosPublicQuery } from "services/axios";

export async function getRegisterProductFormSugestionsQuery() {
  return await axiosPublicQuery.get(
    "/moderate/register-product/form-sugestions"
  );
}

export async function registerProductQuery() {}
