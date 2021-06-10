import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import styled from "styled-components";
import {
  BorderColor,
  FontColor,
  ConceptColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

import LectureDetailAPI from "api/lectureDetail";
import TimetableModal from "components/LectureDetailComponents/TimetableModal";
import {
  addNextPageReviews,
  clickAddLectureButton,
  clickRemoveectureButton,
  openTimetableModal,
} from "store/modules/lectureDetailModule";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

import { classTime } from "static/LecturesDetailPage/classTime";

const Section = styled.section`
  width: 368px;
  height: fit-content;
  min-height: 381px;
  grid-column: 8 / 12;
  padding: 24px;
  border-radius: 8px;
  border: solid 1px ${BorderColor};
`;

const Wrapper = styled.section`
  min-height: 320px;
`;

const InfoLabel = styled.div`
  display: block;

  margin: 0 10px 24px 0;
  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;

const SubInfoLabel = styled.p`
  margin-bottom: 16px;
`;

const SubWarningWrapper = styled.div`
  display: flex;
  height: 327px;
  justify-content: center;
  align-items: center;
`;
const SubWarningLabel = styled.p`
  text-align: center;
  font-size: 12px;
  line-height: normal;
  letter-spacing: normal;
  color: ${PlaceholderColor};
`;

const SubLabel = styled.label`
  margin: 16px 16px 17px 0;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  line-height: normal;
  color: ${PlaceholderColor};
`;
const SubLabelContent = styled.label`
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  line-height: normal;
  color: ${FontColor};
`;
const ClassContent = styled.div`
  margin-bottom: 13px;
  height: 28px;
  line-height: 28px;
  margin-left: 40px;
`;
const AddTimtable = styled.button`
  float: right;
  width: 56px;
  height: 28px;

  padding: 5px 16px 5px 17px;

  border: none;
  color: #fff;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${ConceptColor};
  :before {
    content: "담기";
  }
`;
const RemoveTimetable = styled(AddTimtable)`
  background-color: #ffab2e;
  :before {
    content: "빼기";
  }
`;
/**
 * TODO:
 * - 시간표 선택 모달
 * - 모달에서 시간표에 담기 기능 추가하기
 *
 * @param {*} param0
 * @returns
 */
const LectureClassContainer = ({ grade, lectureClassInfo }) => {
  const dispatch = useDispatch();

  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const { limit, page, maxPage, sort, isTimetableModalOpened } = useSelector(
    (state) => state.lectureDetailReducer
  );

  console.log(grade, lectureClassInfo);
  return (
    <Section>
      <InfoLabel>{`시간표 정보`}</InfoLabel>

      <Wrapper>
        {!lectureClassInfo && (
          <SubWarningWrapper>
            <SubWarningLabel>등록된 시간표 정보가 없습니다.</SubWarningLabel>
          </SubWarningWrapper>
        )}

        <SubInfoLabel>
          <SubLabel>{`학점`}</SubLabel>
          <SubLabelContent>{`${grade}학점`}</SubLabelContent>
        </SubInfoLabel>
        <SubInfoLabel>
          <SubLabel>{`시간`}</SubLabel>
          <SubLabelContent>{`분반과 시간을 확인하세요.`}</SubLabelContent>
        </SubInfoLabel>

        {lectureClassInfo.map((data) => (
          <ClassContent key={data.id}>
            <SubLabelContent>
              {getDay(data.classTime)}
              {classStartToEnd(data.classTime)}
              {` (${data.classNumber})`}
            </SubLabelContent>
            {!data.selectedTableId ? (
              <RemoveTimetable onClick={() => dispatch(openTimetableModal())} />
            ) : (
              <AddTimtable onClick={() => dispatch(openTimetableModal())} />
            )}
          </ClassContent>
        ))}
        <ClassContent key={22222}>
          <SubLabelContent>월 1A~3B (01)</SubLabelContent>
          <RemoveTimetable onClick={() => dispatch(openTimetableModal())} />
        </ClassContent>
        {isTimetableModalOpened && <TimetableModal />}
      </Wrapper>
    </Section>
  );
};

/**
 * 인자로 받은 배열의 첫번째 요소로 요일을 가져오는 함수입니다.
 * 배열의 첫 번째로 들어온 수의 가장 앞자라리로 classTime 배열안에서 해당 요일이 위치해 있는 배열의 수를 반환합니다.
 * classTime.js
 * @param {*} classTimes
 * @returns 수업 시작~끝 문자열로 조합한 결과
 */
const getDay = (classTimes) => {
  let dayNo = 2 + parseInt(parseInt(classTimes.split(",")[0].replace(/\[/, "")) / 100);
  return classTime[0][dayNo] + " ";
};

/**
 * 인자로 받은 배열의 첫번째와 마지막 요소로 수업 시간을 문자열로 조합해 반환하는 함수입니다.
 * 인자가 문자열로 들어와서 배열로 바꿔준 뒤 첫번째와 마지막 요소로 classTime에서 수업 시간을 가져와
 * 문자열로 조합한 결과를 반환합니다.
 * @param {*} classTimes
 * @returns 수업 시작~끝 문자열로 조합한 결과
 */
const classStartToEnd = (classTimes) => {
  let times = classTimes.replace(/\[/, "").replace(/\]/, "").split(","),
    start = 1 + parseInt(times[0] % 100),
    end = 1 + parseInt(times[times.length - 1] % 100);

  return classTime[start][0] + "~" + classTime[end][0];
};
export default LectureClassContainer;
