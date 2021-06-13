import styled from "styled-components";
import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { MAIN_URL, NOT_MAIN_URL, X_URL } from "static/Shared/imageUrls";

export const TimetableMoreComponentBackground = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  height: ${({ screenHeight }) => screenHeight}px;
  width: 100vw;

  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9997;
`;

export const TimetableMoreModal = styled.form`
  position: fixed;
  top: 430px;
  left: calc(50% - 262px);
  width: 524px;
  height: 268px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid ${CopyRightColor};
  background-color: #fff;
`;

export const Title = styled.h2`
  margin: 4px 0 14px 0;
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

export const TimetableNameModifySection = styled.div`
  position: relative;
  height: 25px;
  margin: 26px 0 36px 0;
`;

export const TimetableNameInput = styled.input`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  padding: 7px 40px 7px 0;
  border-bottom: 1px solid ${BorderColor};
  font-size: 14px;
  color: ${FontColor};
  ::placeholder {
    color: ${PlaceholderColor};
  }
`;

export const ModifyButton = styled.span`
  position: absolute;
  top: 11px;
  right: 0;
  font-size: 14px;
  color: ${({ isEditable }) => (isEditable ? `${ConceptColor}` : `${PlaceholderColor}`)};
  cursor: pointer;
`;

export const SetMainTimetableSection = styled.div`
  display: flex;
  align-items: center;
`;

export const NotMainButton = styled.img.attrs({
  src: NOT_MAIN_URL,
  alt: "not_main",
})`
  width: 20px;
  margin-right: 8px;
  cursor: pointer;
`;

export const MainButton = styled.img.attrs({
  src: MAIN_URL,
  alt: "main",
})`
  width: 20px;
  margin-right: 8px;
`;

export const SettingTimetableLabel = styled.label`
  display: block;
  font-size: 14px;
  color: ${FontColor};
`;

export const Label = styled(SettingTimetableLabel)`
  margin-top: 26px;
  cursor: pointer;
`;

export const SubLabel = styled(SettingTimetableLabel)`
  margin-left: 11px;
  font-size: 12px;
  color: ${PlaceholderColor};
`;
