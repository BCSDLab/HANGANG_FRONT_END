import styled from "styled-components";
import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { X_URL } from "static/Shared/imageUrls";

export const AddTimetableComponentBackground = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({ screenHeight }) => screenHeight}px;
  width: 100vw;

  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9995;
`;

export const AddTimetableModal = styled.form`
  position: fixed;
  top: calc(50% - 188.5px);
  left: calc(50% - 262px);
  width: 524px;
  height: 377px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid ${CopyRightColor};
  background-color: #fff;
`;

export const Title = styled.h2`
  margin: 4px 0 25px 0;
  font-size: 20px;
  color: ${FontColor};
`;

export const CloseButton = styled.img.attrs({
  src: X_URL,
  alt: "close",
})`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 24px;
  cursor: pointer;
`;

export const TimetableNameInput = styled.input.attrs({
  type: "text",
  placeholder: "시간표 이름을 입력해주세요.",
})`
  all: unset;
  width: 100%;
  margin: 16px 0 32px 0;
  padding: 7px 0;
  border-bottom: 1px solid ${BorderColor};
  font-size: 14px;
  color: ${FontColor};
  ::placeholder {
    color: ${PlaceholderColor};
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: ${FontColor};
`;

export const SubLabel = styled(Label)`
  margin: 12px 0 16px 0;
  color: ${PlaceholderColor};
  font-size: 12px;
  line-height: 18px;
`;

export const SubmitButton = styled.button`
  position: absolute;
  bottom: 24px;
  left: calc(50% - 171.5px);
  width: 343px;
  height: 36px;
  border: none;
  outline: none;
  border-radius: 24px;
  background-color: ${ConceptColor};
  color: #fff;
  cursor: pointer;
`;

export const SemesterButton = styled.input.attrs(({ label }) => ({
  type: "button",
  value: label,
}))`
  width: 80px;
  height: 32px;
  margin-right: 8px;
  color: ${({ choiced }) => (choiced ? `#fff` : `${FontColor}`)};
  background-color: ${({ choiced }) => (choiced ? `${ConceptColor}` : `${BorderColor}`)};
  border: none;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
`;
