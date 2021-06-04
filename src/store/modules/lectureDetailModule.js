// Actions
const SET_LECTURE_INFO = "SET_LECTURE_INFO";
const SET_LECTURE_REVIEWS = "SET_LECTURE_REVIEWS";

const CLICK_SCRAP_ICON = "CLICK_SCRAP_ICON";
const UNCLICK_SCRAP_ICON = "UNCLICK_SCRAP_ICON";
const CLICK_LIKE_ICON = "CLICK_LIKE_ICON";

const OPEN_FILTER_MODAL = "OPEN_FILTER_MODAL";
const CLOSE_FILTER_MODAL = "CLOSE_FILTER_MODAL";
const OPEN_TIMETABLE_MODAL = "OPEN_TIMETABLE_MODAL";
const CLOSE_TIMETABLE_MODAL = "CLOSE_TIMETABLE_MODAL";

const SET_LECTURE_REVIEW_FILTER = "SET_LECTURE_REVIEW_FILTER";
const SET_DEFAULT_LECTURE_REVIEW_FILTER = "SET_DEFAULT_LECTURE_REVIEW_FILTER";

const ADD_NEXT_PAGE_REVIEWS = "ADD_NEXT_PAGE_REVIEWS";

const SET_REVIEWS_LOADING_START = "SET_REVIEWS_LOADING_START";
const SET_REVIEWS_LOADING_FINISHED = "SET_REVIEWS_LOADING_FINISHED";

// Action Creators
export const setLectureInfo = (payload) => ({ type: SET_LECTURE_INFO, payload });
export const setLectureReviews = (payload) => ({ type: SET_LECTURE_REVIEWS, payload });

export const clickScrapIcon = (payload) => ({ type: CLICK_SCRAP_ICON, payload });
export const unclickScrapIcon = (payload) => ({ type: UNCLICK_SCRAP_ICON, payload });
export const clickLikeIcon = (payload) => ({ type: CLICK_LIKE_ICON, payload });

export const openFilterModal = () => ({ type: OPEN_FILTER_MODAL });
export const closeFilterModal = () => ({ type: CLOSE_FILTER_MODAL });
export const openTimetableModal = () => ({ type: OPEN_TIMETABLE_MODAL });
export const closeTimetableModal = () => ({ type: CLOSE_TIMETABLE_MODAL });

export const setLectureReviewFilter = (payload) => ({
  type: SET_LECTURE_REVIEW_FILTER,
  payload,
});
export const setDefaultLectureReviewFilter = () => ({
  type: SET_DEFAULT_LECTURE_REVIEW_FILTER,
});

export const requestLectureReviews = () => ({ type: SET_REVIEWS_LOADING_START });
export const requestLectureReviewsFinished = () => ({
  type: SET_REVIEWS_LOADING_FINISHED,
});

export const addNextPageReviews = (payload) => ({
  type: ADD_NEXT_PAGE_REVIEWS,
  payload,
});

const defaultFilterOptions = {
  sort: "좋아요순",
};
const MODAL_STATE = {
  isFilterModalOpened: false,
  isTimeTableModalOpened: false,
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
/**
 *  TODO:
 * - 스크랩 취소시 오류(API 호출방법 ??) -> 백엔드 질문 해봐야 함
 * - CLOSe_~_MODEL 필요 없으면 삭제할 예정
 * @param {*} state
 * @param {*} action
 * @returns
 */
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
    case SET_LECTURE_REVIEWS:
      return {
        ...state,
        lectureReviews: action.payload,
        maxPage: Math.ceil(action.payload.count / state.limit),
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
      const likeReflectedReviews = getLikeReflectedResult(
        state.lectureReviews,
        action.payload.idx
      );
      return {
        ...state,
        lectureReviews: likeReflectedReviews,
      };
    case OPEN_FILTER_MODAL:
      return {
        ...state,
        isFilterModalOpened: !state.isFilterModalOpened,
      };
    case CLOSE_FILTER_MODAL:
      return {
        ...state,
        isFilterModalOpened: false,
      };
    case OPEN_TIMETABLE_MODAL:
      return {
        ...state,
        isTimetableModalOpened: true,
      };
    case CLOSE_TIMETABLE_MODAL:
      return {
        ...state,
        isTimetableModalOpened: false,
      };
    case SET_LECTURE_REVIEW_FILTER:
      return {
        ...state,
        sort: action.payload.sort,
      };
    case SET_DEFAULT_LECTURE_REVIEW_FILTER:
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
    case SET_REVIEWS_LOADING_START:
      return {
        ...state,
        isLoading: true,
        page: 1,
        lectureReviews: { count: 0, result: [] },
      };
    case SET_REVIEWS_LOADING_FINISHED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

/**
 * 좋아요를 누른 글에 좋아요 수 반영 및 좋아요 토글하는 함수
 * @param {*} lectureReviews
 * @param {*} idx
 * @returns
 */
const getLikeReflectedResult = (lectureReviews, idx) => {
  lectureReviews.result[idx].is_liked = !lectureReviews.result[idx].is_liked;
  lectureReviews.result[idx].is_liked
    ? lectureReviews.result[idx].likes++
    : lectureReviews.result[idx].likes--;

  return lectureReviews;
};