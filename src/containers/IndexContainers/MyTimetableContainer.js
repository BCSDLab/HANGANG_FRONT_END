import React, { useState } from "react";
import styled from "styled-components";

import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { Link } from "react-router-dom";

const Label = styled.label`
  color: ${FontColor};
  font-size: 16px;
  font-weight: 500;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 276px;
  border: 1px solid ${BorderColor};
  border-radius: 8px;
  margin-top: 16px;
  padding: 12px 20px;
`;

const Lecture = styled.div`
  position: relative;
  width: 100%;
  height: 39px;
  margin: 12px 0px;
`;

const Name = styled.span`
  position: absolute;
  top: 2px;
  left: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${FontColor};
`;

const Professor = styled.span`
  position: absolute;
  bottom: 2px;
  left: 0;
  font-size: 12px;
  color: #828282;
`;

const AssessButton = styled(Link)`
  all: unset;
  position: absolute;
  top: calc(50% - 14px);
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 28px;
  border-radius: 20px;
  background-color: ${ConceptColor};
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
`;

const AssessedButton = styled(AssessButton)`
  color: ${PlaceholderColor};
  background-color: ${BorderColor};
  cursor: default;
`;

const NoTimetable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoTimetableSpan = styled.span`
  font-size: 12px;
  color: ${PlaceholderColor};
`;

const GotoTimetable = styled(Link)`
  all: unset;
  margin-top: 6px;
`;

const GotoTimetableButton = styled.button`
  all: unset;
  height: 28px;
  padding: 0px 20px;
  border-radius: 20px;
  background-color: ${BorderColor};
  color: ${FontColor};
  font-size: 12px;
  cursor: pointer;
`;

/**
 * MyTimetableContainer
 * 내 시간표 컨테이너입니다.
 * timetableLectures의 크기에 따라 없으면 안내 문구, 있으면 내 시간표 강의를 보여줍니다.
 * 추후에 API 연결이 필요합니다.
 */
const MyTimetableContainer = () => {
  const sampleTimetableLectures = [
    { name: "사랑의 역사", professor: "김사랑", isAssessed: true },
    { name: "하트의 역사", professor: "박사랑", isAssessed: false },
    { name: "사랑의 히스토리", professor: "김하트", isAssessed: false },
    { name: "사랑역사", professor: "최사랑", isAssessed: false },
  ];
  // API 연결 후 아래 주석 해제
  // eslint-disable-next-line no-unused-vars
  const [timetableLectures, setTimetableLectures] = useState(sampleTimetableLectures);

  // useEffect(() => {
  //   // API call
  //   setTimetableLectures(~~~)
  // }, [])

  return (
    <>
      <Label>내 시간표</Label>
      <Content>
        {timetableLectures.length === 0 && (
          <NoTimetable>
            <NoTimetableSpan>아직 작성한 시간표가 없습니다.</NoTimetableSpan>
            <GotoTimetable to="/timetables">
              <GotoTimetableButton>작성하러 가기</GotoTimetableButton>
            </GotoTimetable>
          </NoTimetable>
        )}
        {timetableLectures.length !== 0 &&
          timetableLectures.map(({ name, professor, isAssessed }, index) => (
            <Lecture key={index}>
              <Name>{name}</Name>
              <Professor>{professor}</Professor>
              {!isAssessed && <AssessButton to="/lectures">평가하기</AssessButton>}
              {isAssessed && <AssessedButton as="div">평가완료</AssessedButton>}
            </Lecture>
          ))}
      </Content>
    </>
  );
};

export default MyTimetableContainer;
