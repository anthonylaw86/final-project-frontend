import { baseUrl } from "./api";
import { checkResponse } from "./api";

// export const signUp = ({ email, password, username }) => {
//   return new Promise((resolve, reject) => {
//     // Simulate a delay for the server response
//     setTimeout(() => {
//       const users = JSON.parse(localStorage.getItem("users")) || [];

//       // Check if the user already exists
//       if (users.some((user) => user.email === email)) {
//         reject({ message: "User already exists" });
//       } else {
//         const newUser = { email, password, username };
//         users.push(newUser);
//         localStorage.setItem("users", JSON.stringify(users));
//         resolve({ message: "User registered successfully" });
//       }
//     }, 500);
//   });
// };

export const signUp = ({ email, password, username }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      console.log("Existing users: ", users); // Log existing users for debugging

      if (users.some((user) => user.email === email)) {
        reject({ message: "User already exists" });
      } else {
        const newUser = { email, password, username };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        resolve({ message: "User registered successfully" });
      }
    }, 500);
  });
};

export const signIn = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        resolve({
          message: "Sign in successful",
          token: "fake-jwt-token",
          user,
        });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 500);
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    // Simulate token validation
    setTimeout(() => {
      if (token === "fake-jwt-token") {
        resolve({ message: "Token is valid" });
      } else {
        reject({ message: "Invalid token" });
      }
    }, 500);
  });
};

// export const signUp = ({ email, password, username }) => {
//   return fetch(`${baseUrl}/signup`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password, username }),
//   }).then(checkResponse);
// };

// export const signIn = ({ email, password }) => {
//   return fetch(`${baseUrl}/signin`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   }).then(checkResponse);
// };

// export const checkToken = (token) => {
//   return fetch(`${baseUrl}/users/me`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//   }).then(checkResponse);
// };

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
