// Actions
const OPEN_REPORT_MODAL = "OPEN_REPORT_MODAL";
const CLOSE_REPORT_MODAL = "CLOSE_REPORT_MODAL";
const OPEN_ADDITIONAL_MODAL = "OPEN_ADDITIONAL_MODAL";
const CLOSE_ADDITIONAL_MODAL = "CLOSE_ADDITIONAL_MODAL";

// Action Creators
export const openReportModal = () => ({ type: OPEN_REPORT_MODAL });
export const closeReportModal = () => ({ type: CLOSE_REPORT_MODAL });
export const openAdditionalModal = () => ({ type: OPEN_ADDITIONAL_MODAL });
export const closeAdditionalModal = () => ({ type: CLOSE_ADDITIONAL_MODAL });

const MODAL_STATE = {
  isReportModalOpened: false,
  isAdditionalModalOpened: false,
};

const STATE = {
  ...MODAL_STATE,
};

export default function resourceDetailReducer(state = STATE, action) {
  switch (action.type) {
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
