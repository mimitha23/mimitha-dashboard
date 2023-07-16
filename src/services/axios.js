import axios from "axios";
import decode from "jwt-decode";
import { BASE_URL } from "config/env";
import { jwt } from "utils";

export const axiosPublicQuery = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const axiosPrivateQuery = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const axiosFormDataQuery = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    "content-type": "multipart/form-data",
  },
});

const refresher = axios.create({
  baseURL: `${BASE_URL}/auth/staff/refresh`,
  withCredentials: true,
  method: "POST",
});

let refreshTokenPromise;

axiosPrivateQuery.interceptors.request.use(async (config) =>
  tokenExchange({ config })
);

axiosFormDataQuery.interceptors.request.use(async (config) =>
  tokenExchange({ config })
);

function tokenExchange({ config }) {
  const token = jwt.getJWT();

  const decodedUser = token ? decode(token) : null;

  if (!decodedUser) return config;

  const exp = decodedUser.exp;
  const isExpired = Math.floor(Date.now() / 1000) > exp;

  if (isExpired) {
    if (!refreshTokenPromise)
      refreshTokenPromise = refresher()
        .then(({ data }) => data.accessToken)
        .catch((err) => {
          if (err.response.status === 401) jwt.removeJWT();
          return "";
        })
        .finally(() => (refreshTokenPromise = null));

    return refreshTokenPromise.then((token) => {
      jwt.setJWT(token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    });
  } else if (token) {
    config.headers.authorization = `Bearer ${jwt.getJWT()}`;
  }

  return config;
}
