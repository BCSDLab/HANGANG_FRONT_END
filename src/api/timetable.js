import axios from "axios";

const setTokenInHeader = (accessToken = null, data = null) => {
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
};
