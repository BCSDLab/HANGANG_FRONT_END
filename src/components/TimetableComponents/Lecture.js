import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Background,
  Code,
  LecturePageButton,
  OtherLabels,
  Rating,
  ReflectButton,
  SubTitle,
  Title,
} from "./styles/Lecture.style";

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
