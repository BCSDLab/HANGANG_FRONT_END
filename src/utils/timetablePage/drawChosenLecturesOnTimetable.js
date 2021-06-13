import {
  COLOR_TABLE,
  FONT_SIZE,
  HEIGHT_ON_SINGLE_TIME,
  LINE_HEIGHT,
  MAX_LENGTH_ON_ONE_LINE,
  PADDING,
  WIDTH_ON_SINGLE_TIME,
} from "static/TimetablePage/timetableConstants";
import { addLecturesWithPosition } from "store/modules/timetableModule";
import { distributeClassTime } from "./distributeClassTime";
import { getStartPosition } from "./getStartPosition";

/**
 * 유저에 의해 추가된 강의를 시간표에 보여줍니다.
 * classTime을 부분으로 나누어진 시간별로 구분하고,
 * 이를 Text와 함께 캔버스에 그립니다.
 */
export const drawChosenLecturesOnTimetable = (ctx, infos, idx, dispatch) => {
  if (infos) {
    const { name, classNumber, professor, class_time } = infos;
    const parsedClassTime = JSON.parse(class_time);
    const distributedClassTime = distributeClassTime(parsedClassTime);

    distributedClassTime.forEach((classTime) => {
      const { day, hour } = getStartPosition(classTime[0]);

      ctx.fillStyle = COLOR_TABLE[idx % COLOR_TABLE.length];

      const startX = 51 + WIDTH_ON_SINGLE_TIME * day;
      const startY = 51 + HEIGHT_ON_SINGLE_TIME * hour;
      const width = WIDTH_ON_SINGLE_TIME;
      const height = HEIGHT_ON_SINGLE_TIME * classTime.length;
      ctx.fillRect(startX, startY, width, height);

      fillTextOnLecture(ctx, { name, classNumber, professor, day, hour });
      storePositionOfCanvas({ startX, startY, width, height }, infos, dispatch);
    });
  }
};

/**
 * 강의명과 분반, 교수를 보여줍니다.
 * 한줄에 보여주는 최대 길이 수는 MAX_LENGTH_ON_ONE_LINE에 의해 정의됩니다.
 */
const fillTextOnLecture = (ctx, lectureInfo) => {
  const { name, classNumber, professor, day, hour } = lectureInfo;
  let sentencesByLine = [];
  let mainLabel = name;
  let subLabel = `${classNumber !== null ? classNumber : ""} ${professor}`;

  while (mainLabel.length > MAX_LENGTH_ON_ONE_LINE) {
    let trimmed = mainLabel.slice(0, MAX_LENGTH_ON_ONE_LINE);
    mainLabel = mainLabel.slice(MAX_LENGTH_ON_ONE_LINE);
    sentencesByLine.push(trimmed);
  }
  sentencesByLine.push(mainLabel);

  while (subLabel.length > MAX_LENGTH_ON_ONE_LINE) {
    let trimmed = subLabel.slice(0, MAX_LENGTH_ON_ONE_LINE);
    subLabel = subLabel.slice(MAX_LENGTH_ON_ONE_LINE);
    sentencesByLine.push(trimmed);
  }
  sentencesByLine.push(subLabel);

  ctx.fillStyle = "#fff";
  ctx.font = "12px Arial 500";
  sentencesByLine.forEach((s, idx) => {
    ctx.fillText(
      s.trim(),
      51 + WIDTH_ON_SINGLE_TIME * day + PADDING,
      51 + FONT_SIZE + PADDING + HEIGHT_ON_SINGLE_TIME * hour + LINE_HEIGHT * idx,
      WIDTH_ON_SINGLE_TIME - PADDING * 2
    );
  });
};

const storePositionOfCanvas = (position, infos, dispatch) => {
  dispatch(addLecturesWithPosition({ infos: { position, infos } }));
};
