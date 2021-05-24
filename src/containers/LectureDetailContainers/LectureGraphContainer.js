import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import LectureDetailAPI from "api/lectureDetail";

import { FontColor, PlaceholderColor } from "static/Shared/commonStyles";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
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

const getPercentage = (count, sum) => {
  return count == 0 ? 1 : (count / sum) * 100;
};

/**
 *
 * @param {*} param0
 * @returns
 */
const LectureGraphContainer = ({ evaluationRating, evaluationTotal, ...rest }) => {
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  var cnt = 0.0,
    sum = 0,
    idx = 0;
  console.log(evaluationRating);
  evaluationRating.forEach((el, idx) => {
    sum += el;
  });

  console.log(sum);
  console.log("LectureGraphContainer => ", evaluationRating, evaluationTotal, rest);
  return (
    <Section>
      <InfoLabel>종합 평가</InfoLabel>
      <GraphWrapper>
        <SubLabel>평점</SubLabel>
        <SubInfoLabel>{rest.rating}</SubInfoLabel>
        <SubSubLabel>전체 평가 수 {rest.count}명</SubSubLabel>
        <GraphSection>
          <Graph>
            {evaluationRating.map(({ id }) => (
              <li key={id}>
                <div>
                  <span
                    style={{
                      height: getPercentage(evaluationRating[idx++], sum) + "%",
                    }}
                  ></span>
                  {(cnt += 0.5) % 1.0 == 0 ? (
                    <label>{parseFloat(cnt).toFixed(1)}</label>
                  ) : (
                    ""
                  )}
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
            {difficultyLabelConverter(evaluationTotal.grade_portion)}
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

LectureGraphContainer.defaultProps = {
  evaluationTotal: [],
  evaluationTotal: {
    assignment_amount: 0,
    attendance_frequency: 0,
    difficulty: 0,
    grade_portion: 0,
  },
  rest: {
    count: 0,
    rating: 0,
    hashtags: [{}],
  },
};

LectureGraphContainer.propTypes = {
  evaluationTotal: PropTypes.array,
  evaluationTotal: PropTypes.object.isRequired,
  rest: PropTypes.shape({
    count: PropTypes.number,
    rating: PropTypes.number,
    hashtags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        tag: PropTypes.string,
      })
    ),
  }),
};

export default LectureGraphContainer;
