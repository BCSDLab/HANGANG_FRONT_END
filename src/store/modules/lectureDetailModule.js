import { getValueOnLocalStorage, setValueOnLocalStorage } from "utils/localStorageUtils";

// Actions
const SET_LECTURE_INFO = "SET_LECTURE_INFO";
const SET_LECTURE_REVIEWS = "SET_LECTURE_REVIEWS";
const ADD_LECTURE_REVIEW = "ADD_LECTURE_REVIEW";
const SET_LECTURE_CLASS_SEMESTER = "SET_LECTURE_CLASS_SEMESTER";
const SET_LECTURE_RESOURCES = "SET_LECTURE_RESOURCES";
const SET_LECTURE_TIMETABLES = "SET_LECTURE_TIMETABLES";

const CLICK_SCRAP_ICON = "CLICK_SCRAP_ICON";
const UNCLICK_SCRAP_ICON = "UNCLICK_SCRAP_ICON";
const CLICK_LIKE_ICON = "CLICK_LIKE_ICON";
const CLICK_TIMETABLE_ADD_REMOVE_ICON = "CLICK_TIMETABLE_ADD_REMOVE_ICON";

const OPEN_FILTER_MODAL = "OPEN_FILTER_MODAL";
const CLOSE_FILTER_MODAL = "CLOSE_FILTER_MODAL";
const OPEN_TIMETABLE_MODAL = "OPEN_TIMETABLE_MODAL";
const CLOSE_TIMETABLE_MODAL = "CLOSE_TIMETABLE_MODAL";

const SET_LECTURE_REVIEW_FILTER = "SET_LECTURE_REVIEW_FILTER";
const SET_DEFAULT_LECTURE_REVIEW_FILTER = "SET_DEFAULT_LECTURE_REVIEW_FILTER";

const ADD_NEXT_PAGE_REVIEWS = "ADD_NEXT_PAGE_REVIEWS";
const ADD_NEXT_PAGE_RESROUCES = "ADD_NEXT_PAGE_RESROUCES";

const SET_REVIEWS_LOADING_START = "SET_REVIEWS_LOADING_START";
const SET_REVIEWS_LOADING_FINISHED = "SET_REVIEWS_LOADING_FINISHED";

// Action Creators
export const setLectureInfo = (payload) => ({ type: SET_LECTURE_INFO, payload });
export const setLectureClassSemester = (payload) => ({
  type: SET_LECTURE_CLASS_SEMESTER,
  payload,
});
export const addLectureReview = (payload) => ({ type: ADD_LECTURE_REVIEW, payload });
export const setLectureReviews = (payload) => ({ type: SET_LECTURE_REVIEWS, payload });
export const setLectureResources = (payload) => ({
  type: SET_LECTURE_RESOURCES,
  payload,
});
export const setLectureTimetables = (payload) => ({
  type: SET_LECTURE_TIMETABLES,
  payload,
});

export const clickScrapIcon = (payload) => ({ type: CLICK_SCRAP_ICON, payload });
export const unclickScrapIcon = (payload) => ({ type: UNCLICK_SCRAP_ICON, payload });
export const clickLikeIcon = (payload) => ({ type: CLICK_LIKE_ICON, payload });
export const clickTitmetableAddRemoveButton = (payload) => ({
  type: CLICK_TIMETABLE_ADD_REMOVE_ICON,
  payload,
});

export const openFilterModal = () => ({ type: OPEN_FILTER_MODAL });
export const closeFilterModal = () => ({ type: CLOSE_FILTER_MODAL });
export const openTimetableModal = (payload) => ({ type: OPEN_TIMETABLE_MODAL, payload });

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
  sort: "좋아요 순",
};
const MODAL_STATE = {
  isFilterModalOpened: false,
  isTimetableModalOpened: false,
};
const REVIEW_STATE = {
  limit: 10,
  resourceLimit: 100,
  page: 1,
  resourcePage: 1,
  maxPage: 1,
  maxResourcePage: 1,
};
const STATE = {
  isLoading: false,
  lectureReviews: {},
  lectureClassInfo: [],
  semesterDates: [],
  timetables: [],
  timetablesLectures: [],
  lectureResources: { count: 0, result: [] },
  ...defaultFilterOptions,
  ...MODAL_STATE,
  ...REVIEW_STATE,
};

