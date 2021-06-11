import {
  HEIGHT_ON_SINGLE_TIME,
  WIDTH_ON_SINGLE_TIME,
} from "static/TimetablePage/timetableConstants";
import { getStartPosition } from "./getStartPosition";

/**
 * 검색 추가에서,
 * 강의 hover시 검은 테두리로 해당 강의의 시간을 보여줍니다.
 */
export const drawCandidateLectureOnTimetable = (ctx, lecture) => {
  ctx.strokeStyle = `#000`;

  const { day, hour } = getStartPosition(lecture[0]);

  ctx.strokeRect(
    51 + WIDTH_ON_SINGLE_TIME * day,
    51 + HEIGHT_ON_SINGLE_TIME * hour,
    WIDTH_ON_SINGLE_TIME,
    HEIGHT_ON_SINGLE_TIME * lecture.length
  );
};
