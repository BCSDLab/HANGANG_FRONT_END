import React from "react";
import styled from "styled-components";

import {
  FontColor,
  InnerContentWidth,
  PlaceholderColor,
} from "static/Shared/commonStyles";

const Section = styled.section`
  width: 100%;
  height: 120px;
`;
const ResourceWrapper = styled.section`
  height: 100%;
`;

const InfoLabel = styled.label`
  display: block;

  margin: 0 10px 24px 0;
  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;

const SubWarningLabel = styled.p`
  margin-top: 50px;
  text-align: center;
  font-size: 12px;
  line-height: normal;
  letter-spacing: normal;
  color: ${PlaceholderColor};
`;
const SubLabel = styled.label`
  margin: 4px 8px 71px 0;

  font-size: 14px;
  color: #999999;
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
      <ResourceWrapper>
        <SubWarningLabel>등록된 강의자료 추천 정보가 없습니다.</SubWarningLabel>
      </ResourceWrapper>
    </Section>
  );
};

export default LectureResourceContainer;
