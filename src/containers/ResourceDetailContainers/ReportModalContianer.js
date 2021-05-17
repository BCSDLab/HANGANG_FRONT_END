import React from "react";
import { closeReportModalButton } from "static/ResourceDetailPage/imgPath";
import { BorderColor, FontColor } from "static/Shared/commonStyles";
import styled from "styled-components";

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
  left: calc(50% - 166px);
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

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh + 302px);

  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ReportModalContainer = () => {
  return (
    <Wrapper>
      <ReportBox>
        <Title>신고 사유 선택</Title>
        <CloseButton />
        <ReportContent>욕설/비하</ReportContent>
        <ReportContent>유출/사칭/저작권 위배</ReportContent>
        <ReportContent>허위/부적절한 정보</ReportContent>
        <ReportContent>광고/도배</ReportContent>
        <ReportContent>음란물</ReportContent>
      </ReportBox>
    </Wrapper>
  );
};

export default ReportModalContainer;
