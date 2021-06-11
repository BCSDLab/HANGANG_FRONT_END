import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
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
  const { candidateLectureClassTimes } = useSelector((state) => state.timetableReducer);

  useEffect(() => {
    canvasRef.current.width = 562;
    canvasRef.current.height = 977;
    const ctx = canvasRef.current.getContext("2d");
    drawDefaultTimetableFrame(ctx);

    SAMPLE_LECTURE_LIST.forEach((lectureInfo, lectureIdx) => {
      drawChosenLecturesOnTimetable(ctx, lectureInfo, lectureIdx);
    });
  }, []);

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
    candidateCanvasRef.current.width = 562;
    candidateCanvasRef.current.height = 977;
    const ctx = candidateCanvasRef.current.getContext("2d");

    ctx.clearRect(0, 0, 562, 977);

    const lectures = distributeLectures(candidateLectureClassTimes);
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

/**
 * 백엔드에서 넘겨주는 classTime을 연속된 시간으로 나눕니다.
 * 예를 들어, [10, 11, 12, 13, 204, 205, 206, 207]는 [10, 11, 12, 13], [204, 205, 206, 207] 로 나눕니다.
 */
const distributeLectures = (target) => {
  let startIdx = 0;

  let distributedLectureList = target.reduce((acc, curr, idx) => {
    if (idx === target.length - 1 || curr !== target[idx + 1] - 1) {
      let slicedLecture = target.slice(startIdx, idx + 1);
      acc.push(slicedLecture);
      startIdx = idx + 1;
    }
    return acc;
  }, []);

  return distributedLectureList;
};

const SAMPLE_LECTURE_LIST = [
  {
    id: 53,
    lecture_id: 25,
    is_scraped: false,
    is_custom: false,
    user_timetable_id: null,
    semester_date: "5",
    code: "HRD030",
    name: "경력개발이해와상담",
    classification: "HRD필수",
    grades: "2",
    classNumber: "02",
    regular_number: "50",
    department: "HRD학과",
    target: "시스템설계제조전공2",
    professor: "황부순",
    is_english: null,
    design_score: null,
    is_elearning: null,
    class_time: "[100, 101, 102, 103]",
    created_at: "2021-03-15T12:07:50.000+00:00",
    updated_at: "2021-03-15T12:09:23.000+00:00",
    rating: 0,
  },
  {
    id: 53,
    lecture_id: 25,
    is_scraped: false,
    is_custom: false,
    user_timetable_id: null,
    semester_date: "5",
    code: "HRD030",
    name: "HRD개론",
    classification: "HRD필수",
    grades: "2",
    classNumber: "02",
    regular_number: "50",
    department: "HRD학과",
    target: "시스템설계제조전공2",
    professor: "박지원",
    is_english: null,
    design_score: null,
    is_elearning: null,
    class_time: "[304, 305, 306, 307]",
    created_at: "2021-03-15T12:07:50.000+00:00",
    updated_at: "2021-03-15T12:09:23.000+00:00",
    rating: 0,
  },
  {
    id: 53,
    lecture_id: 25,
    is_scraped: false,
    is_custom: false,
    user_timetable_id: null,
    semester_date: "5",
    code: "HRD030",
    name: "디지털공학 및 실습",
    classification: "HRD필수",
    grades: "2",
    classNumber: "03",
    regular_number: "50",
    department: "HRD학과",
    target: "시스템설계제조전공2",
    professor: "주영복",
    is_english: null,
    design_score: null,
    is_elearning: null,
    class_time: "[10, 11, 12, 13, 204, 205, 206, 207]",
    created_at: "2021-03-15T12:07:50.000+00:00",
    updated_at: "2021-03-15T12:09:23.000+00:00",
    rating: 0,
  },
];

export default Timetable;
