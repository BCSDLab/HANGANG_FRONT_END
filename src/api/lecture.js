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
  requestLecturesOnDepartment: async (department = "교양학부") => {
    const response = await axios.get(
      `/lectures?department=${department}&limit=5&page=1&sort=평점순`
    );
    return response;
  },
  /**
   * store의 filterOptions을 iterate 하며 query 를 붙임
   * 빈 string, array 이면 쿼리에 붙이지 않음
   * value type이 array 인 경우 join을 사용해 comma로 붙여줌
   * @param {object} filterOptions
   * @returns query
   */
  getLectures: async (filterOptions = {}, isLoggedIn = false) => {
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
    if (!isLoggedIn) {
      response = await axios.get(`/lectures?${query}`);
    } else {
      response = await axios.get(`/lectures?${query}`, setTokenInHeader());
    }

    return response;
  },
};
