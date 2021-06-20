import React, { useEffect, useState } from "react";
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
  const [memo, setMemo] = useState({
    wasExistMemo: false,
    content: "",
  });

  useEffect(() => {
    if (isLectureInfoModalShowing) {
      getMemoOnLecture(lectureInfo.id, setMemo);
    }
  }, [lectureInfo]);

  return (
    isLectureInfoModalShowing && (
      <LectureInfoModalBackground
        screenHeight={document.querySelector("main").clientHeight}
        onClick={() => dispatch(hideLectureInfoModal())}
      >
        <LectureInfoModal onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={() => dispatch(hideLectureInfoModal())} />
          <Title
            onClick={() => {
              if (!lectureInfo.is_custom) {
                history.push(`/lecture/${lectureInfo.lecture_id}`);
              }
            }}
            isCustom={lectureInfo.is_custom}
          >
            {lectureInfo.name}
            {!lectureInfo.is_custom && <MoveLectureDetailPageButton />}
          </Title>
          <Label>
            {lectureInfo.professor}
            <SubLabel>{getTimetableClassName(lectureInfo.class_time)}</SubLabel>
          </Label>
          <DelimiterLine />
          <Memo
            value={memo.content}
            onChange={(e) => setMemo((prev) => ({ ...prev, content: e.target.value }))}
          />
          <DeleteButton
            onClick={() =>
              deleteLectureOnTimetable(
                lectureInfo.lecture_timetable_id,
                displayTimetable.id,
                dispatch
              )
            }
          />
          <MemoModifyButton
            onClick={() =>
              modifyMemo(
                memo.wasExistMemo,
                { lectureId: lectureInfo.id, content: memo.content },
                dispatch
              )
            }
          />
        </LectureInfoModal>
      </LectureInfoModalBackground>
    )
  );
};

const modifyMemo = (previousStatus, { lectureId, content }, dispatch) => {
  if (!previousStatus) {
    createMemoOnLecture({ lectureId, content }, dispatch);
  } else {
    reviseMemoOnLecture({ lectureId, content }, dispatch);
  }
};

const getMemoOnLecture = async (lectureId, setMemo) => {
  try {
    const { data, status } = await TimetableAPI.getMemo(lectureId);
    if (status === 200) {
      if (data.memo === "") {
        setMemo({ wasExistMemo: false, content: data.memo });
      } else {
        setMemo({ wasExistMemo: true, content: data.memo });
      }
    }
  } catch (error) {
    setMemo({ wasExistMemo: false, content: "" });
  }
};

const createMemoOnLecture = async ({ lectureId, content }, dispatch) => {
  try {
    const {
      data: { httpStatus, message },
    } = await TimetableAPI.createMemo(lectureId, content);
    if (httpStatus === "OK") {
      const content = message;
      dispatch(showAlertModal({ content }));
    }
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notDefinedError"];
    dispatch(showAlertModal({ title, content }));
  }
};

const reviseMemoOnLecture = async ({ lectureId, content }, dispatch) => {
  try {
    const {
      data: { httpStatus, message },
    } = await TimetableAPI.reviseMemo(lectureId, content);
    if (httpStatus === "OK") {
      const content = message;
      dispatch(showAlertModal({ content }));
    }
  } catch (error) {
    // FIXME: 빈 메모를 수정할 때 에러 뜰거임. 이 때 해당 코드 넣어서 ALERT
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["notDefinedError"];
    dispatch(showAlertModal({ title, content }));
  }
};

const deleteLectureOnTimetable = async (lectureId, timetableId, dispatch) => {
  try {
    const { data } = await TimetableAPI.deleteLectureOnTimetable(lectureId, timetableId);
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
