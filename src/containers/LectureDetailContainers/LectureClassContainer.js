import React from "react";
import styled from "styled-components";

import {
  BorderColor,
  FontColor,
  ConceptColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

const Section = styled.section`
  width: 368px;
  height: 381px;
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
  background-color: #ffab2e;
  :before {
    content: "빼기";
  }
`;

/**
 * TODO:
 * - API 연동 정보로 학점 표시
 * - 분반표시
 * - 담기 빼기 UI 구현
 * @param {*} param0
 * @returns
 */
const LectureClassContainer = ({ lectureInfo }) => {
  return (
    <Section>
      <InfoLabel>{`시간표 정보`}</InfoLabel>
      {/* {reviews.map((data) => (
          <LectureCard
            data={data}
            isScrapped={scrapped.includes(data.id)}
            key={data.id}
          />
        ))} */}
      <Wrapper>
        <SubInfoLabel>
          <SubLabel>{`학점`}</SubLabel>
          <SubLabelContent>{`3학점`}</SubLabelContent>
        </SubInfoLabel>
        <SubInfoLabel>
          <SubLabel>{`시간`}</SubLabel>
          <SubLabelContent>{`분반과 시간을 확인하세요.`}</SubLabelContent>
        </SubInfoLabel>

        <ClassContent>
          <SubLabelContent>{`월 1A~3B (01)`}</SubLabelContent>
          <GetButton></GetButton>
        </ClassContent>
        <ClassContent>
          <SubLabelContent>{`월 1A~3B (01)`}</SubLabelContent>
          <SetButton></SetButton>
        </ClassContent>
        <ClassContent>
          <SubLabelContent>{`월 1A~3B (01)`}</SubLabelContent>
          <GetButton></GetButton>
        </ClassContent>
        <ClassContent>
          <SubLabelContent>{`월 1A~3B (01)`}</SubLabelContent>
          <GetButton></GetButton>
        </ClassContent>
        <ClassContent>
          <SubLabelContent>{`월 1A~3B (01)`}</SubLabelContent>
          <GetButton></GetButton>
        </ClassContent>
      </Wrapper>
    </Section>
  );
};

export default LectureClassContainer;
