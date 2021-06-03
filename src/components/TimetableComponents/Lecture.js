import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import styled from "styled-components";

const Background = styled.div`
  position: relative;
  width: 100%;
  height: 111px;
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid ${BorderColor};
  :hover {
    background-color: #f9f9f9;
  }
`;

const Title = styled.span`
  font-size: 14px;
  color: ${FontColor};
`;

const Code = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${PlaceholderColor};
`;

const SubTitle = styled.span`
  display: block;
  margin-top: 15px;
  font-size: 12px;
  color: ${FontColor};
`;

const OtherLabels = styled.span`
  position: absolute;
  bottom: 20px;
  font-size: 11px;
  color: ${PlaceholderColor};
`;

const Rating = styled.span`
  position: absolute;
  top: 20px;
  right: 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${FontColor};
`;

const ReflectButton = styled.input.attrs({
  type: "button",
  value: "담기",
})`
  position: absolute;
  right: 80px;
  bottom: 16px;
  width: 56px;
  height: 28px;
  border: none;
  outline: none;
  border-radius: 20px;
  background-color: ${ConceptColor};
  color: #fff;
  cursor: pointer;
`;

const LecturePageButton = styled(ReflectButton).attrs({
  value: "강의평",
})`
  right: 16px;
  border: 1px solid ${PlaceholderColor};
  background-color: #fff;
  color: ${PlaceholderColor};
`;

const Lecture = ({ infos }) => {
  const history = useHistory();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Background
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Title>
        {infos.name} <Code>{infos.code}</Code>
      </Title>
      <SubTitle>
        {infos.professor} ({infos.classNumber})
      </SubTitle>
      <OtherLabels>
        {infos.grades}학점 &nbsp;
        {infos.target.length === 2 ? "전체" : `${infos.target[2]}학년`} &nbsp;
        {infos.classification} &nbsp;
        {infos.class_time}
      </OtherLabels>
      <Rating>{infos.rating.toFixed(1)}</Rating>
      {isHovered && (
        <>
          <ReflectButton />
          <LecturePageButton
            onClick={() => history.push(`/lecture/${infos.lecture_id}`)}
          />
        </>
      )}
    </Background>
  );
};

export default Lecture;
