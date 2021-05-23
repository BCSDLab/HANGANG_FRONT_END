// Actions
const SHOW_ALERT_MODAL = "SHOW_ALERT_MODAL";
const HIDE_ALERT_MODAL = "HIDE_ALERT_MODAL";
const SHOW_CONFIRM_MODAL = "SHOW_CONFIRM_MODAL";
const HIDE_CONFIRM_MODAL = "HIDE_CONFIRM_MODAL";
const SHOW_REPORT_MODAL = "SHOW_REPORT_MODAL";
const HIDE_REPORT_MODAL = "HIDE_REPORT_MODAL";

// Action Creators
export const showAlertModal = (payload) => ({ type: SHOW_ALERT_MODAL, payload });
export const hideAlertModal = () => ({ type: HIDE_ALERT_MODAL });
export const showConfirmModal = (payload) => ({ type: SHOW_CONFIRM_MODAL, payload });
export const hideConfirmModal = () => ({ type: HIDE_CONFIRM_MODAL });
export const showReportModal = (payload) => ({ type: SHOW_REPORT_MODAL, payload });
export const hideReportModal = () => ({ type: HIDE_REPORT_MODAL });

// State
const INITIAL_ALERT_MODAL_STATE = {
  isAlertModalShowing: false,
  alertModalTitle: "",
  alertModalContent: "",
};

const INITIAL_CONFIRM_MODAL_STATE = {
  isConfirmModalShowing: false,
  confirmModalTitle: "",
  confirmModalContent: "",
  onConfirm: () => {},
};

const INITIAL_REPORT_MODAL_STATE = {
  isReportModalShowing: false,
  contentId: null,
};

const STATE = {
  ...INITIAL_ALERT_MODAL_STATE,
  ...INITIAL_CONFIRM_MODAL_STATE,
  ...INITIAL_REPORT_MODAL_STATE,
};

// Reducer
export default function modalReducer(state = STATE, action) {
  switch (action.type) {
    case SHOW_ALERT_MODAL:
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
    case SHOW_CONFIRM_MODAL:
      return {
        ...state,
        isConfirmModalShowing: true,
        confirmModalTitle: action.payload.title,
        confirmModalContent: action.payload.content,
        onConfirm: action.payload.onConfirm,
      };
    case HIDE_CONFIRM_MODAL:
      return {
        ...state,
        ...INITIAL_CONFIRM_MODAL_STATE,
      };
    case SHOW_REPORT_MODAL:
      return {
        ...state,
        isReportModalShowing: true,
        contentId: action.payload.contentId,
      };
    case HIDE_REPORT_MODAL:
      return {
        ...state,
        ...INITIAL_REPORT_MODAL_STATE,
      };
    default:
      return state;
  }
}
