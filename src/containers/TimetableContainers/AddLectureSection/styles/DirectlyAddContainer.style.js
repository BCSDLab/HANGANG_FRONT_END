import styled from "styled-components";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { PLUS_URL } from "static/Shared/imageUrls";

export const Background = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 24px;
`;

export const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${FontColor};
`;

export const ConfirmButton = styled.input.attrs({
  type: "submit",
  value: "완료",
})`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 58px;
  height: 29px;
  border-radius: 24px;
  background-color: ${ConceptColor};
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const AddFormGrid = styled.form`
  display: grid;
  grid-template-areas:
    "label input"
    "label input"
    "label div";
  grid-template-columns: 63px 449px;
  grid-gap: 32px 0px;
  margin-top: 29px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: ${FontColor};
  margin-top: 7px;
`;

export const Input = styled.input.attrs(({ name }) => ({
  type: "text",
  placeholder: name === "name" ? "수업명을 입력해 주세요." : "교수명을 입력해 주세요.",
}))`
  all: unset;
  width: 100%;
  height: 27px;
  font-size: 14px;
  color: ${FontColor};
  padding-bottom: 2px;
  border-bottom: 1px solid ${BorderColor};

  ::placeholder {
    color: ${PlaceholderColor};
  }
`;

export const TimeSection = styled.div`
  & > div:not(:last-child) {
    margin-bottom: 26px;
  }
`;

export const PlusImg = styled.img.attrs({
  src: PLUS_URL,
  alt: "plus",
})`
  width: 20px;
  margin-right: 4px;
`;

export const AddTime = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${ConceptColor};
  cursor: pointer;
`;
