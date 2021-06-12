import axios from "axios";
import lecture from "./lecture";
/**
 * accessToken
 * @param {*} accessToken
 * @param {*} data
 * @returns
 */
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
  /**
   * lectureId를 이용해 강의 정보 가져오기
   * @param {*} accessToken
   * @param {*} lectureId
   * @returns
   */
  getLectureInfo: async (accessToken, lectureId) => {
    const response = await axios.get(`/lectures/${lectureId}`, axiosConfig(accessToken));
    return response;
  },
  /**
   * lectureId를 이용해 강의 스크랩하기
   * @param {*} accessToken
   * @param {*} lectureId
   * @returns
   */
  postLectureScrap: async (accessToken, lectureId) => {
    const response = await axios.post(
      `/scrap/lecture`,
      { id: lectureId },
      axiosConfig(accessToken)
    );
    return response;
  },
  /**
   * lectureId를 이용해 강의 스크랩 삭제하기
   * @param {*} accessToken
   * @param {*} lectureId
   * @returns
   */
  deleteLectureScrap: async (accessToken, lectureId) => {
    const obj = axiosConfig(accessToken);
    obj["data"] = [lectureId];
    const response = await axios.delete(`/scrap/lecture`, obj);
    return response;
  },
  /**
   * lectureId를 이용해 강의평 리스트 가져오기
   * @param {*} accessToken 토큰
   * @param {*} lectureId 강의 아이디
   * @param {*} limit   조회 강의평 개수
   * @param {*} sort    강의평 조회 순서
   * @param {*} page    강의평 페이지
   * @returns
   */
  getLectureReviews: async (
    accessToken,
    lectureId,
    limit = 10,
    page = 1,
    sort = "좋아요순"
  ) => {
    const response = await axios.get(
      `/reviews/lectures/${lectureId}?limit=${limit}&page=${page}&sort=${sort}`,
      axiosConfig(accessToken)
    );
    return response;
  },
  /**
  /**
   *  review id를 이용해 좋아요 처리
   * @param {*} accessToken
   * @param {*} lectureId
   * @returns
   */
  postLectureReviewLike: async (accessToken, reviewId) => {
    const response = await axios.post(
      `/review/recommend`,
      { id: reviewId },
      axiosConfig(accessToken)
    );
    return response;
  },
  /**
  /**
   *  review id와 report Id를 이용해 강의 후기 신고
   * @param {*} accessToken
   * @param {*} lectureId
   * @returns
   */
  reportLectureReview: async (accessToken, reviewId, reportId) => {
    const response = await axios.post(
      `/review/report`,
      { content_id: reviewId, report_id: reportId },
      axiosConfig(accessToken)
    );
    return response;
  },
  /**
   * 분반 정보 가져오기
   * @param {*} accessToken
   * @param {*} lectureId
   * @returns
   */
  getLectureClassInfo: async (accessToken, lectureId) => {
    const response = await axios.get(
      `/class/lectures/${lectureId}`,
      axiosConfig(accessToken)
    );
    return response;
  },
  /**
   * 개설학기 정보 가져오기
   * @param {*} accessToken
   * @param {*} lectureId
   * @returns
   */
  getLectureSemesterDates: async (accessToken, lectureId) => {
    const response = await axios.get(
      `/semesterdates/lectures/${lectureId}`,
      axiosConfig(accessToken)
    );
    return response;
  },
  /**
   * 강의 평점분포
   * @param {*} accessToken
   * @param {*} lectureId
   * @returns
   */
  getEvaluationRating: async (accessToken, lectureId) => {
    const response = await axios.get(
      `/evaluation/rating/${lectureId}`,
      axiosConfig(accessToken)
    );
    return response;
  },
  /**
   * 강의 종합평가 보기
   * @param {*} accessToken
   * @param {*} lectureId
   * @returns
   */
  getEvaluationTotal: async (accessToken, lectureId) => {
    const response = await axios.get(
      `/evaluation/total/${lectureId}`,
      axiosConfig(accessToken)
    );
    return response;
  },
  /**
   * 강의 개설 학기를 받아 해당 학기 기준으로 생성된 시간표 조회하기
   * @param {*} accessToken
   * @param {*} semesterDataId
   * @returns
   */
  getTimetables: async (accessToken, semesterDatas, lectureId = 0) => {
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
  /**
   * 시간표 Id로 해당 시간표에 등록된 강의 목록 조회하기
   * @param {*} accessToken
   * @param {*} timeTableIds
   * @returns
   */
  getTimetablesLecture: async (accessToken, timeTableIds) => {
    console.log(timeTableIds);
    const response = await Promise.all(
      timeTableIds.map(async (timeTableId) => {
        return await axios.get(
          `/timetable/lecture?timeTableId=${timeTableId}`,
          axiosConfig(accessToken)
        );
      })
    );

    console.log(response);
    return response;
  },
  /**
   * 시간표 Id와 강의 id로 해당 시간표에 등록하기
   * @param {*} accessToken
   * @param {*} timeTableIds
   * @returns
   */
  addTimetablesLecture: async (accessToken, timeTableId, lectureId) => {
    const response = await axios.post(
      `/timetable/lecture`,
      { lecture_timetable_id: lectureId, user_timetable_id: timeTableId },
      axiosConfig(accessToken)
    );
    return response;
  },
  /**
   * 시간표 Id와 강의 id로 해당 시간표에서 삭제하기
   * @param {*} accessToken
   * @param {*} timeTableIds
   * @returns
   */
  removeTimetablesLecture: async (accessToken, timeTableId, lectureId) => {
    const obj = axiosConfig(accessToken);
    obj["lecture_timetable_id"] = lectureId;
    obj["user_timetable_id"] = timeTableId;
    const response = await axios.delete(`/timetable/lecture`, obj);
    return response;
  },
};
