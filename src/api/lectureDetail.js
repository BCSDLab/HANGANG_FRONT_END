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
   * TODO:
   * - 순서는 어떻게 처리 할건지?
   * @param {*} accessToken
   * @param {*} lectureId
   * @returns
   */
  getLectureReviews: async (accessToken, lectureId, limit = 5) => {
    const response = await axios.get(
      `/reviews/lectures/${lectureId}?limit=${limit}&page=1`,
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
};
