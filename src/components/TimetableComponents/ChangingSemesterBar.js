import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNextSemester, changePrevSemester } from "store/modules/timetableModule";
import { getSemesterOptions } from "utils/timetablePage/getSemesterOptions";

import {
  Bar,
  LeftButton,
  LeftImage,
  RightButton,
  RightImage,
  Semester,
} from "./styles/ChangingSemesterBar.style";

const ChangingSemesterBar = () => {
  const dispatch = useDispatch();
  const { currentSemesterValue, minSemesterValue, maxSemesterValue } = useSelector(
    (state) => state.timetableReducer
  );
  const currentSemester = getSemesterOptions().filter(
    ({ value }) => value === currentSemesterValue
  )[0];

  const changeSemester = (direction) => {
    if (direction === "left") {
      dispatch(changePrevSemester());
    } else {
      dispatch(changeNextSemester());
    }
  };

  return (
    <Bar>
      <LeftButton>
        {minSemesterValue !== currentSemesterValue && (
          <LeftImage onClick={() => changeSemester("left")} />
        )}
      </LeftButton>
      <Semester>{`${currentSemester.year}년 ${currentSemester.label}`}</Semester>
      <RightButton>
        {maxSemesterValue !== currentSemesterValue && (
          <RightImage onClick={() => changeSemester("right")} />
        )}
      </RightButton>
    </Bar>
  );
};

export default ChangingSemesterBar;
