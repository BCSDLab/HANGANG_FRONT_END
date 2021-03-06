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
  getCommentsOnResource: async (id, limit, page) => {
    const response = await axios.get(
      `/lecture-banks/${id}/comments?limit=${limit}&page=${page}`
    );
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
  reportResource: async (content_id, report_id, accessToken = null) => {
    const response = await axios.post(
      `/lecture-banks/report`,
      { content_id, report_id },
      axiosConfig(accessToken)
    );
    return response;
  },
  reportComment: async (content_id, report_id, accessToken = null) => {
    const response = await axios.post(
      `/lecture-banks/report/comment`,
      { content_id, report_id },
      axiosConfig(accessToken)
    );
    return response;
  },
  scrapResource: async (scrap_id, accessToken = null) => {
    const response = await axios.post(
      `/lecture-banks/scrap/${scrap_id}`,
      null,
      axiosConfig(accessToken)
    );
    return response;
  },
  unscrapResource: async (scrap_id, accessToken = null) => {
    const data = [scrap_id];
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.delete(`/lecture-banks/scrap`, { data, headers });
    return response;
  },
  purchaseResource: async (resource_id, accessToken = null) => {
    const response = await axios.post(
      `/lecture-banks/purchase/${resource_id}`,
      null,
      axiosConfig(accessToken)
    );
    return response;
  },
  requestAttachmentUri: async (attachment_id, accessToken = null) => {
    const response = await axios.get(
      `/lecture-banks/file/download/${attachment_id}`,
      axiosConfig(accessToken)
    );
    return response;
  },
  createComment: async (content_id, commentContent, accessToken = null) => {
    const response = await axios.post(
      `/lecture-banks/${content_id}/comment`,
      { comments: commentContent },
      axiosConfig(accessToken)
    );
    return response;
  },
  getComment: async (contentId, limit, page) => {
    const response = await axios.get(
      `/lecture-banks/${contentId}/comments?limit=${limit}&page=${page}`
    );
    return response;
  },
};
