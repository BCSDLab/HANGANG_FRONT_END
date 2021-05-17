import axios from "axios";

const axiosConfig = (accessToken, data = null) => {
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  if (data !== null) config["data"] = data;
  return config;
};

export default {
  getLectureDetailInfo: async (id, accessToken = null) => {
    let response;
    if (accessToken === null) {
      response = await axios.get(`/lecture-banks/${id}`);
    } else {
      response = await axios.get(`/lecture-banks/${id}`, axiosConfig(accessToken));
    }
    return response;
  },
  postHit: async (id, accessToken = null) => {
    console.log(id, accessToken);
    const response = await axios.post(
      `/lecture-banks/hit/${id}`,
      null,
      axiosConfig(accessToken)
    );
    return response;
  },
};
