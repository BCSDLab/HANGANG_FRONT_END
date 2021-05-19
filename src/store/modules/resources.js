/* eslint-disable no-case-declarations */
// Actions
const SET_DEPARTMENT = "SET_DEPARTMENT";
const SET_RESOURCE_KEYWORD = "SET_RESOURCE_KEYWORD";
const SET_RESOURCES_FILTER = "SET_RESOURCES_FILTER";
const SET_DEFAULT_RESOURCE_FILTER = "SET_DEFAULT_RESOURCE_FILTER";

const SET_LOADING_START = "SET_LOADING_START";
const SET_LOADING_FINISHED = "SET_LOADING_FINISHED";

// Action Creators
export const setDepartment = (payload) => ({ type: SET_DEPARTMENT, payload });
export const setResourceKeyword = (payload) => ({ type: SET_RESOURCE_KEYWORD, payload });
export const setResourcesFilter = (payload) => ({ type: SET_RESOURCES_FILTER, payload });
export const setDefaultResourceFilter = () => ({ type: SET_DEFAULT_RESOURCE_FILTER });

export const requestResources = () => ({ type: SET_LOADING_START });
export const requestFinished = () => ({ type: SET_LOADING_FINISHED });

const DEFAULT_FILTER_OPTIONS = {
  order: "id",
  category: [],
};

const FILTER_OPTIONS = {
  department: "",
  keyword: "",
  limit: 10,
  page: 1,
  ...DEFAULT_FILTER_OPTIONS,
  isLoading: false,
};

export default function resourceReducer(state = FILTER_OPTIONS, action) {
  switch (action.type) {
    case SET_RESOURCES_FILTER:
      let { key, value } = action.payload;

      switch (key) {
        case "order":
          return {
            ...state,
            [key]: value,
          };
        case "category":
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
    case SET_DEFAULT_RESOURCE_FILTER:
      return {
        ...state,
        ...DEFAULT_FILTER_OPTIONS,
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
    case SET_RESOURCE_KEYWORD:
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