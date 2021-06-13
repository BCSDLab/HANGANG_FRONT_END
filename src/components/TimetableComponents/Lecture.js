import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TimetableAPI from "api/timetable";
import {
  setCandidateClassTimes,
  setLectureOnLectureList,
} from "store/modules/timetableModule";
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
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";
import { distributeClassTime } from "utils/timetablePage/distributeClassTime";

const Lecture = ({ infos }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const { displayTimetable } = useSelector((state) => state.timetableReducer);

  useEffect(() => {
    if (isHovered) {
      dispatch(setCandidateClassTimes({ class_time: JSON.parse(infos.class_time) }));
    }
  }, [isHovered]);

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
        {getTimetableClassName(infos.class_time)}
      </OtherLabels>
      <Rating>{infos.rating.toFixed(1)}</Rating>
      {isHovered && (
        <>
          <ReflectButton
            onClick={() => requestReflectLecture(infos, displayTimetable.id, dispatch)}
          />
          <LecturePageButton
            onClick={() => history.push(`/lecture/${infos.lecture_id}`)}
          />
        </>
      )}
    </Background>
  );
};

/**
 * [101, 102, 103, 104] 처럼 넘어오는 classTime을
 * 화 1B~3A 와 같은 이름으로 변경합니다.
 */
const getTimetableClassName = (classTime) => {
  const distributedClassTime = distributeClassTime(JSON.parse(classTime));

  let classNames = distributedClassTime.reduce((acc, time) => {
    let startTime = time[0].toString().padStart(3, "0");
    let endTime = time[time.length - 1].toString().padStart(3, "0");

    const day = getDay(startTime[0]);
    const startName = getTime(startTime.slice(1));
    const endName = getTime(endTime.slice(1));

    acc.push(`${day} ${startName}~${endName}`);
    return acc;
  }, []);

  return classNames.join(", ");
};

const getDay = (dayStringData) => {
  const dayList = {
    0: "월",
    1: "화",
    2: "수",
    3: "목",
    4: "금",
  };
  return dayList[dayStringData];
};

const getTime = (timeStringData) => {
  const convertedTime = parseInt(timeStringData);
  const time = Math.floor(convertedTime / 2) + 1;
  const alphabet = convertedTime % 2 === 0 ? "A" : "B";
  return `${time}${alphabet}`;
};

const requestReflectLecture = async (lectureInfo, userTimetableId, dispatch) => {
  try {
    const { data } = await TimetableAPI.setLectureOnTimetable(
      lectureInfo.id,
      userTimetableId
    );
    if (data.httpStatus === "OK") {
      dispatch(setLectureOnLectureList({ lecture: lectureInfo }));
    }
  } catch (error) {
    const { title } = ALERT_MESSAGE_ON_ERROR_TYPE["overlappedLectureError"];
    const content = `해당 시간표에 ${error.response.data.errorMessage}`;
    dispatch(showAlertModal({ title, content }));
  }
};

export default Lecture;
