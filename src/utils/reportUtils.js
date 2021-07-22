import { showConfirmModal, showReportModal } from "store/modules/modalModule";

import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

export const triggerWhenNotLoggedIn = ({ history, dispatch }) => {
  const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_LOGGED_IN"];
  const onConfirm = () => history.push("/login");
  const onClose = () => history.goBack();
  dispatch(showConfirmModal({ title, content, onConfirm, onClose }));
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
  if (!isAuthenticated) triggerWhenNotLoggedIn({ history, dispatch });
  else dispatch(showReportModal({ contentId, reportType }));
};
