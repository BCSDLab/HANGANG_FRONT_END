import styled from "styled-components";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { PREV_BUTTON, SEARCH_BUTTON } from "static/Shared/imageUrls";

export const LectureAddBox = styled.div`
  position: relative;
  margin-top: 33px;
  width: 560px;
`;

export const SearchAddButton = styled.input.attrs({
  type: "button",
  value: "검색추가",
})`
  width: 119px;
  height: 55px;
  padding: 0;
  font-size: 14px;
  color: ${({ isSelected }) => (isSelected ? `${FontColor}` : `${PlaceholderColor}`)};
  background: none;
  border: none;
  cursor: pointer;
`;

export const DirectlyAddButton = styled(SearchAddButton).attrs({
  value: "직접추가",
})``;

export const UnderBar = styled.div`
  position: absolute;
  top: 54px;
  left: ${({ current }) => (["검색추가", "검색"].includes(current) ? "0px" : "119px")};
  transition: left 0.3s ease;
  width: 119px;
  height: 2px;
  background-color: ${ConceptColor};
`;

export const WhiteBackground = styled.div`
  width: 560px;
  height: 977px;
  background-color: #fff;
`;

export const SearchBarSection = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  width: 528px;
  margin: 0 auto;
  padding: 17px 0;
`;

export const SearchBar = styled.input.attrs({
  type: "text",
  placeholder: "교과명, 교수명, 과목코드 검색",
})`
  /* width: 488px; */
  width: ${({ current }) => (current === "검색추가" ? "528px" : "488px")};
  height: 40px;

  padding: 8px;
  border-radius: 8px;

  background-color: ${BorderColor};
  border: none;
  outline: none;
  font-size: 14px;
  color: ${FontColor};
  ::placeholder {
    color: ${PlaceholderColor};
  }
`;

export const PrevButton = styled.img.attrs({
  src: PREV_BUTTON,
  alt: "prev",
})`
  width: 24px;
  margin-right: 16px;
  cursor: pointer;
`;

export const SearchButton = styled.img.attrs({
  src: SEARCH_BUTTON,
  alt: "search",
})`
  position: absolute;
  top: 25px;
  right: 6px;
  width: 24px;
  cursor: pointer;
`;
