/* eslint-disable no-case-declarations */

// Actions
const SET_RESOURCE_INFO = "SET_RESOURCE_INFO";
const CLICK_HIT_ICON = "CLICK_HIT_ICON";
const PURCHASE_RESOURCE = "PURCHASE_RESOURCE";
const SCRAP_RESOURCE = "SCRAP_RESOURCE";
const UNSCRAP_RESOURCE = "UNSCRAP_RESOURCE";
const OPEN_ADDITIONAL_MODAL = "OPEN_ADDITIONAL_MODAL";
const CLOSE_ADDITIONAL_MODAL = "CLOSE_ADDITIONAL_MODAL";

// Action Creators
export const setResourceInfo = (payload) => ({ type: SET_RESOURCE_INFO, payload });
export const clickHitIcon = () => ({ type: CLICK_HIT_ICON });
export const purchaseResource = () => ({ type: PURCHASE_RESOURCE });
export const scrapResource = (payload) => ({ type: SCRAP_RESOURCE, payload });
export const unscrapResource = (payload) => ({ type: UNSCRAP_RESOURCE, payload });
export const openAdditionalModal = () => ({ type: OPEN_ADDITIONAL_MODAL });
export const closeAdditionalModal = () => ({ type: CLOSE_ADDITIONAL_MODAL });

const MODAL_STATE = {
  isAdditionalModalOpened: false,
};

const STATE = {
  ...MODAL_STATE,
};

export default function resourceDetailReducer(state = STATE, action) {
  switch (action.type) {
    case SET_RESOURCE_INFO:
      let convertedComments = getElapsedMinute(action.payload[1].data);
      return {
        ...state,
        ...action.payload[0].data,
        comments: convertedComments,
      };
    case CLICK_HIT_ICON:
      return {
        ...state,
        hits: state.is_hit ? state.hits - 1 : state.hits + 1,
        is_hit: !state.is_hit,
      };
    case PURCHASE_RESOURCE:
      return {
        ...state,
        is_purchase: true,
      };
    case SCRAP_RESOURCE:
      return {
        ...state,
        user_scrap_id: 16,
      };
    case UNSCRAP_RESOURCE:
      return {
        ...state,
        user_scrap_id: 0,
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
    default:
      return state;
  }
}

const MINUTE_BY_ONE_YEAR = 525600;
const MINUTE_BY_ONE_MONTH = 43800;
const MINUTE_BY_ONE_DAY = 1440;
const MINUTE_BY_ONE_HOUR = 60;

/**
 * 년도, 월, 일, 시간, 분으로 구성된 date array를 받아 분으로 계산하여 반환합니다.
 */
const getMinutes = (dateArray) => {
  let minutes =
    dateArray[0] * MINUTE_BY_ONE_YEAR +
    dateArray[1] * MINUTE_BY_ONE_MONTH +
    dateArray[2] * MINUTE_BY_ONE_DAY +
    dateArray[3] * MINUTE_BY_ONE_HOUR +
    dateArray[4];
  return minutes;
};

/**
 * 앞서 구한 nowYmdhms 에서 API로 반환받은 데이터의 updated_at에서 계산된 minute 를 뺍니다.
 * 분으로 계산된 경과시간을 반환합니다.
 */
const calculateElapsedMinutesOnFetchedData = (nowYmdhms, updated_at) => {
  let ymd = updated_at.split(".")[0].split("T")[0].split("-");
  let hms = updated_at.split(".")[0].split("T")[1].split("-")[0].split(":");
  let ymdhms = [...ymd, ...hms].map((elem) => parseInt(elem));
  ymdhms[0] -= 2021;
  ymdhms[3] += 9;
  return nowYmdhms - getMinutes(ymdhms);
};

/**
 * fetched data에서 elapsedMinutes를 넣어줍니다.
 */
const getElapsedMinute = (comments) => {
  const now = new Date();
  const nowDateArray = [
    now.getFullYear() - 2021,
    now.getMonth() + 1,
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
  ];
  const nowYmdhms = getMinutes(nowDateArray);

  let convertedComments = comments.map((comment) => ({
    ...comment,
    elapsedMinutes: calculateElapsedMinutesOnFetchedData(nowYmdhms, comment.updated_at),
  }));

  return convertedComments;
};
