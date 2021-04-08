import React, { useState } from "react";
import styled from "styled-components";

import { ConceptColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 911px;
  height: 53px;
  border: 1px solid ${ConceptColor};
  border-radius: 26.5px;
  background-color: #fff;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${ConceptColor};
  margin-left: 20px;
`;

const Delimiter = styled.div`
  width: 1px;
  height: 21px;
  margin: 0px 15px;
  background-color: ${ConceptColor};
`;

const SearchIcon = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/lecturespage/search.png",
  alt: "검색",
})`
  position: absolute;
  right: 20px;
  top: calc(50% - 12px);
  width: 24px;
  cursor: pointer;
`;

const SearchForm = styled.form`
  all: unset;
`;

const Input = styled.input.attrs({
  type: "search",
  placeholder: "교과명, 교수명, 과목코드 검색",
})`
  width: 763px;
  height: 21px;
  font-size: 14px;
  color: ${FontColor};
  padding-right: 30px;
  border: none;
  outline: none;

  ::placeholder {
    color: ${PlaceholderColor};
  }
`;

const LectureSearchForm = () => {
  const [term, setTerm] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    console.log(term);
  };

  return (
    <Wrapper>
      <Label>강의평가</Label>
      <Delimiter />
      <SearchForm
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onSubmit={(e) => onSearch(e)}
      >
        <Input />
      </SearchForm>
      <SearchIcon />
    </Wrapper>
  );
};

export default LectureSearchForm;
