import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import LectureSearchBox from "components/ResourceComponents/ResourceWriteComponents/LectureSearchBox";
import {
  BorderColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { SEARCH_ICON_URL } from "static/Shared/imageUrls";
import { setForm } from "store/modules/resourceCreateModule";
import { useDispatch } from "react-redux";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: 100%;
  height: 30px;

  margin-top: 18px;
`;

const Label = styled.label.attrs({
  htmlFor: "lectures",
})`
  margin-right: 24px;
  color: ${PlaceholderColor};
  font-size: 12px;
`;

const SearchBox = styled.div.attrs({
  id: "lectures",
})`
  display: flex;
  align-items: center;
  position: relative;
  width: 650px;
  height: 30px;

  /* display: flex;
    flex-direction: column;
    padding: 6px 0 0 0; */

  border: solid 1px ${BorderColor};
  border-radius: 4px;
`;

const SearchBar = styled.input.attrs({
  type: "text",
  placeholder: "교과명, 교수명, 과목코드 검색",
})`
  height: 100%;

  width: ${({ stringLength }) =>
    stringLength === 0 ? "100%" : `${stringLength * 13}px`};
  min-width: 80px;

  border: none;
  outline: none;
  padding: 6px 9px;

  color: ${FontColor};
  font-size: 12px;

  ::placeholder {
    color: ${PlaceholderColor};
  }
`;

const Code = styled.span`
  font-size: 12px;
  color: ${PlaceholderColor};
  margin-right: 0px;
`;

const Delimiter = styled.div`
  width: 1px;
  height: 13px;
  margin: 0px 8px;
  background-color: ${CopyRightColor};
`;

const Professor = styled(Code)``;

const SearchIcon = styled.img.attrs({
  src: SEARCH_ICON_URL,
  alt: "search",
})`
  position: absolute;
  top: 7px;
  right: 6px;
  width: 12px;
`;

const LectureSearchSection = ({ term }) => {
  const dispatch = useDispatch();
  const [isTermInfoShowed, setIsTermInfoShowed] = useState(false);
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [isCodeProfessorVisible, setIsCodeProfessorVisible] = useState(true);

  /**
   * A function to handle search bar event.
   * @param {object} e A object to contain event information.
   */
  const handleSearchBar = (e) => {
    if (!isSearchBoxVisible) setIsSearchBoxVisible(true);
    if (isTermInfoShowed) setIsTermInfoShowed(false);
    if (isCodeProfessorVisible) setIsCodeProfessorVisible(false);

    dispatch(setForm("term", { ...term, name: e.target.value }));
  };

  /**
   * A function to check term.
   * If there is no term then change search box visibility to false.
   */
  useEffect(() => {
    if (term.name === "") {
      setIsSearchBoxVisible(false);
      setIsCodeProfessorVisible(false);
    }
  }, [term]);

  return (
    <Wrapper>
      <Label>과목명 검색</Label>
      <SearchBox>
        <SearchBar
          onClick={() => setIsSearchBoxVisible(true)}
          onChange={(e) => handleSearchBar(e)}
          value={term.name}
          stringLength={term.name.length}
        />
        {isCodeProfessorVisible && (
          <>
            <Code>{term.code}</Code>
            <Delimiter />
            <Professor>{term.professor}</Professor>
          </>
        )}
        <SearchIcon />
      </SearchBox>

      {isSearchBoxVisible && (
        <LectureSearchBox
          term={term}
          setIsSearchBoxVisible={setIsSearchBoxVisible}
          setIsCodeProfessorVisible={setIsCodeProfessorVisible}
        />
      )}
    </Wrapper>
  );
};

LectureSearchSection.defaultProps = {
  term: {
    id: -1,
    name: "",
    code: "",
    professor: "",
  },
};

LectureSearchSection.propTypes = {
  term: PropTypes.object,
};

export default LectureSearchSection;
