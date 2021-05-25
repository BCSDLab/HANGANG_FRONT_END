import styled from "styled-components";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  InnerContentWidth,
  PlaceholderColor,
} from "static/Shared/commonStyles";

export const Wrapper = styled.div`
  width: ${InnerContentWidth};
  margin: 90px auto 98px auto;
`;

export const SpinnerWrapper = styled.div`
  width: 100%;
  height: 1084px;
  display: flex;
  align-items: center;
`;

export const SearchSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const FilterButton = styled.button`
  all: unset;
  width: 70px;
  height: 32px;
  border-radius: 16px;
  color: ${({ isChosen }) => (isChosen ? `#fcfcfe` : `${FontColor}`)};
  background-color: ${({ isChosen }) =>
    isChosen ? `${ConceptColor}` : `${BorderColor}`};
  font-size: 15px;
  cursor: pointer;
  text-align: center;
`;

export const FilterSection = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  height: 32px;

  margin-top: 48px;

  ${FilterButton}:not(:last-child) {
    margin-right: 16px;
  }
`;

export const FilterImage = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/lecturespage/filter.png",
  alt: "filter",
})`
  position: absolute;
  right: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const ResourcesSection = styled.section`
  position: relative;
  width: 100%;
  padding: 24px 0px 98px 0px;
`;

export const SearchResultLabel = styled.label`
  display: block;
  margin-bottom: 24px;

  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;

export const ResourceWriteButton = styled.input.attrs({
  type: "button",
  value: "강의자료 작성 >",
})`
  all: unset;
  position: absolute;
  top: calc(0% + 21px);
  right: 0;
  width: 101px;
  height: 28px;
  border-radius: 18.5px;
  border: solid 1px ${ConceptColor};

  font-size: 14px;
  padding-left: 16px;
  color: ${PlaceholderColor};
  cursor: pointer;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 133px);
  grid-gap: 30px 18px;

  width: 1152px;
`;

export const FakeDiv = styled.div``;
