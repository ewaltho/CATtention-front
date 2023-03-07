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
};

export default API;
