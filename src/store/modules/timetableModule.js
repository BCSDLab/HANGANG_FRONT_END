/* eslint-disable no-case-declarations */
// Actions
const SET_FILTER_OPTION = "SET_FILTER_OPTION";
const SET_DEFAULT_FILTER_OPTION = "SET_DEFAULT_FILTER_OPTION";
const SET_LECTURE_LIST = "SET_LECTURE_LIST";

// Action Creator
export const setFilterOption = (payload) => ({ type: SET_FILTER_OPTION, payload });
export const setDefaultFilterOption = () => ({ type: SET_DEFAULT_FILTER_OPTION });
export const setLectureList = (payload) => ({ type: SET_LECTURE_LIST, payload });

// State
const DEFAULT_SEARCH_LECTURE_OPTION = {
  classification: [], //  유형
  department: "", //  학과
  keyword: "", //  검색어
  limit: 20,
  page: 1,
  semesterDateId: 5,
};

const STATE = {
  ...DEFAULT_SEARCH_LECTURE_OPTION,
  lectureList: [],
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
        lectureList: action.payload,
      };
    default:
      return state;
  }
}
