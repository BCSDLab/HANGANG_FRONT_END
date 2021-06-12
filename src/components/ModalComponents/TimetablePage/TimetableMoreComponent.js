import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { hideTimetableMoreModal } from "store/modules/modalModule";
import {
  CloseButton,
  Label,
  ModifyButton,
  NotMainButton,
  SetMainTimetableSection,
  SettingTimetableLabel,
  SubLabel,
  TimetableMoreComponentBackground,
  TimetableMoreModal,
  TimetableNameInput,
  TimetableNameModifySection,
  Title,
} from "./styles/TimetableMoreComponent.style";

const TimetableMoreComponent = () => {
  const dispatch = useDispatch();
  const { isTimetableMoreModalShowing } = useSelector((state) => state.modalReducer);
  const { displayTimetable } = useSelector((state) => state.timetableReducer);

  useEffect(() => {
    console.log(displayTimetable);
  }, [displayTimetable]);

  return (
    isTimetableMoreModalShowing && (
      <TimetableMoreComponentBackground
        screenHeight={document.querySelector("main").clientHeight}
        onClick={() => dispatch(hideTimetableMoreModal())}
      >
        <TimetableMoreModal onClick={(e) => e.stopPropagation()}>
          <Title>시간표 더보기</Title>
          <CloseButton onClick={() => dispatch(hideTimetableMoreModal())} />
          <TimetableNameModifySection>
            <TimetableNameInput />
            <ModifyButton>수정</ModifyButton>
          </TimetableNameModifySection>
          <SetMainTimetableSection>
            <NotMainButton />
            <SettingTimetableLabel>메인시간표 설정</SettingTimetableLabel>
            <SubLabel>해당 시간표가 메인으로 나타납니다.</SubLabel>
          </SetMainTimetableSection>
          <Label>시간표 삭제</Label>
          <Label onClick={() => captureScreenshot(displayTimetable.tableName)}>
            이미지 저장
          </Label>
        </TimetableMoreModal>
      </TimetableMoreComponentBackground>
    )
  );
};

const captureScreenshot = (tableName) => {
  const canvas = document.querySelector("canvas");
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = tableName;
  link.click();
};

export default TimetableMoreComponent;
