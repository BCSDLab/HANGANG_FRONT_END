import React from "react";
import styled from "styled-components";

import {
  BorderColor,
  FontColor,
  ConceptColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

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

const Wrapper = styled.section``;

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
const GetButton = styled.button`
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
const SetButton = styled.button`
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
  background-color: #ffab2e;
  :before {
    content: "빼기";
  }
`;

const getDayNo = (classTimes) => {
  return 1 + parseInt(parseInt(classTimes.split(",")[0].replace(/\[/, "")) / 100);
};

const classStartToEnd = (classTimes) => {
  let times = classTimes.replace(/\[/, "").replace(/\]/, "").split(",");
  let sub =
    classTime[1 + parseInt(times[0] % 100)][0] +
    "~" +
    classTime[1 + parseInt(times[times.length - 1] % 100)][0];
  return sub;
};
/**
 * TODO:
 * - API 연동 정보로 학점 표시
 * - 분반표시
 *
 * @param {*} param0
 * @returns
 */
const LectureClassContainer = ({ grade, lectureClassInfo }) => {
  console.log(lectureClassInfo);
  return (
    <Section>
      <InfoLabel>{`시간표 정보`}</InfoLabel>

      <Wrapper>
        <SubInfoLabel>
          <SubLabel>{`학점`}</SubLabel>
          <SubLabelContent>{`${grade}학점`}</SubLabelContent>
        </SubInfoLabel>
        <SubInfoLabel>
          <SubLabel>{`시간`}</SubLabel>
          <SubLabelContent>{`분반과 시간을 확인하세요.`}</SubLabelContent>
        </SubInfoLabel>

        {lectureClassInfo.map((data) => (
          <ClassContent>
            <SubLabelContent>
              {`${classTime[0][getDayNo(data.classTime)]} `}
              {classStartToEnd(data.classTime)}
              {` (${data.classNumber})`}
            </SubLabelContent>
            {!data.selectedTableId ? <SetButton></SetButton> : <GetButton></GetButton>}
          </ClassContent>
        ))}
      </Wrapper>
    </Section>
  );
};

export default LectureClassContainer;
