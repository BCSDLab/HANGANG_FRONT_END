import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { debounce } from "lodash";

import LectureAPI from "api/lecture";

import SearchForm from "components/Shared/SearchForm";
import FilterBox from "components/Shared/FilterBox";
import LectureCard from "components/Shared/LectureCard";
import LoadingSpinner from "components/Shared/LoadingSpinner";

import {
  BorderColor,
  ConceptColor,
  FontColor,
  InnerContentWidth,
} from "static/Shared/commonStyles";
import lectureFilterList from "static/LecturesPage/lectureFilterList.json";
import { majorList } from "static/LecturesPage/majorList";
import {
  requestLecturesFinished,
  requestLectures,
  setDepartmentOnLectures,
  setLectures,
  setLecturesNextPage,
} from "store/modules/lecturesModule";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import useInfiniteScroll from "hooks/useInfiniteScroll";

const Wrapper = styled.div`
  width: ${InnerContentWidth};

  margin: 90px auto 98px auto;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 1084px;
  display: flex;
  align-items: center;
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

const LecturesSection = styled.section`
  width: 100%;
  padding: 24px 0px 98px 0px;
`;

const SearchResultLabel = styled.label`
  display: block;
  margin-bottom: 24px;

  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 133px);
  grid-gap: 30px 18px;

  width: 1135px;
`;

const FakeDiv = styled.div``;

const LecturesContainer = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    isFetchedOnFirstLecturesMount,
    lectures,
    lecture_amount,
    page,
    max_page,
    ...filterOptions
  } = useSelector((state) => state.lectureReducer);

  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);

  const fetchLectures = async (options) => {
    try {
      let accessToken = isLoggedIn
        ? getValueOnLocalStorage("hangangToken").access_token
        : null;

      const { data } = await LectureAPI.getLectures(options, accessToken);
      dispatch(setLectures(data));
    } catch (error) {
      throw new Error(error);
    } finally {
      dispatch(requestLecturesFinished());
    }
  };

  useEffect(() => {
    if ((isCheckedToken && !isFetchedOnFirstLecturesMount) || isLoading)
      fetchLectures({ page, ...filterOptions });
  }, [isCheckedToken, isFetchedOnFirstLecturesMount, isLoading]);

  const fetchMore = debounce((entries) => {
    const target = entries[0];
    if (target.isIntersecting && page < max_page) {
      fetchLectures({ page: page + 1, ...filterOptions });
      dispatch(setLecturesNextPage());
    }
  }, 500);

  const { targetRef } = useInfiniteScroll(fetchMore, { threshold: 0.8 });

  return (
    <Wrapper>
      {!isFetchedOnFirstLecturesMount && (
        <SpinnerWrapper>
          <LoadingSpinner />
        </SpinnerWrapper>
      )}

      {isFetchedOnFirstLecturesMount && (
        <>
          <SearchSection>
            <SearchForm type="lectures" />
          </SearchSection>

          <FilterSection>
            {majorList.map(({ label, department }) => (
              <FilterButton
                key={label}
                name="department"
                onClick={() => {
                  dispatch(setDepartmentOnLectures({ department }));
                  dispatch(requestLectures());
                }}
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

          <LecturesSection>
            <SearchResultLabel>{`탐색 결과 (${lecture_amount})`}</SearchResultLabel>
            <CardGrid>
              {lectures.map((data) => (
                <LectureCard
                  data={data}
                  isScrapped={data.is_scraped}
                  key={data.id}
                  isEditMode={false}
                />
              ))}
            </CardGrid>
          </LecturesSection>

          <FakeDiv ref={targetRef} />
        </>
      )}
    </Wrapper>
  );
};

export default LecturesContainer;
