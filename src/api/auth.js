import axios from "axios";

axios.defaults.baseURL = "https://api.hangang.in/user";
// axios.defaults.baseURL = `${process.env.BACKEND_URL}/user`;

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
  renewPw: async (infos) => {
    const response = await axios.post("/password-find", infos);
    return response;
  },
  checkValidNickname: async (nickname) => {
    const response = await axios.post(`/nickname-check?nickname=${nickname}`);
    return response;
  },
  authTest: async (accessToken) => {
    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.get("/auth-test", config);
    return response;
  },
  refreshToken: async (refreshToken) => {
    let config = {
      headers: {
        RefreshToken: `Bearer ${refreshToken}`,
      },
    };
    const response = await axios.post("/refresh", null, config);
    return response;
  },
};
