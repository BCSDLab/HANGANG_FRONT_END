import React from "react";
import styled from "styled-components";
import { MORE_URL, DUMMY_TIMETABLE_URL } from "static/Shared/imageUrls";

const TimetableAddBox = styled.section`
  position: relative;
  margin-top: 33px;
  width: 560px;
`;

const TimetableSelectBar = styled.div`
  width: 240px;
  height: 30px;
  background-color: #fff;
`;

const TimetableSettingButton = styled.img.attrs({
  src: MORE_URL,
  alt: "setting",
})`
  position: absolute;
  width: 24px;
  top: 0;
  right: 0;
`;

const DummyTimetable = styled.img.attrs({
  src: DUMMY_TIMETABLE_URL,
  alt: "dummy",
})``;

const TimetableSection = () => {
  return (
    <TimetableAddBox>
      <TimetableSelectBar />
      <TimetableSettingButton />
      <DummyTimetable />
    </TimetableAddBox>
  );
};

export default TimetableSection;
