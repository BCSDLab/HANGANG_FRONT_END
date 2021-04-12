import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { setDefaultLectureFilter, setLectureFilter } from "store/modules/lectures";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 40px;
  right: 0;
  width: 383px;
  height: 609px;
  border-radius: 16px;
  background-color: #fff;
  border: solid 1px ${CopyRightColor};
  padding: 20px;
`;

const NotifyLabel = styled.label`
  margin-bottom: 25px;
  color: ${PlaceholderColor};
  font-size: 12px;
`;

const Exit = styled.img.attrs({
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

const Refresh = styled(Exit).attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/lecturespage/refresh.png",
  alt: "refresh",
})`
  right: 52px;
`;

const ApplyButton = styled.input.attrs({
  type: "button",
  alt: "apply",
  value: "적용",
})`
  position: absolute;
  bottom: 20px;
  width: 343px;
  height: 40px;
  border: none;
  border-radius: 20px;
  background-color: ${ConceptColor};

  font-size: 16px;
  font-weight: 500;
  color: #fff;

  cursor: pointer;
  outline: none;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 37px;
`;

const Label = styled.label`
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 500;
  color: ${FontColor};
`;

const columnConverter = (type) => {
  switch (type) {
    case "sort":
    case "criteria":
      return 5;
    case "classification":
      return 4;
    case "hashtag":
      return 3;
    default:
      return;
  }
};

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ type }) => columnConverter(type)}, 1fr);
  grid-gap: 8px 8px;
`;

const FilterButton = styled.input.attrs({
  type: "button",
  alt: "filter",
})`
  padding: 6px 0px;
  border: none;
  border-radius: 20px;

  background-color: ${({ isChoiced }) =>
    isChoiced ? `${ConceptColor}` : `${BorderColor}`};
  color: ${({ isChoiced }) => (isChoiced ? `#fff` : `${FontColor}`)};
  font-size: 14px;

  cursor: pointer;
  outline: none;
`;

const labelConverter = (key) => {
  switch (key) {
    case "sort":
      return "정렬";
    case "criteria":
      return "기준";
    case "classification":
      return "유형";
    case "hashtag":
      return "해시태그";
    default:
      return;
  }
};

const FilterBox = ({ type, filterList, setIsFilterBoxVisible }) => {
  const dispatch = useDispatch();
  const filterOptions = useSelector((state) => state.lectureReducer);
  const setFilter = (key, value) => {
    if (type === "lecture") {
      dispatch(setLectureFilter({ key, value }));
    }
  };

  const apply = () => {
    // setIsFilterBoxVisible(false);
  };

  const isChoiced = (key, value) => {
    switch (key) {
      case "sort":
        if (filterOptions[key] === value) {
          return true;
        }
        return false;
      case "classification":
      case "hashtag":
        if (filterOptions[key].includes(value)) {
          return true;
        }
        return false;
      default:
        return false;
    }
  };

  return (
    <Wrapper>
      <NotifyLabel>필터를 적용해 보세요.</NotifyLabel>
      <Refresh onClick={() => dispatch(setDefaultLectureFilter())} />
      <Exit onClick={() => setIsFilterBoxVisible(false)} />
      {Object.entries(filterList).map(([key, value]) => (
        <Section key={key}>
          <Label>{labelConverter(key)}</Label>
          <Buttons type={key}>
            {value.map(({ label, value: filterValue }) => (
              <FilterButton
                key={label}
                value={label}
                isChoiced={isChoiced(key, filterValue)}
                onClick={() => setFilter(key, filterValue)}
              />
            ))}
          </Buttons>
        </Section>
      ))}
      <ApplyButton onClick={() => apply()} />
    </Wrapper>
  );
};

export default FilterBox;
