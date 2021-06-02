import React, { useState } from "react";
import {
  DirectlyAddButton,
  LectureAddBox,
  PrevButton,
  SearchAddButton,
  SearchBar,
  SearchBarSection,
  SearchButton,
  UnderBar,
  WhiteBackground,
} from "./styles/LectureAddContainer.style";

const LectureAddContainer = () => {
  const [current, setCurrent] = useState("검색추가");
  const [word, setWord] = useState("");

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
      </WhiteBackground>
    </LectureAddBox>
  );
};

export default LectureAddContainer;
