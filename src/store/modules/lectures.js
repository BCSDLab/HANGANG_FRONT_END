// Actions
const SET_DEPARTMENT = "SET_DEPARTMENT";
const SET_LECTURE_FILTER = "SET_LECTURE_FILTER";
const SET_DEFAULT_LECTURE_FILTER = "SET_DEFAULT_LECTURE_FILTER";

// Action Creators
export const setDepartment = (payload) => ({ type: SET_DEPARTMENT, payload });
export const setLectureFilter = (payload) => ({ type: SET_LECTURE_FILTER, payload });
export const setDefaultLectureFilter = () => ({ type: SET_DEFAULT_LECTURE_FILTER });

const defaultFilterOptions = {
  sort: "평점순",
  classification: [],
  hashtag: [],
};

const INITIAL_FILTER_OPTIONS = {
  keyword: "",
  department: "교양학부",
  limit: 8,
  page: 1,
  ...defaultFilterOptions,
};

export default function lectureReducer(state = INITIAL_FILTER_OPTIONS, action) {
  switch (action.type) {
    case SET_DEPARTMENT:
      console.log(action.payload);
      return {
        ...state,
        department: action.payload.department,
      };
    case SET_LECTURE_FILTER:
      // eslint-disable-next-line no-case-declarations
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
      }

      return {
        ...state,
      };

    case SET_DEFAULT_LECTURE_FILTER:
      return {
        ...state,
        ...defaultFilterOptions,
      };

    default:
      return state;
  }
}
