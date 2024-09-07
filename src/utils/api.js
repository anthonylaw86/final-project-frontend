export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.beatapp.strangled.net"
    : "http://localhost:3002";

export const loginUrl =
  process.env.NODE_ENV === "production"
    ? "https://beatapp.strangled.net/auth/login"
    : "https://localhost:3002/auth/login";

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
};

const fetchToken = async () => {
  const response = await fetch(`${baseUrl}/auth/token`);

  if (!response.ok) {
    throw new Error("Network response was not okay");
  }

  const json = await response.json();
  setToken(json.access_token);
};

// FOR BACKEND
const getMusicItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};

const addNewMusicItems = ({ name, artist, albumUrl }, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, artist, albumUrl }),
  }).then(checkResponse);
};

const deleteMusicItem = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

const addLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

const removeLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

const api = {
  removeLike,
  addLike,
  addNewMusicItems,
  getMusicItems,
  deleteMusicItem,
  fetchToken,
};

export default api;
