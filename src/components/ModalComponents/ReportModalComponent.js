import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import ResourceDetailAPI from "api/resourceDetail";
import { closeReportModalButton } from "static/ResourceDetailPage/imgPath";
import { BorderColor, FontColor } from "static/Shared/commonStyles";
import {
  hideReportModal,
  showAlertModal,
  showConfirmModal,
} from "store/modules/modalModule";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

const CloseButton = styled.img.attrs({
  src: closeReportModalButton,
  alt: "close",
})`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 24px;
  cursor: pointer;
`;

const Title = styled.h2`
  margin: 4px 0 10.5px 0;
  font-size: 18px;
  font-weight: 500;
  color: ${FontColor};
`;

const ReportContent = styled.div`
  width: 100%;
  height: 52px;
  padding: 15.5px 0;
  display: flex;
  align-items: center;
  color: ${FontColor};
  font-size: 14px;
  cursor: pointer;
`;

const ReportBox = styled.div`
  position: absolute;
  top: calc(45% - 200px);
  left: calc(50% - 198px);
  width: 400px;
  height: 332px;

  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
  border: 1px solid ${BorderColor};
  background-color: #fff;

  ${ReportContent}:not(:last-child) {
    border-bottom: 1px solid ${BorderColor};
  }
`;

const Wrapper = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh + 302px);

  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

/**
 * 사용자가 확인을 누를 시 요청하는 함수입니다.
 * @param {number} contentId 사용자 신고를 하기 위한 콘텐츠의 id 입니다.
 * @param {number} reportId 사용자가 고른 항목의 Id입니다.
 * @param {function} dispatch 사용자가 확인을 누를 시 dispatch 하기 위한 함수입니다.
 */
const requestReport = async (contentId, reportId, reportType, dispatch) => {
  const reportTitleOnSuccess = "신고해주셔서 감사합니다.";
  const reportContentOnSuccess = `회원님의 의견은 한강 서비스를 \n안전하게 유지하기 위해 사용하겠습니다.`;
  try {
    const accessToken = getValueOnLocalStorage("hangangToken").access_token;
    let data;

    if (reportType === "comment") {
      data = await ResourceDetailAPI.reportComment(contentId, reportId, accessToken);
    } else {
      data = await ResourceDetailAPI.reportResource(contentId, reportId, accessToken);
    }
    if (data.data.httpStatus === "OK") {
      dispatch(
        showAlertModal({ title: reportTitleOnSuccess, content: reportContentOnSuccess })
      );
    }
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE[error.response.data.code];
    dispatch(showAlertModal({ title, content }));
  }
};

/**
 * Report content를 클릭 했을 시 동작하는 함수입니다.
 * ReportModal을 없애고 사용자에게 정말 신고를 할 것인지 물어보는 모달을 띄웁니다.
 * @param {number} reportId 사용자가 고른 항목의 Id입니다.
 * @param {function} dispatch 사용자가 확인을 누를 시 dispatch 하기 위한 함수입니다.
 */
const handleReportClick = (contentId, reportId, reportType, dispatch) => {
  dispatch(hideReportModal());
  dispatch(
    showConfirmModal({
      title: "",
      content: "정말로 신고하시겠습니까?",
      onConfirm: () => requestReport(contentId, reportId, reportType, dispatch),
    })
  );
};

const ReportModalComponent = () => {
  const dispatch = useDispatch();
  const { isReportModalShowing, contentId, reportType } = useSelector(
    (state) => state.modalReducer
  );

  return (
    isReportModalShowing && (
      <Wrapper onClick={() => dispatch(hideReportModal())}>
        <ReportBox onClick={(e) => e.stopPropagation()}>
          <Title>신고 사유 선택</Title>
          <CloseButton onClick={() => dispatch(hideReportModal())} />
          {REPORT_OPTIONS.map(({ label, reportId }) => (
            <ReportContent
              key={label}
              onClick={() => handleReportClick(contentId, reportId, reportType, dispatch)}
            >
              {label}
            </ReportContent>
          ))}
        </ReportBox>
      </Wrapper>
    )
  );
};

const REPORT_OPTIONS = [
  { label: "욕설/비하", reportId: 1 },
  { label: "유출/사칭/저작권 위배", reportId: 2 },
  { label: "허위/부적절한 정보", reportId: 3 },
  { label: "광고/도배", reportId: 4 },
  { label: "음란물", reportId: 5 },
];

export default ReportModalComponent;
