import React, { useRef } from "react";
import { BorderColor } from "static/Shared/commonStyles";
import { TimetableCanvas, TimetableWrapper } from "./styles/Timetable.style";

const Timetable = () => {
  const canvasRef = useRef();

  React.useEffect(() => {
    canvasRef.current.width = 560;
    canvasRef.current.height = 977;
    const ctx = canvasRef.current.getContext("2d");
    drawDefaultTimetable(ctx);
  }, []);

  return (
    <TimetableWrapper>
      <TimetableCanvas ref={canvasRef} />
    </TimetableWrapper>
  );
};

const drawDefaultTimetable = (ctx) => {
  ctx.strokeStyle = `${BorderColor}`;

  drawHorizontalLines(ctx);
  drawVerticalLines(ctx);
  fillTextOnCanvas(ctx);
};

const drawHorizontalLines = (ctx) => {
  const HORIZONTAL_DISTANCE = 85;

  ctx.beginPath();
  for (let i = 0; i < 12; i++) {
    if (i === 0) {
      ctx.moveTo(0, 51 + HORIZONTAL_DISTANCE * i);
    } else {
      ctx.moveTo(51, 51 + HORIZONTAL_DISTANCE * i);
    }
    ctx.lineTo(560, 51 + HORIZONTAL_DISTANCE * i);
  }
  ctx.closePath();
  ctx.stroke();
};

const drawVerticalLines = (ctx) => {
  const VERTICAL_DISTANCE = 102;

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    ctx.moveTo(51 + VERTICAL_DISTANCE * i, 51);
    ctx.lineTo(51 + VERTICAL_DISTANCE * i, 977);
  }
  ctx.closePath();
  ctx.stroke();
};

const fillTextOnCanvas = (ctx) => {
  const VERTICAL_DISTANCE = 102;
  const HORIZONTAL_DISTANCE = 85;
  const DAYS = ["월", "화", "수", "목", "금"];
  ctx.font = "12px Arial";

  DAYS.forEach((value, idx) => {
    ctx.fillText(value, 94 + VERTICAL_DISTANCE * idx, 28);
  });

  for (let hour = 9; hour <= 19; hour++) {
    ctx.fillText(
      hour.toString().padStart(2, "0"),
      30,
      64 + HORIZONTAL_DISTANCE * (hour - 9)
    );
  }
};

export default Timetable;
