// Actions
const SHOW_REPORT_MODAL = "SHOW_REPORT_MODAL";
const HIDE_REPORT_MODAL = "HIDE_REPORT_MODAL";

// Action Creators
export const showReportModal = () => ({ type: SHOW_REPORT_MODAL });
export const hideReportModal = () => ({ type: HIDE_REPORT_MODAL });

const STATE = {
  isReportModalShowing: false,
};

export default function modalReducer(state = STATE, action) {
  switch (action.type) {
    case SHOW_REPORT_MODAL:
      return {
        ...state,
        isReportModalShowing: true,
      };
    case HIDE_REPORT_MODAL:
      return {
        ...state,
        isReportModalShowing: false,
      };
    default:
      return state;
  }
}
