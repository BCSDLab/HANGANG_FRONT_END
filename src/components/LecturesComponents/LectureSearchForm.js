import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ConceptColor, FontColor } from "static/Shared/commonStyles";
import { useDispatch } from "react-redux";
import { requestLectures, setKeyword } from "store/modules/lectures";

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

const CancelIcon = styled(SearchIcon).attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/lecturespage/exit.png",
  alt: "cancel",
})`
  right: 53px;
  cursor: pointer;
  z-index: 9990;
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

  ::-webkit-search-cancel-button {
    display: none;
  }
`;

const LectureSearchForm = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [isVisibleCancelButton, setIsVisibleCancelButton] = useState(false);

  useEffect(() => {
    if (term.length !== 0) setIsVisibleCancelButton(true);
    else setIsVisibleCancelButton(false);
  }, [term]);

  const onSearch = (e) => {
    e.preventDefault();
    dispatch(setKeyword({ keyword: term }));
    dispatch(requestLectures());
  };

  const clickCancelButton = () => {
    setTerm("");
    dispatch(setKeyword({ keyword: "" }));
    dispatch(requestLectures());
  };

  return (
    <Wrapper>
      <Label>강의평가</Label>
      <Delimiter />
      <SearchForm onSubmit={(e) => onSearch(e)}>
        <Input value={term} onChange={(e) => setTerm(e.target.value)} />
      </SearchForm>
      {isVisibleCancelButton && <CancelIcon onClick={() => clickCancelButton()} />}
      <SearchIcon />
    </Wrapper>
  );
};

export default LectureSearchForm;
