import axios from "axios";

const setTokenInHeader = (accessToken, data = null) => {
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  if (data !== null) config["data"] = data;
  return config;
};

export default {
  getAmountOfActivity: async (accessToken) => {
    const response = await axios.get("/user/lecture", setTokenInHeader(accessToken));
    return response;
  },
  getInfo: async (accessToken) => {
    const response = await axios.get("/user/me", setTokenInHeader(accessToken));
    return response;
  },
  getPointRecords: async (accessToken) => {
    const response = await axios.get("/user/point", setTokenInHeader(accessToken));
    return response;
  },
  getPurchasedRecords: async (accessToken) => {
    const response = await axios.get("/user/purchase", setTokenInHeader(accessToken));
    return response;
  },
  getScrapLecture: async (accessToken) => {
    const response = await axios.get("/scrap/lecture", setTokenInHeader(accessToken));
    return response;
  },
  deleteScrapLecture: async (accessToken, id = []) => {
    const response = await axios.delete(
      "/scrap/lecture",
      setTokenInHeader(accessToken, { id })
    );
    return response;
  },
  updateUserInfo: async (accessToken, major = [], nickname = "") => {
    let body = {
      major,
      nickname,
    };
    const response = await axios.put("/user/me", body, setTokenInHeader(accessToken));
    return response;
  },
  deleteUser: async (accessToken) => {
    const response = await axios.delete("/user/me", setTokenInHeader(accessToken));
    return response;
  },
  checkValidNickname: async (nickname) => {
    const response = await axios.post(`/user/nickname-check?nickname=${nickname}`);
    return response;
  },
};
