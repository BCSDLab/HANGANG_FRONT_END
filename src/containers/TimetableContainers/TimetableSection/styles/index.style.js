import styled from "styled-components";
import { DOWN_URL, MAIN_URL, MORE_URL, PLUS_URL } from "static/Shared/imageUrls";
import { BorderColor, ConceptColor, FontColor } from "static/Shared/commonStyles";

export const TimetableAddBox = styled.section`
  position: relative;
  margin-top: 33px;
  width: 560px;
`;

export const TimetableSelectBar = styled.div`
  overflow-y: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 240px;
  height: 34px;
  padding: 4px 12px 0 12px;
  border-radius: 4px;
  border: solid 1px ${BorderColor};
  background-color: #fff;
  z-index: 9995;

  :hover {
    height: fit-content;
  }
`;

export const DownImage = styled.img.attrs({
  src: DOWN_URL,
  alt: "down",
})`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
`;

export const TimetableLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  height: 37px;
  padding-bottom: 16px;
  color: ${({ isMain }) => (isMain ? `${ConceptColor}` : `${FontColor}`)};
  cursor: pointer;
`;

export const PlusImage = styled.img.attrs({
  src: PLUS_URL,
  alt: "plus",
})`
  width: 20px;
  margin-right: 4px;
`;

export const AddNewTimetableLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 0 0 16px 0;
  color: ${ConceptColor};
  font-size: 14px;
  cursor: pointer;
`;

export const TimetableSettingButton = styled.img.attrs({
  src: MORE_URL,
  alt: "setting",
})`
  position: absolute;
  width: 24px;
  top: 0;
  right: 0;
  cursor: pointer;
`;

export const MainMark = styled.img.attrs({
  src: MAIN_URL,
  alt: "main",
})`
  margin: 2px 0 0 8px;
  width: 16px;
`;
