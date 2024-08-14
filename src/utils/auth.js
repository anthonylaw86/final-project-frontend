import { baseUrl } from "./api";
import { checkResponse } from "./api";

export const signUp = ({ email, password, username }, token) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, password, username }),
  }).then(checkResponse);
};

export const signIn = ({ username, password }, token) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, password }),
  }).then(checkResponse);
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const getCurrentUser = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

//-----------Mock Server-------//
// export const checkToken = (token) => {
//   return new Promise((resolve, reject) => {
//     resolve({
//       data: { name: "fake user", email: "fake@example.com", id: "fake-id" },
//     });
//   });
// };

export const authorization = (email, password) => {
  return new Promise((resolve, reject) => {
    resolve({ token: "a fake token " });
  });
};

export const registration = (email, password, username) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: { username: "fake user", email: "fake@example.com", id: "fake-id" },
    });
  });
};
