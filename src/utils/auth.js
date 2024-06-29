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

// export const authorization = (email, password) => {
//   return new Promise((resolve, reject) => {
//     resolve({ token: "a fake token " });
//   });
// };

// export const registration = (email, password, username) => {
//   return new Promise((resolve, reject) => {
//     resolve({
//       data: { username: "fake user", email: "fake@example.com", id: "fake-id" },
//     });
//   });
// };
