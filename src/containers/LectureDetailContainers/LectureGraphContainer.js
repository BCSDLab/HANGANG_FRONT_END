import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";

import { FontColor, PlaceholderColor } from "static/Shared/commonStyles";

const Section = styled.section`
  width: 100%;
  margin-bottom: 32px;
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
  float: left;
  margin: 3px 8px 0 0;

  font-size: 14px;
  color: ${PlaceholderColor};
`;
const SubLabelContent = styled.label`
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  color: ${FontColor};
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

const GraphWrapper = styled.div`
  width: 704px;
  height: 146px;
  margin: 24px 0 32px;
  padding: 16px 16px 0;
  background-color: #fafafa;
`;

const GraphSection = styled.div`
  position: relative;
  width: 209px;
  display: flex;
  justify-content: center;
  margin-left: 230px;
  height: 133px;
  top: -12px;
`;

const Graph = styled.ul`
  display: flex;
  position: absolute;
  transform: transalte(-50%, -50%);
  li {
    padding-right: 1px;
  }
  div {
    position: relative;
    width: 20px;
    height: 117px;
  }
  li div span {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    bottom: -5px;
    background: #ffab2e;
  }

  label {
    position: relative;
    top: 123px;
    left: 3px;
    font-size: 11px;
    font-weight: normal;
    color: ${PlaceholderColor};
  }
`;
const EvaluationWrapper = styled.div`
  margin: 0px 16px 24px 16px;
`;

const EvaluationInfo = styled.div`
  display: grid;
  grid-template-columns: auto 4fr auto 1fr;
  grid-gap: 16px;
`;

const HashTagWrapper = styled.div`
  margin-top: 16px;
`;

const HashTag = styled.span`
  font-size: 14px;
  color: ${PlaceholderColor};
  margin-right: 7px;
`;

const difficultyLabelConverter = (key) => {
  switch (key) {
    case 1:
      return "하";
    case 2:
      return "중";
    case 3:
      return "상";
    default:
      return;
  }
};
const gradePortionLabelConverter = (key) => {
  switch (key) {
    case 1:
      return "후하게주심";
    case 2:
      return "적당히주심";
    case 3:
      return "아쉽게주심";
    default:
      return "";
  }
};

const getPercentage = (count, sum) => {
  return count === 0 ? 1 : (count / sum) * 100;
};

/**
 * 강의평 평점 그래프
 * @param {*} param0
 * @returns
 */
const LectureGraphContainer = ({ evaluationRating, evaluationTotal, ...rest }) => {
  const sum = evaluationRating.reduce((acc, curr) => acc + curr);
  let cnt = 1.0;

  return (
    <Section>
      <InfoLabel>종합 평가</InfoLabel>
      <GraphWrapper>
        <SubLabel>평점</SubLabel>
        <SubInfoLabel>{rest.rating.toFixed(1)}</SubInfoLabel>
        <SubSubLabel>전체 평가 수 {rest.count}명</SubSubLabel>
        <GraphSection>
          <Graph>
            {evaluationRating.map((rating, idx) => (
              <li key={idx}>
                <div>
                  <span
                    style={{
                      height: getPercentage(rating, sum) + "%",
                    }}
                  ></span>
                  {idx % 2 === 1 ? <label>{parseFloat(cnt++).toFixed(1)}</label> : ""}
                </div>
              </li>
            ))}
          </Graph>
        </GraphSection>
      </GraphWrapper>

      <EvaluationWrapper>
        <EvaluationInfo>
          <SubLabel>출첵빈도</SubLabel>
          <SubLabelContent>
            {difficultyLabelConverter(evaluationTotal.attendance_frequency)}
          </SubLabelContent>
          <SubLabel>시험 난이도</SubLabel>
          <SubLabelContent>
            {difficultyLabelConverter(evaluationTotal.difficulty)}
          </SubLabelContent>

          <SubLabel>과제량</SubLabel>
          <SubLabelContent>
            {difficultyLabelConverter(evaluationTotal.assignment_amount)}
          </SubLabelContent>
          <SubLabel>성적비율</SubLabel>
          <SubLabelContent>
            {gradePortionLabelConverter(evaluationTotal.grade_portion)}
          </SubLabelContent>
        </EvaluationInfo>

        <HashTagWrapper>
          {rest.hashtags.map(({ id, tag }) => (
            <HashTag key={id}>{`# ${tag} `} </HashTag>
          ))}
        </HashTagWrapper>
      </EvaluationWrapper>
    </Section>
  );
};

export default LectureGraphContainer;
