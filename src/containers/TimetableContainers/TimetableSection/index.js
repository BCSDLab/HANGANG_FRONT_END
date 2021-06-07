import React from "react";
import { useDispatch } from "react-redux";
import { showAddTimetableModal, showTimetableMoreModal } from "store/modules/modalModule";
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

const TimetableSection = () => {
  const dispatch = useDispatch();
  return (
    <TimetableAddBox>
      <TimetableSelectBar>
        <DownImage />
        <TimetableLabel role="main">
          플랜 a<MainMark />
        </TimetableLabel>
        <TimetableLabel>2020년 2학기 (2)</TimetableLabel>
        <TimetableLabel>2020년 2학기 (3)</TimetableLabel>
        <TimetableLabel>2020년 2학기 (4)</TimetableLabel>
        <AddNewTimetableLabel onClick={() => dispatch(showAddTimetableModal())}>
          <PlusImage />새 시간표 추가하기
        </AddNewTimetableLabel>
      </TimetableSelectBar>
      <TimetableSettingButton onClick={() => dispatch(showTimetableMoreModal())} />
      <Timetable />
    </TimetableAddBox>
  );
};

export default TimetableSection;
