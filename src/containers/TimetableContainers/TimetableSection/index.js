import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showAddTimetableModal, showTimetableMoreModal } from "store/modules/modalModule";
import {
  AddNewTimetableLabel,
  DownImage,
  MainLabelWrapper,
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
  const { userCreatedTimetable } = useSelector((state) => state.timetableReducer);

  return (
    <TimetableAddBox>
      <TimetableSelectBar>
        <DownImage />
        <TimetableLabel role="main">
          {userCreatedTimetable
            .filter((timetable) => timetable.isMain)
            .map((timetable) => (
              <MainLabelWrapper key={timetable.id}>
                {timetable.name}
                <MainMark />
              </MainLabelWrapper>
            ))}
        </TimetableLabel>
        {userCreatedTimetable
          .filter((timetable) => !timetable.isMain)
          .map((timetable) => (
            <TimetableLabel key={timetable.id}>{timetable.name}</TimetableLabel>
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

export default TimetableSection;
