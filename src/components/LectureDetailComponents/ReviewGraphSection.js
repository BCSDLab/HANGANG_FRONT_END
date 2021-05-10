import React from "react";
import styled from "styled-components";

import {
  FontColor,
  InnerContentWidth,
} from "static/Shared/commonStyles";

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
  float: right;
  width: 56px;
  font-size: 11px;
  color: #999999; 
  line-height: normal;
  text-align: right;
  justify-content: flex-end;
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
 * - 그래프 어떻게 표시할건지 
 * - API연동
 *  - 강의평 평균 정보 출력
 * @param {*} param0 
 * @returns 
 */
const LectureResourceSection = ({lectureInfo}) => {
  

  return (
    <Section>
        <InfoLabel>종합 평가</InfoLabel>
        <GraphSection>
            <SubLabel>평점</SubLabel><SubInfoLabel>3.2</SubInfoLabel>
            <SubSubLabel>전체 평가 수 128명</SubSubLabel>
        </GraphSection>
    </Section>
  );
};


export default LectureResourceSection;

