import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

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

const EvaluationWrapper = styled.div`
  margin: 0px 16px 24px 16px;
`;
const EvaluationTable = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: separate;
  border-spacing: 0 16px;
  th {
    width:auto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    color: #999999;
  }

  td {
    padding: 0 0 0 16px;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${FontColor};

  }
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

/**
 * TODO:
 * - 그래프 라이브러리 사용
 * @param {*} param0 
 * @returns 
 */
const LectureGraphSection = ({evaluationList, evaluationTotal, ...rest}) => {
  console.log("LectureGraphSection => ", evaluationList, evaluationTotal, rest);
  // console.log(evaluationTotal.assignment_amount);
  console.log(evaluationList.attendance[evaluationTotal.assignment_amount]);
  return (
    <Section>
        <InfoLabel>종합 평가</InfoLabel>
        <GraphSection>
            <SubLabel>평점</SubLabel><SubInfoLabel>{rest.rating}</SubInfoLabel>
            <SubSubLabel>전체 평가 수 {rest.count}명</SubSubLabel>
        </GraphSection>
        <EvaluationWrapper>
          {evaluationTotal && 
              <EvaluationTable>
                <colgroup>
                  <col width="52px" />
                  <col width="60%"/>
                  <col width="68px"/>
                  <col width=""/>
                </colgroup>
                <thead></thead>
                <tbody>
                    <tr>
                      <th>출첵빈도</th>
                      <td>{difficultyLabelConverter(evaluationTotal.attendance_frequency)}</td>
                      <th>시험 난이도</th>
                      <td>{difficultyLabelConverter(evaluationTotal.difficulty)}</td>
                    </tr>
                    <tr>
                      <th>과제량</th>
                      <td>{difficultyLabelConverter(evaluationTotal.assignment_amount)}</td>
                      <th>성적비율</th>
                      <td>{difficultyLabelConverter(evaluationTotal.grade_portion)}</td>
                    </tr>
                  </tbody>
              </EvaluationTable>  
          }

          <HashTagWrapper>
            {rest.hashtags && 
              rest.hashtags.map(({ id, tag }) => (
                <HashTag key={id}>{`# ${tag} `} </HashTag>
              ))
            }
          </HashTagWrapper>
        </EvaluationWrapper>
        
    </Section>
  );
};

LectureGraphSection.defaultProps = {
  evaluationList: {},
  evaluationTotal: {
    assignment_amount:0,  
    attendance_frequency: 0,
    difficulty: 0,
    grade_portion: 0
  },
  rest: {
    count: 0,
    rating: 0,
    hashtags: [{}],
  },
};

LectureGraphSection.propTypes = {
  evaluationList: PropTypes.object,
  evaluationTotal: PropTypes.object.isRequired,
  rest: PropTypes.shape({
    count: PropTypes.number,
    rating: PropTypes.number,
    hashtags: PropTypes.arrayOf(
      PropTypes.shape({
        id : PropTypes.number,
        tag: PropTypes.string,
      })
    ),
  }),
};

export default LectureGraphSection;

