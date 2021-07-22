import { apiConfig } from "../apiConfig";

const authAPI = {
  login: (email, password) => {
    return apiConfig.post("api/login", {
      email,
      password,
    });
  },
};

export default authAPI;
