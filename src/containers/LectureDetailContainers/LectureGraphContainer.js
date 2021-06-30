import React from "react";

import {
  Section,
  InfoLabel,
  SubInfoLabel,
  SubLabel,
  SubLabelContent,
  SubSubLabel,
  GraphWrapper,
  GraphSection,
  Graph,
  EvaluationWrapper,
  EvaluationInfo,
  HashTagWrapper,
  HashTag,
} from "containers/LectureDetailContainers/styles/LectureGraphContainer.style";

const difficultyLabelConverter = (key) => {
  const difficultyLabel = {
    1: "하",
    2: "중",
    3: "상",
  };
  return difficultyLabel[key];
};
const gradePortionLabelConverter = (key) => {
  const portioinLabel = {
    1: "후하게주심",
    2: "적당히주심",
    3: "아쉽게주심",
  };
  return portioinLabel[key];
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
  const sum = evaluationRating?.reduce((acc, curr) => acc + curr);
  let cnt = 1.0;

  return (
    <Section>
      <InfoLabel>종합 평가</InfoLabel>
      <GraphWrapper>
        <SubLabel>평점</SubLabel>
        <SubInfoLabel>{rest.rating?.toFixed(1)}</SubInfoLabel>
        <SubSubLabel>전체 평가 수 {rest.count}명</SubSubLabel>
        <GraphSection>
          <Graph>
            {evaluationRating?.map((rating, idx) => (
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
            {difficultyLabelConverter(evaluationTotal?.attendance_frequency)}
          </SubLabelContent>
          <SubLabel>시험 난이도</SubLabel>
          <SubLabelContent>
            {difficultyLabelConverter(evaluationTotal?.difficulty)}
          </SubLabelContent>

          <SubLabel>과제량</SubLabel>
          <SubLabelContent>
            {difficultyLabelConverter(evaluationTotal?.assignment_amount)}
          </SubLabelContent>
          <SubLabel>성적비율</SubLabel>
          <SubLabelContent>
            {gradePortionLabelConverter(evaluationTotal?.grade_portion)}
          </SubLabelContent>
        </EvaluationInfo>

        <HashTagWrapper>
          {rest.hashtags?.map(({ id, tag }) => (
            <HashTag key={id}>{`# ${tag} `} </HashTag>
          ))}
        </HashTagWrapper>
      </EvaluationWrapper>
    </Section>
  );
};

export default LectureGraphContainer;
