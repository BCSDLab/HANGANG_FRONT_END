/* eslint-disable no-case-declarations */
// Actions
const SET_KEYWORD_ON_LECTURES = "SET_KEYWORD_ON_LECTURES";
const SET_DEPARTMENT_ON_LECTURES = "SET_DEPARTMENT_ON_LECTURES";
const SET_LECTURE_FILTER = "SET_LECTURE_FILTER";
const SET_DEFAULT_LECTURE_FILTER = "SET_DEFAULT_LECTURE_FILTER";

const SET_LECTURES_LOADING_START = "SET_LECTURES_LOADING_START";

const SET_LECTURES = "SET_LECTURES";
const SET_NEXT_PAGE_LECTURES = "SET_NEXT_PAGE_LECTURES";
const RESET_LECTURE_MODULE_STATE = "RESET_LECTURE_MODULE_STATE";

// Action Creators
export const setKeywordOnLectures = (payload) => ({
  type: SET_KEYWORD_ON_LECTURES,
  payload,
});
export const setDepartmentOnLectures = (payload) => ({
  type: SET_DEPARTMENT_ON_LECTURES,
  payload,
});
export const setLectureFilter = (payload) => ({ type: SET_LECTURE_FILTER, payload });
export const setDefaultLectureFilter = () => ({ type: SET_DEFAULT_LECTURE_FILTER });

export const requestLectures = () => ({ type: SET_LECTURES_LOADING_START });

export const setLectures = (payload) => ({ type: SET_LECTURES, payload });
export const setNextPageLectures = (payload) => ({
  type: SET_NEXT_PAGE_LECTURES,
  payload,
});
export const resetLectureModuleState = () => ({
  type: RESET_LECTURE_MODULE_STATE,
});

const DEFAULT_FILTER_OPTIONS = {
  sort: "평점순",
  classification: [],
  hashtag: [],
};

const INITIAL_OPTIONS = {
  keyword: "",
  department: "",
  limit: 10,
  page: 1,
  ...DEFAULT_FILTER_OPTIONS,
  isLoading: true,
};

const STATE = {
  ...INITIAL_OPTIONS,
  lectures: [],
  lecture_amount: 0,
  max_page: 0,
};

export default function lectureReducer(state = STATE, action) {
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
        ...DEFAULT_FILTER_OPTIONS,
      };
    case SET_DEPARTMENT_ON_LECTURES:
      /**
       * 유저가 같은 버튼을 클릭할 시 기존에 들어있던 부서 상태 값을 초기화시킨다.
       * case : 교양 값이 있는 상태에서 교양 버튼을 누름
       */
      let valueToChange = action.payload.department;

      if (!action.payload.allowDuplicate && state.department === valueToChange) {
        valueToChange = "";
      }
      return {
        ...state,
        department: valueToChange,
        page: 1,
        lectures: [],
        isLoading: true,
      };
    case SET_KEYWORD_ON_LECTURES:
      return {
        ...state,
        keyword: action.payload.keyword,
      };
    case SET_LECTURES_LOADING_START:
      return {
        ...state,
        isLoading: true,
        page: 1,
        lectures: [],
      };
    case SET_LECTURES:
      return {
        ...state,
        lectures: [...action.payload.result],
        lecture_amount: action.payload.count,
        max_page: Math.ceil(action.payload.count / state.limit),
        page: ++state.page,
        isLoading: false,
      };
    case SET_NEXT_PAGE_LECTURES:
      return {
        ...state,
        lectures: [...state.lectures, ...action.payload.result],
        page: ++state.page,
      };
    case RESET_LECTURE_MODULE_STATE:
      return {
        ...STATE,
      };
    default:
      return {
        ...state,
      };
  }
}
