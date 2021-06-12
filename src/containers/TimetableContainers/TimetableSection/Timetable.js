import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { MAX_HEIGHT, MAX_WIDTH } from "static/TimetablePage/timetableConstants";
import { distributeClassTime } from "utils/timetablePage/distributeClassTime";
import { drawCandidateLectureOnTimetable } from "utils/timetablePage/drawCandidateLectureOnTimetable";
import { drawChosenLecturesOnTimetable } from "utils/timetablePage/drawChosenLecturesOnTimetable";
import { drawDefaultTimetableFrame } from "utils/timetablePage/drawDefaultTimetableFrame";
import {
  TimetableCanvas,
  TimetableWrapper,
  CandidateLectureCanvas,
} from "./styles/Timetable.style";

const Timetable = () => {
  const canvasRef = useRef();
  const candidateCanvasRef = useRef();
  const { candidateLectureClassTimes, displayTimetable } = useSelector(
    (state) => state.timetableReducer
  );

  /**
   * displayTimetable 에 변경값이 발생할 때마다 default 시간표를 그리고
   * 시간표에 선택되어 있는 강의들을 캔버스에 그립니다.
   */
  useEffect(() => {
    canvasRef.current.width = MAX_WIDTH;
    canvasRef.current.height = MAX_HEIGHT;
    const ctx = canvasRef.current.getContext("2d");
    drawDefaultTimetableFrame(ctx);

    if (displayTimetable.length !== 0) {
      const { lectureList } = displayTimetable;
      lectureList.forEach((lectureInfo, lectureIdx) => {
        drawChosenLecturesOnTimetable(ctx, lectureInfo, lectureIdx);
      });
    }
  }, [displayTimetable]);

  /**
   * 검색 추가에서 강의를 hover 할 때마다 redux store에 classTime이 변경됩니다.
   * Timetable에는 기존 시간표와,
   * 그 위에 검색 추가 강의를 그리기 위한 투명한 캔버스가 있습니다.
   * 만약 classTime이 변경 될 시,
   * 기존 투명한 캔버스에 그려져 있던 모든 것을 clear합니다.
   * 이후, 해당 classTime을 stroke 합니다.
   * 쉽게 말해, hover 할 때마다 시간표 위에 덧댄 종이를 찢고, 다시 그린다고 생각하면 됩니다.
   */
  useEffect(() => {
    candidateCanvasRef.current.width = MAX_WIDTH;
    candidateCanvasRef.current.height = MAX_HEIGHT;
    const ctx = candidateCanvasRef.current.getContext("2d");

    ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);

    const lectures = distributeClassTime(candidateLectureClassTimes);
    lectures.forEach((lecture) => {
      drawCandidateLectureOnTimetable(ctx, lecture);
    });
  }, [candidateLectureClassTimes]);

  return (
    <TimetableWrapper>
      <TimetableCanvas ref={canvasRef} />
      <CandidateLectureCanvas ref={candidateCanvasRef} />
    </TimetableWrapper>
  );
};

export default Timetable;
