import React from "react";
import styled from "styled-components";

import {
  FontColor,
  ConceptColor,
} from "static/Shared/commonStyles";

const Section = styled.section`
  width: 100%;
  margin-bottom: 32px;
`;

const Wrapper = styled.section`
  padding: 16px;
`;

const Title = styled.label`
  display: block;
  margin: 0 10px 24px 0;
  color: ${FontColor};
  font-size: 20px;
  font-weight: 500; 
`;

const SubTitleSection = styled.div`
  display: block;
  margin-bottom : 8px;
`;
const SubTitle = styled.p`
  display: inline-block;
  font-size: 18px;
  color: ${FontColor};
`;
const SubLabel = styled.label`
  margin: 4px 8px 71px 0;
  font-size: 14px;
  color: #999999;
`;

const Classification = styled.span`
  float: right;
  font-size: 14px;
  color: ${ConceptColor};
`;

const Professor = styled(Title)`
  margin-top: 14px;
  font-size: 16px;
  font-weight: normal;
`;

const Bookmark = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/bookmark.png",
  alt: "북마크",
})`
  float: right;
  width: 24px;
  mouse: pointer;
`;

/**
 * TODO:
 * - 북마크 버튼 누를시 북마크 처리 기능
 * - 북마크 isScrapped true 일시 on
 * @param {*} param0 
 * @returns 
 */
const LectureInfoSection = ({
  ...rest
}) => {
  return (
    <Section>
      <Title>{`기본 정보`}</Title>
      <Wrapper>
        <SubTitleSection>
          <SubTitle>{rest.name}</SubTitle>
          <SubLabel style={{ margin: "16px"}}>{rest.code}</SubLabel>
          <Classification>{rest.classification}</Classification>
        </SubTitleSection>

        <Professor>{rest.professor}</Professor>

        <SubLabel>
          {`개설학기 `} 
          { rest.lectureSemesterDates ? rest.lectureSemesterDates.join(" ") : `없음`}
          <Bookmark></Bookmark>
        </SubLabel>
      </Wrapper>
    </Section>
  );
};


export default LectureInfoSection;
