import React, { useEffect, useState } from "react";
import styled from "styled-components";

import LectureAPI from "api/lecture";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import departmentList from "static/IndexPage/departmentList";

const Label = styled.label`
  color: ${FontColor};
  font-size: 16px;
  font-weight: 500;
`;

const Content = styled.div`
  width: 100%;
  margin-top: 16px;
  border: 1px solid ${BorderColor};
  border-radius: 8px;
`;

const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0px 18px;
  border-bottom: 1px solid ${BorderColor};
`;

const Department = styled.div`
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 7px;
  height: 100%;

  border-bottom: 2px solid ${({ now }) => (now ? `#ffab2e` : `transparent`)};

  span {
    color: ${({ now }) => (now ? `${ConceptColor}` : `${PlaceholderColor}`)};
  }
`;

const DepartmentLabel = styled.span`
  height: 18px;
  font-size: 12px;
  padding-top: 6px;
  cursor: pointer;
`;

const LectureRow = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  padding: 16px 24px;
  border-bottom: 1px solid ${BorderColor};
`;

const LectureList = styled.div`
  ${LectureRow}:last-child {
    border-bottom: none;
  }
`;

const Ranking = styled.span`
  width: 21px;
  height: 27px;
  margin: 5px 24px 0px 0px;
  font-size: 18px;
  font-weight: 500;
  color: ${ConceptColor};
`;

const TitleProfessorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 24px;
  width: 199px;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${FontColor};
`;

const Professor = styled.span`
  font-size: 12px;
  color: ${FontColor};
`;

const Classification = styled.span`
  width: 50px;
  margin: 8px 24px 0px 0px;
  font-size: 12px;
  text-align: center;
`;

const Credit = styled(Classification)`
  width: 30px;
`;

const Rating = styled(Classification)`
  width: 24px;
  font-size: 16px;
  font-weight: 500;
  margin: 5px 0px 0px 0px;
`;

const LectureRankingContainer = () => {
  const [department, setDepartment] = useState(departmentList[0]);
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    LectureAPI.viewLecturesOnIndexPage(department.department).then(({ data }) =>
      setLectures(data)
    );
  }, [department]);

  return (
    <>
      <Label>강의랭킹</Label>
      <Content>
        <Topbar>
          {departmentList.map(({ label }, index) => (
            <Department key={label} now={department.label === label}>
              <DepartmentLabel onClick={() => setDepartment(departmentList[index])}>
                {label}
              </DepartmentLabel>
            </Department>
          ))}
        </Topbar>
        <LectureList>
          {lectures.map(({ name, professor, classification, total_rating }, index) => (
            <LectureRow key={index}>
              <Ranking>{`0${index + 1}`}</Ranking>
              <TitleProfessorWrapper>
                <Title>{name}</Title>
                <Professor>{professor}</Professor>
              </TitleProfessorWrapper>
              {classification === "교선" && <Classification>교양 선택</Classification>}
              {classification === "교필" && <Classification>교양 필수</Classification>}
              {classification === "전선" && <Classification>전공 선택</Classification>}
              {classification === "전필" && <Classification>전공 필수</Classification>}
              {classification === "학부선" && <Classification>햑부 선택</Classification>}
              {classification === "학부필" && <Classification>햑부 필수</Classification>}
              {classification === "공학선" && <Classification>공학 선택</Classification>}
              {classification === "공학필" && <Classification>공학 필수</Classification>}
              {classification === "HRD선택" && <Classification>HRD 선택</Classification>}
              {classification === "HRD필수" && <Classification>HRD 필수</Classification>}
              <Credit>2학점</Credit>
              <Rating>{total_rating}</Rating>
            </LectureRow>
          ))}
        </LectureList>
      </Content>
    </>
  );
};

export default LectureRankingContainer;
