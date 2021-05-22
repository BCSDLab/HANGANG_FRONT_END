/* eslint-disable no-case-declarations */
// Actions
const SET_DEPARTMENT = "SET_DEPARTMENT";
const SET_RESOURCE_KEYWORD = "SET_RESOURCE_KEYWORD";
const SET_RESOURCES_FILTER = "SET_RESOURCES_FILTER";
const SET_DEFAULT_RESOURCE_FILTER = "SET_DEFAULT_RESOURCE_FILTER";

const SET_RESOURCES_LOADING_START = "SET_RESOURCES_LOADING_START";
const SET_RESOURCES_LOADING_FINISHED = "SET_RESOURCES_LOADING_FINISHED";

const SET_RESOURCES = "SET_RESOURCES";
const SET_RESOURCES_NEXT_PAGE = "SET_RESOURCES_NEXT_PAGE";

// Action Creators
export const setDepartment = (payload) => ({ type: SET_DEPARTMENT, payload });
export const setResourceKeyword = (payload) => ({ type: SET_RESOURCE_KEYWORD, payload });
export const setResourcesFilter = (payload) => ({ type: SET_RESOURCES_FILTER, payload });
export const setDefaultResourceFilter = () => ({ type: SET_DEFAULT_RESOURCE_FILTER });

export const requestResources = () => ({ type: SET_RESOURCES_LOADING_START });
export const requestResourcesFinished = () => ({ type: SET_RESOURCES_LOADING_FINISHED });

export const setResources = (payload) => ({ type: SET_RESOURCES, payload });
export const setResourcesNextPage = () => ({ type: SET_RESOURCES_NEXT_PAGE });

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
  isFetchedOnFirstResourcesMount: false,
};

const STATE = {
  ...FILTER_OPTIONS,
  resources: [],
  resource_amount: 0,
};

export default function resourceReducer(state = STATE, action) {
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
    case SET_RESOURCES_LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    case SET_RESOURCES_LOADING_FINISHED:
      return {
        ...state,
        isLoading: false,
        isFetchedOnFirstResourcesMount: true,
      };
    case SET_RESOURCES:
      return {
        ...state,
        resources: [...state.resources, ...action.payload.result],
        resource_amount: action.payload.count,
        max_page: Math.ceil(action.payload.count / state.limit),
      };
    case SET_RESOURCES_NEXT_PAGE:
      return {
        ...state,
        page: state.page !== state.max_page ? state.page + 1 : state.page,
      };

    default:
      return state;
  }
}
