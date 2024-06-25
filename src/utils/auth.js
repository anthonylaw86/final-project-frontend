//-----------Mock Server-------//
export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: "fake user", email: "fake@example.com", id: "fake-id" },
    });
  });
};

export const authorization = (email, password) => {
  return new Promise((resolve, reject) => {
    resolve({ token: "a fake token " });
  });
};

export const registration = (email, password, username) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: "fake user", email: "fake@example.com", id: "fake-id" },
    });
  });
};
