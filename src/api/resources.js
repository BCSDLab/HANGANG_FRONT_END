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
  requestHit: async (id = undefined) => {
    const response = await axios.post(
      `/lecture-banks/hit/${id}`,
      null,
      setTokenInHeader()
    );
    return response;
  },
  getResources: async (filterOptions = {}, accessToken = null) => {
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

    let response;
    if (accessToken === null) {
      response = await axios.get(`/lecture-banks?${query}`);
    } else {
      response = await axios.get(`/lecture-banks?${query}`, setTokenInHeader());
    }

    return response;
  },
  uploadFiles: async (files = null) => {
    const form = new FormData();
    for (let f of Object.values(files)) form.append("files", f);

    const response = await axios.post(`/lecture-banks/files`, form, setTokenInHeader());
    return response;
  },
  // deprecated
  cancelUploadFile: async (id = undefined) => {
    const response = await axios.get(
      `/lecture-banks/file/cancel_upload/${id}`,
      setTokenInHeader()
    );
    return response;
  },
  requestWriteResource: async ({
    category,
    content,
    files,
    lecture_id,
    semester_id,
    title,
  }) => {
    let body = {
      category,
      content,
      files,
      lecture_id,
      semester_id,
      title,
    };

    const response = await axios.post(`/lecture-banks`, body, setTokenInHeader());
    return response;
  },
  fetchRecommendResources: async () => {
    const response = await axios.get(`/lecture-banks/hit`, setTokenInHeader());
    return response;
  },
};
