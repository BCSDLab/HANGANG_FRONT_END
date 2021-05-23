// Actions
const SHOW_ALERT_MODAL = "SHOW_ALERT_MODAL";
const HIDE_ALERT_MODAL = "HIDE_ALERT_MODAL";
const SHOW_REPORT_MODAL = "SHOW_REPORT_MODAL";
const HIDE_REPORT_MODAL = "HIDE_REPORT_MODAL";

// Action Creators
export const showAlertModal = (payload) => ({ type: SHOW_ALERT_MODAL, payload });
export const hideAlertModal = (payload) => ({ type: HIDE_ALERT_MODAL, payload });
export const showReportModal = () => ({ type: SHOW_REPORT_MODAL });
export const hideReportModal = () => ({ type: HIDE_REPORT_MODAL });

const INITIAL_ALERT_MODAL_STATE = {
  isAlertModalShowing: false,
  alertModalTitle: "",
  alertModalContent: "",
};

const STATE = {
  isReportModalShowing: false,
  ...INITIAL_ALERT_MODAL_STATE,
};

export default function modalReducer(state = STATE, action) {
  switch (action.type) {
    case SHOW_ALERT_MODAL:
      console.dir(action.payload);
      return {
        ...state,
        isAlertModalShowing: true,
        alertModalTitle: action.payload.title,
        alertModalContent: action.payload.content,
      };
    case HIDE_ALERT_MODAL:
      return {
        ...state,
        ...INITIAL_ALERT_MODAL_STATE,
      };
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
