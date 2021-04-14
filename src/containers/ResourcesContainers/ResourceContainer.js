import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import SearchForm from "components/Shared/SearchForm";
import FilterBox from "components/Shared/FilterBox";

import { majorList } from "static/LecturesPage/majorList";
import ResourceFilterList from "static/ResourcesPage/ResourceFilterList.json";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  InnerContentWidth,
} from "static/Shared/commonStyles";

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

const ResourcesSection = styled.section`
  width: 100%;
  height: 1000px;
  padding: 24px 0px 98px 0px;
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

const ResourceContainer = () => {
  const dispatch = useDispatch();
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);

  return (
    <Wrapper>
      <SearchSection>
        <SearchForm type="resources" />
      </SearchSection>

      <FilterSection>
        {majorList.map(({ label, department }) => (
          <FilterButton
            key={label}
            name="department"
            onClick={() => {
              // dispatch(setDepartment({ department }));
              // dispatch(requestLectures());
            }}
            // isChosen={filterOptions.department === department}
          >
            {label}
          </FilterButton>
        ))}
        <FilterImage onClick={() => setIsFilterBoxVisible((prev) => !prev)} />
        {isFilterBoxVisible && (
          <FilterBox
            type="resources"
            filterList={ResourceFilterList}
            setIsFilterBoxVisible={setIsFilterBoxVisible}
          />
        )}
      </FilterSection>

      {/* <ResourcesSection>
        <SearchResultLabel>{`탐색 결과 (${lectures.length})`}</SearchResultLabel>
        <CardGrid>
          {lectures.map((data) => (
            <LectureCard
              data={data}
              isScrapped={scrapped.includes(data.id)}
              key={data.id}
            />
          ))}
        </CardGrid>
      </ResourcesSection> */}
    </Wrapper>
  );
};

export default ResourceContainer;
