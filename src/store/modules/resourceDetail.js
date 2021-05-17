// Actions
const SET_LECTURE_INFO = "SET_LECTURE_INFO";
const OPEN_REPORT_MODAL = "OPEN_REPORT_MODAL";
const CLOSE_REPORT_MODAL = "CLOSE_REPORT_MODAL";
const OPEN_ADDITIONAL_MODAL = "OPEN_ADDITIONAL_MODAL";
const CLOSE_ADDITIONAL_MODAL = "CLOSE_ADDITIONAL_MODAL";

// Action Creators
export const setLectureInfo = (payload) => ({ type: SET_LECTURE_INFO, payload });
export const openReportModal = () => ({ type: OPEN_REPORT_MODAL });
export const closeReportModal = () => ({ type: CLOSE_REPORT_MODAL });
export const openAdditionalModal = () => ({ type: OPEN_ADDITIONAL_MODAL });
export const closeAdditionalModal = () => ({ type: CLOSE_ADDITIONAL_MODAL });

const MODAL_STATE = {
  isReportModalOpened: false,
  isAdditionalModalOpened: false,
};

const PURCHASE_STATE = {
  isPurchased: true,
};

const STATE = {
  ...MODAL_STATE,
  ...PURCHASE_STATE,
};

export default function resourceDetailReducer(state = STATE, action) {
  switch (action.type) {
    case SET_LECTURE_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case OPEN_REPORT_MODAL:
      return {
        ...state,
        isReportModalOpened: true,
      };
    case CLOSE_REPORT_MODAL:
      return {
        ...state,
        isReportModalOpened: false,
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
