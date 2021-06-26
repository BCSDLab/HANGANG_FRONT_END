import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import LectureAPI from "api/lecture";
import {
  SearchSection,
  Wrapper,
  SpinnerWrapper,
  FilterSection,
  FilterButton,
  FilterImage,
  LecturesSection,
  SearchResultLabel,
  CardGrid,
} from "containers/LecturesContainers/LecturesContainer.style";
import SearchForm from "components/Shared/SearchForm";
import FilterBox from "components/Shared/FilterBox";
import LectureCard from "components/Shared/LectureCard";
import LoadingSpinner from "components/Shared/LoadingSpinner";
import useInfiniteScroll from "hooks/useInfiniteScroll";
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

  useEffect(() => {
    if ((isCheckedToken && !isFetchedOnFirstLecturesMount) || isLoading)
      fetchLectures({ page, ...filterOptions }, isLoggedIn, dispatch);
  }, [isCheckedToken, isFetchedOnFirstLecturesMount, isLoading]);

  /**
   * page를 넘어갈 경우 새로운 강의를 불러옵니다.
   */
  const fetchMore = debounce((entries) => {
    const target = entries[0];
    if (target.isIntersecting && page < max_page) {
      fetchLectures({ page: page + 1, ...filterOptions }, isLoggedIn, dispatch);
      dispatch(setLecturesNextPage());
    }
  }, 500);
  const { targetRef } = useInfiniteScroll(fetchMore);

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
            <CardGrid ref={targetRef}>
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
        </>
      )}
    </Wrapper>
  );
};

const fetchLectures = async (options, isLoggedIn, dispatch) => {
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

export default LecturesContainer;
