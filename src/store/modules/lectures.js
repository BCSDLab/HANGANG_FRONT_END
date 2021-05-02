/* eslint-disable no-case-declarations */
// Actions
const SET_DEPARTMENT = "SET_DEPARTMENT";
const SET_KEYWORD = "SET_KEYWORD";
const SET_LECTURE_FILTER = "SET_LECTURE_FILTER";
const SET_DEFAULT_LECTURE_FILTER = "SET_DEFAULT_LECTURE_FILTER";

const SET_LOADING_START = "SET_LOADING_START";
const SET_LOADING_FINISHED = "SET_LOADING_FINISHED";

// Action Creators
export const setDepartment = (payload) => ({ type: SET_DEPARTMENT, payload });
export const setKeyword = (payload) => ({ type: SET_KEYWORD, payload });
export const setLectureFilter = (payload) => ({ type: SET_LECTURE_FILTER, payload });
export const setDefaultLectureFilter = () => ({ type: SET_DEFAULT_LECTURE_FILTER });

export const requestLectures = () => ({ type: SET_LOADING_START });
export const requestFinished = () => ({ type: SET_LOADING_FINISHED });

const defaultFilterOptions = {
  sort: "평점순",
  classification: [],
  hashtag: [],
};

const INITIAL_FILTER_OPTIONS = {
  keyword: "",
  department: "",
  limit: 10,
  page: 1,
  ...defaultFilterOptions,
  isLoading: false,
};

export default function lectureReducer(state = INITIAL_FILTER_OPTIONS, action) {
  switch (action.type) {
    case SET_LECTURE_FILTER:
      let { key, value } = action.payload;

      switch (key) {
        case "sort":
          return {
            ...state,
            [key]: value,
          };
        case "classification":
        case "hashtag":
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
        default:
          return {
            ...state,
          };
      }
    case SET_DEFAULT_LECTURE_FILTER:
      return {
        ...state,
        ...defaultFilterOptions,
      };
    case SET_DEPARTMENT:
      /**
       * 유저가 같은 버튼을 클릭할 시 기존에 들어있던 부서 상태 값을 초기화시킨다.
       * case : 교양 값이 있는 상태에서 교양 버튼을 누름
       */
      let valueToChange = action.payload.department;
      if (state.department === valueToChange) {
        valueToChange = "";
      }
      return {
        ...state,
        department: valueToChange,
      };
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload.keyword,
      };
    case SET_LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    case SET_LOADING_FINISHED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
