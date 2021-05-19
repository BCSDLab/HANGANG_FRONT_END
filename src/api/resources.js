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
  requestHit: async (id = undefined, accessToken = null) => {
    const response = await axios.post(
      `/lecture-banks/hit/${id}`,
      null,
      setTokenInHeader(accessToken)
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
      response = await axios.get(
        `/lecture-banks?${query}`,
        setTokenInHeader(accessToken)
      );
    }

    return response;
  },
  uploadFiles: async (files = null, accessToken = null) => {
    const form = new FormData();
    for (let f of Object.values(files)) form.append("files", f);

    const response = await axios.post(
      `/lecture-banks/files`,
      form,
      setTokenInHeader(accessToken)
    );
    return response;
  },
  // deprecated
  cancelUploadFile: async (id = undefined, accessToken = null) => {
    const response = await axios.get(
      `/lecture-banks/file/cancel_upload/${id}`,
      setTokenInHeader(accessToken)
    );
    return response;
  },
  requestWriteResource: async (
    { category, content, files, lecture_id, semester_id, title },
    accessToken = null
  ) => {
    let body = {
      category,
      content,
      files,
      lecture_id,
      semester_id,
      title,
    };

    const response = await axios.post(
      `/lecture-banks`,
      body,
      setTokenInHeader(accessToken)
    );
    return response;
  },
};
