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
  fetchDefaultLectures: async (semesterId) => {
    const response = await axios.get(
      `/timetable/lecture/list?limit=20&semesterDateId=${semesterId}`
    );
    return response;
  },
  fetchLectures: async (options) => {
    const query = Object.entries(options)
      .map((option) => [`${option[0]}=${option[1]}`])
      .join("&");

    const response = await axios.get(`/timetable/lecture/list?${query}`);
    return response;
  },
  fetchMainTimetable: async () => {
    const response = await axios.get("/timetable/main/lecture", setTokenInHeader());
    return response;
  },
  fetchUserCreatedTimetables: async () => {
    const response = await axios.get("/timetable", setTokenInHeader());
    return response;
  },
  fetchTimetableInfo: async (id) => {
    const response = await axios.get(
      `/timetable/lecture?timeTableId=${id}`,
      setTokenInHeader()
    );
    return response;
  },
  createTimetable: async (body) => {
    const response = await axios.post("/timetable", body, setTokenInHeader());
    return response;
  },
  requestRemoveTimetable: async (id) => {
    const data = { id };
    const accessToken = getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.delete("/timetable", { data, headers });
    return response;
  },
  requestChangeMainTimetable: async (id) => {
    const body = { id };
    const response = await axios.patch(
      "/timetable/main/lecture",
      body,
      setTokenInHeader()
    );
    return response;
  },
  requestChangeTimetableName: async (id, name) => {
    const body = { id, name };
    const response = await axios.patch("/timetable", body, setTokenInHeader());
    return response;
  },
  setLectureOnTimetable: async (lectureTimetableId, userTimetableId) => {
    const body = {
      lecture_timetable_id: lectureTimetableId,
      user_timetable_id: userTimetableId,
    };
    const response = await axios.post("/timetable/lecture", body, setTokenInHeader());
    return response;
  },
  setCustomLectureOnTimetable: async (body) => {
    const response = await axios.post(
      "/timetable/custom/lecture",
      body,
      setTokenInHeader()
    );
    return response;
  },
  deleteLectureOnTimetable: async (lectureId, timetableId) => {
    const data = {
      lecture_timetable_id: lectureId,
      user_timetable_id: timetableId,
    };
    const accessToken = getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.delete("/timetable/lecture", { data, headers });
    return response;
  },
  getMemo: async (id) => {
    const response = await axios.get(
      `/memo?timetableComponentId=${id}`,
      setTokenInHeader()
    );
    return response;
  },
  createMemo: async (timetable_component_id, memo) => {
    const body = { timetable_component_id, memo };
    const response = await axios.post("/memo", body, setTokenInHeader());
    return response;
  },
  reviseMemo: async (timetable_component_id, memo) => {
    const body = { timetable_component_id, memo };
    const response = await axios.patch("/memo", body, setTokenInHeader());
    return response;
  },
};
