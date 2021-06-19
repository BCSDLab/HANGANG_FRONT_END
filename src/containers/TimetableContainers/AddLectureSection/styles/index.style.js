import styled from "styled-components";
import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import {
  ADJUSTMENT_URL,
  PREV_BUTTON_URL,
  REFRESH_URL,
  SEARCH_BUTTON_URL,
  X_URL,
} from "static/Shared/imageUrls";

export const LectureAddBox = styled.section`
  position: relative;
  margin-top: 33px;
  width: 560px;
`;

export const WhiteBackground = styled.div`
  overflow-x: hidden;
  width: 560px;
  height: 977px;
  background-color: #fff;
`;

export const BoxWrapper = styled.div`
  width: fit-content;
  display: flex;
  transform: translateX(0);
  transition: transform 0.75s ease-in-out;
  will-change: transform;
`;

export const SearchAddBox = styled.div`
  width: 560px;
`;

export const DirectlyAddBox = styled.div`
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

export const SearchBarSection = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  width: 528px;
  margin: 0 auto;
  padding: 17px 0 15px;
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
  src: PREV_BUTTON_URL,
  alt: "prev",
})`
  width: 24px;
  margin-right: 16px;
  cursor: pointer;
`;

export const SearchButton = styled.img.attrs({
  src: SEARCH_BUTTON_URL,
  alt: "search",
})`
  position: absolute;
  top: 25px;
  right: 6px;
  width: 24px;
  cursor: pointer;
`;

export const FilterSection = styled.section`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 65px 0 20px;
  border-bottom: 1px solid ${BorderColor};
`;

export const MajorFilterButton = styled.button`
  all: unset;
  box-sizing: border-box;
  padding: 8px 7px 15px 7px;
  border-bottom: ${({ isTarget }) =>
    isTarget ? "2px solid #ffab2e" : "2px solid transparent"};

  color: ${({ isTarget }) => (isTarget ? `${ConceptColor}` : `${PlaceholderColor}`)};
  font-size: 12px;
  text-align: center;
  cursor: pointer;
`;

export const AdjustmentButton = styled.img.attrs({
  src: ADJUSTMENT_URL,
  alt: "adjustment",
})`
  position: absolute;
  top: 3px;
  right: 19px;
  width: 24px;
  cursor: pointer;
`;

export const ClassificationFilter = styled.div`
  position: absolute;
  top: 175px;
  left: 150px;
  width: 383px;
  height: 190px;
  border: 1px solid ${CopyRightColor};
  border-radius: 16px;
  padding: 20px;
  background-color: #fff;
  z-index: 9998;
`;

export const Label = styled.label`
  display: block;
  font-size: 12px;
  color: ${PlaceholderColor};
`;

export const FilterLabel = styled(Label)`
  font-size: 16px;
  color: ${FontColor};
  margin: 26px 0 20px 0;
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 8px 8px;
`;

export const FilterButton = styled.input.attrs({
  type: "button",
})`
  padding: 8px 0px;
  border: none;
  border-radius: 20px;

  background-color: ${({ isChoiced }) =>
    isChoiced ? `${ConceptColor}` : `${BorderColor}`};
  color: ${({ isChoiced }) => (isChoiced ? `#fff` : `${FontColor}`)};
  font-size: 14px;
  font-weight: ${({ isChoiced }) => (isChoiced ? "500" : "normal")};

  cursor: pointer;
  outline: none;
`;

export const RefreshButton = styled.img.attrs({
  src: REFRESH_URL,
  alt: "refresh",
})`
  position: absolute;
  top: 20px;
  right: 52px;
  width: 24px;
  cursor: pointer;
`;

export const XButton = styled(RefreshButton).attrs({
  src: X_URL,
  alt: "x",
})`
  right: 20px;
`;

export const LectureSection = styled.div`
  height: 863px;
  overflow-y: auto;
`;

export const RecentlySearchTermSection = styled.div`
  position: absolute;
  width: 100%;
  padding: 14px 18px;
  background-color: #fff;
`;

export const RecentlySearchTermLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${ConceptColor};
`;

export const TermWrapper = styled.div`
  position: relative;
  width: 524px;
`;

export const Term = styled(RecentlySearchTermLabel)`
  margin-top: 26px;
  font-weight: normal;
  color: ${FontColor};
  cursor: pointer;
`;

export const TermDeleteButton = styled(RefreshButton).attrs({
  src: X_URL,
  alt: "x",
})`
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
`;
