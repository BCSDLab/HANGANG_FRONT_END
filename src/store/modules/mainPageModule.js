const SET_MY_TIMETABLE = "SET_MY_TIMETABLE";

export const setMyTimetable = (payload) => ({ type: SET_MY_TIMETABLE, payload });

const STATE = {
  lectureList: [],
};

export default function mainPageReducer(state = STATE, action) {
  switch (action.type) {
    case SET_MY_TIMETABLE:
      return {
        ...state,
        lectureList: action.payload.lectureList,
      };
    default:
      return state;
  }
}
