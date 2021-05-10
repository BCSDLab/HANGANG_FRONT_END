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
  getResources: async (filterOptions = {}) => {
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
  // Resource Write Form
  getResourceCreateId: async (accessToken = null) => {
    const response = await axios.get(
      `/lecture-banks/write`,
      setTokenInHeader(accessToken)
    );
    return response;
  },
  cancelResourceWrite: async (createFormId = -1, accessToken = null) => {
    const response = await axios.delete(
      `/lecture-banks/cancel/${createFormId}`,
      setTokenInHeader(accessToken)
    );
    return response;
  },
  //FIXME: Change to handle multiple files when it solve problem.
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
  cancelUploadFile: async (id = undefined, accessToken = null) => {
    const response = await axios.post(
      `/lecture-banks/file/cancel_upload/${id}`,
      null,
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
