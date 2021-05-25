import styled from "styled-components";
import { closeReportModalButton } from "static/ResourceDetailPage/imgPath";
import { BorderColor, FontColor } from "static/Shared/commonStyles";

export const CloseButton = styled.img.attrs({
  src: closeReportModalButton,
  alt: "close",
})`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 24px;
  cursor: pointer;
`;

export const Title = styled.h2`
  margin: 4px 0 10.5px 0;
  font-size: 18px;
  font-weight: 500;
  color: ${FontColor};
`;

export const ReportContent = styled.div`
  width: 100%;
  height: 52px;
  padding: 15.5px 0;
  display: flex;
  align-items: center;
  color: ${FontColor};
  font-size: 14px;
  cursor: pointer;
`;

export const ReportBox = styled.div`
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

export const Wrapper = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh + 302px);

  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;
