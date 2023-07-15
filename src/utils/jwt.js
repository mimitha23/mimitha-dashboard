import { JWT_MIMITHA_KEY } from "config/consts";

export function getJWT() {
  return localStorage.getItem(JWT_MIMITHA_KEY)
    ? JSON.parse(localStorage.getItem(JWT_MIMITHA_KEY))
    : null;
}

export function setJWT(token) {
  localStorage.setItem(JWT_MIMITHA_KEY, JSON.stringify(token));
}

export function removeJWT() {
  localStorage.removeItem(JWT_MIMITHA_KEY);
}
