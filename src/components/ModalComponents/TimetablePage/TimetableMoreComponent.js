import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TimetableAPI from "api/timetable";
import { hideTimetableMoreModal, showAlertModal } from "store/modules/modalModule";
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
import { removeTimetableOnList } from "store/modules/timetableModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

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
          <Label onClick={() => removeTimetable(displayTimetable.id, dispatch)}>
            시간표 삭제
          </Label>
          <Label onClick={() => captureScreenshot(displayTimetable.tableName)}>
            이미지 저장
          </Label>
        </TimetableMoreModal>
      </TimetableMoreComponentBackground>
    )
  );
};

const removeTimetable = async (timetableId, dispatch) => {
  try {
    const { data } = await TimetableAPI.requestRemoveTimetable(timetableId);
    if (data.httpStatus === "OK") {
      dispatch(removeTimetableOnList({ id: timetableId }));
      dispatch(hideTimetableMoreModal());
      const content = "시간표가 정상적으로 삭제되었습니다.";
      dispatch(showAlertModal({ content }));
    }
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notDefinedError"];
    dispatch(showAlertModal({ title, content }));
  }
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
