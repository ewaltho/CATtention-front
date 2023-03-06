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
};

export default API;
