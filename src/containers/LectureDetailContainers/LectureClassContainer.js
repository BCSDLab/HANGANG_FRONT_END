import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  Section,
  Wrapper,
  InfoLabel,
  SubInfoLabel,
  SubWarningWrapper,
  SubWarningLabel,
  SubLabel,
  SubLabelContent,
  ClassContent,
  ButtonWrapper,
  AddTimtable,
  RemoveTimetable,
} from "containers/LectureDetailContainers/styles/LectureClassContainer.style";

import TimetableModal from "components/LectureDetailComponents/TimetableModal";
import {
  openTimetableModal,
  closeTimetableModal,
} from "store/modules/lectureDetailModule";
import { CLASS_TIME } from "static/LectureDetailPage/classTime";

/**
 * 인자로 받은 배열의 첫번째 요소로 요일을 가져오는 함수입니다.
 * 배열의 첫 번째로 들어온 수의 가장 앞자라리로 classTime 배열안에서 해당 요일이 위치해 있는 배열의 수를 반환합니다.
 * classTime.js
 * @param {*} classTimes 수업 시간 배열
 * @returns 수업 시작~끝 문자열로 조합한 결과
 */
const getDay = (classTimes) => {
  let dayNo = 2 + parseInt(parseInt(classTimes.split(",")[0].replace(/\[/, "")) / 100);
  return CLASS_TIME[0][dayNo] + " ";
};

/**
 * 인자로 받은 배열의 첫번째와 마지막 요소로 수업 시간을 문자열로 조합해 반환하는 함수입니다.
 * 인자가 문자열로 들어와서 배열로 바꿔준 뒤 첫번째와 마지막 요소로 classTime에서 수업 시간을 가져와
 * 문자열로 조합한 결과를 반환합니다.
 * @param {*} classTimes 수업 시간 배열
 * @returns 수업 시작~끝 문자열로 조합한 결과
 */
const getClassTimePeriod = (classTimes) => {
  let times = classTimes.replace(/\[/, "").replace(/\]/, "").split(","),
    start = 1 + parseInt(times[0] % 100),
    end = 1 + parseInt(times[times.length - 1] % 100);

  return CLASS_TIME[start][0] + "~" + CLASS_TIME[end][0];
};

/**
 * 모달이 열려 있는 상태에서 다른 과목의 담기 버튼을 눌렀을 때 시간표 정보가 갱신되도록 하는 함수
 * obj 값을 모듈에 저장해 모달 창에 전달
 * @param {*} dispatch
 * @param {*} isTimetableModalOpened
 * @param {*} obj
 */
const openModal = (dispatch, isTimetableModalOpened, obj) => {
  if (isTimetableModalOpened) {
    dispatch(closeTimetableModal());
  }
  dispatch(openTimetableModal(obj));
};

const LectureClassContainer = ({ grade, lectureClassInfo = [] }) => {
  const dispatch = useDispatch();

  const { isTimetableModalOpened } = useSelector((state) => state.lectureDetailReducer);

  return (
    <>
      <Section>
        <InfoLabel>{`시간표 정보`}</InfoLabel>

        <Wrapper>
          {lectureClassInfo.length === 0 && (
            <SubWarningWrapper>
              <SubWarningLabel>등록된 시간표 정보가 없습니다.</SubWarningLabel>
            </SubWarningWrapper>
          )}

          {lectureClassInfo.length !== 0 && (
            <>
              <SubInfoLabel>
                <SubLabel>{`학점`}</SubLabel>
                <SubLabelContent>{`${grade}학점`}</SubLabelContent>
              </SubInfoLabel>
              <SubInfoLabel>
                <SubLabel>{`시간`}</SubLabel>
                <SubLabelContent>{`분반과 시간을 확인하세요.`}</SubLabelContent>
              </SubInfoLabel>

              {lectureClassInfo.map((data, idx) => (
                <ClassContent key={data.id}>
                  <SubLabelContent>
                    {getDay(data.classTime)}
                    {getClassTimePeriod(data.classTime)}
                    {` (${data.classNumber})`}
                  </SubLabelContent>

                  <ButtonWrapper
                    onClick={() => {
                      openModal(dispatch, isTimetableModalOpened, {
                        lectureInfoIdx: idx,
                        selectedClassId: data.id,
                      });
                    }}
                  >
                    {data.selectedTableId.length !== 0 ? (
                      <RemoveTimetable />
                    ) : (
                      <AddTimtable />
                    )}
                  </ButtonWrapper>
                </ClassContent>
              ))}

              {isTimetableModalOpened && <TimetableModal />}
            </>
          )}
        </Wrapper>
      </Section>
    </>
  );
};

LectureClassContainer.propTypes = {
  grade: PropTypes.number,
  lectureClassInfo: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
      result: PropTypes.arrayOf(PropTypes.object),
    })
  ),
};
LectureClassContainer.defaultProps = {
  grade: 0,
  lectureClassInfo: { count: 0, result: [{}] },
};

export default LectureClassContainer;
