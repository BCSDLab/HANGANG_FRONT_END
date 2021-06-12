// Actions
const SET_LECTURE_INFO = "SET_LECTURE_INFO";
const SET_LECTURE_REVIEWS = "SET_LECTURE_REVIEWS";
const SET_LECTURE_RESOURCES = "SET_LECTURE_RESOURCES";

const CLICK_SCRAP_ICON = "CLICK_SCRAP_ICON";
const UNCLICK_SCRAP_ICON = "UNCLICK_SCRAP_ICON";
const CLICK_LIKE_ICON = "CLICK_LIKE_ICON";
const CLICK_TIMETABLE_ADD_REMOVE_ICON = "CLICK_TIMETABLE_ADD_REMOVE_ICON";

const OPEN_FILTER_MODAL = "OPEN_FILTER_MODAL";
const CLOSE_FILTER_MODAL = "CLOSE_FILTER_MODAL";

const OPEN_TIMETABLE_MODAL = "OPEN_TIMETABLE_MODAL";
const SET_LECTURE_TIMETABLES = "SET_LECTURE_TIMETABLES";
const CLOSE_TIMETABLE_MODAL = "CLOSE_TIMETABLE_MODAL";

const SET_LECTURE_REVIEW_FILTER = "SET_LECTURE_REVIEW_FILTER";
const SET_DEFAULT_LECTURE_REVIEW_FILTER = "SET_DEFAULT_LECTURE_REVIEW_FILTER";

const ADD_NEXT_PAGE_REVIEWS = "ADD_NEXT_PAGE_REVIEWS";
const ADD_NEXT_PAGE_RESROUCES = "ADD_NEXT_PAGE_RESROUCES";

const SET_REVIEWS_LOADING_START = "SET_REVIEWS_LOADING_START";
const SET_REVIEWS_LOADING_FINISHED = "SET_REVIEWS_LOADING_FINISHED";

// Action Creators
export const setLectureInfo = (payload) => ({ type: SET_LECTURE_INFO, payload });
export const setLectureReviews = (payload) => ({ type: SET_LECTURE_REVIEWS, payload });
export const setLectureResources = (payload) => ({
  type: SET_LECTURE_RESOURCES,
  payload,
});

export const clickScrapIcon = (payload) => ({ type: CLICK_SCRAP_ICON, payload });
export const unclickScrapIcon = (payload) => ({ type: UNCLICK_SCRAP_ICON, payload });
export const clickLikeIcon = (payload) => ({ type: CLICK_LIKE_ICON, payload });
export const clickTitmetableAddRemoveButtom = (payload) => ({
  type: CLICK_TIMETABLE_ADD_REMOVE_ICON,
  payload,
});

export const openFilterModal = () => ({ type: OPEN_FILTER_MODAL });
export const closeFilterModal = () => ({ type: CLOSE_FILTER_MODAL });
export const openTimetableModal = () => ({ type: OPEN_TIMETABLE_MODAL });
export const setLectureTimetables = (payload) => ({
  type: SET_LECTURE_TIMETABLES,
  payload,
});
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
export const addNextPageResources = (payload) => ({
  type: ADD_NEXT_PAGE_RESROUCES,
  payload,
});

const defaultFilterOptions = {
  sort: "좋아요순",
};
const MODAL_STATE = {
  isFilterModalOpened: false,
  isTimetableModalOpened: false,
};
const REVIEW_STATE = {
  limit: 5,
  page: 1,
  resourcePage: 0,
  maxPage: 1,
  maxResourcePage: 1,
};
const STATE = {
  isLoading: false,
  isFetchedOnFirstReviewsMount: false,
  lectureReviews: {},
  timetables: [],
  timetablesLectures: [],
  lectureResources: { count: 0, result: [] },
  ...defaultFilterOptions,
  ...MODAL_STATE,
  ...REVIEW_STATE,
};
/**
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
        semesterDates: action.payload[5].data,
      };
    case SET_LECTURE_REVIEWS:
      return {
        ...state,
        lectureReviews: action.payload,
        maxPage: Math.ceil(action.payload.count / state.limit),
      };
    case SET_LECTURE_RESOURCES:
      return {
        ...state,
        lectureResources: action.payload,
        maxResourcePage: Math.ceil(action.payload.count / state.limit),
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
    case CLICK_TIMETABLE_ADD_REMOVE_ICON:
      const timetableReflectedResult = getTimetableReflectedResult(
        state.timetables,
        action.payload.index,
        action.payload.idx
      );
      return {
        ...state,
        timetables: timetableReflectedResult,
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
    case SET_LECTURE_TIMETABLES:
      // const convertedTimetables = getDatasFrom2DepthPayload(action.payload[0]);
      const convertedTimetables = getConvertedTimtableList(
        action.payload[0],
        action.payload[1],
        state.id
      );
      const convertedTimetablesLectures = getDatasFrom1DepthPayload(action.payload[1]);

      return {
        ...state,
        timetables: convertedTimetables,
        timetablesLectures: convertedTimetablesLectures,
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
    case ADD_NEXT_PAGE_RESROUCES:
      return {
        ...state,
        lectureResources: {
          count: action.payload.count,
          result: [...state.lectureResources.result, ...action.payload.result],
        },
        resourcePage: ++state.resourcePage,
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
        isFetchedOnFirstReviewsMount: true,
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
/**
 *
 * @param {*} timetables
 * @param {*} index
 * @param {*} idx
 * @returns
 */
const getTimetableReflectedResult = (timeTables, index, idx) => {
  console.log(timeTables);
  timeTables[index][idx].is_added = !timeTables[index][idx].is_added;
  return timeTables;
};

/**
 *
 * @param {*} data
 * @param {*} lectureLists
 * @param {*} lectureId
 * @returns
 */
const getConvertedTimtableList = (data = [], lectureLists = [], lectureId = 0) => {
  let result = [data].map((el) => {
    el.data.map((datas, idx) => {
      datas.is_added = false;
      if (lectureLists[idx].data.lectureList.length != 0) {
        let tmp = lectureLists[idx].data.lectureList.map(({ id }) => {
          return id;
        });
        datas.is_added = tmp.indexOf(lectureId) != -1 ? true : false;
      }
    });

    return el.data;
  });

  return result;
};

/**
 * 순수 데이터 배열로 재 구성
 * @param {*} array
 * @returns
 */
const getDatasFrom2DepthPayload = (data = []) => {
  let result = [data].map((el) => {
    console.log(el);
    return el.data;
  });
  console.log("getDatasFrom2DepthPayload=> " + result);
  return result;
};
const getDatasFrom1DepthPayload = (data = []) => {
  let result = data.map((el) => {
    console.log(el);
    return el.data;
  });

  console.log("getDatasFrom1DepthPayload=> " + result);
  return result;
};
