import React, { useState } from "react";
import { CLASSIFICATION_LIST } from "static/Shared/CLASSIFICATION_LIST";
import { MAJOR_LIST } from "static/Shared/MAJOR_LIST";
import {
  AdjustmentButton,
  ButtonGrid,
  ClassificationFilter,
  DirectlyAddButton,
  FilterButton,
  FilterLabel,
  FilterSection,
  Label,
  LectureAddBox,
  MajorFilterButton,
  PrevButton,
  RefreshButton,
  SearchAddButton,
  SearchBar,
  SearchBarSection,
  SearchButton,
  UnderBar,
  WhiteBackground,
  XButton,
} from "./styles/LectureAddContainer.style";

const LectureAddContainer = () => {
  const [current, setCurrent] = useState("검색추가");
  const [word, setWord] = useState("");
  const [filter, setFilter] = useState({
    major: "교양",
    classification: [],
  });
  const [isClassificationFilterVisible, setIsClassificationFilterVisible] = useState(
    true
  );

  const searchLectureOnWord = (e) => {
    e.preventDefault();
    console.log(word);
  };

  return (
    <LectureAddBox>
      <div onClick={(e) => setCurrent(e.target.value)}>
        <SearchAddButton isSelected={["검색추가", "검색"].includes(current)} />
        <DirectlyAddButton isSelected={["직접추가"].includes(current)} />
      </div>
      <UnderBar current={current} />
      <WhiteBackground>
        {/* SEARCH BAR SECTION */}
        {current !== "직접추가" && (
          <SearchBarSection onSubmit={searchLectureOnWord}>
            {current === "검색" && <PrevButton onClick={() => setCurrent("검색추가")} />}
            <SearchBar
              current={current}
              onClick={() => setCurrent("검색")}
              onChange={(e) => setWord(e.target.value)}
              value={word}
            />
            <SearchButton />
          </SearchBarSection>
        )}

        {/* FILTER SECTION */}
        {current === "검색추가" && (
          <FilterSection
            onClick={(e) => setFilter((prev) => ({ ...prev, major: e.target.value }))}
          >
            {MAJOR_LIST.map(({ label }) => (
              <MajorFilterButton
                key={label}
                value={label}
                isTarget={filter.major === label}
              >
                {label}
              </MajorFilterButton>
            ))}
            <AdjustmentButton
              onClick={() => setIsClassificationFilterVisible((prev) => !prev)}
            />
          </FilterSection>
        )}
      </WhiteBackground>

      {/* MORE FILTER SECTION */}
      {isClassificationFilterVisible && (
        <ClassificationFilter>
          <Label>필터를 적용해 보세요.</Label>
          <RefreshButton />
          <XButton onClick={() => setIsClassificationFilterVisible(false)} />
          <FilterLabel>유형</FilterLabel>
          <ButtonGrid>
            {CLASSIFICATION_LIST.map(({ label }) => (
              <FilterButton
                key={label}
                value={label}
                // isChoiced={isChoiced(key, filterValue)}
                // onClick={() => setFilter(key, filterValue)}
              />
            ))}
          </ButtonGrid>
        </ClassificationFilter>
      )}
    </LectureAddBox>
  );
};

export default LectureAddContainer;
