import React from "react";
import styled from "styled-components";

import { BorderColor, FontColor, PlaceholderColor } from "static/Shared/commonStyles";
import { Link } from "react-router-dom";

const Label = styled.label`
  color: ${FontColor};
  font-size: 16px;
  font-weight: 500;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 276px;
  border: 1px solid ${BorderColor};
  border-radius: 8px;
  margin-top: 16px;
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

const MyTimetableContainer = () => {
  return (
    <>
      <Label>내 시간표</Label>
      <Content>
        <NoTimetable>
          <NoTimetableSpan>아직 작성한 시간표가 없습니다.</NoTimetableSpan>
          <GotoTimetable to="/timetables">
            <GotoTimetableButton>작성하러 가기</GotoTimetableButton>
          </GotoTimetable>
        </NoTimetable>
      </Content>
    </>
  );
};

export default MyTimetableContainer;
