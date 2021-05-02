import axios from "axios";

const setAxiosConfig = (accessToken, data = null) => {
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
    const response = await axios.get("/user/lecture", setAxiosConfig(accessToken));
    return response;
  },
  getInfo: async (accessToken) => {
    const response = await axios.get("/user/me", setAxiosConfig(accessToken));
    return response;
  },
  getPointRecords: async (accessToken) => {
    const response = await axios.get("/user/point", setAxiosConfig(accessToken));
    return response;
  },
  getPurchasedRecords: async (accessToken) => {
    const response = await axios.get("/user/purchase", setAxiosConfig(accessToken));
    return response;
  },
  getScrapLecture: async (accessToken) => {
    const response = await axios.get("/scrap/lecture", setAxiosConfig(accessToken));
    return response;
  },
  deleteScrapLecture: async (accessToken, id = []) => {
    const response = await axios.delete(
      "/scrap/lecture",
      setAxiosConfig(accessToken, { id })
    );
    return response;
  },
  updateUserInfo: async (accessToken, major = [], nickname = "") => {
    let body = {
      major,
      nickname,
    };
    const response = await axios.put("/user/me", body, setAxiosConfig(accessToken));
    return response;
  },
  deleteUser: async (accessToken) => {
    const response = await axios.delete("/user/me", setAxiosConfig(accessToken));
    return response;
  },
  checkValidNickname: async (nickname) => {
    const response = await axios.post(`/user/nickname-check?nickname=${nickname}`);
    return response;
  },
};
