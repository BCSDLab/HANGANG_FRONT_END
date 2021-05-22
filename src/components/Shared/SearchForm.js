import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ConceptColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";
import { useDispatch } from "react-redux";
import { requestLectures, setKeywordOnLectures } from "store/modules/lecturesModule";
import { requestResources, setKeywordOnResources } from "store/modules/resourcesModule";

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
  margin-top: 1px;
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

const Form = styled.form`
  all: unset;
`;

const inputPlaceholderConverter = (type) => {
  if (type === "lectures") return "교과명, 교수명, 과목코드 검색";
  else return "교과명, 교수명, 키워드 검색";
};

const Input = styled.input.attrs(({ type }) => ({
  type: "search",
  placeholder: inputPlaceholderConverter(type),
}))`
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

  ::placeholder {
    color: ${PlaceholderColor};
  }
`;

/**
 * 강의평, 강의자료 페이지에서 사용되는 검색바
 * props로부터 type을 전달 받으며 type은 강의평 / 강의자료를 구분하는 변수이다.
 *
 * @param {string} type
 * @returns
 */
const SearchForm = ({ type = "lectuers" }) => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [isVisibleCancelButton, setIsVisibleCancelButton] = useState(false);

  useEffect(() => {
    if (term.length !== 0) setIsVisibleCancelButton(true);
    else setIsVisibleCancelButton(false);
  }, [term]);

  const onSearch = (e) => {
    e.preventDefault();
    if (type === "lectures") {
      dispatch(setKeywordOnLectures({ keyword: term }));
      dispatch(requestLectures());
    } else {
      dispatch(setKeywordOnResources({ keyword: term }));
      dispatch(requestResources());
    }
  };

  const clickCancelButton = () => {
    setTerm("");
    if (type === "lectures") {
      dispatch(setKeywordOnLectures({ keyword: "" }));
      dispatch(requestLectures());
    } else {
      dispatch(setKeywordOnResources({ keyword: "" }));
      dispatch(requestResources());
    }
  };

  return (
    <Wrapper>
      <Label>{type === "lectures" ? "강의평가" : "강의자료"}</Label>
      <Delimiter />
      <Form onSubmit={(e) => onSearch(e)}>
        <Input value={term} onChange={(e) => setTerm(e.target.value)} type={type} />
      </Form>
      {isVisibleCancelButton && <CancelIcon onClick={() => clickCancelButton()} />}
      <SearchIcon />
    </Wrapper>
  );
};

SearchForm.propTypes = {
  type: PropTypes.string,
};

export default SearchForm;
