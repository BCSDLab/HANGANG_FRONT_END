import axios from "axios";

export default {
    /**
     * lectureId를 이용해 강의 정보 가져오기
     * @param {*} accessToken 
     * @param {*} lectureId 
     * @returns 
     */
    getLectureReviewTimetable: async (accessToken, lectureId) => {
        let config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const response = await axios.get(`/reviews/timetable/lecture?lectureId=${lectureId}`, config);
        return response;
    },
    /**
     * lectureId를 이용해 강의평 리스트 가져오기
     * TODO:
     * - 순서는 어떻게 처리 할지?
     * @param {*} accessToken 
     * @param {*} lectureId 
     * @returns 
     */
    getLectureReviews: async (accessToken, lectureId) => {
        let config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        // let query = "";

        // Object.entries(orderOptions).forEach(([key, value]) => {
        // if (typeof value === "string" && value.length === 0) return;
        // if (typeof value === "object") {
        //     if (value.length === 0) return;
        //     else {
        //     query += `${key}=${value.join(",")}&`;
        //     return;
        //     }
        // }

        // query += `${key}=${value}&`;
        // });
        // query = query.slice(0, -1);

        const response = await axios.get(`/reviews/lectures/${lectureId}?limit=10&page=1`, config);
        return response;
    },
    /**
     * 분반 정보 가져오기
     * @param {*} accessToken 
     * @param {*} lectureId 
     * @returns 
     */
    getLectureInfo: async (accessToken, lectureId) => {
        let config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const response = await axios.get(`/class/lectures/${lectureId}`, config);
        return response;
    },
    /**
     * 개설학기 정보 가져오기
     * @param {*} accessToken 
     * @param {*} lectureId 
     * @returns 
     */
    getLectureSemesterDates: async (accessToken, lectureId) => {
        let config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const response = await axios.get(`semesterdates/lectures/${lectureId}`, config);
        return response;
    },
    
};
