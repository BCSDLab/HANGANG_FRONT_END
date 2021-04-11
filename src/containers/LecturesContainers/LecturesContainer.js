import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { majorList } from "static/LecturePage/majorList";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  InnerContentWidth,
} from "static/Shared/commonStyles";

import lectureFilterList from "static/LecturePage/lectureFilterList.json";

import LectureSearchForm from "components/LecturesComponents/LectureSearchForm";
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
  /* background-color: red; */

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
  const defaultFilterOptions = {
    sort: "평점순",
    classification: [],
    hashtag: [],
  };

  const [filterOptions, setFilterOptions] = useState({
    keyword: "",
    department: "",
    limit: 8,
    page: 1,
    ...defaultFilterOptions,
  });
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);

  const setDefault = () => {
    setFilterOptions((prev) => ({ ...prev, ...defaultFilterOptions }));
  };

  const clickFilterButton = (e, department) => {
    if (filterOptions.department !== department) {
      setFilterOptions((prev) => ({ ...prev, [e.target.name]: department }));
    } else {
      setFilterOptions((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

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
            isChosen={filterOptions.department === department}
            name="department"
            onClick={(e) => clickFilterButton(e, department)}
          >
            {label}
          </FilterButton>
        ))}
        <FilterImage onClick={() => setIsFilterBoxVisible((prev) => !prev)} />
        {isFilterBoxVisible && (
          <FilterBox
            filterList={lectureFilterList}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            setIsFilterBoxVisible={setIsFilterBoxVisible}
            setDefault={setDefault}
          />
        )}
      </FilterSection>
    </Wrapper>
  );
};

export default LecturesContainer;
