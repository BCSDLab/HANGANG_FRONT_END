import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import TimetableAPI from "api/timetable";
import { CLASSIFICATION_LIST } from "static/Shared/CLASSIFICATION_LIST";
import { MAJOR_LIST } from "static/Shared/MAJOR_LIST";
import {
  removeCandidateClassTimes,
  setDefaultFilterOption,
  setFilterOption,
  setLectureList,
  setLectureOnNextPage,
} from "store/modules/timetableModule";
import {
  AdjustmentButton,
  BoxWrapper,
  ButtonGrid,
  ClassificationFilter,
  DirectlyAddBox,
  DirectlyAddButton,
  FilterButton,
  FilterLabel,
  FilterSection,
  Label,
  LectureAddBox,
  LectureSection,
  MajorFilterButton,
  PrevButton,
  RecentlySearchTermLabel,
  RecentlySearchTermSection,
  RefreshButton,
  SearchAddBox,
  SearchAddButton,
  SearchBar,
  SearchBarSection,
  SearchButton,
  Term,
  UnderBar,
  WhiteBackground,
  XButton,
  TermDeleteButton,
  TermWrapper,
} from "./styles/index.style";
import Lecture from "components/TimetableComponents/Lecture";
import DirectlyAddContainer from "./DirectlyAddContainer";
import NoData from "components/TimetableComponents/NoData";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { getValueOnLocalStorage, setValueOnLocalStorage } from "utils/localStorageUtils";

