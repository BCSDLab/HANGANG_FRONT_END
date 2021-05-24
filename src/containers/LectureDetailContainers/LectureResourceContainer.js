import React from "react";
import styled from "styled-components";

import { FontColor, InnerContentWidth } from "static/Shared/commonStyles";

const Section = styled.section`
  width: ${InnerContentWidth};
`;
const Wrapper = styled.section`
  padding: 40px;
`;

const InfoLabel = styled.label`
  display: block;

  margin: 0 10px 24px 0;
  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;
const SubInfoLabel = styled.p`
  display: contents;

  margin: 0 10px 24px 0;
  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;
const SubLabel = styled.label`
  margin: 4px 8px 71px 0;

  font-size: 14px;
  color: #999999;
`;
const SubSubLabel = styled.label`
  display: flex;
  width: 56px;
  text-align: right;
  justify-content: flex-end;
  margin: 4px 0 60px 175px;
  font-size: 11px;
  line-height: normal;
  color: #999999;
  float: right;
`;

const GraphSection = styled.div`
  width: 704px;
  height: 146px;
  margin: 24px 0 32px;
  padding: 12px 16px 0;
  background-color: #fafafa;
`;

/**
 * TODO:
 * - 강의자료 보여지는 부분 퍼블리싱
 * - slide 처리 어떻게 할건지
 * - 강의자료 불러오는 API연동
 * @param {*} param0
 * @returns
 */

const LectureResourceContainer = ({ lectureInfo }) => {
  return (
    <Section>
      <InfoLabel>강의자료 추천</InfoLabel>
    </Section>
  );
};

export default LectureResourceContainer;
