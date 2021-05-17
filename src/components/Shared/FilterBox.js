import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import {
  requestLectures,
  setDefaultLectureFilter,
  setLectureFilter,
} from "store/modules/lectures";
import {
  requestResources,
  setResourcesFilter,
  setDefaultResourceFilter,
} from "store/modules/resources";

const Wrapper = styled.div`
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

  z-index: 9998;
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

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ type }) => columnConverter(type)}, 1fr);
  grid-gap: 8px 8px;
`;

const FilterButton = styled.input.attrs({
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

const labelConverter = (key) => {
  switch (key) {
    case "sort":
    case "order":
      return "정렬";
    case "classification":
      return "유형";
    case "hashtag":
      return "해시태그";
    case "category":
      return "유형";
    default:
      return;
  }
};

/**
 * 강의평, 강의자료에서 공동으로 사용합니다.
 *
 * 각 페이지는 type에 따라 구분합니다. (type = "lecture" | "materials")
 * filterList는 필터해야 할 항목입니다. static에 json 형태로 보관합니다.
 */
const FilterBox = ({ type, filterList, setIsFilterBoxVisible }) => {
  const dispatch = useDispatch();
  const filterOptions = useSelector((state) =>
    type === "lecture" ? state.lectureReducer : state.resourceReducer
  );

  const setFilter = (key, value) => {
    if (type === "lecture") {
      dispatch(setLectureFilter({ key, value }));
    } else {
      dispatch(setResourcesFilter({ key, value }));
    }
  };

  const refreshFilter = (type) => {
    if (type === "lecture") {
      dispatch(setDefaultLectureFilter());
    } else {
      dispatch(setDefaultResourceFilter());
    }
  };

  const apply = (type) => {
    if (type === "lecture") {
      dispatch(requestLectures());
    } else {
      dispatch(requestResources());
    }
  };

  /**
   * filterOption의 현재 값과 비교하여
   * 일치하거나, 현재 속해있는 값이 있으면 true를 반환합니다.
   *
   * @param {string} key
   * @param {string} value
   * @returns boolean
   */
  const isChoiced = (key, value) => {
    switch (key) {
      case "order":
      case "sort":
        if (filterOptions[key] === value) {
          return true;
        }
        return false;
      case "classification":
      case "hashtag":
      case "category":
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
      <Refresh onClick={() => refreshFilter(type)} />
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
      <ApplyButton onClick={() => apply(type)} />
    </Wrapper>
  );
};

FilterBox.defaultProps = {
  type: "lecture",
  filterList: {},
  setIsFilterBoxVisible: () => {},
};

FilterBox.propTypes = {
  type: PropTypes.string,
  filterList: PropTypes.object,
  setIsFilterBoxVisible: PropTypes.func,
};

export default FilterBox;
