import axios from "axios";
import decode from "jwt-decode";
import { BASE_URL } from "config/env";
import { JWT_MIMITHA_KEY } from "config/consts";

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
  baseURL: `${BASE_URL}/auth/refresh`,
  withCredentials: true,
  method: "GET",
});

let refreshTokenPromise;

axiosPrivateQuery.interceptors.request.use(async (config) =>
  tokenExchange({ config })
);

function tokenExchange({ config }) {
  const token = getJWT();

  const decodedUser = token ? decode(token) : null;

  if (!decodedUser) return config;

  const exp = decodedUser.exp;
  const isExpired = Math.floor(Date.now() / 1000) > exp;

  if (isExpired) {
    if (!refreshTokenPromise)
      refreshTokenPromise = refresher()
        .then(({ data }) => data.accessToken)
        .catch((err) => {
          if (err.response.status === 401)
            localStorage.removeItem(JWT_MIMITHA_KEY);
          return "";
        })
        .finally(() => (refreshTokenPromise = null));

    return refreshTokenPromise.then((token) => {
      localStorage.setItem(JWT_MIMITHA_KEY, JSON.stringify(token));
      config.headers.authorization = `Bearer ${token}`;
      return config;
    });
  } else config.headers.authorization = `Bearer ${getJWT()}`;

  return config;
}

function getJWT() {
  return localStorage.getItem(JWT_MIMITHA_KEY)
    ? JSON.parse(localStorage.getItem(JWT_MIMITHA_KEY))
    : null;
}
