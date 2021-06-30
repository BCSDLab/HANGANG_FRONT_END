import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { hideLectureReviewWriteModal } from "store/modules/modalModule";
import {
  LectureReviewWriteModalBackground,
  LectureReviewWriteModal,
  CloseButton,
  SubmitButton,
} from "./styles/LectureReviewWriteModalComponent.style";

const LectureReviewWriteModalComponent = () => {
  const dispatch = useDispatch();
  const { isLectureReviewWriteModalShowing } = useSelector((state) => state.modalReducer);

  return (
    isLectureReviewWriteModalShowing && (
      <LectureReviewWriteModalBackground
        // screenHeight={document.querySelector("main").clientHeight}
        screenHeight={"2000"}
        onClick={() => dispatch(hideLectureReviewWriteModal())}
      >
        <LectureReviewWriteModal>
          <CloseButton />
          <SubmitButton>작성완료 (+30P)</SubmitButton>
        </LectureReviewWriteModal>
      </LectureReviewWriteModalBackground>
    )
  );
};

export default LectureReviewWriteModalComponent;

{
  /* <AddTimetableModal
            onClick={(e) => e.stopPropagation()}
            onSubmit={createTimetable}
          >
            <Title>시간표 추가</Title>
            <CloseButton onClick={() => dispatch(hideAddTimetableModal())} />
            <Label>시간표 이름</Label>
            <TimetableNameInput
              onChange={(e) =>
                dispatch(changeAddTimetableFormValue("name", e.target.value))
              }
              maxLength={35}
            />
            <Label>{`학기 설정 (${currentYear}년)`}</Label>
            <SubLabel>이번 연도 시간표만 생성 가능합니다.</SubLabel>
            {semesterData.map(({ label, value }) => (
              <SemesterButton
                key={label}
                label={label}
                choiced={value === semester_date_id}
                onClick={() =>
                  dispatch(changeAddTimetableFormValue("semester_date_id", value))
                }
              />
            ))}
            <SubmitButton>완료</SubmitButton>
          </AddTimetableModal> */
}