export default function lectureDetailReducer(state = STATE, action) {
  switch (action.type) {
    case SET_LECTURE_INFO:
      reflectRecentlyViewedData(action.payload[0].data);
      return {
        ...state,
        ...action.payload[0].data,
        lectureReviews: action.payload[1].data,
        lectureEvaluationRating: action.payload[2].data,
        lectureEvaluationTotal: action.payload[3].data,
        lectureClassInfo: action.payload[4]
          ? action.payload[4].data
          : state.lectureClassInfo,
        page: 1,
        maxPage: Math.ceil(action.payload[1].data.count / state.limit),
        semesterDates: action.payload[5] ? action.payload[5].data : state.semesterDates,
      };
    case SET_LECTURE_CLASS_SEMESTER:
      return {
        ...state,
        lectureClassInfo: action.payload[0]
          ? action.payload[0].data
          : state.lectureClassInfo,
        semesterDates: action.payload[1] ? action.payload[1].data : state.semesterDates,
      };
    case SET_LECTURE_REVIEWS:
      return {
        ...state,
        lectureReviews: action.payload,
        page: state.page + 1,
        maxPage: Math.ceil(action.payload.count / state.limit),
      };
    case ADD_LECTURE_REVIEW:
      return {
        ...state,
        lectureReviews: {
          result: [action.payload.data, ...state.lectureReviews.result],
          count: ++state.lectureReviews.count,
        },
      };
    case SET_LECTURE_RESOURCES:
      return {
        ...state,
        lectureResources: action.payload,
        maxResourcePage: Math.ceil(action.payload.count / state.resourceLimit),
      };
    case SET_LECTURE_TIMETABLES: {
      let convertedTimetables = getDatasFrom2DepthPayload(action.payload);
      return {
        ...state,
        timetables: convertedTimetables,
      };
    }
    case CLICK_SCRAP_ICON:
      return {
        ...state,
        is_scraped: true,
      };
    case UNCLICK_SCRAP_ICON:
      return {
        ...state,
        is_scraped: false,
      };
    case CLICK_LIKE_ICON: {
      let likeReflectedReviews = getLikeReflectedResult(
        state.lectureReviews,
        action.payload.idx
      );
      return {
        ...state,
        lectureReviews: likeReflectedReviews,
      };
    }
    case CLICK_TIMETABLE_ADD_REMOVE_ICON: {
      let convertedLectureClassInfo = getTimetableReflectedResult(
        state.lectureClassInfo,
        action.payload.idx,
        action.payload.timetableId
      );
      return {
        ...state,
        lectureClassInfo: convertedLectureClassInfo,
      };
    }
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
        lectureInfoIdx: action.payload.lectureInfoIdx,
        selectedClassId: action.payload.selectedClassId,
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
        maxResourcePage: Math.ceil(action.payload.count / state.resourceLimit),
      };
    case SET_REVIEWS_LOADING_START:
      return {
        ...state,
        isLoading: true,
        page: 1,
        lectureReviews: { count: state.lectureReviews.count, result: [] },
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
/**
 * 시간표 반영
 * @param {*} timetables
 * @param {*} index
 * @param {*} idx
 * @returns
 */
const getTimetableReflectedResult = (lectureClassInfo, idx, timetableId) => {
  lectureClassInfo[idx].selectedTableId.indexOf(timetableId) !== -1
    ? lectureClassInfo[idx].selectedTableId.splice(
        lectureClassInfo[idx].selectedTableId.indexOf(timetableId),
        1
      )
    : lectureClassInfo[idx].selectedTableId.push(timetableId);

  return lectureClassInfo;
};

/**
 * 순수 데이터 배열로 재 구성
 * @param {*} array
 * @returns
 */
const getDatasFrom2DepthPayload = (data = []) => {
  let result = data.map((el) => {
    return el.data.map((props) => {
      return props;
    });
  });

  return result;
};

const reflectRecentlyViewedData = (infos) => {
  const { id, professor, name, total_rating } = infos;
  const compressedData = { id, professor, name, total_rating };
  const data = getValueOnLocalStorage("recentlyViewedLectures");

  if (data === null) {
    setValueOnLocalStorage("recentlyViewedLectures", [compressedData]);
    return;
  }

  if (data.some(({ id }) => id === compressedData.id)) return;

  if (data.length !== MAX_RECENTLY_VIEWED_DATA_LENGTH) {
    setValueOnLocalStorage("recentlyViewedLectures", [...data, compressedData]);
  } else {
    setValueOnLocalStorage("recentlyViewedLectures", [...data.slice(1), compressedData]);
  }
};

const MAX_RECENTLY_VIEWED_DATA_LENGTH = 5;
