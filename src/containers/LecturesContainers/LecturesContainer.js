import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  BorderColor,
  ConceptColor,
  FontColor,
  InnerContentWidth,
} from "static/Shared/commonStyles";
import lectureFilterList from "static/LecturePage/lectureFilterList.json";
import { majorList } from "static/LecturePage/majorList";

import LectureSearchForm from "components/LecturesComponents/LectureSearchForm";
import { setDepartment } from "store/modules/lectures";
import FilterBox from "components/Shared/FilterBox";

const Wrapper = styled.div`
  width: ${InnerContentWidth};
  height: 833px;
  margin: 90px auto 98px auto;
`;

const SearchSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FilterButton = styled.button`
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

const FilterSection = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  height: 32px;

  margin-top: 48px;

  ${FilterButton}:not(:last-child) {
    margin-right: 16px;
  }
`;

const FilterImage = styled.img.attrs({
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

const LecturesContainer = () => {
  const dispatch = useDispatch();
  const filterOptions = useSelector((state) => state.lectureReducer);

  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);

  useEffect(() => {
    console.log(filterOptions);
  }, [filterOptions]);

  return (
    <Wrapper>
      <SearchSection>
        <LectureSearchForm />
      </SearchSection>
      <FilterSection>
        {majorList.map(({ label, department }) => (
          <FilterButton
            key={label}
            name="department"
            onClick={() => dispatch(setDepartment({ department }))}
            isChosen={filterOptions.department === department}
          >
            {label}
          </FilterButton>
        ))}
        <FilterImage onClick={() => setIsFilterBoxVisible((prev) => !prev)} />
        {isFilterBoxVisible && (
          <FilterBox
            type="lecture"
            filterList={lectureFilterList}
            setIsFilterBoxVisible={setIsFilterBoxVisible}
          />
        )}
      </FilterSection>
    </Wrapper>
  );
};

export default LecturesContainer;
