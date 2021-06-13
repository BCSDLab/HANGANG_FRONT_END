import React from "react";
import { useDispatch, useSelector } from "react-redux";

import TimetableAPI from "api/timetable";
import {
  showAddTimetableModal,
  showAlertModal,
  showTimetableMoreModal,
} from "store/modules/modalModule";
import { setDisplayTimetable } from "store/modules/timetableModule";
import {
  AddNewTimetableLabel,
  DownImage,
  MainMark,
  PlusImage,
  TimetableAddBox,
  TimetableLabel,
  TimetableSelectBar,
  TimetableSettingButton,
} from "./styles/index.style";
import Timetable from "./Timetable";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

const TimetableSection = () => {
  const dispatch = useDispatch();
  let { currentSemesterValue, displayTimetable, userCreatedTimetable } = useSelector(
    (state) => state.timetableReducer
  );

  userCreatedTimetable.sort((curr, next) => {
    let isCurrDisplayed = curr.id === displayTimetable.id;
    let isNextDisplayed = next.id === displayTimetable.id;

    if (isCurrDisplayed > isNextDisplayed) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <TimetableAddBox>
      <TimetableSelectBar>
        <DownImage />
        {userCreatedTimetable
          .filter((state) => state.semester_date_id === currentSemesterValue)
          .map((timetable) => (
            <TimetableLabel
              isMain={timetable.isMain}
              key={timetable.id}
              onClick={() => changeDisplayTimetable(timetable.id, dispatch)}
            >
              {timetable.name}
              {timetable.isMain && <MainMark />}
            </TimetableLabel>
          ))}
        <AddNewTimetableLabel onClick={() => dispatch(showAddTimetableModal())}>
          <PlusImage />새 시간표 추가하기
        </AddNewTimetableLabel>
      </TimetableSelectBar>
      <TimetableSettingButton onClick={() => dispatch(showTimetableMoreModal())} />
      <Timetable />
    </TimetableAddBox>
  );
};

const changeDisplayTimetable = async (timetableId, dispatch) => {
  try {
    const { data } = await TimetableAPI.fetchTimetableInfo(timetableId);
    dispatch(setDisplayTimetable({ displayTimetable: data }));
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notDefinedError"];
    dispatch(showAlertModal({ title, content }));
  }
};

export default TimetableSection;
