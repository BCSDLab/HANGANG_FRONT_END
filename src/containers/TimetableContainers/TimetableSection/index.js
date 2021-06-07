import React from "react";
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
        <AddNewTimetableLabel>
          <PlusImage />새 시간표 추가하기
        </AddNewTimetableLabel>
      </TimetableSelectBar>
      <TimetableSettingButton />
      <Timetable />
    </TimetableAddBox>
  );
};

export default TimetableSection;
