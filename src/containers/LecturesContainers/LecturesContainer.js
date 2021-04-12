import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import LectureAPI from "api/lecture";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  InnerContentWidth,
} from "static/Shared/commonStyles";
import lectureFilterList from "static/LecturePage/lectureFilterList.json";
import { majorList } from "static/LecturePage/majorList";
import { requestFinished, requestLectures, setDepartment } from "store/modules/lectures";

import LectureSearchForm from "components/LecturesComponents/LectureSearchForm";
import FilterBox from "components/Shared/FilterBox";
import LectureCard from "components/Shared/LectureCard";

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

const LecturesSection = styled.section`
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

const CardGrid = styled.div`
  display: grid;
  /* overflow-y: scroll; */
  width: 1135px;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px 18px;
`;

const LecturesContainer = () => {
  const dispatch = useDispatch();
  const { isLoading, ...filterOptions } = useSelector((state) => state.lectureReducer);

  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);

  const [lectures, setLectures] = useState([]);

  /**
   * 처음 마운트 되었을 때 요청
   */
  useEffect(async () => {
    try {
      const { data } = await LectureAPI.getLectures(filterOptions);
      setLectures(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(requestFinished());
    }
  }, []);

  /**
   * 첫 요청 이후 isLoading 이 true가 될 경우 API를 재요청한다.
   *
   * isLoading = true가 될 경우는 다음과 같다.
   * 1. 전공을 눌렀을 때
   * 2. 검색창에 검색했을 때
   * 3. 필터 창에 적용 버튼을 눌렀을 때
   */
  useEffect(async () => {
    if (isLoading) {
      try {
        const { data } = await LectureAPI.getLectures(filterOptions);
        setLectures(data);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(requestFinished());
      }
    }
  }, [isLoading]);

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
            onClick={() => {
              dispatch(setDepartment({ department }));
              !isFilterBoxVisible && dispatch(requestLectures());
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
        {/* {isLoading && <LoadingSpinner />} */}

        <SearchResultLabel>{`탐색 결과 (${lectures.length})`}</SearchResultLabel>
        <CardGrid>
          {lectures.map((data) => (
            <LectureCard data={data} key={data.id} />
          ))}
        </CardGrid>
      </LecturesSection>
    </Wrapper>
  );
};

export default LecturesContainer;
