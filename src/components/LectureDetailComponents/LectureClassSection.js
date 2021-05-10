
import React from "react";
import styled from "styled-components";

import {
  BorderColor,
  FontColor,
} from "static/Shared/commonStyles";

const Section = styled.section`
  width: 368px;
  height: 381px;
  grid-column: 8 / 12;
  padding: 24px 24px 37px;
  border-radius: 8px;
  border: solid 1px ${BorderColor};  
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

const Section2 = styled.section`
  width: 368px;
  grid-column: 8 / 12;
  padding: 24px 24px 37px;
  border-radius: 8px;
  border: solid 1px ${BorderColor};  
`;


/**
 * TODO:
 * - API 연동 정보로 학점 표시
 * - 분반표시 
 * - 담기 빼기 UI 구현
 * @param {*} param0 
 * @returns 
 */
const LectureClassSection = ({lectureInfo}) => {
  

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
    </Section>
  );
};


export default LectureClassSection;

