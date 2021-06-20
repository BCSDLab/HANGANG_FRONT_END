import { DEFAULT_START_VALUE, DEFAULT_START_YEAR } from "static/Shared/DEFAULT_CONSTANTS";

/**
 * 각각 3, 7, 9월, 연도가 넘어갈 때,
 * 시간표 페이지 첫 접근 시 보이는 Default 학기가 변경됩니다.
 */
export const getCurrentSemesterValue = (
  startYear = DEFAULT_START_YEAR,
  startValue = DEFAULT_START_VALUE
) => {
  let currentValue = startValue;

  const currentYear = new Date().getFullYear();
  for (let i = 0; i < currentYear - startYear; i++) {
    currentValue += 4;
  }

  const currentMonth = new Date().getMonth() + 1;

  if (currentMonth >= 3) currentValue++;
  if (currentMonth >= 7) currentValue++;
  if (currentMonth >= 9) currentValue++;

  return currentValue;
};
