// Actions
const SET_LECTURE_INFO = "SET_LECTURE_INFO";
const CLICK_SCRAP_ICON = "CLICK_SCRAP_ICON";
const CLICK_LIKE_ICON = "CLICK_LIKE_ICON";
const SET_LECTURE_FILTER = "SET_LECTURE_FILTER";
const SET_DEFAULT_LECTURE_FILTER = "SET_DEFAULT_LECTURE_FILTER";

const SET_LOADING_START = "SET_LOADING_START";
const SET_LOADING_FINISHED = "SET_LOADING_FINISHED";

// Action Creators
export const setLectureInfo = (payload) => ({ type: SET_LECTURE_INFO, payload });
export const clickBookmarkIcon = () => ({ type: CLICK_SCRAP_ICON });
export const clickLikeIcon = () => ({ type: CLICK_LIKE_ICON });

const defaultFilterOptions = {
  sort: "좋아요순",
};

const INITIAL_FILTER_OPTIONS = {
  limit: 1000,
  page: 1,
  ...defaultFilterOptions,
  isLoading: false,
};

export default function lectureDetailReducer(state = INITIAL_FILTER_OPTIONS, action) {
  switch (action.type) {
    case SET_LECTURE_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case CLICK_LIKE_ICON:
      return {
        ...state,
      };
    case CLICK_SCRAP_ICON:
      return {
        ...state,
        is_scrapped: state.is_scrapped,
      };
    case SET_LECTURE_FILTER:
      // eslint-disable-next-line no-case-declarations
      let { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
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
