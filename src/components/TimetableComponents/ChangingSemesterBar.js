import React from "react";

import {
  Bar,
  LeftButton,
  LeftImage,
  RightButton,
  RightImage,
  Semester,
} from "./styles/ChangingSemesterBar.style";

const ChangingSemesterBar = () => (
  <Bar>
    <LeftButton>
      <LeftImage />
    </LeftButton>
    <Semester>2020년 2학기</Semester>
    <RightButton>
      <RightImage />
    </RightButton>
  </Bar>
);

export default ChangingSemesterBar;
