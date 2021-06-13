import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Promise } from "core-js";

import TimetableAPI from "api/timetable";
import {
  changeNextSemester,
  changePrevSemester,
  setDisplayTimetable,
  setLectureList,
} from "store/modules/timetableModule";
import { getSemesterOptions } from "utils/timetablePage/getSemesterOptions";

import {
  Bar,
  LeftButton,
  LeftImage,
  RightButton,
  RightImage,
  Semester,
} from "./styles/ChangingSemesterBar.style";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";

const ChangingSemesterBar = () => {
  const dispatch = useDispatch();
  const {
    currentSemesterValue,
    userCreatedTimetable,
    minSemesterValue,
    maxSemesterValue,
  } = useSelector((state) => state.timetableReducer);

  const currentSemester = getSemesterOptions().filter(
    ({ value }) => value === currentSemesterValue
  )[0];

  const filterTimetable = (semester) =>
    userCreatedTimetable.filter((state) => state.semester_date_id === semester);

  const changeSemester = (direction) => {
    if (direction === "left") {
      const timetableList = filterTimetable(currentSemesterValue - 1);
      fetchDataOnChangedSemester(timetableList[0].id, currentSemesterValue - 1, dispatch);
      dispatch(changePrevSemester());
    } else {
      const timetableList = filterTimetable(currentSemesterValue + 1);
      fetchDataOnChangedSemester(timetableList[0].id, currentSemesterValue + 1, dispatch);
      dispatch(changeNextSemester());
    }
  };

  return (
    <Bar>
      <LeftButton>
        {minSemesterValue !== currentSemesterValue && (
          <LeftImage onClick={() => changeSemester("left")} />
        )}
      </LeftButton>
      <Semester>{`${currentSemester.year}년 ${currentSemester.label}`}</Semester>
      <RightButton>
        {maxSemesterValue !== currentSemesterValue && (
          <RightImage onClick={() => changeSemester("right")} />
        )}
      </RightButton>
    </Bar>
  );
};

const fetchDataOnChangedSemester = async (timetableId, semesterDateId, dispatch) => {
  try {
    const { fetchTimetableInfo, fetchDefaultLectures } = TimetableAPI;

    let [{ data: displayTimetable }, { data: lectureList }] = await Promise.all([
      fetchTimetableInfo(timetableId),
      fetchDefaultLectures(semesterDateId),
    ]);
    dispatch(setDisplayTimetable({ displayTimetable }));
    dispatch(setLectureList(lectureList));
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notDefinedError"];
    dispatch(showAlertModal({ title, content }));
  }
};

export default ChangingSemesterBar;
