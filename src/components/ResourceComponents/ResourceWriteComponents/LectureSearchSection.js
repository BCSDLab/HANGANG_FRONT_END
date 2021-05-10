import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import LectureSearchBox from "components/ResourceComponents/ResourceWriteComponents/LectureSearchBox";
import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";
import { SEARCH_ICON_URL } from "static/Shared/imageUrls";

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
  position: relative;
  width: 240px;
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
  width: 200px;

  border: none;
  outline: none;
  padding: 6px 9px;

  color: ${FontColor};
  font-size: 12px;
  background-color: padding-block;

  ::placeholder {
    color: ${PlaceholderColor};
  }
`;

const AdditionalInfo = styled.span``;

const SearchIcon = styled.img.attrs({
  src: SEARCH_ICON_URL,
  alt: "search",
})`
  position: absolute;
  top: 7px;
  right: 6px;
  width: 12px;
`;

const LectureSearchSection = ({ setForm }) => {
  const [term, setTerm] = useState({
    name: "",
    // code: "AEB1234",
    // professor: "김사랑",
  });
  const [isTermInfoShowed, setIsTermInfoShowed] = useState(false);
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);

  /**
   * A function to handle search bar event.
   * @param {object} e A object to contain event information.
   */
  const handleSearchBar = (e) => {
    if (!isSearchBoxVisible) setIsSearchBoxVisible(true);
    if (isTermInfoShowed) setIsTermInfoShowed(false);

    setTerm((prev) => ({ ...prev, name: e.target.value }));
  };

  /**
   * A function to check term.
   * If there is no term then change search box visibility to false.
   */
  useEffect(() => {
    if (term.name === "") setIsSearchBoxVisible(false);
  }, [term]);

  return (
    <Wrapper>
      <Label>과목명 검색</Label>
      <SearchBox>
        {/* FIXME: Change value contains code, professor */}
        <SearchBar onChange={(e) => handleSearchBar(e)} value={term.name} />
        <SearchIcon />
      </SearchBox>

      {isSearchBoxVisible && (
        <LectureSearchBox
          term={term}
          setIsSearchBoxVisible={setIsSearchBoxVisible}
          setTerm={setTerm}
          setForm={setForm}
        />
      )}
    </Wrapper>
  );
};

LectureSearchSection.defaultProps = {
  setForm: () => {},
};

LectureSearchSection.propTypes = {
  setForm: PropTypes.func,
};

export default LectureSearchSection;
