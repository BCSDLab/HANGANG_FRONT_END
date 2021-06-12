import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import styled from "styled-components";
import { FontColor, ConceptColor } from "static/Shared/commonStyles";
import LectureDetailAPI from "api/lectureDetail";

import {
  setLectureTimetables,
  closeTimetableModal,
  clickTitmetableAddRemoveButtom,
} from "store/modules/lectureDetailModule";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

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
 * TODO:
 * - 시간표 정보 API연동
 * - 시간표 담기 빼기 기능 연동
 * @param {*} param0
 * @returns
 */
function TimetableModal() {
  const dispatch = useDispatch();
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const { timetables, timetablesLectures, id } = useSelector(
    (state) => state.lectureDetailReducer
  );
  console.log(timetables, timetablesLectures);

  const checkLectureToTimetable = async (index, idx) => {
    try {
      dispatch(clickTitmetableAddRemoveButtom({ index: index, idx: idx }));
    } catch (error) {
      console.dir(error);
      throw new Error(error);
    }
  };

  const saveTimetableChecked = async () => {
    console.log("[checkLectureToTimetable] => ");
    try {
      const { access_token: accessToken } = getValueOnLocalStorage("hangangToken");

      let { data } = await Promise.all(
        timetables.map((props) => {
          props.map(async (el) => {
            return el.is_added
              ? LectureDetailAPI.addTimetablesLecture(accessToken, el.id, id)
              : LectureDetailAPI.removeTimetablesLecture(accessToken, el.id, id);
          });
        })
      );
    } catch (error) {
      console.dir(error);
      throw new Error(error);
    }
  };

  return (
    <ModalWrapper>
      {timetables &&
        timetables.map((props, index) => {
          return props.map((data, idx) => {
            return (
              <TimetableLabel
                key={data.id}
                onClick={() => checkLectureToTimetable(index, idx)}
              >
                {data.name}
                {/* {timetablesLectures[idx].lectureList.length != 0 &&
                  timetablesLectures[idx].lectureList.map(({ id }) => {
                    if (id === data.id) return true;
                  }) && <Check />} */}
                {data.is_added && <Check />}
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
