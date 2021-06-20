import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import styled from "styled-components";
import { FontColor, ConceptColor } from "static/Shared/commonStyles";
import LectureDetailAPI from "api/lectureDetail";

import {
  closeTimetableModal,
  clickTitmetableAddRemoveButtom,
} from "store/modules/lectureDetailModule";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

import { showAlertModal } from "store/modules/modalModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

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

TimetableModal.propTypes = {
  isTimetableModalOpened: PropTypes.bool,
};
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
const isSelectedBoth = (
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
// 다운로드에 약 1초가 걸리는 비동기 함수라고 가정
const getCheckedTimetable = (
  changedLectureClassInfo,
  lectureClassInfo,
  lectureInfoIdx,
  accessToken,
  id,
  selectedClassId
) => {
  switch (isSelectedBoth(changedLectureClassInfo, lectureClassInfo, lectureInfoIdx, id)) {
    case 0:
      return new Promise((resolve, reject) => {
        LectureDetailAPI.removeTimetablesLecture(accessToken, id, selectedClassId);
      });
    case 1:
      return new Promise((resolve, reject) => {
        LectureDetailAPI.addTimetablesLecture(accessToken, id, selectedClassId);
      });
    default:
      LectureDetailAPI.addTimetablesLecture(accessToken, id, selectedClassId);
  }
};
/**
 * TODO:
 * - 시간표 추가 삭제 오류 발생시 알림 창
 * - 시간표 추가 삭제 이후 모듈 값 없데이트 해야함
 * @returns
 */
function TimetableModal() {
  const dispatch = useDispatch();
  const {
    timetables,
    changedLectureClassInfo,
    lectureClassInfo,
    lectureInfoIdx,
    selectedClassId,
  } = useSelector((state) => state.lectureDetailReducer);

  const checkLectureToTimetable = (timetableId) => {
    try {
      dispatch(
        clickTitmetableAddRemoveButtom({
          idx: lectureInfoIdx,
          timetableId: timetableId,
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  const saveTimetableChecked = async () => {
    try {
      const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");

      // FIXME:
      // - 오류 발생시 알림 창 띄우기
      let messageObject = await Promise.all(
        timetables.map((props) =>
          props.map((el) =>
            getCheckedTimetable(
              changedLectureClassInfo,
              lectureClassInfo,
              lectureInfoIdx,
              accessToken,
              el.id,
              selectedClassId
            )
              .then((result) => console.log(result))
              .catch((error) => console.log("실패:", error))
          )
        )
      );

      messageObject = messageObject.reduce((result, message, index) => {
        console.log(result, message, index);
        return result;
      }, {});

      console.log("messageObject", messageObject, messageObject[0]);

      // const promises = timetables.map((props) =>
      //   props.map((el) =>
      //     getCheckedTimetable(
      //       changedLectureClassInfo,
      //       lectureClassInfo,
      //       lectureInfoIdx,
      //       accessToken,
      //       el.id,
      //       selectedClassId
      //     )
      //   )
      // );

      // const promisesData = await Promise.all(promises);

      // console.log("all done :)", promisesData);

      // promisesData.map((props) => {props.});

      // let data = await Promise.all(
      //   timetables.map((props) => {
      //     return props.map(async (el) => {
      //       switch (
      //         isSelectedBoth(
      //           changedLectureClassInfo,
      //           lectureClassInfo,
      //           lectureInfoIdx,
      //           el.id
      //         )
      //       ) {
      //         case 0:
      //           return await LectureDetailAPI.removeTimetablesLecture(
      //             accessToken,
      //             el.id,
      //             selectedClassId
      //           );
      //         case 1:
      //           return await LectureDetailAPI.addTimetablesLecture(
      //             accessToken,
      //             el.id,
      //             selectedClassId
      //           );
      //         default:
      //       }
      //     });
      //   })
      // );
      // console.log(data);
    } catch (error) {
      console.log(error);
      if (error.response.data) {
        const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE[error.response.data.code];
        dispatch(showAlertModal({ title, content }));
      }
      throw new Error(error);
    }
  };

  return (
    <ModalWrapper>
      {timetables &&
        timetables.map((props) => {
          return props.map((el) => {
            return (
              <TimetableLabel key={el.id} onClick={() => checkLectureToTimetable(el.id)}>
                {el.name}
                {changedLectureClassInfo[lectureInfoIdx].selectedTableId.indexOf(
                  el.id
                ) !== -1 && <Check />}
              </TimetableLabel>
            );
          });
        })}

      <ButtonSection>
        <Close onClick={() => dispatch(closeTimetableModal())}>닫기</Close>
        <Confirm
          onClick={() => {
            saveTimetableChecked();
            dispatch(closeTimetableModal());
          }}
        >
          확인
        </Confirm>
      </ButtonSection>
    </ModalWrapper>
  );
}

export default TimetableModal;
