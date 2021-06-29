import axios from "axios";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

const getAccessToken = () => getValueOnLocalStorage("hangangToken")?.access_token;

const setTokenInHeader = (data = null) => {
  const accessToken = getAccessToken();
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  if (data !== null) config["data"] = data;
  return config;
};

export default {
  getAmountOfActivity: async () => {
    const response = await axios.get("/user/lecture", setTokenInHeader());
    return response;
  },
  getInfo: async () => {
    const response = await axios.get("/user/me", setTokenInHeader());
    return response;
  },
  getPointRecords: async () => {
    const response = await axios.get("/user/point", setTokenInHeader());
    return response;
  },
  getPurchasedRecords: async () => {
    const response = await axios.get("/user/purchase", setTokenInHeader());
    return response;
  },
  getScrapLecture: async () => {
    const response = await axios.get("/scrap/lecture", setTokenInHeader());
    return response;
  },
  deleteScrapLecture: async (id = []) => {
    const accessToken = getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.delete("/scrap/lecture", { data: id, headers });
    return response;
  },
  getScrapResources: async () => {
    const response = await axios.get("/lecture-banks/scrap", setTokenInHeader());
    return response;
  },
  deleteScrapResources: async (id = []) => {
    const accessToken = getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.delete("/lecture-banks/scrap", { data: id, headers });
    return response;
  },
  updateUserInfo: async (major = [], nickname = "") => {
    let body = {
      major,
      nickname,
    };
    const response = await axios.put("/user/me", body, setTokenInHeader());
    return response;
  },
  deleteUser: async () => {
    const response = await axios.delete("/user/me", setTokenInHeader());
    return response;
  },
  checkValidNickname: async (nickname) => {
    const response = await axios.post(`/user/nickname-check?nickname=${nickname}`);
    return response;
  },
};
