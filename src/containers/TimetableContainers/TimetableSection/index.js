import React from "react";
import styled from "styled-components";
import { MORE_URL } from "static/Shared/imageUrls";
import Timetable from "./Timetable";

const TimetableAddBox = styled.section`
  position: relative;
  margin-top: 33px;
  width: 560px;
`;

const TimetableSelectBar = styled.div`
  width: 240px;
  height: 30px;
  background-color: #fff;
  cursor: pointer;
`;

const TimetableSettingButton = styled.img.attrs({
  src: MORE_URL,
  alt: "setting",
})`
  position: absolute;
  width: 24px;
  top: 0;
  right: 0;
  cursor: pointer;
`;

const TimetableSection = () => {
  return (
    <TimetableAddBox>
      <TimetableSelectBar />
      <TimetableSettingButton />
      <Timetable />
    </TimetableAddBox>
  );
};

export default TimetableSection;