const AddLectureSection = () => {
  const boxWrapperRef = useRef();
  const dispatch = useDispatch();
  const { lectureList, maxPageOnLectureList, ...rest } = useSelector(
    (state) => state.timetableReducer
  );
  const [current, setCurrent] = useState("검색추가");
  const [searchTermList, setSearchTermList] = useState(
    getValueOnLocalStorage("timetableSearchTerm")
  );
  const [isClassificationFilterVisible, setIsClassificationFilterVisible] = useState(
    false
  );

  const fetchMore = debounce((entries) => {
    const target = entries[0];
    if (target.isIntersecting && rest.page < maxPageOnLectureList) {
      const { classification, department, keyword, limit, page, semesterDateId } = rest;
      fetchLectureOnNextPage(
        { classification, department, keyword, limit, page, semesterDateId },
        dispatch
      );
    }
  }, 200);
  const { targetRef } = useInfiniteScroll(fetchMore);

  const setSearchTermOnLocalStorage = (term) => {
    if (searchTermList === null) {
      setSearchTermList([term]);
      setValueOnLocalStorage("timetableSearchTerm", [term]);
    } else {
      setSearchTermList([...searchTermList, term]);
      setValueOnLocalStorage("timetableSearchTerm", [...searchTermList, term]);
    }
  };

  const deleteTerm = (term) => {
    let currentTermList = searchTermList;
    let erasedTermList = currentTermList.filter((t) => t !== term);
    setSearchTermList(erasedTermList);
    setValueOnLocalStorage("timetableSearchTerm", erasedTermList);
  };

  const searchLectureOnWord = (e, word) => {
    e.preventDefault();
    dispatch(setFilterOption({ key: "keyword", value: word }));
    setCurrent("검색추가");
    if (word !== "" && !searchTermList.includes(word)) {
      setSearchTermOnLocalStorage(word);
    }
  };

  useEffect(() => {
    const {
      classification,
      department,
      keyword,
      limit,
      page,
      currentSemesterValue,
    } = rest;
    setLecturesOnState(
      {
        classification,
        department,
        keyword,
        limit,
        page,
        semesterDateId: currentSemesterValue,
      },
      dispatch
    );
  }, [rest.classification, rest.department, rest.keyword]);

  useEffect(() => {
    if (current === "직접추가") {
      boxWrapperRef.current.style.transform = "translateX(-50%)";
    } else {
      boxWrapperRef.current.style.transform = "translateX(0)";
    }
  }, [current]);

  return (
    <LectureAddBox>
      <div onClick={(e) => setCurrent(e.target.value)}>
        <SearchAddButton isSelected={["검색추가", "검색"].includes(current)} />
        <DirectlyAddButton isSelected={["직접추가"].includes(current)} />
      </div>
      <UnderBar current={current} />
      <WhiteBackground>
        <BoxWrapper ref={boxWrapperRef}>
          <SearchAddBox>
            {/* SEARCH BAR SECTION */}
            <SearchBarSection onSubmit={(e) => searchLectureOnWord(e, e.target[0].value)}>
              {current === "검색" && (
                <PrevButton onClick={() => setCurrent("검색추가")} />
              )}
              <SearchBar current={current} onClick={() => setCurrent("검색")} />
              <SearchButton />
            </SearchBarSection>

            {/* FILTER SECTION */}
            {current === "검색추가" && (
              <FilterSection>
                {MAJOR_LIST.map(({ label, department: value }) => (
                  <MajorFilterButton
                    key={label}
                    value={label}
                    isTarget={rest.department === value}
                    onClick={() =>
                      dispatch(setFilterOption({ key: "department", value }))
                    }
                  >
                    {label}
                  </MajorFilterButton>
                ))}
                <AdjustmentButton
                  onClick={() => setIsClassificationFilterVisible((prev) => !prev)}
                />
              </FilterSection>
            )}

            {/* LECTURES SECTION */}
            {current === "검색추가" && (
              <LectureSection
                ref={targetRef}
                onMouseLeave={() => dispatch(removeCandidateClassTimes())}
              >
                {lectureList.length !== 0 &&
                  lectureList.map((lectureInfo) => (
                    <Lecture infos={lectureInfo} key={lectureInfo.id} />
                  ))}
                {lectureList.length === 0 && (
                  <NoData isSeasonSemester={rest.currentSemesterValue % 2 === 0} />
                )}
              </LectureSection>
            )}

            {current === "검색" && (
              <RecentlySearchTermSection>
                <RecentlySearchTermLabel>최근검색어</RecentlySearchTermLabel>
                {searchTermList.map((term) => (
                  <TermWrapper key={term}>
                    <Term as="div" onClick={(e) => searchLectureOnWord(e, term)}>
                      {term}
                    </Term>
                    <TermDeleteButton onClick={() => deleteTerm(term)} />
                  </TermWrapper>
                ))}
              </RecentlySearchTermSection>
            )}
          </SearchAddBox>

          <DirectlyAddBox>
            <DirectlyAddContainer />
          </DirectlyAddBox>
        </BoxWrapper>
      </WhiteBackground>

      {/* MORE FILTER SECTION */}
      {isClassificationFilterVisible && (
        <ClassificationFilter>
          <Label>필터를 적용해 보세요.</Label>
          <RefreshButton onClick={() => dispatch(setDefaultFilterOption())} />
          <XButton onClick={() => setIsClassificationFilterVisible(false)} />
          <FilterLabel>유형</FilterLabel>
          <ButtonGrid>
            {CLASSIFICATION_LIST.map(({ label, value }) => (
              <FilterButton
                key={label}
                value={label}
                isChoiced={rest.classification.includes(value)}
                onClick={() =>
                  dispatch(setFilterOption({ key: "classification", value }))
                }
              />
            ))}
          </ButtonGrid>
        </ClassificationFilter>
      )}
    </LectureAddBox>
  );
};

const fetchLectureOnNextPage = async (options, dispatch) => {
  try {
    let nextPageOptions = { ...options, page: ++options.page };
    const { data } = await TimetableAPI.fetchLectures(nextPageOptions);
    dispatch(setLectureOnNextPage({ lectures: data.result }));
  } catch (error) {
    throw new Error(error);
  }
};

const setLecturesOnState = async (options, dispatch) => {
  try {
    let firstPageOptions = { ...options, page: 1 };
    const { data } = await TimetableAPI.fetchLectures(firstPageOptions);
    dispatch(setLectureList(data));
  } catch (error) {
    throw new Error(error);
  }
};

export default AddLectureSection;
