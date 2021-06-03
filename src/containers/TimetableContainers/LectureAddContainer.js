import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TimetableAPI from "api/timetable";
import { CLASSIFICATION_LIST } from "static/Shared/CLASSIFICATION_LIST";
import { MAJOR_LIST } from "static/Shared/MAJOR_LIST";
import {
  setDefaultFilterOption,
  setFilterOption,
  setLectureList,
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
  RecentlySearchedBox,
  RefreshButton,
  SearchAddBox,
  SearchAddButton,
  SearchBar,
  SearchBarSection,
  SearchButton,
  UnderBar,
  WhiteBackground,
  XButton,
} from "./styles/LectureAddContainer.style";
import Lecture from "components/TimetableComponents/Lecture";

const LectureAddContainer = () => {
  const dispatch = useDispatch();
  const { lectureList, ...rest } = useSelector((state) => state.timetableReducer);
  const boxWrapperRef = useRef();
  const [current, setCurrent] = useState("검색추가");
  const [isClassificationFilterVisible, setIsClassificationFilterVisible] = useState(
    false
  );

  const searchLectureOnWord = (e) => {
    e.preventDefault();
    dispatch(setFilterOption({ key: "keyword", value: e.target[0].value }));
    setCurrent("검색추가");
  };

  useEffect(() => {
    setLecturesOnState(rest, dispatch);
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
            <SearchBarSection onSubmit={searchLectureOnWord}>
              {current === "검색" && (
                <PrevButton onClick={() => setCurrent("검색추가")} />
              )}
              <SearchBar current={current} onClick={() => setCurrent("검색")} />
              <SearchButton />
            </SearchBarSection>

            {/* FILTER SECTION */}
            <FilterSection>
              {MAJOR_LIST.map(({ label, department: value }) => (
                <MajorFilterButton
                  key={label}
                  value={label}
                  isTarget={rest.department === value}
                  onClick={() => dispatch(setFilterOption({ key: "department", value }))}
                >
                  {label}
                </MajorFilterButton>
              ))}
              <AdjustmentButton
                onClick={() => setIsClassificationFilterVisible((prev) => !prev)}
              />
            </FilterSection>

            {/* LECTURES SECTION */}

            <LectureSection>
              {lectureList.map((lectureInfo) => (
                <Lecture infos={lectureInfo} key={lectureInfo.id} />
              ))}
            </LectureSection>
          </SearchAddBox>

          <DirectlyAddBox>
            <span>hihi</span>
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

const setLecturesOnState = async (options, dispatch) => {
  try {
    const { data } = await TimetableAPI.fetchLectures(options);
    dispatch(setLectureList(data));
  } catch (error) {
    throw new Error(error);
  }
};

export default LectureAddContainer;
