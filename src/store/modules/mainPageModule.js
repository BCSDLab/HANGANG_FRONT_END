const SET_RECOMMEND_RESOURCES = "SET_RECOMMEND_RESOURCES";
const SET_MY_TIMETABLE = "SET_MY_TIMETABLE";

export const setRecommendResources = (payload) => ({
  type: SET_RECOMMEND_RESOURCES,
  payload,
});
export const setMyTimetable = (payload) => ({ type: SET_MY_TIMETABLE, payload });

const STATE = {
  recommendResources: [],
  lectureList: [],
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
    default:
      return state;
  }
}
