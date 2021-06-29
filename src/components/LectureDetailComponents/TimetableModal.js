import React from "react";
import { useDispatch, useSelector } from "react-redux";

import LectureDetailAPI from "api/lectureDetail";

import {
  ModalWrapper,
  TimetableLabel,
  ButtonSection,
  Confirm,
  Check,
} from "./styles/TimetableModal.style";
import {
  closeTimetableModal,
  clickTitmetableAddRemoveButton,
} from "store/modules/lectureDetailModule";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

import { showAlertModal } from "store/modules/modalModule";

/**
 * 기존과 변경된 데이터 비교해서 값 반환
 * 0: 삭제
 * 1: 추가
 * 2: 아무것도 안함
 * @param {*} changedLectureClassInfo 유저가 세이브 신청한 데이터
 * @param {*} lectureClassInfo 기존 유저 수강과목 데이터
 * @param {*} lectureInfoIdx
 * @param {*} tableId
 * @returns
 */
const isSelected = (lectureClassInfo, lectureInfoIdx, tableId) => {
  if (lectureClassInfo[lectureInfoIdx].selectedTableId.indexOf(tableId) !== -1) {
    return 0;
  }
  if (lectureClassInfo[lectureInfoIdx].selectedTableId.indexOf(tableId) === -1) {
    return 1;
  }
  return 2;
};

const showTimetableAlertModal = (dispatch, error) => {
  if (error.response.data.code === 50) {
    dispatch(
      showAlertModal({
        title: "시간표가 중복되었습니다.",
        content: error.response.data.errorMessage,
      })
    );
  } else {
    dispatch(
      showAlertModal({
        title: "확인되지 않은 오류입니다.",
        content: "관리자에게 문의하세요.",
      })
    );
  }
};

const TimetableModal = () => {
  const dispatch = useDispatch();
  const { timetables, lectureClassInfo, lectureInfoIdx, selectedClassId } = useSelector(
    (state) => state.lectureDetailReducer
  );

  const checkLectureToTimetable = async (index, idx, timetableId) => {
    try {
      const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");

      if (isSelected(lectureClassInfo, lectureInfoIdx, timetableId) === 0) {
        await LectureDetailAPI.removeTimetablesLecture(
          accessToken,
          timetableId,
          selectedClassId
        );
      } else {
        await LectureDetailAPI.addTimetablesLecture(
          accessToken,
          timetableId,
          selectedClassId
        );
      }

      dispatch(
        clickTitmetableAddRemoveButton({
          idx: lectureInfoIdx,
          timetableId: timetableId,
        })
      );
    } catch (error) {
      showTimetableAlertModal(dispatch, error);
      throw new Error(error);
    }
  };

  return (
    <ModalWrapper>
      {timetables &&
        timetables.map((props, index) => {
          return props.map((el, idx) => {
            return (
              <TimetableLabel
                key={el.id}
                onClick={() => checkLectureToTimetable(index, idx, el.id)}
              >
                {el.name}
                {lectureClassInfo[lectureInfoIdx].selectedTableId.indexOf(el.id) !==
                  -1 && <Check />}
              </TimetableLabel>
            );
          });
        })}

      <ButtonSection>
        <Confirm
          onClick={() => {
            dispatch(closeTimetableModal());
          }}
        >
          확인
        </Confirm>
      </ButtonSection>
    </ModalWrapper>
  );
};

export default TimetableModal;
