import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { debounce } from "lodash";

import LectureAPI from "api/lecture";
import {
  BorderColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { majorList } from "static/LecturesPage/majorList";
import { useDispatch } from "react-redux";
import { setLectureIdWithTerm } from "store/modules/resourceCreateModule";

const Wrapper = styled.div`
  position: absolute;
  top: 33px;
  left: 79px;
  width: 650px;
  height: 226px;
  z-index: 2;

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

const LectureSearchBox = ({ term, setIsSearchBoxVisible, setIsCodeProfessorVisible }) => {
  const dispatch = useDispatch();
  const [currCategory, setCurrCategory] = useState("교양학부");
  const [lectures, setLectures] = useState([]);
  const requestLectures = async (term) => {
    try {
      let filterOptions = {
        keyword: term.name,
        limit: 50,
        page: 1,
      };
      const { data } = await LectureAPI.getLectures(filterOptions);
      setLectures(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const delayedApiCall = useRef(debounce((term) => requestLectures(term), 200)).current;

  useEffect(async () => {
    if (term.name !== "") await delayedApiCall(term);
  }, [term]);

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
        {lectures.length !== 0 &&
          lectures
            .filter(({ department }) => currCategory === department)
            .map(({ id, name, code, professor }) => (
              <Lecture
                key={id}
                onClick={() => {
                  dispatch(setLectureIdWithTerm(id, { id, name, code, professor }));
                  setIsSearchBoxVisible(false);
                  setIsCodeProfessorVisible(true);
                }}
              >
                <Title>{name}</Title>
                <Code>{code}</Code>
                <Delimiter />
                <Professor>{professor}</Professor>
              </Lecture>
            ))}
      </LectureSection>
    </Wrapper>
  );
};

LectureSearchBox.defaultProps = {
  term: {
    id: -1,
    name: "",
    code: "",
    professor: "",
  },
  setIsSearchBoxVisible: () => {},
  setIsCodeProfessorVisible: () => {},
};

LectureSearchBox.propTypes = {
  term: PropTypes.object,
  setIsSearchBoxVisible: PropTypes.func,
  setIsCodeProfessorVisible: PropTypes.func,
};

export default LectureSearchBox;
