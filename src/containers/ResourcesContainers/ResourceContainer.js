import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import SearchForm from "components/Shared/SearchForm";
import FilterBox from "components/Shared/FilterBox";

import { majorList } from "static/LecturesPage/majorList";
import ResourceFilterList from "static/ResourcesPage/ResourceFilterList.json";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  InnerContentWidth,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import {
  requestResources,
  requestFinished,
  setDepartment,
} from "store/modules/resources";

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

const ResourcesSection = styled.section`
  position: relative;
  width: 100%;
  height: 1000px;
  padding: 24px 0px 98px 0px;
`;

const SearchResultLabel = styled.label`
  display: block;
  margin-bottom: 24px;

  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;

const ResourceWriteButton = styled.input.attrs({
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
  /* text-align: center; */
  padding-left: 16px;
  color: ${PlaceholderColor};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 133px);
  grid-gap: 30px 18px;

  width: 1135px;
  height: 622px;

  overflow-y: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome
  }
`;

const ResourceContainer = () => {
  const dispatch = useDispatch();
  const { isLoading, ...filterOptions } = useSelector((state) => state.resourceReducer);
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);

  useEffect(async () => {
    if (isLoading) {
      try {
        // TODO: fetch resources
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(requestFinished());
      }
    }
  }, [isLoading]);

  useEffect(() => {
    console.log(filterOptions);
  }, [filterOptions]);

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
              dispatch(setDepartment({ department }));
              dispatch(requestResources());
            }}
            isChosen={filterOptions.department === department}
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

      <ResourcesSection>
        <SearchResultLabel>{`탐색 결과 (8)`}</SearchResultLabel>
        <ResourceWriteButton />
        {/* <SearchResultLabel>{`탐색 결과 (${lectures.length})`}</SearchResultLabel> */}
        <CardGrid>
          {/* {lectures.map((data) => (
            <LectureCard
              data={data}
              isScrapped={scrapped.includes(data.id)}
              key={data.id}
            />
          ))} */}
        </CardGrid>
      </ResourcesSection>
    </Wrapper>
  );
};

export default ResourceContainer;
