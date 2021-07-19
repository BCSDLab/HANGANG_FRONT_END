import styled from "styled-components";
import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 40px;
  right: 0;
  width: 383px;
  height: 538px;
  border-radius: 16px;
  background-color: #fff;
  border: solid 1px ${CopyRightColor};
  padding: 20px;

  z-index: 9995;
`;

export const NotifyLabel = styled.label`
  margin-bottom: 25px;
  color: ${PlaceholderColor};
  font-size: 12px;
`;

export const Exit = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/lecturespage/exit.png",
  alt: "exit",
})`
  position: absolute;
  width: 24px;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

export const Refresh = styled(Exit).attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/lecturespage/refresh.png",
  alt: "refresh",
})`
  right: 52px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 37px;
`;

export const Label = styled.label`
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 500;
  color: ${FontColor};
`;

export const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ type }) => columnConverter(type)}, 1fr);
  grid-gap: 8px 8px;
`;

export const FilterButton = styled.input.attrs({
  type: "button",
  alt: "filter",
})`
  padding: 8px 0px;
  border: none;
  border-radius: 20px;

  background-color: ${({ isChoiced }) =>
    isChoiced ? `${ConceptColor}` : `${BorderColor}`};
  color: ${({ isChoiced }) => (isChoiced ? `#fff` : `${FontColor}`)};
  font-size: 14px;

  cursor: pointer;
  outline: none;
`;

const columnConverter = (type) => {
  switch (type) {
    case "sort":
      return 5;
    case "order":
    case "classification":
    case "category":
      return 4;
    case "hashtag":
      return 3;
    default:
      return;
  }
};
