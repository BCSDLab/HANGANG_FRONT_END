import React from "react";

import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  requestLectures,
  setDefaultLectureFilter,
  setLectureFilter,
} from "store/modules/lecturesModule";
import {
  requestResources,
  setResourcesFilter,
  setDefaultResourceFilter,
} from "store/modules/resourcesModule";

import {
  Wrapper,
  NotifyLabel,
  Refresh,
  Exit,
  Section,
  Label,
  Buttons,
  FilterButton,
} from "./styles/FilterBox.style";

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
      dispatch(requestLectures());
    } else {
      dispatch(setResourcesFilter({ key, value }));
      dispatch(requestResources());
    }
  };

  const refreshFilter = (type) => {
    if (type === "lecture") {
      dispatch(setDefaultLectureFilter());
      dispatch(requestLectures());
    } else {
      dispatch(setDefaultResourceFilter());
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
    </Wrapper>
  );
};

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
