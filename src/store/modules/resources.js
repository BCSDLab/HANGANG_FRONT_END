// Actions
const SET_DEPARTMENT = "SET_DEPARTMENT";
const SET_KEYWORD = "SET_KEYWORD";
const SET_RESOURCES_FILTER = "SET_RESOURCES_FILTER";
const SET_DEFAULT_RESOURCE_FILTER = "SET_DEFAULT_RESOURCE_FILTER";

const SET_LOADING_START = "SET_LOADING_START";
const SET_LOADING_FINISHED = "SET_LOADING_FINISHED";

// Action Creators
export const setDepartment = (payload) => ({ type: SET_DEPARTMENT, payload });
export const setKeyword = (payload) => ({ type: SET_KEYWORD, payload });
export const setResourcesFilter = (payload) => ({ type: SET_RESOURCES_FILTER, payload });
export const setDefaultResourceFilter = () => ({ type: SET_DEFAULT_RESOURCE_FILTER });

export const requestResources = () => ({ type: SET_LOADING_START });
export const requestFinished = () => ({ type: SET_LOADING_FINISHED });

const DEFAULT_FILTER_OPTIONS = {
  // TODO: 현재 백엔드 API에서 sort, criteria 받지 못하고 있음. 추후에 주석 지우고 수정할 것
  // sort:"최신순",
  // criteria:"",
  category: [],
};

const FILTER_OPTIONS = {
  cursor: 0,
  department: "",
  keyword: "",
  limit: 1000,
  order: "",
  page: 1,
  ...DEFAULT_FILTER_OPTIONS,
  isLoading: false,
};

export default function resourceReducer(state = FILTER_OPTIONS, action) {
  switch (action.type) {
    case SET_RESOURCES_FILTER:
      // eslint-disable-next-line no-case-declarations
      let { key, value } = action.payload;

      switch (key) {
        case "sort":
          // TODO: 현재 백엔드 API에서 sort, criteria 받지 못하고 있음. 추후에 주석 지우고 수정할 것
          // case "criteria":
          //   return {
          //     ...state,
          //     [key]: value,
          //   };
          return {
            ...state,
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
    case SET_DEPARTMENT:
      return {
        ...state,
        department: action.payload.department,
      };
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload.keyword,
      };
    default:
      return state;
  }
}
