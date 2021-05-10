import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import dummyLecture from "./dummyLecture.json";
import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { majorList } from "static/LecturesPage/majorList";

const Wrapper = styled.div`
  position: absolute;
  top: 33px;
  left: 79px;
  width: 650px;
  height: 226px;
  z-index: 9999;

  border: solid 1px ${BorderColor};
  border-radius: 4px;
  background-color: #fff;
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 55px;
  height: 30px;

  border-radius: 16px;
  background-color: ${({ isSelected }) =>
    isSelected ? `${ConceptColor}` : `${BorderColor}`};
  color: ${({ isSelected }) => (isSelected ? "#fff" : `${FontColor}`)};

  font-size: 12px;
  cursor: pointer;
`;

const CategorySection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  margin: 12px 16px 8px 16px;
`;

const LECTURE_HEIGHT = 34;

const Lecture = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: ${LECTURE_HEIGHT}px;
  min-height: ${LECTURE_HEIGHT}px;
  background-color: white;

  cursor: pointer;

  :hover {
    background-color: ${BorderColor};
  }
`;

const LectureSection = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: calc(${LECTURE_HEIGHT} * 5px);
`;

const Title = styled.span`
  font-size: 12px;
  color: ${FontColor};
  margin-right: 8px;
`;

const Code = styled(Title)`
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

const LectureSearchBox = ({ term, setIsSearchBoxVisible, setTerm, setForm }) => {
  const [currCategory, setCurrCategory] = useState("교양학부");

  return (
    <Wrapper>
      <CategorySection>
        {majorList.map(({ label, department }) => (
          <Category
            key={label}
            onClick={() => setCurrCategory(department)}
            isSelected={department === currCategory}
          >
            {label}
          </Category>
        ))}
      </CategorySection>
      <LectureSection>
        {dummyLecture
          .filter(({ department }) => currCategory === department)
          .map(({ id, name, professor }) => (
            <Lecture
              key={id}
              onClick={() => {
                setForm((prev) => ({ ...prev, lecture_id: id }));
                setTerm((prev) => ({ ...prev, name, professor }));
                setIsSearchBoxVisible(false);
              }}
            >
              <Title>{name}</Title>
              <Code>AEB1234</Code>
              <Delimiter />
              <Professor>{professor}</Professor>
            </Lecture>
          ))}
      </LectureSection>
    </Wrapper>
  );
};

LectureSearchBox.defaultProps = {
  setForm: () => {},
};

LectureSearchBox.propTypes = {
  setForm: PropTypes.func,
};

export default LectureSearchBox;
