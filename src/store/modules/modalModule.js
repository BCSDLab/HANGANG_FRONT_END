// Actions
const SHOW_ALERT_MODAL = "SHOW_ALERT_MODAL";
const HIDE_ALERT_MODAL = "HIDE_ALERT_MODAL";
const SHOW_CONFIRM_MODAL = "SHOW_CONFIRM_MODAL";
const HIDE_CONFIRM_MODAL = "HIDE_CONFIRM_MODAL";
const SHOW_REPORT_MODAL = "SHOW_REPORT_MODAL";
const HIDE_REPORT_MODAL = "HIDE_REPORT_MODAL";
const SHOW_ADD_TIMETABLE_MODAL = "SHOW_ADD_TIMETABLE_MODAL";
const CHANGE_ADD_TIMETABLE_FORM_VALUE = "CHANGE_ADD_TIMETABLE_FORM_VALUE";
const HIDE_ADD_TIMETABLE_MODAL = "HIDE_ADD_TIMETABLE_MODAL";
const SHOW_TIMETABLE_MORE_MODAL = "SHOW_TIMETABLE_MORE_MODAL";
const HIDE_TIMETABLE_MORE_MODAL = "HIDE_TIMETABLE_MORE_MODAL";
const SHOW_LECTURE_INFO_MODAL = "SHOW_LECTURE_INFO_MODAL";
const HIDE_LECTURE_INFO_MODAL = "HIDE_LECTURE_INFO_MODAL";

// Action Creators
export const showAlertModal = (payload) => ({ type: SHOW_ALERT_MODAL, payload });
export const hideAlertModal = () => ({ type: HIDE_ALERT_MODAL });
export const showConfirmModal = (payload) => ({ type: SHOW_CONFIRM_MODAL, payload });
export const hideConfirmModal = () => ({ type: HIDE_CONFIRM_MODAL });
export const showReportModal = (payload) => ({ type: SHOW_REPORT_MODAL, payload });
export const hideReportModal = () => ({ type: HIDE_REPORT_MODAL });
export const showAddTimetableModal = () => ({ type: SHOW_ADD_TIMETABLE_MODAL });
export const changeAddTimetableFormValue = (key, value) => ({
  type: CHANGE_ADD_TIMETABLE_FORM_VALUE,
  key,
  value,
});
export const hideAddTimetableModal = () => ({ type: HIDE_ADD_TIMETABLE_MODAL });
export const showTimetableMoreModal = () => ({ type: SHOW_TIMETABLE_MORE_MODAL });
export const hideTimetableMoreModal = () => ({ type: HIDE_TIMETABLE_MORE_MODAL });
export const showLectureInfoModal = (payload) => ({
  type: SHOW_LECTURE_INFO_MODAL,
  payload,
});
export const hideLectureInfoModal = () => ({ type: HIDE_LECTURE_INFO_MODAL });

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
  reportType: "",
};

const INITIAL_ADD_TIMETABLE_MODAL_STATE = {
  isAddTimetableModalShowing: false,
  name: null,
  semester_date_id: 5,
};

const INITIAL_TIMETABLE_MORE_STATE = {
  isTimetableMoreModalShowing: false,
  name: null,
  id: null,
};

const INITIAL_LECTURE_INFO_MODAL_STATE = {
  isLectureInfoModalShowing: false,
  lectureInfo: {},
};

const STATE = {
  ...INITIAL_ALERT_MODAL_STATE,
  ...INITIAL_CONFIRM_MODAL_STATE,
  ...INITIAL_REPORT_MODAL_STATE,
  ...INITIAL_ADD_TIMETABLE_MODAL_STATE,
  ...INITIAL_TIMETABLE_MORE_STATE,
  ...INITIAL_LECTURE_INFO_MODAL_STATE,
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
        reportType: action.payload.reportType,
      };
    case HIDE_REPORT_MODAL:
      return {
        ...state,
        ...INITIAL_REPORT_MODAL_STATE,
      };
    case SHOW_ADD_TIMETABLE_MODAL:
      return {
        ...state,
        isAddTimetableModalShowing: true,
      };
    case CHANGE_ADD_TIMETABLE_FORM_VALUE:
      return {
        ...state,
        [action.key]: action.value,
      };
    case HIDE_ADD_TIMETABLE_MODAL:
      return {
        ...state,
        ...INITIAL_ADD_TIMETABLE_MODAL_STATE,
      };
    case SHOW_TIMETABLE_MORE_MODAL:
      return {
        ...state,
        isTimetableMoreModalShowing: true,
      };
    case HIDE_TIMETABLE_MORE_MODAL:
      return {
        ...state,
        ...INITIAL_TIMETABLE_MORE_STATE,
      };
    case SHOW_LECTURE_INFO_MODAL:
      return {
        ...state,
        isLectureInfoModalShowing: true,
        lectureInfo: action.payload.info,
      };
    case HIDE_LECTURE_INFO_MODAL:
      return {
        ...state,
        ...INITIAL_LECTURE_INFO_MODAL_STATE,
      };
    default:
      return state;
  }
}
