// Actions
const OPEN_REPORT_MODAL = "OPEN_REPORT_MODAL";
const CLOSE_REPORT_MODAL = "CLOSE_REPORT_MODAL";

// Action Creators
export const openReportModal = () => ({ type: OPEN_REPORT_MODAL });
export const closeReportModal = () => ({ type: CLOSE_REPORT_MODAL });

const STATE = {
  isReportModalOpened: false,
};

export default function resourceDetailReducer(state = STATE, action) {
  console.log("hi");
  switch (action.type) {
    case OPEN_REPORT_MODAL:
      return {
        ...state,
        isReportModalOpened: true,
      };
    case CLOSE_REPORT_MODAL:
      console.log("hi");
      return {
        ...state,
        isReportModalOpened: false,
      };
    default:
      return state;
  }
}
