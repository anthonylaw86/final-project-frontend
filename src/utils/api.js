export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
};

export const baseUrl = "http://localhost:3001";

const getMusicItems = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = JSON.parse(localStorage.getItem("musicItems")) || [];
      resolve(items);
    }, 500);
  });
};

const addNewMusicItems = ({ name, artist, albumUrl }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const items = JSON.parse(localStorage.getItem("musicItems")) || [];
      const newItem = { id: Date.now(), name, artist, albumUrl, likes: 0 };
      items.push(newItem);
      localStorage.setItem("musicItems", JSON.stringify(items));
      resolve(newItem);
    }, 500);
  });
};

const deleteMusicItem = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let items = JSON.parse(localStorage.getItem("musicItems")) || [];
      items = items.filter((item) => item.id !== id);
      localStorage.setItem("musicItems", JSON.stringify(items));
      resolve({ message: "Item deleted successfully" });
    }, 500);
  });
};

const addLike = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const items = JSON.parse(localStorage.getItem("musicItems")) || [];
      const item = items.find((item) => item.id === id);
      if (item) {
        item.likes += 1;
        localStorage.setItem("musicItems", JSON.stringify(items));
        resolve(item);
      } else {
        reject({ message: "Item not found" });
      }
    }, 500);
  });
};

const removeLike = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const items = JSON.parse(localStorage.getItem("musicItems")) || [];
      const item = items.find((item) => item.id === id);
      if (item) {
        item.likes = Math.max(0, item.likes - 1); // Ensure likes don't go below 0
        localStorage.setItem("musicItems", JSON.stringify(items));
        resolve(item);
      } else {
        reject({ message: "Item not found" });
      }
    }, 500);
  });
};

// const getMusicItems = () => {
//   return fetch(`${baseUrl}/items`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then(checkResponse);
// };

// const addNewMusicItems = ({ name, artist, albumUrl }, token) => {
//   return fetch(`${baseUrl}/items`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ name, artist, albumUrl }),
//   }).then(checkResponse);
// };

// const deleteMusicItem = (id, token) => {
//   return fetch(`${baseUrl}/items/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//   }).then(checkResponse);
// };

// const addLike = (id, token) => {
//   return fetch(`${baseUrl}/items/${id}/likes`, {
//     method: "PUT",
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   }).then(checkResponse);
// };

// const removeLike = (id, token) => {
//   return fetch(`${baseUrl}/items/${id}/likes`, {
//     method: "DELETE",
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   }).then(checkResponse);
// };

const api = {
  removeLike,
  addLike,
  addNewMusicItems,
  getMusicItems,
  deleteMusicItem,
};

export default api;
