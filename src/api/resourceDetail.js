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
  getResourceDetailInfo: async (id, token = null) => {
    let response;
    if (token === null) {
      response = await axios.get(`/lecture-banks/${id}`);
    } else {
      response = await axios.get(`/lecture-banks/${id}`, axiosConfig(token.access_token));
    }
    return response;
  },
  postHit: async (id, accessToken = null) => {
    const response = await axios.post(
      `/lecture-banks/hit/${id}`,
      null,
      axiosConfig(accessToken)
    );
    return response;
  },
};
