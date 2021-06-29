import styled from "styled-components";
import { FontColor, ConceptColor } from "static/Shared/commonStyles";

export const ModalWrapper = styled.div`
  position: absolute;

  width: 320px;
  height: auto;

  margin: 10px 0 0;
  padding: 36px 24px 8px;

  border: solid 1px #eee;

  background-color: #fff;

  flex-grow: 0;
  border-radius: 8px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);

  z-index: 1;
`;

export const TimetableLabel = styled.p`
  margin: 0 0 24px;

  font-size: 14px;
  line-height: normal;
  font-weight: normal;
  letter-spacing: normal;
  color: ${FontColor};

  cursor: pointer;
`;

export const ButtonSection = styled.div`
  display: flex;

  bottom: 8px;
  right: 0;

  align-items: flex-end;
  justify-content: flex-end;
  align-content: flex-end;
`;

export const Confirm = styled.span`
  display: inline-flex;

  width: auto;

  margin: 0;
  margin-right: 8px;
  padding: 10px 23px;
  padding-right: 0px;

  font-size: 14px;
  font-weight: 500;
  color: ${ConceptColor};

  right: 24px;
  justify-content: flex-end;
  cursor: pointer;
`;

export const Check = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/check.png",
  alt: "checked",
})`
  display: inline-flex;

  position: absolute;

  width: 16px;

  justify-content: flex-end;
  right: 24px;
  align-items: center;
  align-content: center;
`;
