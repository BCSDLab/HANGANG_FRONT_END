import React from "react";
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
  const [screenHeight, setScreenHeight] = React.useState();
  const { isTimetableMoreModalShowing, name, id } = useSelector(
    (state) => state.modalReducer
  );

  React.useEffect(() => {
    setScreenHeight(document.querySelector("main").clientHeight);
  });

  return (
    isTimetableMoreModalShowing && (
      <TimetableMoreComponentBackground
        screenHeight={screenHeight}
        onClick={() => dispatch(hideTimetableMoreModal())}
      >
        <TimetableMoreModal onClick={(e) => e.stopPropagation()}>
          <Title>시간표 더보기</Title>
          <CloseButton />
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
          <Label>이미지 저장</Label>
        </TimetableMoreModal>
      </TimetableMoreComponentBackground>
    )
  );
};

export default TimetableMoreComponent;
