/* eslint-disable no-case-declarations */
// Actions
const SET_FILTER_OPTION = "SET_FILTER_OPTION";
const SET_DEFAULT_FILTER_OPTION = "SET_DEFAULT_FILTER_OPTION";
const SET_LECTURE_LIST = "SET_LECTURE_LIST";

const SET_DISPLAY_TIMETABLE = "SET_DISPLAY_TIMETABLE";
const SET_USER_CREATED_TIMETABLE = "SET_USER_CREATED_TIMETABLE";
const REMOVE_TIMETABLE_ON_LIST = "REMOVE_TIMETABLE_ON_LIST";

const SET_CANDIDATE_CLASS_TIMES = "SET_CANDIDATE_CLASS_TIMES";
const REMOVE_CANDIDATE_CLASS_TIMES = "REMOVE_CANDIDATE_CLASS_TIMES";

const SET_LECTURE_ON_LECTURE_LIST = "SET_LECTURE_ON_LECTURE_LIST";

// Action Creator
export const setFilterOption = (payload) => ({ type: SET_FILTER_OPTION, payload });
export const setDefaultFilterOption = () => ({ type: SET_DEFAULT_FILTER_OPTION });
export const setLectureList = (payload) => ({ type: SET_LECTURE_LIST, payload });

export const setDisplayTimetable = (payload) => ({
  type: SET_DISPLAY_TIMETABLE,
  payload,
});
export const setUserCreatedTimetable = (payload) => ({
  type: SET_USER_CREATED_TIMETABLE,
  payload,
});
export const removeTimetableOnList = (payload) => ({
  type: REMOVE_TIMETABLE_ON_LIST,
  payload,
});

export const setCandidateClassTimes = (payload) => ({
  type: SET_CANDIDATE_CLASS_TIMES,
  payload,
});
export const removeCandidateClassTimes = () => ({ type: REMOVE_CANDIDATE_CLASS_TIMES });

export const setLectureOnLectureList = (payload) => ({
  type: SET_LECTURE_ON_LECTURE_LIST,
  payload,
});

// State
const DEFAULT_SEARCH_LECTURE_OPTION = {
  classification: [], //  유형
  department: "", //  학과
  keyword: "", //  검색어
  limit: 20,
  page: 1,
  semesterDateId: 5,
};

const TIMETABLE_STATE = {
  displayTimetable: [],
  userCreatedTimetable: [],
};

const CANDIDATE_LECTURE = {
  candidateLectureClassTimes: [],
};

const STATE = {
  ...DEFAULT_SEARCH_LECTURE_OPTION,
  ...TIMETABLE_STATE,
  ...CANDIDATE_LECTURE,
  lectureList: [],
  amount: 0,
};

// Reducer
export default function timetableReducer(state = STATE, action) {
  switch (action.type) {
    case SET_FILTER_OPTION:
      let { key, value } = action.payload;

      switch (key) {
        case "classification":
          if (state[key].includes(value)) {
            return {
              ...state,
              [key]: [...state[key]].filter((elem) => elem !== value),
            };
          } else {
            return {
              ...state,
              [key]: [...state[key], value],
            };
          }
        case "department":
          return {
            ...state,
            [key]: state[key] === value ? "" : value,
          };
        default:
          return {
            ...state,
            [key]: value,
          };
      }
    case SET_DEFAULT_FILTER_OPTION:
      return {
        ...state,
        classification: [],
      };
    case SET_LECTURE_LIST:
      return {
        ...state,
        amount: action.payload.count,
        lectureList: action.payload.result,
      };
    case SET_DISPLAY_TIMETABLE:
      return {
        ...state,
        displayTimetable: action.payload.displayTimetable,
      };
    case SET_USER_CREATED_TIMETABLE:
      return {
        ...state,
        userCreatedTimetable: action.payload.userCreatedTimetable,
      };
    case REMOVE_TIMETABLE_ON_LIST:
      return {
        ...state,
        userCreatedTimetable: state.userCreatedTimetable.filter(
          (elem) => elem.id !== action.payload.id
        ),
      };
    case SET_CANDIDATE_CLASS_TIMES:
      return {
        ...state,
        candidateLectureClassTimes: action.payload.class_time,
      };
    case REMOVE_CANDIDATE_CLASS_TIMES:
      return {
        ...state,
        candidateLectureClassTimes: [],
      };
    case SET_LECTURE_ON_LECTURE_LIST:
      return {
        ...state,
        displayTimetable: {
          ...state.displayTimetable,
          lectureList: [...state.displayTimetable.lectureList, action.payload.lecture],
        },
      };
    default:
      return state;
  }
}
