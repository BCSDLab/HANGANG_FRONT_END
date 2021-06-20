import { BorderColor, FontColor } from "static/Shared/commonStyles";
import {
  HEIGHT_ON_SINGLE_TIME,
  MAX_HEIGHT,
  MAX_WIDTH,
  STARTING_POINT,
  WIDTH_ON_SINGLE_TIME,
} from "static/TimetablePage/timetableConstants";

/**
 * 기본 default 시간표 틀을 만듭니다.
 * 수평 선을 만들고, 수직 선을 그리고
 * 마지막으로 요일과 시간을 넣습니다.
 */
export const drawDefaultTimetableFrame = (ctx) => {
  ctx.strokeStyle = `${BorderColor}`;

  drawHorizontalLines(ctx);
  drawVerticalLines(ctx);
  fillTextOnTimetableFrame(ctx);
};

/**
 * 수평선을 그립니다.
 */
const drawHorizontalLines = (ctx) => {
  const HORIZONTAL_DISTANCE = HEIGHT_ON_SINGLE_TIME * 2;

  ctx.beginPath();
  for (let i = 0; i < 12; i++) {
    if (i === 0) {
      ctx.moveTo(0, STARTING_POINT + HORIZONTAL_DISTANCE * i);
    } else {
      ctx.moveTo(STARTING_POINT, STARTING_POINT + HORIZONTAL_DISTANCE * i);
    }
    ctx.lineTo(MAX_WIDTH, STARTING_POINT + HORIZONTAL_DISTANCE * i);
  }
  ctx.closePath();
  ctx.stroke();
};

/**
 * 수직선을 그립니다.
 */
const drawVerticalLines = (ctx) => {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    ctx.moveTo(STARTING_POINT + WIDTH_ON_SINGLE_TIME * i, STARTING_POINT);
    ctx.lineTo(STARTING_POINT + WIDTH_ON_SINGLE_TIME * i, MAX_HEIGHT);
  }
  ctx.closePath();
  ctx.stroke();
};

/**
 * 요일과 시간을 시간표에 넣습니다.
 * 요일은 월~금, 시간은 09~19 시 까지입니다.
 */
const fillTextOnTimetableFrame = (ctx) => {
  const HORIZONTAL_DISTANCE = HEIGHT_ON_SINGLE_TIME * 2;
  const DAYS = ["월", "화", "수", "목", "금"];
  ctx.font = "12px Arial";
  ctx.fillStyle = `${FontColor}`;

  DAYS.forEach((value, idx) => {
    ctx.fillText(value, 94 + WIDTH_ON_SINGLE_TIME * idx, 28);
  });

  for (let hour = 9; hour <= 19; hour++) {
    ctx.fillText(
      hour.toString().padStart(2, "0"),
      30,
      64 + HORIZONTAL_DISTANCE * (hour - 9)
    );
  }
};
