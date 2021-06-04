import { rest } from "lodash";

// Actions
const SET_LECTURE_INFO = "SET_LECTURE_INFO";
const CLICK_SCRAP_ICON = "CLICK_SCRAP_ICON";
const UNCLICK_SCRAP_ICON = "UNCLICK_SCRAP_ICON";
const CLICK_LIKE_ICON = "CLICK_LIKE_ICON";
const OPEN_ADDITIONAL_MODAL = "OPEN_ADDITIONAL_MODAL";
const CLOSE_ADDITIONAL_MODAL = "CLOSE_ADDITIONAL_MODAL";
const SET_LECTURE_FILTER = "SET_LECTURE_FILTER";
const SET_DEFAULT_LECTURE_FILTER = "SET_DEFAULT_LECTURE_FILTER";
const ADD_NEXT_PAGE_REVIEWS = "ADD_NEXT_PAGE_REVIEWS";

const SET_LOADING_START = "SET_LOADING_START";
const SET_LOADING_FINISHED = "SET_LOADING_FINISHED";

// Action Creators
export const setLectureInfo = (payload) => ({ type: SET_LECTURE_INFO, payload });
export const clickScrapIcon = (payload) => ({ type: CLICK_SCRAP_ICON, payload });
export const unclickScrapIcon = (payload) => ({ type: UNCLICK_SCRAP_ICON, payload });
export const clickLikeIcon = (payload) => ({ type: CLICK_LIKE_ICON, payload });
export const openAdditionalModal = () => ({ type: OPEN_ADDITIONAL_MODAL });
export const closeAdditionalModal = () => ({ type: CLOSE_ADDITIONAL_MODAL });
export const addNextPageReviews = (payload) => ({
  type: ADD_NEXT_PAGE_REVIEWS,
  payload,
});
const defaultFilterOptions = {
  sort: "좋아요순",
};
const MODAL_STATE = {
  isAdditionalModalOpened: false,
};
const REVIEW_STATE = {
  limit: 5,
  page: 1,
  maxPage: 1,
};

const STATE = {
  isLoading: false,
  lectureReviews: {},
  ...defaultFilterOptions,
  ...MODAL_STATE,
  ...REVIEW_STATE,
};

export default function lectureDetailReducer(state = STATE, action) {
  console.log("[lectureDetailReducer] => " + action.type, action, state);
  switch (action.type) {
    case SET_LECTURE_INFO:
      return {
        ...state,
        ...action.payload[0].data,
        lectureReviews: action.payload[1].data,
        lectureEvaluationRating: action.payload[2].data,
        lectureEvaluationTotal: action.payload[3].data,
        lectureClassInfo: action.payload[4].data,
        maxPage: Math.ceil(action.payload[1].data.count / state.limit),
      };

    case CLICK_SCRAP_ICON:
      return {
        ...state,
        is_scraped: !state.is_scraped,
      };
    case UNCLICK_SCRAP_ICON:
      return {
        ...state,
        user_scrap_id: 0,
      };
    case CLICK_LIKE_ICON:
      console.log("CLICK_LIKE_ICON=>" + action);
      return {
        ...state,
        lectureReviews: {
          ...state.lectureReviews,
          result: [
            ...state.lectureReviews.result,
            {
              ...state.lectureReviews.result[idx],
              is_liked: !state.lectureReviews.result[idx].is_liked,
              likes: state.lectureReviews.result[idx]
                ? state.lectureReviews.result[idx].likes - 1
                : state.lectureReviews.result[idx].likes + 1,
            },
          ],
        },
        likes: state.is_liked ? state.likes - 1 : state.likes + 1,
        is_liked: !state.is_liked,
      };
    case OPEN_ADDITIONAL_MODAL:
      return {
        ...state,
        isAdditionalModalOpened: true,
      };
    case CLOSE_ADDITIONAL_MODAL:
      return {
        ...state,
        isAdditionalModalOpened: false,
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
    case ADD_NEXT_PAGE_REVIEWS:
      return {
        ...state,
        lectureReviews: {
          count: action.payload.count,
          result: [...state.lectureReviews.result, ...action.payload.result],
        },
        page: ++state.page,
      };
    default:
      return state;
  }
}
