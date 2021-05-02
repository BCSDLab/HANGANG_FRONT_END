import axios from "axios";

const setAxiosConfig = (accessToken = null, data = null) => {
  let config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  if (data !== null) config["data"] = data;
  return config;
};

export default {
  pushHitResource: async (accessToken) => {
    const response = await axios.get("/user/me", setAxiosConfig(accessToken));
    return response;
  },
  getResources: async (filterOptions) => {
    let query = "";

    Object.entries(filterOptions).forEach(([key, value]) => {
      if (typeof value === "string" && value.length === 0) return;
      if (typeof value === "object") {
        if (value.length === 0) return;
        else {
          query += `${key}=${value.join(",")}&`;
          return;
        }
      }

      query += `${key}=${value}&`;
    });
    query = query.slice(0, -1);

    const response = await axios.get(`/lecture-banks/search?${query}`);
    return response;
  },
};