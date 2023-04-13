import { API_BASE_URL } from "./constante";

const oldFetch = window.fetch;

export const newFetch = function (url, options = {}) {
  const token = localStorage.getItem("token");
  if (token) {
    options.headers = {
      ...(options.headers ?? {}),
      Authorization: `Bearer ${token}`,
    };
  }
  if (!url.startsWith("http")) {
    url = API_BASE_URL + url;
  }
  return oldFetch(url, options);
};

window.fetch = newFetch;
