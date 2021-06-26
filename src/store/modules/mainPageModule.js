const SET_RECOMMEND_RESOURCES = "SET_RECOMMEND_RESOURCES";
const SET_MY_TIMETABLE = "SET_MY_TIMETABLE";
const SET_DISPLAY_LECTURE_RANKING = "SET_DISPLAY_LECTURE_RANKING";
const SET_DEPARTMENT_ON_RANKING = "SET_DEPARTMENT_ON_RANKING";

export const setRecommendResources = (payload) => ({
  type: SET_RECOMMEND_RESOURCES,
  payload,
});
export const setMyTimetable = (payload) => ({ type: SET_MY_TIMETABLE, payload });
export const setDisplayLectureRanking = (payload) => ({
  type: SET_DISPLAY_LECTURE_RANKING,
  payload,
});
export const setDepartmentOnRanking = (payload) => ({
  type: SET_DEPARTMENT_ON_RANKING,
  payload,
});

const LECTURE_RANKING_STATE = {
  currentDepartment: { label: "교양", value: "교양학부" },
  displayLectures: [],
};

const STATE = {
  recommendResources: [],
  lectureList: [],
  ...LECTURE_RANKING_STATE,
};

export default function mainPageReducer(state = STATE, action) {
  switch (action.type) {
    case SET_RECOMMEND_RESOURCES:
      return {
        ...state,
        recommendResources: action.payload.resources,
      };
    case SET_MY_TIMETABLE:
      return {
        ...state,
        lectureList: action.payload.lectureList,
      };
    case SET_DISPLAY_LECTURE_RANKING:
      return {
        ...state,
        displayLectures: action.payload.lectures,
      };
    case SET_DEPARTMENT_ON_RANKING:
      return {
        ...state,
        currentDepartment: action.payload.department,
      };
    default:
      return state;
  }
}
