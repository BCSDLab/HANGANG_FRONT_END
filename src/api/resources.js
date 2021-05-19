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
  pushHitResource: async (id = undefined, accessToken = null) => {
    const response = await axios.get(
      `/lecture-banks/hit/push/${id}`,
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
  uploadFiles: async (files = null, createFormId = -1, accessToken = null) => {
    let fixFileSingleOrMultiple = files.length > 1 ? "files" : "file";
    const form = new FormData();
    for (let f of Object.values(files)) form.append(fixFileSingleOrMultiple, f);

    const response = await axios.post(
      `/lecture-banks/${fixFileSingleOrMultiple}/upload/${createFormId}`,
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
  postResourceWrite: async (
    { category, content, term, lecture_id, semester_date, title },
    accessToken = null
  ) => {
    let body = {
      category,
      content,
      id: term.id,
      lecture_id,
      semester_date,
      title,
      point_price: 10,
    };

    const response = await axios.post(
      `/lecture-banks/write`,
      body,
      setTokenInHeader(accessToken)
    );
    return response;
  },
};
