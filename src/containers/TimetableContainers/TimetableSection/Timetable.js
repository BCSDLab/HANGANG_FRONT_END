import React from "react";
import styled from "styled-components";
import { DUMMY_TIMETABLE_URL } from "static/Shared/imageUrls";

const TimetableWrapper = styled.div`
  width: 560px;
  margin-top: 54px;
`;

const DummyTimetable = styled.img.attrs({
  src: DUMMY_TIMETABLE_URL,
  alt: "dummy",
})`
  width: 100%;
`;

const Timetable = () => {
  return (
    <TimetableWrapper>
      <DummyTimetable />
    </TimetableWrapper>
  );
};

export default Timetable;
