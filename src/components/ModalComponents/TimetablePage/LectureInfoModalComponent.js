import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

import TimetableAPI from "api/timetable";
import { hideLectureInfoModal, showAlertModal } from "store/modules/modalModule";
import { getTimetableClassName } from "utils/timetablePage/getTimetableClassName";
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
import { deleteLectureOnLectureList } from "store/modules/timetableModule";

const LectureInfoModalComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { lectureInfo, isLectureInfoModalShowing } = useSelector(
    (state) => state.modalReducer
  );
  const { displayTimetable } = useSelector((state) => state.timetableReducer);

  React.useEffect(() => {
    console.log(lectureInfo);
    console.log(displayTimetable.id);
  }, [lectureInfo]);

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
            <SubLabel>{getTimetableClassName(lectureInfo.class_time)}</SubLabel>
          </Label>
          <DelimiterLine />
          <Memo />
          <DeleteButton
            onClick={() =>
              deleteLectureOnTimetable(lectureInfo.id, displayTimetable.id, dispatch)
            }
          />
          <MemoModifyButton />
        </LectureInfoModal>
      </LectureInfoModalBackground>
    )
  );
};

const deleteLectureOnTimetable = async (lectureId, timetableId, dispatch) => {
  try {
    const { data } = await TimetableAPI.deleteLectureOnTimetable(lectureId, timetableId);
    console.dir(data);
    if (data.httpStatus === "OK") {
      dispatch(hideLectureInfoModal());
      const content = "강의가 정상적으로 삭제되었습니다.";
      dispatch(showAlertModal({ content }));
      dispatch(deleteLectureOnLectureList({ id: lectureId }));
    }
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notDefinedError"];
    dispatch(showAlertModal({ title, content }));
  }
};

export default LectureInfoModalComponent;
