/* eslint-disable no-case-declarations */
// Actions
const SET_KEYWORD_ON_RESOURCES = "SET_KEYWORD_ON_RESOURCES";
const SET_DEPARTMENT_ON_RESOURCES = "SET_DEPARTMENT_ON_RESOURCES";
const SET_RESOURCES_FILTER = "SET_RESOURCES_FILTER";
const SET_DEFAULT_RESOURCE_FILTER = "SET_DEFAULT_RESOURCE_FILTER";

const SET_RESOURCES_LOADING_START = "SET_RESOURCES_LOADING_START";

const SET_RESOURCES = "SET_RESOURCES";

const SET_CREATE_RESOURCE = "SET_CREATE_RESOURCE";

// Action Creators
export const setKeywordOnResources = (payload) => ({
  type: SET_KEYWORD_ON_RESOURCES,
  payload,
});
export const setDepartmentOnResources = (payload) => ({
  type: SET_DEPARTMENT_ON_RESOURCES,
  payload,
});
export const setResourcesFilter = (payload) => ({ type: SET_RESOURCES_FILTER, payload });
export const setDefaultResourceFilter = () => ({ type: SET_DEFAULT_RESOURCE_FILTER });

export const requestResources = () => ({ type: SET_RESOURCES_LOADING_START });

export const setResources = (payload) => ({ type: SET_RESOURCES, payload });
export const setCreateResource = (payload) => ({ type: SET_CREATE_RESOURCE, payload });

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
  isLoading: true,
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
    case SET_DEPARTMENT_ON_RESOURCES:
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
        page: 1,
        resources: [],
      };
    case SET_KEYWORD_ON_RESOURCES:
      return {
        ...state,
        keyword: action.payload.keyword,
      };
    case SET_RESOURCES_LOADING_START:
      return {
        ...state,
        isLoading: true,
        page: 1,
        resources: [],
      };
    case SET_RESOURCES:
      return {
        ...state,
        resources: [...state.resources, ...action.payload.result],
        resource_amount: action.payload.count,
        page: ++state.page,
        max_page: Math.ceil(action.payload.count / state.limit),
        isLoading: false,
      };
    case SET_CREATE_RESOURCE:
      return {
        ...state,
        resources: [action.payload.resource, ...state.resources],
        resource_amount: action.payload.count + 1,
        max_page: Math.ceil(action.payload.count + 1 / state.limit),
      };
    default:
      return {
        ...state,
      };
  }
}
