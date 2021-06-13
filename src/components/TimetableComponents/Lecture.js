import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TimetableAPI from "api/timetable";
import {
  deleteLectureOnLectureList,
  setCandidateClassTimes,
  setLectureOnLectureList,
} from "store/modules/timetableModule";
import {
  Background,
  Code,
  DrawOffButton,
  LecturePageButton,
  OtherLabels,
  Rating,
  ReflectButton,
  SubTitle,
  Title,
} from "./styles/Lecture.style";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";
import { getTimetableClassName } from "utils/timetablePage/getTimetableClassName";

const Lecture = ({ infos }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isChosen, setIsChosen] = useState(false);
  const { displayTimetable } = useSelector((state) => state.timetableReducer);

  useEffect(() => {
    if (isHovered) {
      dispatch(setCandidateClassTimes({ class_time: JSON.parse(infos.class_time) }));
    }
    if (displayTimetable.lectureList.find((elem) => elem.id === infos.id) !== undefined) {
      setIsChosen(true);
    } else {
      setIsChosen(false);
    }
  }, [isHovered, displayTimetable]);

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
          {!isChosen ? (
            <ReflectButton
              onClick={() => requestReflectLecture(infos, displayTimetable.id, dispatch)}
            />
          ) : (
            <DrawOffButton
              onClick={() =>
                deleteLectureOnTimetable(infos, displayTimetable.id, dispatch)
              }
            />
          )}
          <LecturePageButton
            onClick={() => history.push(`/lecture/${infos.lecture_id}`)}
          />
        </>
      )}
    </Background>
  );
};

const deleteLectureOnTimetable = async (lectureInfo, timetableId, dispatch) => {
  try {
    const { data } = await TimetableAPI.deleteLectureOnTimetable(
      lectureInfo.id,
      timetableId
    );
    if (data.httpStatus === "OK") {
      const content = "강의가 정상적으로 삭제되었습니다.";
      dispatch(showAlertModal({ content }));
      dispatch(deleteLectureOnLectureList({ id: lectureInfo.id }));
    }
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notDefinedError"];
    dispatch(showAlertModal({ title, content }));
  }
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
