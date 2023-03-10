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
  getAllRooms: async () => {
    const allRooms = await axios.get(`${URL_PREFIX}/api/rooms`);

    return allRooms;
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
  deleteUser: async (userId) => {
    const response = axios.delete(`${URL_PREFIX}/api/users/${userId}`);

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
  updateCat: async (catObj, catId) => {
    const updatedCat = await axios.put(
      `${URL_PREFIX}/api/cats/${catId}`,
      catObj
    );

    return updatedCat;
  },
  // Destructuring an object here with the keys of userId and catId, this way there's no confusion on order to pass in.
  addCatToUser: async ({ userId, catId }) => {
    const response = await axios.put(
      `${URL_PREFIX}/api/users/${userId}/cats/${catId}`
    );

    return response;
  },
  addScoreToUser: async (userId, numScore) => {
    const response = await axios.put(
      `${URL_PREFIX}/api/users/${userId}/score/${numScore}`
    );
    return response;
  },
  addTimeToUser: async (userId, numMins) => {
    const response = await axios.put(
      `${URL_PREFIX}/api/users/${userId}/time/${numMins}`
    );
    console.log("Response adding time to user...");
    console.log(response);
    return response;
  },
  randomTriviaQuestion: async () => {
    const randomQuestionResponse = await axios.get(
      `${URL_PREFIX}/api/trivia/question/random`
    );

    return randomQuestionResponse;
  },
};

export default API;
