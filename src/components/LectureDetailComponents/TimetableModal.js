import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { FontColor, ConceptColor } from "static/Shared/commonStyles";
import LectureDetailAPI from "api/lectureDetail";

import {
  closeTimetableModal,
  clickTitmetableAddRemoveButton,
  updateLectureClassInfo,
} from "store/modules/lectureDetailModule";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

import { showAlertModal } from "store/modules/modalModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { Promise } from "core-js";

const ModalWrapper = styled.div`
  position: absolute;
  width: 320px;
  height: auto;
  margin: 10px 0 0;
  padding: 36px 24px 8px;

  flex-grow: 0;
  border-radius: 8px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #eee;
  background-color: #fff;
  z-index: 1;
`;

const TimetableLabel = styled.p`
  margin: 0 0 24px;
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  letter-spacing: normal;
  cursor: pointer;
  color: ${FontColor};
`;

const ButtonSection = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: flex-end;
  align-content: flex-end;
  bottom: 8px;
  right: 0;
`;

const Close = styled.span`
  display: inline-flex;
  padding: 10px 23px;
  font-size: 14px;
  font-weight: 500;
  color: #999999;
  cursor: pointer;
  width: auto;
  justify-content: flex-end;
  margin-right: 8px;
`;

const Confirm = styled(Close)`
  right: 24px;
  padding-right: 0px;
  margin: 0;
  color: ${ConceptColor};
`;

const Check = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/check.png",
  alt: "checked",
})`
  position: absolute;
  width: 16px;
  display: inline-flex;
  justify-content: flex-end;
  right: 24px;
  align-items: center;
  align-content: center;
`;

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
const isSelected = (
  changedLectureClassInfo,
  lectureClassInfo,
  lectureInfoIdx,
  tableId
) => {
  if (
    lectureClassInfo[lectureInfoIdx].selectedTableId.indexOf(tableId) !== -1 &&
    changedLectureClassInfo[lectureInfoIdx].selectedTableId.indexOf(tableId) === -1
  ) {
    return 0;
  }
  if (
    lectureClassInfo[lectureInfoIdx].selectedTableId.indexOf(tableId) === -1 &&
    changedLectureClassInfo[lectureInfoIdx].selectedTableId.indexOf(tableId) !== -1
  ) {
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
  const {
    timetables,
    changedLectureClassInfo,
    lectureClassInfo,
    lectureInfoIdx,
    selectedClassId,
  } = useSelector((state) => state.lectureDetailReducer);

  const checkLectureToTimetable = async (index, idx, timetableId) => {
    try {
      dispatch(
        clickTitmetableAddRemoveButton({
          idx: lectureInfoIdx,
          timetableId: timetableId,
        })
      );

      const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");

      switch (
        isSelected(changedLectureClassInfo, lectureClassInfo, lectureInfoIdx, timetableId)
      ) {
        case 0:
          await LectureDetailAPI.removeTimetablesLecture(
            accessToken,
            timetableId,
            selectedClassId
          ).catch((error) => {
            showTimetableAlertModal(dispatch, error);
            dispatch(
              clickTitmetableAddRemoveButton({
                idx: lectureInfoIdx,
                timetableId: timetableId,
              })
            );
          });
          break;
        case 1:
          await LectureDetailAPI.addTimetablesLecture(
            accessToken,
            timetableId,
            selectedClassId
          ).catch((error) => {
            showTimetableAlertModal(dispatch, error);
            dispatch(
              clickTitmetableAddRemoveButton({
                idx: lectureInfoIdx,
                timetableId: timetableId,
              })
            );
          });
          break;
        default:
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const rollbackTimetable = async () => {
    try {
      const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");

      await Promise.all(
        timetables.map((props) => {
          return props.map(async (el) => {
            switch (
              isSelected(changedLectureClassInfo, lectureClassInfo, lectureInfoIdx, el.id)
            ) {
              case 1:
                return LectureDetailAPI.removeTimetablesLecture(
                  accessToken,
                  el.id,
                  selectedClassId
                ).catch((error) => {
                  showTimetableAlertModal(dispatch, error);
                });
              case 0:
                return LectureDetailAPI.addTimetablesLecture(
                  accessToken,
                  el.id,
                  selectedClassId
                ).catch((error) => {
                  showTimetableAlertModal(dispatch, error);
                });
              default:
            }
          });
        })
      );
      dispatch(updateLectureClassInfo());
    } catch (error) {
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
                {changedLectureClassInfo[lectureInfoIdx].selectedTableId.indexOf(
                  el.id
                ) !== -1 && <Check />}
              </TimetableLabel>
            );
          });
        })}

      <ButtonSection>
        <Close
          onClick={() => {
            rollbackTimetable();
            dispatch(closeTimetableModal());
          }}
        >
          닫기
        </Close>
        <Confirm
          onClick={() => {
            dispatch(updateLectureClassInfo());
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
