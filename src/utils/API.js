import axios from "axios";

const URL_PREFIX = "http://localhost:3001";

const API = {
  signUpUser: async (userObj) => {
    try {
      const createdUser = await axios.post(`${URL_PREFIX}/api/users`, userObj);
      return createdUser;
    } catch (err) {
      return err;
    }
  },
  loginUser: async (userObj) => {
    try {
      const login = await axios.post(`${URL_PREFIX}/api/users/login`, userObj);
      return login;
    } catch (err) {
      return err;
    }
  },
  isValidToken: async (token) => {
    const checkToken = await axios.get(
      `${URL_PREFIX}/api/users/token/isValidToken`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(checkToken);
    return checkToken;
  },
  getOneRoom: async (roomCode) => {
    const foundRoom = await axios.get(`${URL_PREFIX}/api/rooms/${roomCode}`);

    console.log(foundRoom);
    return foundRoom;
  },
  createNewRoom: async (roomObj) => {
    const createdRoom = await axios.post(`${URL_PREFIX}/api/rooms`, roomObj);

    console.log(createdRoom);
    return createdRoom;
  },
  deleteRoom: async (roomCode) => {
    const response = await axios.delete(`${URL_PREFIX}/api/rooms${roomCode}`);

    console.log(response);
    return response;
  },
  updateUser: async (userObj, userId) => {
    const response = await axios.put(
      `${URL_PREFIX}/api/users/${userId}`,
      userObj
    );

    console.log(response);
    return response;
  },
  allCats: async () => {
    const allCats = await axios.get(`${URL_PREFIX}/api/cats`);

    return allCats;
  },
  oneCat: async (catId) => {
    const oneCat = await axios.get(`${URL_PREFIX}/api/cats/${catId}`);

    return oneCat;
  },
};

export default API;
