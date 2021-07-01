import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import LectureAPI from "api/lecture";
import {
  SearchSection,
  Wrapper,
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
import useInfiniteScroll from "hooks/useInfiniteScroll";
import lectureFilterList from "static/LecturesPage/lectureFilterList.json";
import { majorList } from "static/LecturesPage/majorList";
import {
  requestLectures,
  resetLectureModuleState,
  setDepartmentOnLectures,
  setLectures,
  setNextPageLectures,
} from "store/modules/lecturesModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";

const LecturesContainer = () => {
  const dispatch = useDispatch();
  const lectureReducerState = useSelector((state) => state.lectureReducer);

  const {
    isLoading,
    lectures,
    lecture_amount,
    page,
    max_page,
    ...filterOptions
  } = lectureReducerState;

  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);
  const { isCheckedToken, isLoggedIn } = useSelector((state) => state.authReducer);

  useEffect(() => {
    return () => {
      dispatch(resetLectureModuleState());
    };
  }, []);

  useEffect(() => {
    if (isCheckedToken && isLoading) {
      fetchLectures({ page, ...filterOptions }, isLoggedIn, dispatch);
    }
  }, [filterOptions]);

  /**
   * page를 넘어갈 경우 새로운 강의를 불러옵니다.
   */
  const fetchMore = debounce((entries) => {
    const target = entries[0];
    if (target.isIntersecting && page <= max_page) {
      fetchNextPageLectures({ page, ...filterOptions }, isLoggedIn, dispatch);
    }
  }, 500);
  const { targetRef } = useInfiniteScroll(fetchMore, 2);

  return (
    <Wrapper>
      <SearchSection>
        <SearchForm type="lectures" />
      </SearchSection>

      <FilterSection>
        {majorList.map(({ label, department }) => (
          <FilterButton
            key={label}
            name="department"
            onClick={() => {
              dispatch(setDepartmentOnLectures({ department, allowDuplicate: false }));
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
    </Wrapper>
  );
};

const fetchLectures = async (options, isLoggedIn, dispatch) => {
  try {
    const { data } = await LectureAPI.getLectures(options, isLoggedIn);
    dispatch(setLectures(data));
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
    throw new Error(error);
  }
};

const fetchNextPageLectures = async (options, isLoggedIn, dispatch) => {
  try {
    const { data } = await LectureAPI.getLectures(options, isLoggedIn);
    dispatch(setNextPageLectures(data));
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
    throw new Error(error);
  }
};

export default LecturesContainer;
