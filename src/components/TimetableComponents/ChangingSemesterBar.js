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

  const changeSemester = (direction) => {
    fetchDataOnChangedSemester(
      direction,
      currentSemesterValue,
      userCreatedTimetable,
      dispatch
    );
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

/**
 * semester 가 변경되면 시간표와 검색 추가란의 강의들을 불러옵니다.
 */
const fetchDataOnChangedSemester = async (
  direction,
  semesterDateId,
  userCreatedTimetable,
  dispatch
) => {
  try {
    const { fetchTimetableInfo, fetchDefaultLectures } = TimetableAPI;
    const changedSemesterId = direction === "left" ? --semesterDateId : ++semesterDateId;

    // fetch data
    const timetableList = filterTimetable(userCreatedTimetable, changedSemesterId);

    if (timetableList.length !== 0) {
      let [{ data: displayTimetable }, { data: lectureList }] = await Promise.all([
        fetchTimetableInfo(timetableList[0].id),
        fetchDefaultLectures(changedSemesterId),
      ]);

      // change store state
      if (direction === "left") dispatch(changePrevSemester());
      else dispatch(changeNextSemester());
      dispatch(setDisplayTimetable({ displayTimetable }));
      dispatch(setLectureList(lectureList));
    } else {
      const { data: lectureList } = await fetchDefaultLectures(changedSemesterId);

      // change store state
      if (direction === "left") dispatch(changePrevSemester());
      else dispatch(changeNextSemester());
      dispatch(
        setDisplayTimetable({
          displayTimetable: {
            lectureList: [],
            tableSemesterDate: changedSemesterId,
          },
        })
      );

      dispatch(setLectureList(lectureList));
    }
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
  }
};

const filterTimetable = (userCreatedTimetable, semester) =>
  userCreatedTimetable.filter((state) => state.semester_date_id === semester);

export default ChangingSemesterBar;
