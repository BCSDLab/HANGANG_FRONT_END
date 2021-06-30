import axios from "axios";
import { Promise } from "core-js";

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
  getLectureInfo: async (accessToken, lectureId) => {
    let response;
    if (accessToken === null) {
      response = await axios.get(`/lectures/${lectureId}`);
    } else {
      response = await axios.get(`/lectures/${lectureId}`, axiosConfig(accessToken));
    }
    return response;
  },
  postLectureScrap: async (accessToken, lectureId) => {
    const response = await axios.post(
      `/scrap/lecture`,
      { id: lectureId },
      axiosConfig(accessToken)
    );
    return response;
  },
  deleteLectureScrap: async (accessToken, lectureId) => {
    const obj = axiosConfig(accessToken);
    obj["data"] = [lectureId];
    const response = await axios.delete(`/scrap/lecture`, obj);
    return response;
  },
  getLectureReviews: async (accessToken, lectureId, filterOptions = {}) => {
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
      response = await axios.get(`/reviews/lectures/${lectureId}?${query}`);
    } else {
      response = await axios.get(
        `/reviews/lectures/${lectureId}?${query}`,
        axiosConfig(accessToken)
      );
    }
    return response;
  },
  postLectureReview: async (accessToken, form) => {
    const response = await axios.post(`/reviews`, form, axiosConfig(accessToken));
    return response;
  },
  postLectureReviewLike: async (accessToken, reviewId) => {
    const response = await axios.post(
      `/review/recommend`,
      { id: reviewId },
      axiosConfig(accessToken)
    );
    return response;
  },
  reportLectureReview: async (accessToken, reviewId, reportId) => {
    const response = await axios.post(
      `/review/report`,
      { content_id: reviewId, report_id: reportId },
      axiosConfig(accessToken)
    );
    return response;
  },
  getLectureClassInfo: async (accessToken, lectureId) => {
    const response = await axios.get(
      `/class/lectures/${lectureId}`,
      axiosConfig(accessToken)
    );
    return response;
  },
  getLectureSemesterDates: async (accessToken, lectureId) => {
    const response = await axios.get(
      `/semesterdates/lectures/${lectureId}`,
      axiosConfig(accessToken)
    );
    return response;
  },
  getEvaluationRating: async (lectureId) => {
    const response = await axios.get(`/evaluation/rating/${lectureId}`);
    return response;
  },
  getEvaluationTotal: async (lectureId) => {
    const response = await axios.get(`/evaluation/total/${lectureId}`);
    return response;
  },
  getTimetables: async (accessToken, semesterDatas) => {
    const response = await Promise.all(
      semesterDatas.map(async (semesterDataId) => {
        return await axios.get(
          `/timetable?semesterDateId=${semesterDataId}`,
          axiosConfig(accessToken)
        );
      })
    );
    return response;
  },
  addTimetablesLecture: async (accessToken, timeTableId, lectureClassId) => {
    const response = await axios.post(
      `/timetable/lecture`,
      { lecture_timetable_id: lectureClassId, user_timetable_id: timeTableId },
      axiosConfig(accessToken)
    );
    return response;
  },
  removeTimetablesLecture: async (accessToken, timeTableId, lectureClassId) => {
    const obj = axiosConfig(accessToken);
    obj["data"] = {
      lecture_timetable_id: lectureClassId,
      user_timetable_id: timeTableId,
    };

    const response = await axios.delete(`/timetable/lecture`, obj);
    return response;
  },
};
