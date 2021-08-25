import axios from "axios";
console.log()
axios.defaults.baseURL = `${process.env.HANGANG_URL}`;

export default {
  requestEmail: async (infos) => {
    const response = await axios.post("/user/email", infos);
    return response;
  },
  requestEmailConfig: async (infos) => {
    const response = await axios.post("/user/email/config", infos);
    return response;
  },
  signUp: async (infos) => {
    const response = await axios.post("/user/sign-up", infos);
    return response;
  },
  login: async (infos) => {
    const response = await axios.post("/user/login", infos);
    return response;
  },
  renewPw: async (infos) => {
    const response = await axios.post("/user/password-find", infos);
    return response;
  },
  checkValidNickname: async (nickname) => {
    const response = await axios.post(`/user/nickname-check?nickname=${nickname}`);
    return response;
  },
  authTest: async (accessToken) => {
    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.get("/user/auth-test", config);
    return response;
  },
  refreshToken: async (refreshToken) => {
    let config = {
      headers: {
        RefreshToken: `Bearer ${refreshToken}`,
      },
    };
    const response = await axios.post("/user/refresh", null, config);
    return response;
  },
  fetchUserInfo: async (accessToken = null) => {
    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios.get("/user/me", config);
    return response;
  },
};
