import axios from "axios";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

const accessToken = getValueOnLocalStorage("hangangToken").access_token;

const setTokenInHeader = (token = accessToken, data = null) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (data !== null) config["data"] = data;
  return config;
};

export default {
  fetchLectures: async (options) => {
    const query = Object.entries(options)
      .map((option) => [`${option[0]}=${option[1]}`])
      .join("&");

    const response = await axios.get(`/timetable/lecture/list?${query}`);
    return response;
  },
  fetchMainTimetable: async () => {
    const response = await axios.get("/timetable/main/lecture", setTokenInHeader());
    return response;
  },
  fetchUserCreatedTimetables: async () => {
    const response = await axios.get("/timetable", setTokenInHeader());
    return response;
  },
};
