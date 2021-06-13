import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MAX_HEIGHT, MAX_WIDTH } from "static/TimetablePage/timetableConstants";
import { showLectureInfoModal } from "store/modules/modalModule";
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
  const dispatch = useDispatch();
  const canvasRef = useRef();
  const candidateCanvasRef = useRef();
  const { candidateLectureClassTimes, displayTimetable, lecturePosition } = useSelector(
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
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
    drawDefaultTimetableFrame(ctx);

    if (displayTimetable.length !== 0) {
      const { lectureList } = displayTimetable;
      lectureList.forEach((lectureInfo, lectureIdx) => {
        drawChosenLecturesOnTimetable(ctx, lectureInfo, lectureIdx, dispatch);
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
      <CandidateLectureCanvas
        ref={candidateCanvasRef}
        onClick={(e) => onLectureClick(e, lecturePosition, dispatch)}
      />
    </TimetableWrapper>
  );
};

const onLectureClick = (e, lecturePosition, dispatch) => {
  const { offsetX, offsetY } = getOffsetPositionOnCanvas(e);
  const lecture = findLectureOnPosition({ offsetX, offsetY }, lecturePosition);

  if (lecture !== undefined) {
    dispatch(showLectureInfoModal({ info: lecture.infos }));
  }
};

const findLectureOnPosition = ({ offsetX, offsetY }, data) => {
  const target = data.find(({ position }) => {
    let sX = position.startX;
    let sY = position.startY;
    let eX = position.startX + position.width;
    let eY = position.startY + position.height;

    if (offsetX >= sX && offsetX <= eX && offsetY >= sY && offsetY <= eY) {
      return true;
    } else return false;
  });
  return target;
};

/**
 * 마우스 클릭 시,
 * 현재 마우스의 Canvas 상대 위치를 반환합니다.
 */
const getOffsetPositionOnCanvas = (e) => {
  const { left, top } = e.target.getBoundingClientRect();
  const { clientX, clientY } = e;
  const offsetX = clientX - left;
  const offsetY = clientY - top;

  return { offsetX, offsetY };
};

export default Timetable;
