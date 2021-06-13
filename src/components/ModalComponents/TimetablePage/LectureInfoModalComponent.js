import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// import TimetableAPI from "api/timetable";
import { hideLectureInfoModal } from "store/modules/modalModule";
import {
  LectureInfoModalBackground,
  Title,
  LectureInfoModal,
  CloseButton,
  MoveLectureDetailPageButton,
  Label,
  SubLabel,
  DelimiterLine,
  Memo,
  DeleteButton,
  MemoModifyButton,
} from "./styles/LectureInfoModalComponent.style";

const LectureInfoModalComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { lectureInfo, isLectureInfoModalShowing } = useSelector(
    (state) => state.modalReducer
  );

  return (
    isLectureInfoModalShowing && (
      <LectureInfoModalBackground
        screenHeight={document.querySelector("main").clientHeight}
        onClick={() => dispatch(hideLectureInfoModal())}
      >
        <LectureInfoModal onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={() => dispatch(hideLectureInfoModal())} />
          <Title onClick={() => history.push(`/lecture/${lectureInfo.lecture_id}`)}>
            {lectureInfo.name}
            <MoveLectureDetailPageButton />
          </Title>
          <Label>
            {lectureInfo.professor}
            <SubLabel>{lectureInfo.class_time}</SubLabel>
          </Label>
          <DelimiterLine />
          <Memo />
          <DeleteButton />
          <MemoModifyButton />
        </LectureInfoModal>
      </LectureInfoModalBackground>
    )
  );
};

export default LectureInfoModalComponent;
