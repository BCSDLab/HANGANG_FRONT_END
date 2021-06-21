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
  for (let i = 0; i <= MAX_HOUR - MIN_HOUR + 1; i++) {
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
  for (let i = 0; i < DAYS.length; i++) {
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

  ctx.font = "12px Arial";
  ctx.fillStyle = `${FontColor}`;

  DAYS.forEach((value, idx) => {
    ctx.fillText(value, DAY_START_POINT + WIDTH_ON_SINGLE_TIME * idx, INTERVAL_ON_DAYS);
  });

  for (let hour = MIN_HOUR; hour <= MAX_HOUR; hour++) {
    ctx.fillText(
      hour.toString().padStart(2, "0"),
      INTERVAL_ON_HOURS,
      HOUR_START_POINT + HORIZONTAL_DISTANCE * (hour - MIN_HOUR)
    );
  }
};

const MIN_HOUR = 9;
const MAX_HOUR = 19;
const INTERVAL_ON_DAYS = 28;
const INTERVAL_ON_HOURS = 30;
const DAYS = ["월", "화", "수", "목", "금"];
const DAY_START_POINT = 94;
const HOUR_START_POINT = 64;
