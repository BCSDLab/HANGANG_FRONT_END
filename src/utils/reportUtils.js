import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showConfirmModal, showReportModal } from "store/modules/modalModule";

export const triggerWhenNotLoggedIn = (history, dispatch) => {
  const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notLoggedIn"];
  const onConfirm = () => history.push("/login");
  dispatch(showConfirmModal({ title, content, onConfirm }));
};

/**
 * 로그인 여부를 파악하고 로그인이 되어있다면 reportModal을 띄웁니다.
 * reportModal의 기능들은 components/ModalComponents/ReportModalComponent.js 를 확인하세요.
 */
export const callReportModal = (
  reportType,
  contentId,
  isAuthenticated,
  history,
  dispatch
) => {
  if (!isAuthenticated) triggerWhenNotLoggedIn(history, dispatch);
  else dispatch(showReportModal({ contentId, reportType }));
};
