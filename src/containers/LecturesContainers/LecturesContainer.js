import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import LectureAPI from "api/lecture";
import MypageAPI from "api/mypage";

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
import { requestFinished, requestLectures, setDepartment } from "store/modules/lectures";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

const Wrapper = styled.div`
  width: ${InnerContentWidth};
  height: 833px;
  margin: 90px auto 98px auto;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
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

const LecturesContainer = () => {
  const dispatch = useDispatch();
  const { isLoading, ...filterOptions } = useSelector((state) => state.lectureReducer);
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);

  const [lectures, setLectures] = useState([]);
  const [scrapped, setScrapped] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  /**
   * 처음 마운트 되었을 때
   *
   * 로그인 되어있을 경우 사용자가 스크랩한 강의를 받는다.
   * 스크랩한 강의가 lectures에 있을 경우 스크랩 아이콘을 추가해준다.
   */
  useEffect(async () => {
    try {
      if (isLoggedIn) {
        const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");
        const { data } = await MypageAPI.getScrapLecture(accessToken);

        let scrappedId = [];
        data.forEach(({ id }) => scrappedId.push(id));
        setScrapped(scrappedId);

        if (lectures.length === 0) {
          const { data } = await LectureAPI.getLectures(filterOptions);
          setLectures(data);
        }
      }

      if (!isLoggedIn) {
        const { data } = await LectureAPI.getLectures(filterOptions);
        setLectures(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(requestFinished());
      setIsFetched(true);
    }
  }, [isLoggedIn]);

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
      {!isFetched && (
        <SpinnerWrapper>
          <LoadingSpinner />
        </SpinnerWrapper>
      )}

      {isFetched && (
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
                  dispatch(setDepartment({ department }));
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
          </LecturesSection>
        </>
      )}
    </Wrapper>
  );
};

export default LecturesContainer;
