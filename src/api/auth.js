import axios from "axios";

axios.defaults.baseURL = `${process.env.BACKEND_URL}/user`;

export default {
  requestEmail: async (infos) => {
    const response = await axios.post("/email", infos);
    return response;
  },
  requestEmailConfig: async (infos) => {
    const response = await axios.post("/email/config", infos);
    return response;
  },
  signUp: async (infos) => {
    const response = await axios.post("/sign-up", infos);
    return response;
  },
  login: async (infos) => {
    const response = await axios.post("/login", infos);
    return response;
  },
};
